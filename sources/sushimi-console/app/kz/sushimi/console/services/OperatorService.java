package kz.sushimi.console.services;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import kz.sushimi.console.exceptions.ValidationException;
import kz.sushimi.console.models.orders.OperatorOrdersModel;
import kz.sushimi.console.models.orders.PreviewOrderItemModel;
import kz.sushimi.console.models.orders.PreviewOrderModel;
import kz.sushimi.console.models.orders.SiteOrderModel;
import kz.sushimi.console.models.users.CourierModel;
import kz.sushimi.console.models.users.UserModel;
import kz.sushimi.console.persistence.orders.Order;
import kz.sushimi.console.persistence.orders.OrderHistory;
import kz.sushimi.console.persistence.orders.OrderItem;
import kz.sushimi.console.persistence.orders.OrderSource;
import kz.sushimi.console.persistence.orders.OrderState;
import kz.sushimi.console.persistence.orders.OrderType;
import kz.sushimi.console.persistence.orders.site.SiteOrder;
import kz.sushimi.console.persistence.orders.site.SiteOrderItem;
import kz.sushimi.console.persistence.orders.site.SiteOrderStatus;
import kz.sushimi.console.persistence.users.User;
import play.db.jpa.JPA;

import javax.persistence.Query;

public class OperatorService {
	
	static Long timeForDelivery = 1800000l; //30 минут
	static Long timeOrders =      7200000l; // 2 часа
	
	/**
	 * 
	 * Изменение статусов за последнее время
	 */
	public static List<Order> getLastState (Long lastUpdateTime) {
		Calendar calendarDate = Calendar.getInstance();
				calendarDate.setTimeInMillis(lastUpdateTime);
		
		Query query = 
				JPA.em().createQuery("from Order where modifiedDate > :lastUpdateTime").setParameter("lastUpdateTime", calendarDate);
		return query.getResultList();
	}
	
	/**
	 * получаем текущие заказы из базы
	 * @return
	 */
	public static List<Order> getCurrentOrders () {
		Query query = null;
		
		ArrayList<OrderState> stateList = new ArrayList<OrderState>();
		stateList.add(OrderState.DELIVERED);
		stateList.add(OrderState.RETURNED);
		stateList.add(OrderState.CANCELED);
	
		query = JPA.em().createQuery("from Order where orderState not in (:states) order by deliveryDate asc")
				.setParameter("states", stateList);
		
		return query.getResultList();
		
	}
	
	/**
	 * получаем доставленне заказы из базы
	 * @return
	 */
	public static List<Order> getDeliveredOrders () {
		Query query = null;
		ArrayList<OrderState> stateList = new ArrayList<OrderState>();
		stateList.add(OrderState.DELIVERED);
		//stateList.add(OrderState.RETURNED);
		//stateList.add(OrderState.CANCELED);
		
		
		Calendar calendarDate = Calendar.getInstance();
		/*
		calendarDate.set(calendarDate.DAY_OF_MONTH, calendarDate.get(calendarDate.DAY_OF_MONTH) - 1);
		calendarDate.set(calendarDate.HOUR_OF_DAY, 0);
		calendarDate.set(calendarDate.MINUTE, 0);
		calendarDate.set(calendarDate.SECOND, 0);
		query = JPA.em().createQuery("from Order where orderState in (:states) and orderDate > :calendarDate order by deliveryDate asc")
				.setParameter("states", stateList).setParameter("calendarDate", calendarDate);
		*/
		
		if (calendarDate.get(calendarDate.HOUR_OF_DAY) >= 0 && calendarDate.get(calendarDate.HOUR_OF_DAY) < 11) {
			calendarDate.set(calendarDate.DAY_OF_MONTH, calendarDate.get(calendarDate.DAY_OF_MONTH) - 1);
			calendarDate.set(calendarDate.HOUR_OF_DAY, 0);
			calendarDate.set(calendarDate.MINUTE, 0);
			calendarDate.set(calendarDate.SECOND, 0);
			query = JPA.em().createQuery("from Order where orderState in (:states) and modifiedDate > :calendarDate order by deliveryDate asc")
					.setParameter("states", stateList).setParameter("calendarDate", calendarDate);
		}
			
		else {
			calendarDate.set(calendarDate.HOUR_OF_DAY, 0);
			calendarDate.set(calendarDate.MINUTE, 0);
			calendarDate.set(calendarDate.SECOND, 0);
			query = JPA.em().createQuery("from Order where orderState in (:states) and modifiedDate > :calendarDate order by deliveryDate asc")
				.setParameter("states", stateList).setParameter("calendarDate", calendarDate);
		}
		
		return query.getResultList();
	}
	
