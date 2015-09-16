package controllers;

import java.util.List;

import org.apache.commons.lang.StringUtils;

import kz.sushimi.console.exceptions.ValidationException;
import kz.sushimi.console.models.ResponseWrapper;
import kz.sushimi.console.models.StoreWrapper;
import kz.sushimi.console.models.orders.OrderModel;
import kz.sushimi.console.models.orders.PreviewOrderItemModel;
import kz.sushimi.console.models.orders.PreviewOrderModel;
import kz.sushimi.console.models.users.UserModel;
import kz.sushimi.console.persistence.orders.Order;
import kz.sushimi.console.persistence.orders.OrderItem;
import kz.sushimi.console.persistence.orders.OrderState;
import kz.sushimi.console.persistence.orders.OrderType;
import kz.sushimi.console.persistence.users.User;
import kz.sushimi.console.services.OrderService;
import kz.sushimi.console.services.UserService;
import kz.sushimi.console.services.dictionaries.ProductService;
import play.Logger;
import play.db.jpa.JPA;
import play.mvc.Controller;

import java.util.ArrayList;
import java.util.Calendar;
import java.text.SimpleDateFormat;

public class ArmApplication extends Controller {
	
	static long yellowDeliveryFirstTime = 3000000;
	static long yellowDeliverySecondTime = 2400000;
	static long redDeliveryTime = 2400000;
	static long redDeliveryInTimeTime = 3600000;
	static long yellowDeliveryInTimeFirstTime = 4200000;
	static long yellowDeliveryInTimeSecondTime = 3600000;
	static long orderMoreTwoHours = 7200000;
	
    
    public static void index() {
        renderTemplate("Application/arm_index.html");
    }
    
    public static void login(String login){
    	ResponseWrapper rw = new ResponseWrapper();
    	if (login == null || "".equals(login)) {
    		rw.success = false;
    		rw.message = "Необходимо ввести логин";
    		renderJSON(rw);
    	}
    	
    	try {
			User currentUser = UserService.getUserByLogin(login);
			if (currentUser == null) {
				rw.success = false;
	    		rw.message = "Пользователь не найден, введите другой логин";
	    		renderJSON(rw);
			}

			session.put("username", currentUser.getLogin());
			
			UserModel model = new UserModel();
			model.setId(currentUser.getId());
			model.setLogin(currentUser.getLogin());
			model.setName(currentUser.getName());
			model.setRole(currentUser.getRole());

			rw.success = true;
			rw.data = model;
			renderJSON(rw);
		} catch (ValidationException e) {
			e.printStackTrace();
    		rw.success = false;
    		rw.message = "Ошибка при чтение информации из БД:" + e.getMessage();
    		renderJSON(rw);
		}
    	
    }
    
    public static void logout() {
    	session.clear();
        response.removeCookie("rememberme");
        ResponseWrapper rw = new ResponseWrapper();
        rw.success = true;
        rw.message = "Вы успешно вышли из системы";
        renderJSON(rw);
    }
    
    public static void getUser() {
    	String login = session.get("username");
    	ResponseWrapper rw = new ResponseWrapper();
    	
    	if (login == null || "".equals(login)) {
    		rw.success = false;
    		rw.message = "Необходимо авторизоваться";
    		renderJSON(rw);
    	}
    	
     	try {
			User currentUser = UserService.getUserByLogin(login);
			if (currentUser == null) {
				rw.success = false;
	    		rw.message = "Пользователь не найден, необходима повторная авторизация";
	    		renderJSON(rw);
			}
			
			UserModel model = new UserModel();
			model.setId(currentUser.getId());
			model.setLogin(currentUser.getLogin());
			model.setName(currentUser.getName());
			model.setRole(currentUser.getRole());

			rw.success = true;
			rw.data = model;
			renderJSON(rw);
		} catch (ValidationException e) {
			e.printStackTrace();
    		rw.success = false;
    		rw.message = "Ошибка при чтение информации из БД:" + e.getMessage();
    		renderJSON(rw);
		}
    }
    
