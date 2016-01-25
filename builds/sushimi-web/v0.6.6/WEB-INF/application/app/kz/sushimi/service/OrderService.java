package kz.sushimi.service;

import java.math.BigInteger;
import java.util.Calendar;
import java.util.List;
import java.util.UUID;

import javax.persistence.Query;

import kz.sushimi.models.RegisterOrderModel;
import kz.sushimi.models.integration.order.SushimiWebOrderItemModel;
import kz.sushimi.models.integration.order.SushimiWebOrderModel;
import kz.sushimi.persistence.Cart;
import kz.sushimi.persistence.CartItem;
import kz.sushimi.persistence.dictionaries.City;
import kz.sushimi.persistence.dictionaries.Department;
import kz.sushimi.persistence.dictionaries.Product;
import kz.sushimi.persistence.orders.DeliveryType;
import kz.sushimi.persistence.orders.Order;
import kz.sushimi.persistence.orders.OrderHistory;
import kz.sushimi.persistence.orders.OrderItem;
import kz.sushimi.persistence.orders.OrderProcess;
import kz.sushimi.persistence.orders.OrderSource;
import kz.sushimi.persistence.orders.PayMethod;
import kz.sushimi.service.broadcast.EmailService;
import kz.sushimi.service.broadcast.PhoneService;