	/**
	 * получаем новые заказы сайта из базы данных
	 * @return
	 */
	public static List<SiteOrder> getNewSiteOrders () {
		Query query = null;
		
		ArrayList<SiteOrderStatus> stateList = new ArrayList<SiteOrderStatus>();
		stateList.add(SiteOrderStatus.RECEIVED);
	
		query = JPA.em().createQuery("from SiteOrder where status = 'RECEIVED' order by deliveryTime asc");
		
		return query.getResultList();
		
	}
	
	/**
	 * получаем историю заказа из базы данных
	 * @param orderId
	 * @return
	 */
	public static List<OrderHistory> getOrderHistory (Long orderId) {
		Query query = null;
		query = JPA.em().createQuery("from OrderHistory where order.id = :orderId").setParameter("orderId", orderId);
		return query.getResultList();
	}
	
	public static String getCourierOrder(Long orderId)	{
		String courier = null;
		SimpleDateFormat date = new SimpleDateFormat("dd.MM.yyyy'  'HH:mm:ss");
		List<OrderHistory> list = JPA.em().createQuery("from OrderHistory where order.id = :orderId").setParameter("orderId", orderId).getResultList();
		for (kz.sushimi.console.persistence.orders.OrderHistory order : list) {
			if (order.getOrderState() == OrderState.ON_DELIVERY)
				courier = "Курьер: " + order.getUser().getName() + " (" + order.getUser().getId() + "). " + "Взял заказ: " + date.format(order.getModifiedDate().getTime()) ;
		}

		return courier;
	}
	
	public static List<User> getCourierList () {
		Query query = null;
		query = JPA.em().createQuery("from User where role = 'COURIER'");
		return query.getResultList();
	}
	
	
	
	public static ArrayList<PreviewOrderModel> createDeliveredOrdersList (List<kz.sushimi.console.persistence.orders.Order> list) {
		ArrayList<PreviewOrderModel> models = new ArrayList<PreviewOrderModel>(); 
		for (kz.sushimi.console.persistence.orders.Order order : list) {
			PreviewOrderModel model = new PreviewOrderModel();
			
			model.setId(order.getId());
			model.setClientName(order.getClient().getName());
			model.setClientPhone(order.getClient().getPhoneNumber());
			model.setOrderNumber(order.getOrderNumber());
			model.setState(order.getOrderState());
			model.setSum(order.getOrderSum());
			
			
			if (order.getDeliveryDate() != null) {
				//SimpleDateFormat sdf = new SimpleDateFormat("dd.MM.yyyy'  'HH:mm:ss");
				//model.setDeliveryDateKitchen(sdf.format(order.getDeliveryDate().getTime()));
				model.setDeliveryDate(order.getDeliveryDate().getTime());
				
				SimpleDateFormat timer = new SimpleDateFormat("HH:mm:ss");
				
				if (order.getDeliveryDate().getTimeInMillis() - System.currentTimeMillis() > 0)
					model.setTimer ("-" + timer.format(order.getDeliveryDate().getTimeInMillis() - System.currentTimeMillis() - 21600000));
				else
					model.setTimer ("+" + timer.format(System.currentTimeMillis() - order.getDeliveryDate().getTimeInMillis() - 21600000));
				
			}
			
			if (order.getType() == OrderType.DELIVERY || order.getType() == OrderType.DELIVERY_IN_TIME) {
				if (order.getClientAddress() != null) 
					model.setClientAddress(order.getClientAddress().getFullAddress());
							
				else 
					model.setClientAddress("Ошибка, адрес не указан! Тип заказа: Доставка!");
			}
			
			if (order.getType() == OrderType.SELF_SERVICE) 
				model.setClientAddress("Адрес не указан (Самовывоз)");
			
			ArrayList<PreviewOrderItemModel> items = new ArrayList<PreviewOrderItemModel>();
			for (OrderItem orderItem : order.getOrderItems()) {
				PreviewOrderItemModel item = new PreviewOrderItemModel();
				
				if (orderItem.getProduct().getId() != 34301 && orderItem.getProduct().getId() != 34302 && orderItem.getProduct().getId() != 34300 && orderItem.getProduct().getId() != 34303 && orderItem.getProduct().getId() != 34304 && orderItem.getCount() != 0) {
					item.setId(orderItem.getProduct().getId());
					item.setName(orderItem.getProduct().getName());
					item.setCount(orderItem.getCount());
					items.add(item);
				}
			}
			model.setItems(items);
			
			if (order.getClientAddress() != null)
				model.setClientAddress(order.getClientAddress().getFullAddress());
			
			model.setSource(order.getSource());
			model.setType(order.getType());
			models.add(model);
		}
		
		return models;
		
	}


