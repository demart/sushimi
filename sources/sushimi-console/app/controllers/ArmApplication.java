package controllers;

import java.util.List;

import javax.xml.transform.TransformerException;

import org.apache.commons.lang.StringUtils;
import org.w3c.dom.Element;

import com.google.gson.Gson;

import kz.sushimi.console.exceptions.ValidationException;
import kz.sushimi.console.models.ResponseWrapper;
import kz.sushimi.console.models.StoreWrapper;
import kz.sushimi.console.models.clients.ClientAddressModel;
import kz.sushimi.console.models.clients.ClientModel;
import kz.sushimi.console.models.orders.OrderModel;
import kz.sushimi.console.models.orders.PreviewOrderItemModel;
import kz.sushimi.console.models.orders.PreviewOrderModel;
import kz.sushimi.console.models.orders.ArmCourierOrdersModel;
import kz.sushimi.console.models.orders.ArmCourierManyOrdersModel;
import kz.sushimi.console.models.users.UserModel;
import kz.sushimi.console.persistence.orders.Order;
import kz.sushimi.console.persistence.orders.OrderItem;
import kz.sushimi.console.persistence.orders.OrderState;
import kz.sushimi.console.persistence.orders.OrderType;
import kz.sushimi.console.persistence.users.User;
import kz.sushimi.console.services.OrderService;
import kz.sushimi.console.services.UserService;
import kz.sushimi.console.services.dictionaries.ProductService;
import kz.sushimi.console.services.PrintService;
import play.Logger;
import play.db.jpa.JPA;
import play.mvc.Controller;

import java.util.ArrayList;
import java.util.Calendar;
import java.text.SimpleDateFormat;

import java.io.*;
import java.net.*;



public class ArmApplication extends Controller {
	

	//Время по кухне
	static long yellowDeliveryFirstTime = 3000000;
	static long yellowDeliverySecondTime = 2400000;
	static long redDeliveryTime = 2400000;
	static long redDeliveryInTimeTime = 3600000;
	static long yellowDeliveryInTimeFirstTime = 4200000;
	static long yellowDeliveryInTimeSecondTime = 3600000;
	static long orderMoreTwoHours = 7200000;
	
	static String str;
	
	//Время по доставке
	static long yellowDeliveryFirstTimeForCourier = 4200000;
	static long yellowDeliverySecondTimeForCourier = 3600000;
    
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
    
    /**
     * Чтение заказов для кухни
     * @param lastUpdateTime
     * @param periodReload
     * @throws ValidationException
     */
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
					
			/**
			 * 9 - если заказ взят в работу, и до доставки 60-0 красный
			 * 10 - если заказ взят в работу, и 70-60 минут желтый
			 * 11 - самовывоз, 40-0 красный
			 * 12 - самовывоз, 50-40 - желттый
			 */
			
			if (order.getOrderState() == OrderState.REGISTERED  && lastUpdateTime != null && (System.currentTimeMillis() - order.getModifiedDate().getTimeInMillis() < periodReload)  && (order.getDeliveryDate().getTimeInMillis() - System.currentTimeMillis() < orderMoreTwoHours))
				model.setStatus(0);
			
			else if (order.getOrderState() == OrderState.IN_PROGRESS &&
					 (order.getType() == OrderType.DELIVERY || order.getType() == OrderType.DELIVERY_IN_TIME) &&
					 (order.getDeliveryDate().getTimeInMillis() - System.currentTimeMillis() < redDeliveryTime))
				model.setStatus(9);
			
			else if (order.getOrderState() == OrderState.IN_PROGRESS &&
					 (order.getType() == OrderType.DELIVERY || order.getType() == OrderType.DELIVERY_IN_TIME) &&
					 (order.getDeliveryDate().getTimeInMillis() - System.currentTimeMillis() < yellowDeliveryInTimeFirstTime) && 
					 (order.getDeliveryDate().getTimeInMillis() - System.currentTimeMillis() > yellowDeliveryInTimeSecondTime))
				model.setStatus(10);
			
			else if (order.getOrderState() == OrderState.IN_PROGRESS &&
					(order.getDeliveryDate().getTimeInMillis() - System.currentTimeMillis() < yellowDeliveryFirstTime) && 
					(order.getDeliveryDate().getTimeInMillis() - System.currentTimeMillis() > yellowDeliverySecondTime))
				model.setStatus(12);
			