import org.apache.commons.lang.StringUtils;

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
		throw new NullPointerException("Order not found");
	}
	
	public static Order getOrderByNumber(String orderNumber) {
		List<Order> orders = JPA.em().createQuery("from Order where orderNumber = :orderNumber")
				.setParameter("orderNumber", orderNumber)
				.getResultList();
		if (orders.size() > 0)
			return orders.get(0);
		return null;
	}
		
	
	/**
	 * Сохраняет новый заказ
	 * 
	 * @param model
	 */
	public static Order registerOrder(RegisterOrderModel model) {
		Order order = new Order();
		System.out.println("Cash: " + model.Cash);
		if (!StringUtils.isEmpty(model.Cash))
			order.setPersonCash(Integer.valueOf(model.Cash));

		order.setKey(UUID.randomUUID().toString());
		
		order.setPayMethod(parsePayMethod(model.PayMethod));
		order.setDeliveryType(parseDeliveryType(model.Delivery));
		
		if (!StringUtils.isEmpty(model.PersonCount))
			order.setPersonCount(Integer.valueOf(model.PersonCount));
		
		order.setPersonName(model.FIO);
		order.setPersonPhone(model.Phone);
		order.setPersonRemark(model.Remark);
		order.setPersonEmail(model.Email);
		
		order.setSource(OrderSource.WEB);
		order.setSourceDiscount(0);
		
		Cart cart = CartService.getCurrentCart(false);
		if (cart == null)
			throw new NullPointerException("Cart not found");
		
		order.setCity(cart.getCity());
		order.setOrderSum(cart.getTotalCartSum());
		order.setDepartment(parseDepartment(model.Department));
		
		// Delivery Time
		if (!StringUtils.isEmpty(model.TimeString)) {
			Calendar deliveryTime = Calendar.getInstance();
			deliveryTime.setTimeInMillis(Long.valueOf(model.TimeString));
			order.setDeliveryTime(deliveryTime);
		}
		
		// Address Info
		convertAddressField(model, order);
		order.setProcessed(OrderProcess.NOT_PROCESSED);
		order.setOrderTime(Calendar.getInstance());
		order.setOrderNumber(generateOrderNumber());		
		JPA.em().persist(order);

		// Product List
		for (CartItem cartItem : cart.getItems()) {
			OrderItem orderProduct = new OrderItem();
			orderProduct.setOrder(order);
			orderProduct.setProduct(cartItem.getProduct());
			orderProduct.setCount(cartItem.getCount());
			Logger.info("CartItem.Name: "  + cartItem.getProduct().getCode() + ", Count: " + cartItem.getCount());
			orderProduct.setPrice(cartItem.getProduct().getCost());
			orderProduct.setSum(cartItem.getCount()*orderProduct.getPrice());
			
			JPA.em().persist(orderProduct);
		}
		
		
		EmailService.addOrUpdateEmail(order.getPersonEmail(), order.getPersonName());
		PhoneService.addOrUpdatePhone(order.getPersonPhone(), order.getPersonName());
		
		return order;
	}
	
	/**
	 * Регистрирует новый заказ, который оформили в кол центре (операторы)
	 */
	public static void registerOrderFromCallCenter(SushimiWebOrderModel model) {
		Order o = new Order();
		
		if (model.client == null)
			throw new NullPointerException("Не указан клиент в заказе");
		o.setPersonName(model.client.name);
		o.setPersonEmail(model.client.email);
		o.setPersonPhone(model.client.phone);
		
		o.setPersonCash(model.clientCash);
		o.setPersonCount(model.clientCount);
		o.setPersonRemark(model.clientComment);
		o.setClientDiscount(model.clientDiscount);
		
		if ((model.type == DeliveryType.DELIVERY || model.type == DeliveryType.DELIVERY_IN_TIME) && model.clientAddress == null)
			throw new NullPointerException("Не указан адрес клинета для заказа на доставку");
		
		if (model.clientAddress != null) {
			o.setAddressBuilding(model.clientAddress.building);
			o.setAddressCityName(model.clientAddress.cityName);
			o.setAddressCorpus(model.clientAddress.corpus);
			o.setAddressDoorCode(model.clientAddress.doorCode);
			o.setAddressFlat(model.clientAddress.flat);
			o.setAddressFloor(model.clientAddress.floor);
			o.setAddressHouse(model.clientAddress.house);
			o.setAddressOffice(model.clientAddress.office);
			o.setAddressPorch(model.clientAddress.porch);
			o.setAddressRoom(model.clientAddress.room);
			o.setAddressStreetName(model.clientAddress.streetName);
			o.setGeoLatitude(model.clientAddress.geoLatitude);
			o.setGeoLongitude(model.clientAddress.geoLongitude);
		}
		
		City city = DictionaryService.getCityById(Integer.valueOf(model.cityCode));
		if (city == null)
			city = DictionaryService.getDefaultCity();
		 o.setCity(city);
		 
		 Department department = DictionaryService.getDepartmentById(Integer.valueOf(model.branchCode));
		 o.setDepartment(department);
		 if (department != null) {
			 o.setGeoLatitude(o.getGeoLatitude());
			 o.setGeoLongitude(o.getGeoLongitude());
		 }
		
		o.setDeliveryTime(model.deliveryDate);
		o.setDeliveryType(model.type);
		o.setKey(UUID.randomUUID().toString());
		o.setOrderNumber(model.orderNumber);
		o.setOrderSum(model.orderSum);
		o.setOrderTime(model.orderDate);
		o.setProcessed(model.orderState);
		o.setSource(model.source);
		o.setSourceDiscount(model.sourceDiscount);
		
		o.setDeliveryExtraPrice(model.deliveryExtraPrice);
		o.setPromotionDiscount(model.promotionDiscount);
		o.setPromotionName(model.promotionName);
		o.setPromotionProductCode(model.promotionProductCode);
		o.setPromotionValueType(model.promotionValueType);
		o.setPayMethod(model.payMethod);
		o.setReason(model.reason);
		
		o.setOperatorCode(model.operatorCode);
		o.setCookCode(model.cookCode);
		o.setCourierCode(model.courierCode);
		
		JPA.em().persist(o);
		
		for (SushimiWebOrderItemModel item : model.items) {
			OrderItem orderItem = new OrderItem();
			Product product = ProductService.getProductByCode(item.productCode);
			if (product == null)
				throw new NullPointerException("Product with code:" + item.productCode + " not found." );
			
			orderItem.setProduct(product);
			orderItem.setOrder(o);
			orderItem.setPrice(product.getCost());
			orderItem.setSum(item.sum);
			orderItem.setCount(item.count);
			
			JPA.em().persist(orderItem);
		}
		
	}
	
	/**
	 * Регистрирует новый заказ, который оформили в кол центре (операторы)
	 */
	public static void updateExistingOrderByCallCenter(SushimiWebOrderModel model, Order o) {
		if (model.client == null)
			throw new NullPointerException("Не указан клиент в заказе");
		o.setPersonName(model.client.name);
		o.setPersonEmail(model.client.email);
		o.setPersonPhone(model.client.phone);
		
		o.setPersonCash(model.clientCash);
		o.setPersonCount(model.clientCount);
		o.setPersonRemark(model.clientComment);
		o.setClientDiscount(model.clientDiscount);
		
		Logger.info("DeliveryType: %s", model.type);
		
		if ((model.type == DeliveryType.DELIVERY || model.type == DeliveryType.DELIVERY_IN_TIME) && model.clientAddress == null)
			throw new NullPointerException("Не указан адрес клинета для заказа на доставку");
		
		if (model.clientAddress != null) {
			o.setAddressBuilding(model.clientAddress.building);
			o.setAddressCityName(model.clientAddress.cityName);
			o.setAddressCorpus(model.clientAddress.corpus);
			o.setAddressDoorCode(model.clientAddress.doorCode);
			o.setAddressFlat(model.clientAddress.flat);
			o.setAddressFloor(model.clientAddress.floor);
			o.setAddressHouse(model.clientAddress.house);
			o.setAddressOffice(model.clientAddress.office);
			o.setAddressPorch(model.clientAddress.porch);
			o.setAddressRoom(model.clientAddress.room);
			o.setAddressStreetName(model.clientAddress.streetName);
			o.setGeoLatitude(model.clientAddress.geoLatitude);
			o.setGeoLongitude(model.clientAddress.geoLongitude);
		}
		
		City city = DictionaryService.getCityById(Integer.valueOf(model.cityCode));
		if (city == null)
			city = DictionaryService.getDefaultCity();
		 o.setCity(city);
		 
		Department department = DictionaryService.getDepartmentById(Integer.valueOf(model.branchCode));
		o.setDepartment(department);
		
		o.setDeliveryTime(model.deliveryDate);
		o.setDeliveryType(model.type);
		
		if (o.getKey() == null || "".equals(o.getKey()))
			o.setKey(UUID.randomUUID().toString());
		
		o.setOrderNumber(model.orderNumber);
		o.setOrderSum(model.orderSum);
		o.setOrderTime(model.orderDate);
		o.setProcessed(model.orderState);
		o.setSource(model.source);
		o.setSourceDiscount(model.sourceDiscount);
		
		o.setPromotionDiscount(model.promotionDiscount);
		o.setPromotionName(model.promotionName);
		o.setPromotionProductCode(model.promotionProductCode);
		o.setPromotionValueType(model.promotionValueType);
		
		o.setDeliveryExtraPrice(model.deliveryExtraPrice);
		o.setPayMethod(model.payMethod);
		o.setReason(model.reason);
		
		o.setOperatorCode(model.operatorCode);
		o.setCookCode(model.cookCode);
		o.setCourierCode(model.courierCode);		
		
		JPA.em().persist(o);
		
		// delete existing order items
		JPA.em().createQuery("delete from OrderItem where order.id = :orderId")
			.setParameter("orderId", o.getId()).executeUpdate();
		if (o.getOrderItems() != null)
			o.getOrderItems().clear();
		
		for (SushimiWebOrderItemModel item : model.items) {
			OrderItem orderItem = new OrderItem();
			Product product = ProductService.getProductByCode(item.productCode);
			if (product == null)
				throw new NullPointerException("Product with code:" + item.productCode + " not found." );
			
			orderItem.setProduct(product);
			orderItem.setOrder(o);
			orderItem.setPrice(product.getCost());
			orderItem.setSum(item.sum);
			orderItem.setCount(item.count);
			orderItem.setFreeCount(item.freeCount);
			
			JPA.em().persist(orderItem);
		}
		
	}	
	

	public static List<OrderHistory> getOrdersHistoryUpdates() {
		List<OrderHistory> ordersHistory = JPA.em().createQuery("from OrderHistory where isSynchronized = false order by id")
				.getResultList();
		return ordersHistory;
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
	
	private static Department parseDepartment(String department) {
		if (!StringUtils.isEmpty(department))
			return JPA.em().find(Department.class, Integer.valueOf(department));
		return null;
	}
	
	private static void convertAddressField(RegisterOrderModel model, Order order) {
		if (model.Address == null)
			throw new NullPointerException("Address info not found");
		
		order.setAddressBuilding(model.Address.Building);
		order.setAddressCityName(model.Address.CityName);
		order.setAddressCorpus(model.Address.Corpus);
		order.setAddressDoorCode(model.Address.DoorCode);
		order.setAddressFlat(model.Address.Flat);
		order.setAddressFloor(model.Address.Floor);
		order.setAddressHouse(model.Address.House);
		order.setAddressOffice(model.Address.Office);
		order.setAddressPorch(model.Address.Porch);
		order.setAddressRoom(model.Address.Room);
		order.setAddressStreetName(model.Address.StreetName);
		// Geo Position
		order.setGeoLatitude(model.Address.Latitude);
		order.setGeoLongitude(model.Address.Longitude);
	}

	public static PayMethod parsePayMethod(String payMethod) {
		switch (payMethod) {
			case "2":
				return PayMethod.CASH;
			case "3":
				return PayMethod.CREDIT_CARD_ON_DELIVERY;
			default:
				throw new NullPointerException("PaymentType not selected");
		}
	}
	
	public static DeliveryType parseDeliveryType(String deliveryType) {
		switch (deliveryType) {
			case "Delivery":
				return DeliveryType.DELIVERY;
			case "DeliveryInTime":
				return DeliveryType.DELIVERY_IN_TIME;
			case "SelfService":
				return DeliveryType.SELF_SERVICE;
			default:
				throw new NullPointerException("DeliveryType not selected");
		}
	}

}
