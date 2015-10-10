package kz.sushimi.console.services;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

import kz.sushimi.console.models.orders.PreviewOrderItemModel;
import kz.sushimi.console.models.orders.PreviewOrderModel;
import kz.sushimi.console.persistence.orders.Order;
import kz.sushimi.console.persistence.orders.OrderItem;
import kz.sushimi.console.persistence.orders.OrderState;
import kz.sushimi.console.persistence.orders.OrderType;
import play.db.jpa.JPA;

import javax.persistence.Query;

public class OperatorService {
	
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
	
	public static ArrayList<PreviewOrderModel> createOrdersList (List<kz.sushimi.console.persistence.orders.Order> list) {
		ArrayList<PreviewOrderModel> models = new ArrayList<PreviewOrderModel>(); 
		for (kz.sushimi.console.persistence.orders.Order order : list) {
			PreviewOrderModel model = new PreviewOrderModel();
			
			model.setId(order.getId());
			model.setClientName(order.getClient().getName());
			model.setClientPhone(order.getClient().getPhoneNumber());
			model.setOrderNumber(order.getOrderNumber());
			model.setState(order.getOrderState());
			
			
			if (order.getDeliveryDate() != null) {
				SimpleDateFormat sdf = new SimpleDateFormat("dd.MM.yyyy'  'HH:mm:ss");
				model.setDeliveryDateKitchen(sdf.format(order.getDeliveryDate().getTime()));
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
			
			model.setSource(order.getSource());
			model.setType(order.getType());
			models.add(model);
		}
		
		return models;
		
	}

}
