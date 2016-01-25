package kz.sushimi.restapi.v1.service;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import java.util.UUID;

import kz.sushimi.persistence.Cart;
import kz.sushimi.persistence.CartItem;
import kz.sushimi.persistence.dictionaries.Department;
import kz.sushimi.persistence.orders.DeliveryType;
import kz.sushimi.persistence.orders.Order;
import kz.sushimi.persistence.orders.OrderItem;
import kz.sushimi.persistence.orders.OrderProcess;
import kz.sushimi.persistence.orders.OrderSource;
import kz.sushimi.persistence.orders.PayMethod;
import kz.sushimi.restapi.v1.exceptions.ErrorCode;
import kz.sushimi.restapi.v1.exceptions.SushimiException;
import kz.sushimi.restapi.v1.exceptions.SushimiValidationException;
import kz.sushimi.restapi.v1.models.order.RegisterOrderModel;
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
	public static Order registerOrder(RegisterOrderModel model) throws SushimiValidationException {
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
		
		Cart cart = CartService.getCurrentCart(model.cartId, false);
		if (cart == null)
			throw new SushimiValidationException(ErrorCode.VALIDATION_ERROR,"Cart not found on server");
		
		order.setCity(cart.getCity());
		order.setOrderSum(cart.getTotalCartSum());
		order.setDepartment(parseDepartment(model.departmentId));
		
		// Delivery Time
		if (model.deliveryTime != null) {
			Calendar deliveryTime = Calendar.getInstance();
			deliveryTime.setTimeInMillis(model.deliveryTime);
			order.setDeliveryTime(deliveryTime);
		}
		
		// Address Info
		convertAddressField(model, order);
		
		order.setProcessed(OrderProcess.NOT_PROCESSED_MOBI);
		order.setOrderTime(Calendar.getInstance());
		
		JPA.em().persist(order);

		order.setOrderNumber(String.valueOf(order.getId()));
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
		
		return order;
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
	
}