			else if (order.getOrderState() == OrderState.IN_PROGRESS &&
					(order.getDeliveryDate().getTimeInMillis() - System.currentTimeMillis() < redDeliveryTime))
				model.setStatus(11);
			
			
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
	
	/**
	 * Взять заказ на кухне
	 * @param orderId
	 * @throws ValidationException
	 */
	public static void takeOrder (Long orderId) throws ValidationException {
		String requestBody = params.current().get("body");
		Logger.info("take order: " + requestBody);

		Order order = Order.findById(orderId);
		order.setOrderState (OrderState.IN_PROGRESS);
		order.save();
			
	}
	
	/**
	 * Завершить заказ на кухне
	 * @param orderId
	 * @throws ValidationException
	 */
	public static void completeOrder (Long orderId) throws ValidationException {
		String requestBody = params.current().get("body");
		Logger.info("complete order: " + requestBody);
		
		Order order = Order.findById(orderId);
		order.setOrderState (OrderState.WAITING_FOR_DELIVERY);
		order.save();
			
	}
	
	public static void readDeliveryOrders (Long periodReload) throws ValidationException {
		String requestBody = params.current().get("body");
		Logger.info("complete order: " + requestBody);
		
		List<kz.sushimi.console.persistence.orders.Order> list;
		
		ArrayList<PreviewOrderModel> models = new ArrayList<PreviewOrderModel>(); 
		
		Long timeLongForRequest = System.currentTimeMillis() - 900000;
		Calendar timeForRequest = Calendar.getInstance();
		timeForRequest.setTimeInMillis(timeLongForRequest);
		
		//System.out.println(timeForRequest);
		
		/*
		 * and modifiedDate >= :timeForRequest 
		 * .setParameter("timeForRequest", timeForRequest)
		 */
		
		list = JPA.em().createQuery("from Order where ( (orderState = 'COMPLITED' and (type = 'DELIVERY' or type = 'DELIVERY_IN_TIME')) or (orderState = 'IN_PROGRESS' and (type = 'DELIVERY' or type = 'DELIVERY_IN_TIME') ) )").getResultList();
		
		for (kz.sushimi.console.persistence.orders.Order order : list) {
			PreviewOrderModel model = new PreviewOrderModel();
			
			if (order.getOrderState() == OrderState.IN_PROGRESS)
				System.out.println("ok");
			
			model.setId(order.getId());
			model.setOrderNumber(order.getOrderNumber());
			model.setType(order.getType());
			model.setSum(order.getOrderSum());
			model.setClientCash(order.getClientCash());
			
			SimpleDateFormat sdf = new SimpleDateFormat("dd.MM.yyyy'  'HH:mm:ss");
					
			if (order.getDeliveryDate() != null) {
				model.setDeliveryDateDelivery(sdf.format(order.getDeliveryDate().getTime()));
				model.setDeliveryDate(order.getDeliveryDate().getTime());
			}
			
			if (order.getClientAddress() != null)
				model.setClientAddress(order.getClientAddress().getFullAddress());
			
			else
				model.setClientAddress("Адрес не указан");
			
			/**
			 * Статусы (status):
			 * 0 - серый заказ, все нормально осталось более 70 минут
			 * 1 - желтый заказ, 70-60 минут
			 * 2 - красный заказ, 60-0 минут
			 * 3 - заказ готовится уже 15 минут, поэтому скоро будет готов
			 */
			
			if (order.getDeliveryDate().getTimeInMillis() - System.currentTimeMillis() > yellowDeliveryFirstTimeForCourier && (System.currentTimeMillis() < order.getDeliveryDate().getTimeInMillis()) && order.getOrderState() != OrderState.IN_PROGRESS )
				model.setStatus(0);
			
			else if (order.getDeliveryDate().getTimeInMillis() - System.currentTimeMillis() < yellowDeliveryFirstTimeForCourier && order.getDeliveryDate().getTimeInMillis() - System.currentTimeMillis() > yellowDeliverySecondTimeForCourier && order.getOrderState() != OrderState.IN_PROGRESS)
				model.setStatus(1);
			
			else if (order.getOrderState() == OrderState.IN_PROGRESS)
				model.setStatus(3);
			
			else 
				model.setStatus(2);
			
			/**
			 * Прогресс заказа и тип доставки (statusType)
			 * 0 - заказ готов. Тип доставки Доставка
			 * 1 - заказ готов. Тип доставки Доставка ко времени
			 * 2 - заказ на кухне. Тип доставки Доставка
			 * 3 - заказ на кухне. Тип доставки Доставка ко времени
			 */
			
			if (order.getOrderState() == OrderState.WAITING_FOR_DELIVERY && order.getType() == OrderType.DELIVERY )
				model.setStatusType(0);
			
			else if (order.getOrderState() == OrderState.WAITING_FOR_DELIVERY &&
					 order.getType() == OrderType.DELIVERY_IN_TIME)
				model.setStatusType(1);
			
			else if (order.getOrderState() == OrderState.IN_PROGRESS && order.getType() == OrderType.DELIVERY)
				model.setStatusType(2);
			
			else
				model.setStatusType(3);
			
			SimpleDateFormat timer = new SimpleDateFormat("HH:mm:ss");
			if (order.getDeliveryDate().getTimeInMillis() - System.currentTimeMillis() > 0)
				model.setTimer ("-" + timer.format(order.getDeliveryDate().getTimeInMillis() - System.currentTimeMillis() - 21600000));
			
			else
				model.setTimer("+" + timer.format(System.currentTimeMillis() - order.getDeliveryDate().getTimeInMillis() - 21600000));
			
			
			if (StringUtils.isNotEmpty(order.getComment()))
				model.setComment(order.getComment());
			else
				model.setComment("Без комментариев");
			
			models.add(model);	
		}
		
		
		StoreWrapper wrapper = new StoreWrapper();
		wrapper.success = true;
		wrapper.totalCount = ProductService.getProductsCount();
		wrapper.data = models.toArray();
		renderJSON(wrapper);
		
		
	}
	