	public static String orderHistory (List<OrderHistory> list) {
		String orderHistory = "";
		
		SimpleDateFormat date = new SimpleDateFormat("dd.MM.yyyy'  'HH:mm:ss");
		
		for (kz.sushimi.console.persistence.orders.OrderHistory order : list) {
			if (order.getOrderState() == OrderState.REGISTERED)
				orderHistory = orderHistory + "Заказ зарегистрирован: " + date.format(order.getModifiedDate().getTime()) + "<br>";
			if (order.getOrderState() == OrderState.IN_PROGRESS)
				orderHistory = orderHistory + "Заказ взял повор:      " + date.format(order.getModifiedDate().getTime()) + "<br>";
			if (order.getOrderState() == OrderState.WAITING_FOR_DELIVERY)
				orderHistory = orderHistory + "Заказ приготовлен:     " + date.format(order.getModifiedDate().getTime()) + "<br>";
			if (order.getOrderState() == OrderState.DELIVERED) {
				orderHistory = orderHistory + "Заказ доставлен:       " + date.format(order.getModifiedDate().getTime()) + "<br>";
				orderHistory = orderHistory + "Доставил заказ: " + order.getUser().getName() + "<br>";
			}
		}
		
		
		return orderHistory;
	}

	public static ArrayList<CourierModel> createCourierList(List<User> list) {
		
		List<OrderHistory> list2 = JPA.em().createQuery("from OrderHistory where orderState = 'ON_DELIVERY'").getResultList();
		
		
		ArrayList<CourierModel> models = new ArrayList<CourierModel>(); 
		for (kz.sushimi.console.persistence.users.User courierList : list) {
			CourierModel model = new CourierModel();
		//	String orders = "";
		//	String  addresses = "";
			System.out.println ("I am");
			model.setName(courierList.getName());
			model.setId(courierList.getId());
			//model.setModifiedDate(order.getModifiedDate().getTime());
			/*
			for (kz.sushimi.console.persistence.orders.OrderHistory order2 : list2) {
				//System.out.println (order.getUser().getName() + "----" + order2.getUser().getName());
				if (courierList.getId() == order2.getUser().getId()) {
					orders = orders + order2.getOrder().getOrderNumber() + ", ";
				
					if (order2.getOrder().getClientAddress() != null)
						addresses = addresses + order2.getOrder().getClientAddress().getFullAddress() + "<br>";
					
					if (order2.getGeoLatitude() != null)
						model.setGeoLatitude(order2.getGeoLatitude());
					else
						model.setGeoLatitude(null);
					
					if (order2.getGeoLongitude() != null)
						model.setGeoLongitude(order2.getGeoLongitude());
					else
						model.setGeoLongitude(order2.getGeoLongitude());
						
				}
			}
			*/
			/*
			model.setOrdersOnDelivery(orders.substring(0, orders.length() - 2));
			model.setAddressesOnDelivery(addresses);
			*/
			models.add(model);
		}
		
		return models;
	}

