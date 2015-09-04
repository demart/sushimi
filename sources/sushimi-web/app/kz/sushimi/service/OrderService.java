package kz.sushimi.service;

import java.util.Calendar;
import java.util.List;
import java.util.UUID;

import kz.sushimi.models.RegisterOrderModel;
import kz.sushimi.persistence.Cart;
import kz.sushimi.persistence.CartItem;
import kz.sushimi.persistence.dictionaries.Department;
import kz.sushimi.persistence.orders.DeliveryType;
import kz.sushimi.persistence.orders.Order;
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
		
		JPA.em().persist(order);

		order.setOrderNumber(String.valueOf(order.getId()));
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
