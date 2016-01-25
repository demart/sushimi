package kz.sushimi.restapi.v1.service;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import java.util.UUID;

import javax.persistence.Query;

import org.hibernate.util.ArrayHelper;

import kz.sushimi.persistence.Cart;
import kz.sushimi.persistence.CartItem;
import kz.sushimi.persistence.dictionaries.Department;
import kz.sushimi.persistence.orders.DeliveryType;
import kz.sushimi.persistence.orders.Order;
import kz.sushimi.persistence.orders.OrderHistory;
import kz.sushimi.persistence.orders.OrderItem;
import kz.sushimi.persistence.orders.OrderProcess;
import kz.sushimi.persistence.orders.OrderSource;
import kz.sushimi.persistence.orders.PayMethod;
import kz.sushimi.persistence.users.User;
import kz.sushimi.restapi.v1.exceptions.ErrorCode;
import kz.sushimi.restapi.v1.exceptions.SushimiException;
import kz.sushimi.restapi.v1.exceptions.SushimiValidationException;
import kz.sushimi.restapi.v1.models.RequestHeaderModel;
import kz.sushimi.restapi.v1.models.courier.UserOrderModel;
import kz.sushimi.restapi.v1.models.courier.UserReadOrdersRequestModel;
import kz.sushimi.restapi.v1.models.courier.UserUpdateGeolocationCoordinateModel;
import kz.sushimi.restapi.v1.models.courier.UserUpdateOrderStateModel;
import kz.sushimi.restapi.v1.models.order.RegisterOrderModel;
import kz.sushimi.restapi.v1.service.broadcast.PhoneService;
import play.Logger;
import play.db.jpa.JPA;

public class OrderService {

	
	public static Order getOrder(Integer orderId) {
		return JPA.em().find(Order.class, orderId);
	}
	
	public static Order getOrderByKey(String orderKey) {
		List<Order> orders = JPA.em().createQuery("from Order where key = :key")
				.setParameter("key", orderKey)
				.getResultList();
		if (orders.size() > 0)
			return orders.get(0);
		return null;
	}
	
	
	/**
	 * Сохраняет новый заказ
	 * 
	 * @param model
	 * @throws SushimiException 
	 */
	public static Order registerOrder(RegisterOrderModel model, RequestHeaderModel headerModel) throws SushimiValidationException {
		Order order = new Order();
		if (model.cash != null)
			order.setPersonCash(model.cash);

		order.setKey(UUID.randomUUID().toString());
		order.setPayMethod(parsePayMethod(model.payMethod));
		order.setDeliveryType(parseDeliveryType(model.delivery));
		
		if (model.personCount != null)
			order.setPersonCount(model.personCount);
		
		order.setPersonName(model.fullname);
		order.setPersonPhone(model.phone);
		order.setPersonRemark(model.comment);
		order.setPersonEmail(model.email);
		
		// ORDER SOURCE AND DISCOUNT
		order.setSource(OrderSource.MOBILE);
		order.setSourceDiscount(CartService.getMobileDiscount());
		if (headerModel != null) {
			order.setSourceAppVersion(headerModel.getApplicationVerison());
			order.setSourceSystemName(headerModel.getSystemName());
			order.setSourceSystemVersion(headerModel.getSystemVersion());
		}
		
		Cart cart = CartService.getCurrentCart(model.cartId, false);
		if (cart == null)
			throw new SushimiValidationException(ErrorCode.VALIDATION_ERROR,"Cart not found on server");
		
		order.setCity(cart.getCity());
		order.setOrderSum(cart.getTotalCartSum());
		order.setDepartment(parseDepartment(model.departmentId));
		if (order.getDepartment() == null)
			if (order.getCity() != null && order.getCity().getDepartments() != null)
				order.setDepartment(order.getCity().getDepartments().get(0));
		
		// Delivery Time
		if (model.deliveryTime != null) {
			Calendar deliveryTime = Calendar.getInstance();
			deliveryTime.setTimeInMillis(model.deliveryTime);
			order.setDeliveryTime(deliveryTime);
		}
		
		// Address Info
		convertAddressField(model, order);
		
		order.setProcessed(OrderProcess.NOT_PROCESSED);
		order.setOrderTime(Calendar.getInstance());
		order.setOrderNumber(generateOrderNumber());
		JPA.em().persist(order);

		
		order.setOrderItems(new ArrayList<OrderItem>());
		// Product List
		for (CartItem cartItem : cart.getItems()) {
			OrderItem orderProduct = new OrderItem();
			orderProduct.setOrder(order);
			orderProduct.setProduct(cartItem.getProduct());
			orderProduct.setCount(cartItem.getCount());
			orderProduct.setPrice(cartItem.getProduct().getCost());
			orderProduct.setSum(cartItem.getCount()*orderProduct.getPrice());
			
			JPA.em().persist(orderProduct);
			order.getOrderItems().add(orderProduct);
		}
		
		
		PhoneService.addOrUpdatePhone(order.getPersonPhone(), order.getPersonName());
		
		return order;
	}
	