	public static ArrayList<OperatorOrdersModel> createOrdersList2(List<Order> currentOrders,
			List<SiteOrder> newOrders, Long orderMode) {
		ArrayList<OperatorOrdersModel> models = new ArrayList<OperatorOrdersModel>(); 
		
		for (kz.sushimi.console.persistence.orders.Order order : currentOrders) {
			if ( (orderMode != null && orderMode == 2)) {
				OperatorOrdersModel model = new OperatorOrdersModel();
				model.setId(order.getId());
				model.setOrderNumber(order.getOrderNumber());
				model.setClientName(order.getClient().getName());
				model.setClientPhone(order.getClient().getPhoneNumber());
				model.setDeliveryDate(order.getDeliveryDate().getTime());
				model.setState(order.getOrderState());
				/*
				
				if (order.getOrderState() == OrderState.ON_DELIVERY) {
					List<OrderHistory> list3 = OperatorService.getOrderHistory(order.getId());
					for (kz.sushimi.console.persistence.orders.OrderHistory order3 : list3) {
						model.setCourierId(order3.getUser().getId());
						model.setCourierName(order3.getUser().getName());
					}
				}
				
				*/
			
				
				if (order.getDeliveryDate() != null) {
					//SimpleDateFormat date = new SimpleDateFormat("dd.MM.yyyy'  'HH:mm:ss");
					//model.setDeliveryDateKitchen(sdf.format(order.getDeliveryDate().getTime()));
					model.setDeliveryDate(order.getDeliveryDate().getTime());
					model.setOrderDate(order.getOrderDate().getTime());
					
					SimpleDateFormat timer = new SimpleDateFormat("HH:mm");
					
					if (order.getDeliveryDate().getTimeInMillis() - System.currentTimeMillis() > 0) {
						model.setTimer ("-" + timer.format(order.getDeliveryDate().getTimeInMillis() - System.currentTimeMillis() - 21600000));
						model.setStatus(0);
					}
					else {
						model.setTimer ("+" + timer.format(System.currentTimeMillis() - order.getDeliveryDate().getTimeInMillis() - 21600000));
						model.setStatus(1);
					}
				}
				
				
				if (order.getOrderState() == OrderState.REGISTERED)
					model.setTypeGrouping("B_REGISTERED");
				else if (order.getOrderState() == OrderState.IN_PROGRESS)
					model.setTypeGrouping("C_IN_PROGRESS");
				else if (order.getOrderState() == OrderState.WAITING_FOR_DELIVERY)
					model.setTypeGrouping("D_WAITING_FOR_DELIVERY");
				else if (order.getOrderState() == OrderState.ON_DELIVERY)
					model.setTypeGrouping("E_ON_DELIVERY");
				
				if (order.getClientAddress() != null)
					model.setClientAddress(order.getClientAddress().getFullAddress());
				
				model.setSource(order.getSource());	
				model.setComment(order.getComment());
				model.setType(order.getType());
				models.add(model);
			}
			
			else if ( (orderMode == null || orderMode == 1)) {
				if (order.getDeliveryDate().getTimeInMillis() - System.currentTimeMillis() < timeOrders) {
					OperatorOrdersModel model = new OperatorOrdersModel();
					model.setId(order.getId());
					model.setOrderNumber(order.getOrderNumber());
					model.setClientName(order.getClient().getName());
					model.setClientPhone(order.getClient().getPhoneNumber());
					model.setDeliveryDate(order.getDeliveryDate().getTime());
					model.setState(order.getOrderState());
					
					model.setCourierName("История пуста");	
					
					if (order.getOrderState() == OrderState.ON_DELIVERY) {
						List<OrderHistory> list3 = OperatorService.getOrderHistory(order.getId());
						for (kz.sushimi.console.persistence.orders.OrderHistory order3 : list3) {
							if (order3 != null) {
								//System.out.println(order.getId());
							//model.setCourierId(order3.getUser().getId());
								if (order3.getUser() != null) {
									if (order3.getUser().getName() != null)
										model.setCourierName(order3.getUser().getName());
								}
								else
									model.setCourierName("Не указан");	
							}

						}
					}
					
					if (order.getDeliveryDate() != null) {
						//SimpleDateFormat date = new SimpleDateFormat("dd.MM.yyyy'  'HH:mm:ss");
						//model.setDeliveryDateKitchen(sdf.format(order.getDeliveryDate().getTime()));
						model.setDeliveryDate(order.getDeliveryDate().getTime());
						model.setOrderDate(order.getOrderDate().getTime());
						
						SimpleDateFormat timer = new SimpleDateFormat("HH:mm");
						
						if (order.getDeliveryDate().getTimeInMillis() - System.currentTimeMillis() > 0) {
							model.setTimer ("-" + timer.format(order.getDeliveryDate().getTimeInMillis() - System.currentTimeMillis() - 21600000));
							model.setStatus(0);
						}
						else {
							model.setTimer ("+" + timer.format(System.currentTimeMillis() - order.getDeliveryDate().getTimeInMillis() - 21600000));
							model.setStatus(1);
						}
					}
					
					
					if (order.getOrderState() == OrderState.REGISTERED)
						model.setTypeGrouping("B_REGISTERED");
					else if (order.getOrderState() == OrderState.IN_PROGRESS)
						model.setTypeGrouping("C_IN_PROGRESS");
					else if (order.getOrderState() == OrderState.WAITING_FOR_DELIVERY)
						model.setTypeGrouping("D_WAITING_FOR_DELIVERY");
					else if (order.getOrderState() == OrderState.ON_DELIVERY)
						model.setTypeGrouping("E_ON_DELIVERY");
					
					if (order.getClientAddress() != null)
						model.setClientAddress(order.getClientAddress().getFullAddress());
					
					model.setSource(order.getSource());	
					model.setComment(order.getComment());
					model.setType(order.getType());
					models.add(model);
				}
			}
			
		}
		
		if (newOrders != null) {
			for (kz.sushimi.console.persistence.orders.site.SiteOrder order : newOrders) {
				OperatorOrdersModel model = new OperatorOrdersModel();
				model.setId(order.getId());
				model.setOrderNumber(order.getOrderNumber());
				model.setClientName(order.getPersonName());
				model.setClientPhone(order.getPersonPhone());
				model.setDeliveryDate(order.getDeliveryTime().getTime());
				model.setTypeGrouping("A_NEW");
				model.setState(OrderState.NONE);
				model.setTimer("00:00");
				model.setComment(order.getPersonRemark());
				model.setType(order.getOrderType());
				model.setOrderDate(order.getCreatedDate().getTime());
				model.setSource(OrderSource.WEB);
				model.setStatus(1);
				
				if (order.getAddressCityName() != null)
					model.setClientAddress(order.getFullAddress());
				
				models.add(model);
			}
		}
		
		return models;
	}
	
	public static void sendToDelivery(Long orderId, Long courierId) throws ValidationException {
		if (orderId == null || orderId < 1)
			throw new ValidationException("OrderId is null");
		
		Order order = Order.findById(orderId);
		if (order == null)
			throw new ValidationException("Order not found");
		
		order.setOrderState(OrderState.ON_DELIVERY);
		
		// Add history record
		User user = UserService.getUserById(courierId);
		OrderService.addOrderHistoryRecord(order, user);
		
		// TODO Вставить время
		order.save();
	}	
	
}