	public static void readOrders (Long lastUpdateTime, Long periodReload) throws ValidationException {
		List<kz.sushimi.console.persistence.orders.Order> list;
	
		ArrayList<PreviewOrderModel> models = new ArrayList<PreviewOrderModel>(); 
		
		if (lastUpdateTime == null)
			list = JPA.em().createQuery("from Order where (orderState = 'REGISTERED' or orderState = 'IN_PROGRESS')").getResultList();
		else	{
			Calendar lastTime = Calendar.getInstance();
			lastTime.setTimeInMillis(lastUpdateTime);
			list = JPA.em().createQuery("from Order where (orderState = 'REGISTERED' or orderState = 'IN_PROGRESS' or (orderState = 'CANCELED' and modifiedDate > :lastTime))").setParameter("lastTime", lastTime).getResultList();
		}
		
		for (kz.sushimi.console.persistence.orders.Order order : list) {
			PreviewOrderModel model = new PreviewOrderModel();
			
			model.setId(order.getId());
			model.setOrderNumber(order.getOrderNumber());
			
			if (order.getOrderDate() != null)
				model.setOrderDate(order.getOrderDate().getTime());
			
			
			if (order.getType() == OrderType.DELIVERY)
				model.setStatusType(1);
			
			else if (order.getType() == OrderType.DELIVERY_IN_TIME)
				model.setStatusType(2);
			
			else
				model.setStatusType(3);
			
			/**
			 * Вывод даты в красивом формате
			 */
			
			SimpleDateFormat sdf = new SimpleDateFormat("dd.MM.yyyy'  'HH:mm:ss");
			SimpleDateFormat test = new SimpleDateFormat("mm:ss");
			SimpleDateFormat test2 = new SimpleDateFormat("HH:mm:ss");
					
			if (order.getDeliveryDate() != null) {
				model.setDeliveryDateKitchen(sdf.format(order.getDeliveryDate().getTime()));
				model.setDeliveryDate(order.getDeliveryDate().getTime());
				
				//System.out.println(test.format(order.getDeliveryDate().getTimeInMillis() - System.currentTimeMillis() + 3600000l));
				
			}
			/**
			 * таймер
			 */
			
			if ((order.getDeliveryDate().getTimeInMillis() - System.currentTimeMillis() > 3600000) && (order.getType() == OrderType.DELIVERY || order.getType() == OrderType.DELIVERY_IN_TIME))
				model.setTimer ("-" + test.format(order.getDeliveryDate().getTimeInMillis() - System.currentTimeMillis() + 3600000l));
			
			else if ((order.getDeliveryDate().getTimeInMillis() - System.currentTimeMillis() < 3600000)  && (order.getType() == OrderType.DELIVERY || order.getType() == OrderType.DELIVERY_IN_TIME))
				model.setTimer ("+" + test.format(System.currentTimeMillis() - order.getDeliveryDate().getTimeInMillis()));
			
			else if ((order.getDeliveryDate().getTimeInMillis() - System.currentTimeMillis() > 0) && (order.getType() == OrderType.SELF_SERVICE))
				model.setTimer ("-" + test2.format(order.getDeliveryDate().getTimeInMillis() - System.currentTimeMillis() - 21600000));
			
			else if ((order.getDeliveryDate().getTimeInMillis() - System.currentTimeMillis() < 0) && (order.getType() == OrderType.SELF_SERVICE))
				model.setTimer ("+" + test2.format(System.currentTimeMillis() - order.getDeliveryDate().getTimeInMillis() - 21600000));
	
			/**
			 * конец таймера
			 */
			
			if (order.getPersonCount() != null)
				model.setClientCount(order.getPersonCount());
			
			if (StringUtils.isEmpty(order.getComment()))
				model.setComment("Без комментариев");
			
			else
				model.setComment(order.getComment());
				
			
			if (order.getType() == OrderType.DELIVERY) {
				if (order.getClientAddress() != null) 
					model.setClientAddress(order.getClientAddress().getFullAddress());
							
				else 
					model.setClientAddress("Ошибка, адрес не указан! Тип заказа: Доставка!");
			}
			
			if (order.getType() == OrderType.SELF_SERVICE) 
				model.setClientAddress("Адрес не указан (Самовывоз)");
				
			
			
			/**
			 * 0 - невзятый в работу заказ
			 * 1 - закрытый заказ
			 * 2 - зеленный цвет кнопки (если заказ взят в работу и время над работой заказа от 0 до 10 минут)
			 * 3 - желтый цвет кнопки (если заказ взят в работу и время над работой заказа от 10 до 20 минут)
			 * 4 - красный цвет кнопки (если заказ взят в работу и время над работой заказа от 20 до 30 минут)
			 * 5 - писк о новом заказе (новый заказ зеленный)
			 * 7 - если до заказа более двух часов
			 * 8 - новый заказ (зеленный цвет), который уже висит от 0 до 10 минут
			 * 9 - новый заказ (желтый цвет), который уже висит от 10 до 20 минут
			 * 10 - новый заказ (красный цвет), который уже висит от 20 до 30 минут 
			 * 11 -  новый заказ (зеленный цвет), который уже висит от 0 до 10 минут - САМОВЫВОЗ
			 * 12 - новый заказ (желтый цвет), который уже висит от 10 до 20 минут - САМОВЫВОЗ
			 * 13 - новый заказ (красный цвет), который уже висит от 20 до 30 минут - САМОВЫВОЗ
			 */
			
			/*
				if (order.getOrderState() == OrderState.CANCELED)
					model.setStatus(1);
			
				if (lastUpdateTime != null) {
					if ((order.getOrderState() == OrderState.REGISTERED) && (System.currentTimeMillis() - order.getCreatedDate().getTimeInMillis() < periodReload))
						model.setStatus(5);

				}
				
				if (model.getStatus() == null) {
				
				if ((order.getOrderState() == OrderState.IN_PROGRESS) && (System.currentTimeMillis() - order.getModifiedDate().getTimeInMillis() < 600000))
					model.setStatus(2);
				
				else if ((order.getOrderState() == OrderState.IN_PROGRESS) && lastUpdateTime != null && (System.currentTimeMillis() - order.getModifiedDate().getTimeInMillis() < 1200000)  && (lastUpdateTime - order.getModifiedDate().getTimeInMillis() > 600000))
					model.setStatus(3);
				
				else if ((order.getOrderState() == OrderState.IN_PROGRESS) && (System.currentTimeMillis() - order.getModifiedDate().getTimeInMillis() > 1200000))
					model.setStatus(4);
				
			
				else if ((order.getOrderState() == OrderState.REGISTERED) && lastUpdateTime != null && (order.getDeliveryDate().getTimeInMillis() - System.currentTimeMillis() > 7200000)) 
					model.setStatus(7);
			
	
				else if ((order.getOrderState() == OrderState.REGISTERED) && (System.currentTimeMillis() - order.getModifiedDate().getTimeInMillis() < 600000))
					model.setStatus(8);
				
				else if ((order.getOrderState() == OrderState.REGISTERED) && (System.currentTimeMillis() - order.getModifiedDate().getTimeInMillis() < 1200000)  && (System.currentTimeMillis() - order.getModifiedDate().getTimeInMillis() > 600000))
					model.setStatus(9);
				
				else if ((order.getOrderState() == OrderState.REGISTERED) && lastUpdateTime != null && (order.getDeliveryDate().getTimeInMillis() - System.currentTimeMillis() < 7200000) && (order.getDeliveryDate().getTimeInMillis() - System.currentTimeMillis() > (7200000 - periodReload))) 
					model.setStatus(5);

				else if ((order.getOrderState() == OrderState.REGISTERED) && (System.currentTimeMillis() - order.getModifiedDate().getTimeInMillis() > 1200000))
					model.setStatus(10);

				
				else if ((order.getOrderState() == OrderState.REGISTERED) && model.getStatus() == null && lastUpdateTime !=null && (order.getDeliveryDate().getTimeInMillis() - System.currentTimeMillis() < 7200000))
					model.setStatus(0);
				
				else if ((order.getOrderState() == OrderState.REGISTERED) && lastUpdateTime == null && (order.getDeliveryDate().getTimeInMillis() - System.currentTimeMillis() < 7200000))
					model.setStatus(5);
				}
				*/
					
			if (order.getOrderState() == OrderState.REGISTERED && lastUpdateTime != null && (System.currentTimeMillis() - order.getModifiedDate().getTimeInMillis() < periodReload)  && (order.getDeliveryDate().getTimeInMillis() - System.currentTimeMillis() < orderMoreTwoHours))
				model.setStatus(0);
			
			else if (order.getOrderState() == OrderState.REGISTERED && (order.getDeliveryDate().getTimeInMillis() - System.currentTimeMillis() > orderMoreTwoHours))
				model.setStatus(8);
			
			else if (order.getOrderState() == OrderState.REGISTERED && (order.getDeliveryDate().getTimeInMillis() - System.currentTimeMillis() < orderMoreTwoHours) && (order.getDeliveryDate().getTimeInMillis() - System.currentTimeMillis() > orderMoreTwoHours - periodReload) )
				model.setStatus(0);
			
			else if (order.getOrderState() == OrderState.CANCELED && (System.currentTimeMillis() - order.getModifiedDate().getTimeInMillis() < periodReload))
				model.setStatus (1);
			
			else if (order.getOrderState() == OrderState.REGISTERED && order.getType() == OrderType.SELF_SERVICE && (order.getDeliveryDate().getTimeInMillis() - System.currentTimeMillis() < yellowDeliveryFirstTime) && (order.getDeliveryDate().getTimeInMillis() - System.currentTimeMillis() > yellowDeliverySecondTime))
				model.setStatus(2);
			
			else if (order.getOrderState() == OrderState.REGISTERED && order.getType() == OrderType.SELF_SERVICE && (order.getDeliveryDate().getTimeInMillis() - System.currentTimeMillis() < redDeliveryTime))
				model.setStatus(3);
			
			else if (order.getOrderState() == OrderState.REGISTERED && (order.getType() == OrderType.DELIVERY_IN_TIME || order.getType() == OrderType.DELIVERY) && (order.getDeliveryDate().getTimeInMillis() - System.currentTimeMillis() < redDeliveryInTimeTime))
				model.setStatus(4);
			
			else if (order.getOrderState() == OrderState.REGISTERED && (order.getType() == OrderType.DELIVERY_IN_TIME || order.getType() == OrderType.DELIVERY) && (order.getDeliveryDate().getTimeInMillis() - System.currentTimeMillis() < yellowDeliveryInTimeFirstTime) && (order.getDeliveryDate().getTimeInMillis() - System.currentTimeMillis() > yellowDeliveryInTimeSecondTime))
				model.setStatus(5);
			
			
			else if (order.getOrderState() == OrderState.REGISTERED)
				model.setStatus(6);
			
			else if (order.getOrderState() == OrderState.IN_PROGRESS)
				model.setStatus(7);

				
				/**
				 * 	static long yellowDeliveryFirstTime = 3000000;
	static long yellowDeliverySecondTime = 2400000;
	static long redDeliveryTime = 2400000;
	static long redDeliveryInTimeTime = 3600000;
	static long yellowDeliveryInTimeFirstTime = 4200000;
	static long yellowDeliveryInTimeSecondTime = 3600000;
		
				 */
				
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
			
			lastUpdateTime = System.currentTimeMillis();
			model.setlastUpdateTime(lastUpdateTime);
		
			
			models.add(model);
		}
		
		
		StoreWrapper wrapper = new StoreWrapper();
		wrapper.success = true;
		wrapper.totalCount = ProductService.getProductsCount();
		wrapper.data = models.toArray();
		renderJSON(wrapper);

	}
	
	public static void takeOrder (Long orderId) throws ValidationException {
		String requestBody = params.current().get("body");
		Logger.info("take order: " + requestBody);

		Order order = Order.findById(orderId);
		order.setOrderState (OrderState.IN_PROGRESS);
		order.save();
			
	}
	
	public static void completeOrder (Long orderId) throws ValidationException {
		String requestBody = params.current().get("body");
		Logger.info("complete order: " + requestBody);
		
		Order order = Order.findById(orderId);
		order.setOrderState (OrderState.COMPLITED);
		order.save();
			
	}
	
}