	public static final String ORDER_NUMBER_PREFIX = "00";
	public static final Integer ORDER_NUMBER_LENGTH = 6;
	
	private static String generateOrderNumber() {
		Query q = JPA.em().createNativeQuery("select nextval('order_sequence')");
		Long orderNumber = ((BigInteger)q.getSingleResult()).longValue();
		String orderNumberString = orderNumber.toString();
		String generatedNumber = ORDER_NUMBER_PREFIX;
		for (int i=0; i < ORDER_NUMBER_LENGTH - orderNumberString.length(); i++)
			generatedNumber += "0";
		generatedNumber += orderNumberString;
		return generatedNumber;
	}
	
	
	private static Department parseDepartment(Integer departmentId) {
		if (departmentId != null)
			return JPA.em().find(Department.class, departmentId);
		return null;
	}
	
	private static void convertAddressField(RegisterOrderModel model, Order order) throws SushimiValidationException {
		if (model.address == null)
			throw new SushimiValidationException(ErrorCode.VALIDATION_ERROR, "RegisterOrder Address info not found");
		
		order.setAddressBuilding(model.address.building);
		order.setAddressCityName(model.address.cityName);
		order.setAddressCorpus(model.address.corpus);
		order.setAddressDoorCode(model.address.doorCode);
		order.setAddressFlat(model.address.flat);
		order.setAddressFloor(model.address.floor);
		order.setAddressHouse(model.address.house);
		order.setAddressOffice(model.address.office);
		order.setAddressPorch(model.address.porch);
		order.setAddressRoom(model.address.room);
		order.setAddressStreetName(model.address.streetName);
		
		// Geo Position
		order.setGeoLatitude(model.address.latitude);
		order.setGeoLongitude(model.address.longitude);
	}

	public static PayMethod parsePayMethod(String payMethod) throws SushimiValidationException {
		switch (payMethod) {
			case "CASH":
				return PayMethod.CASH;
			case "CREDIT_CARD":
				return PayMethod.CREDIT_CARD;
			case "CREDIT_CARD_ON_DELIVERY":
				return PayMethod.CREDIT_CARD_ON_DELIVERY;
			default:
				throw new SushimiValidationException(ErrorCode.VALIDATION_ERROR, "RegisterOrder PaymentType not selected");
		}
	}
	
	public static DeliveryType parseDeliveryType(String deliveryType) throws SushimiValidationException {
		switch (deliveryType) {
			case "DELIVERY":
				return DeliveryType.DELIVERY;
			case "DELIVERY_IN_TIME":
				return DeliveryType.DELIVERY_IN_TIME;
			case "SELF_SERVICE":
				return DeliveryType.SELF_SERVICE;
			default:
				throw new SushimiValidationException(ErrorCode.VALIDATION_ERROR, "DeliveryType not selected");
		}
	}
	
	
	// ==============================
	// ======== COURIER APP =========	
	// ==============================	
	
	/**
	 * Функция обновляет позицию всех заказов курьера, которые находяться на доставке.
	 * @param mode
	 */
	public static void updateOrderGeolocation(User user, UserUpdateGeolocationCoordinateModel model) {
		// 0. Получить список заказов на доставке
		// 1. Обновить координаты у каждого закза + отправить на синхонизацию
		// 2. Вернуть колличество обновленных заказов
		
		
		List<Order> orders = JPA.em().createQuery("from Order where processed = 'ON_DELIVERY' and courierCode = :courierCode")
				.setParameter("courierCode", user.getCode()).getResultList();
		
		if (orders.size() < 1)
			return;
		
		// TODO BAD ALGORIGHT, refactor for one update query
		List<Integer> ids = new ArrayList<Integer>();
		for (Order order : orders)
			ids.add(order.getId());
		
		int affectedRows = JPA.em().createQuery("update OrderHistory o set o.isSynchronized = false, o.geoLatitude = :latitude, "
				+ "o.geoLongitude = :longitude  where o.orderState = 'ON_DELIVERY' and order.id in (:orders)")
				.setParameter("latitude", model.latitude)
				.setParameter("longitude", model.longitude)
				.setParameter("orders", ids)
				.executeUpdate();
		
		Logger.debug("Courier orders geoposition was successfully updates. Affected orders count: %s", affectedRows);
		
	}
	