	public static void takeOrdersByCourier () throws ValidationException {
		ResponseWrapper rw = new ResponseWrapper();
		String requestBody = params.current().get("body");
		Logger.info("Update: " + requestBody);
		if (!requestBody.startsWith("["))
			requestBody = "[" + requestBody + "]";
		Gson gson = new Gson();
		Logger.info("Courier take order: " + requestBody);
		ArmCourierOrdersModel[] models = gson.fromJson(requestBody, ArmCourierOrdersModel[].class);
		
		for (ArmCourierOrdersModel model : models) {
		
		//ArrayList ordersNumbers = new ArrayList();
		
		ArrayList ids = new ArrayList();
		String messageAboutError = "";
		
		rw.message ="";
		for (ArmCourierManyOrdersModel orderIds : model.getOrders()) {
			ids.add(orderIds.getId());
					
		}
		
		
		
		List<kz.sushimi.console.persistence.orders.Order> list;
		
		list = JPA.em().createQuery("from Order where id in (:ids)").setParameter("ids", ids).getResultList(); 
		
		for (kz.sushimi.console.persistence.orders.Order order : list) {
			if (order.getOrderState() == OrderState.CANCELED)	{
				ids.remove(order.getId());
				messageAboutError = messageAboutError + order.getOrderNumber() + ", ";
			}
			else
				rw.message = rw.message + order.getOrderNumber() + ", ";
		}
		
		try {
			JPA.em().createQuery("update Order set orderState = 'ON_DELIVERY' where id in (:ids)").setParameter("ids", ids).executeUpdate();
			rw.success = true;
			if (StringUtils.isNotEmpty(messageAboutError))
				rw.message = "Заказы были отменены: " + messageAboutError + " ||| " + "Взятые заказы: " + rw.message;
			else
				rw.message = "Вы взяли заказы: " + rw.message;
			renderJSON(rw);
		}
		catch (Exception e) {
			System.out.println (e);
			JPA.em().getTransaction().rollback();
		}
		
		}
	
		
	
	}
	
	public static void printOrder (Long orderId) throws ValidationException, TransformerException, IOException {
		System.out.println("Print check: " + orderId);
		PrintService.print(orderId);
		
	}
	
}