	public static void completeOrder(User user, UserUpdateOrderStateModel model) throws SushimiValidationException {
		if (model.orderNumber == null || model.orderNumber.isEmpty())
			throw new SushimiValidationException(ErrorCode.VALIDATION_ERROR, "COURIERAPP: completeOrder: orderNumber is null or empty");
		
		List<Order> orders = JPA.em().createQuery("from Order where orderNumber = :orderNumber")
								.setParameter("orderNumber", model.orderNumber).getResultList();
		
		if (orders.size() < 1)
			throw new SushimiValidationException(ErrorCode.DATA_NOT_FOUND, "COURIERAPP: completeOrder: order not found with number: " + model.orderNumber);
		
		Order order = orders.get(0);
		if (order == null)
			throw new SushimiValidationException(ErrorCode.DATA_NOT_FOUND, "COURIERAPP: completeOrder: order not found with number: " + model.orderNumber);
		
		if (order.getProcessed() != OrderProcess.DELIVERED) {
			order.setProcessed(OrderProcess.DELIVERED);
			order.setCourierCode(user.getCode());
			JPA.em().persist(order);
			
			OrderHistory history = new OrderHistory();
			history.setDate(Calendar.getInstance());
			history.setGeoLatitude(model.latitude);
			history.setGeoLongitude(model.longitude);
			history.setIsSynchronized(false);
			history.setOrder(order);
			history.setOrderState(OrderProcess.DELIVERED);
			history.setUser(user.getCode());
			JPA.em().persist(history);
		}
		
		// 1. Изменить статус заказа если еще не закончен
		// 2. Добавить запись в историю елси еще нету записи
		// 3. Сохранить пользователя доставившего заказ
		// 4. Сохранить геопозицию курьера
	}
	
	public static void returnOrder(User user, UserUpdateOrderStateModel model) throws SushimiValidationException {
		if (model.orderNumber == null || model.orderNumber.isEmpty())
			throw new SushimiValidationException(ErrorCode.VALIDATION_ERROR, "COURIERAPP: returnOrder: orderNumber is null or empty");
		if (model.reason == null || model.reason.isEmpty())
			throw new SushimiValidationException(ErrorCode.VALIDATION_ERROR, "COURIERAPP: returnOrder: reason is null or empty");
			
		List<Order> orders = JPA.em().createQuery("from Order where orderNumber = :orderNumber")
								.setParameter("orderNumber", model.orderNumber).getResultList();
		
		if (orders.size() < 1)
			throw new SushimiValidationException(ErrorCode.DATA_NOT_FOUND, "COURIERAPP: returnOrder: order not found with number: " + model.orderNumber);
		
		Order order = orders.get(0);
		if (order == null)
			throw new SushimiValidationException(ErrorCode.DATA_NOT_FOUND, "COURIERAPP: returnOrder: order not found with number: " + model.orderNumber);
		
		if (order.getProcessed() != OrderProcess.DELIVERED) {
			order.setProcessed(OrderProcess.RETURNED);
			order.setReason(model.reason);
			order.setCourierCode(user.getCode());
			JPA.em().persist(order);
			
			OrderHistory history = new OrderHistory();
			history.setDate(Calendar.getInstance());
			history.setGeoLatitude(model.latitude);
			history.setGeoLongitude(model.longitude);
			history.setIsSynchronized(false);
			history.setOrder(order);
			history.setOrderState(OrderProcess.RETURNED);
			history.setUser(user.getCode());
			JPA.em().persist(history);
		}
			
		// 1. Изменить статус заказа если еще не закончен
		// 2. Добавить запись в историю елси еще нету записи
		// 3. Сохранить пользователя вернувшего заказ
		// 4. Сохранить геопозицию курьера

	}	
	
	
	public static List<UserOrderModel> readOrders(User user, UserReadOrdersRequestModel model) {
		List<Order> orders = null;
		if (model.orderState == OrderProcess.IN_PROGRESS) {
			orders = JPA.em().createQuery("from Order where processed = :orderState")
					//.setParameter("code", user.getCode())
					.setParameter("orderState", model.orderState)
					.getResultList();
		}

		if (model.orderState == OrderProcess.ON_DELIVERY || model.orderState == OrderProcess.DELIVERED) {
			orders = JPA.em().createQuery("from Order where courierCode = :code and processed = :orderState")
					.setParameter("code", user.getCode())
					.setParameter("orderState", model.orderState)
					.getResultList();
		}
		
		if (orders == null)
			return null;
		
		if (orders.size() < 1)
			return null;
		List<UserOrderModel> models = new ArrayList<UserOrderModel>();
		for (Order order : orders) {
			UserOrderModel om = new UserOrderModel();
			
			om.id = order.getId();
			om.clientComment = order.getPersonRemark();
			om.clientName = order.getPersonName();
			om.clientPhone = order.getPersonPhone();
			om.clientCash = order.getPersonCash();
			om.deliveryTime = order.getDeliveryTime();
			om.deliveryType = order.getDeliveryType();
			om.orderTime = order.getOrderTime();
			om.orderNumber = order.getOrderNumber();
			om.orderState = order.getProcessed();
			om.payMethod = order.getPayMethod();
			om.source = order.getSource();
			om.orderSum = order.getOrderSum();
			om.address = order.getAddress();
			
			models.add(om);
		}
		
		return models;
	}
	
	
}
