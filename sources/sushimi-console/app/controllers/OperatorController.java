package controllers;

import java.io.IOException;
import java.text.SimpleDateFormat;

import com.google.gson.Gson;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import javax.xml.transform.TransformerException;

import org.apache.commons.lang.StringUtils;

import kz.sushimi.console.exceptions.ValidationException;
import kz.sushimi.console.models.ResponseWrapper;
import kz.sushimi.console.models.users.CourierGeoPosition;
import kz.sushimi.console.models.StoreWrapper;
import kz.sushimi.console.models.orders.CancelOrderModel;
import kz.sushimi.console.models.orders.OperatorOrdersModel;
import kz.sushimi.console.models.orders.OrderModel;
import kz.sushimi.console.models.orders.PreviewOrderItemModel;
import kz.sushimi.console.models.orders.PreviewOrderModel;
import kz.sushimi.console.models.orders.SiteOrderModel;
import kz.sushimi.console.models.users.CourierModel;
import kz.sushimi.console.models.users.UserModel;
import kz.sushimi.console.persistence.orders.OrderHistory;
import kz.sushimi.console.persistence.orders.OrderItem;
import kz.sushimi.console.persistence.orders.OrderState;
import kz.sushimi.console.persistence.orders.OrderType;
import kz.sushimi.console.services.OperatorService;
import kz.sushimi.console.services.OrderService;
import kz.sushimi.console.persistence.orders.site.SiteOrder;
import kz.sushimi.console.persistence.users.User;
import kz.sushimi.console.services.dictionaries.ProductService;
import play.Logger;
import play.db.jpa.JPA;
import play.libs.WS;
import play.libs.WS.HttpResponse;
import play.mvc.Controller;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;



public class OperatorController extends Controller {
	
	static Long orderMode = null;
	
	/**
	 * Адрес сайта куда обращаться за заказами
	 */
	//public static final String URL_HOST = "http://sushimi.kz";
	public static final String URL_HOST = "http://localhost:9001";
	
	/**
	 * Путь до регистрации или обновления нового заказа
	 */
	public static final String URL_PUT_ORDERS_HISTORY_CONTEXT = "/system/orders/courier/position";
	
	public static void readDeliveredOrdersToday () {
		System.out.println ("Read delivered orders todar");
		
		List<kz.sushimi.console.persistence.orders.Order> list = OperatorService.getDeliveredOrders();
		ArrayList<PreviewOrderModel> models = OperatorService.createDeliveredOrdersList(list);
		
		StoreWrapper wrapper = new StoreWrapper();
		wrapper.success = true;
		//wrapper.totalCount = ProductService.getProductsCount();
		wrapper.data = models.toArray();
		renderJSON(wrapper);
		
	}
	
	public static void coutDeliveredOrders () throws ValidationException {
		System.out.println ("count delivered orders");
    	ResponseWrapper rw = new ResponseWrapper();
    	
		List<kz.sushimi.console.persistence.orders.Order> list = OperatorService.getDeliveredOrders();
		ArrayList<PreviewOrderModel> models = OperatorService.createDeliveredOrdersList(list);
		
		Integer sum = 0;
		for (int i=0; i < models.size(); i++) {
			sum = sum + models.get(i).getSum();
			
		}
		
		System.out.println(models.size());
		rw.success = true;
		rw.message = "Заказов " + models.size() + " шт. На сумму " + sum ;
		
		renderJSON(rw);
		
	}
	
	public static void cancelOrder () throws ValidationException {
		String requestBody = params.current().get("body");
		Logger.info("Cancel Order: " + requestBody);
		Gson gson = new Gson();
		CancelOrderModel model = gson.fromJson(requestBody, CancelOrderModel.class);
		OrderService.cancelOrder(model, Security.connected());
		
		StoreWrapper wrapper = new StoreWrapper();
		wrapper.success = true;
		renderJSON(wrapper);
	}
	
	
	/**
	 * Читаем историю заказа
	 */
	public static void readOrderHistory (Long orderId) throws ValidationException {
		System.out.println ("read order history: " + orderId);
    	ResponseWrapper rw = new ResponseWrapper();
		
		List<kz.sushimi.console.persistence.orders.OrderHistory> list = OperatorService.getOrderHistory(orderId);
		String orderHistory = OperatorService.orderHistory(list);
		
		rw.success = true;
		rw.message = orderHistory;
		renderJSON(rw);
	}
	
	
	/**
	 * чтение курьеров
	 * @throws ValidationException
	 */
	public static void readCouriers () throws ValidationException {
		System.out.println ("read courier list");
		
		List <User> list = OperatorService.getCourierList();
		ArrayList<CourierModel> models = OperatorService.createCourierList(list);
		
		System.out.println ("Lenght: " + models.get(0).getOrdersOnDelivery());

		
		StoreWrapper wrapper = new StoreWrapper();
		wrapper.success = true;
		wrapper.totalCount = ProductService.getProductsCount();
		wrapper.data = models.toArray();
		renderJSON(wrapper);
	}
	
	/**
	 * читаем список курьеров для операторской
	 * @param mode
	 * @throws ValidationException
	 */
	public static void read2 (Long mode) throws ValidationException {
		System.out.println ("read orders2 list");
		if (mode != null)
			orderMode = mode;
		//Long orderMode = 2l;
		System.out.println (orderMode);
		
		List<kz.sushimi.console.persistence.orders.Order> currentOrders = OperatorService.getCurrentOrders();
		List<kz.sushimi.console.persistence.orders.site.SiteOrder> newOrders = OperatorService.getNewSiteOrders();
		
		ArrayList<OperatorOrdersModel> models = OperatorService.createOrdersList2(currentOrders, newOrders, orderMode);
		
		StoreWrapper wrapper = new StoreWrapper();
		wrapper.success = true;
		wrapper.totalCount = ProductService.getProductsCount();
		wrapper.data = models.toArray();
		renderJSON(wrapper);
	}
	
	/**
	 * Выбор курьера для доставки заказа
	 * @param orderId
	 * @param courierId
	 * @throws ValidationException
	 */
	public static void takeCourier(Long orderId, Long courierId) throws ValidationException {
		System.out.println("Order " + orderId + ", Courier " + courierId);
		
		OperatorService.sendToDelivery(orderId, courierId);
		
		StoreWrapper wrapper = new StoreWrapper();
		wrapper.success = true;
		renderJSON(wrapper);
	}
	
	
	/**
	 * Проверка на изменение статусов заказа
	 * @param lastUpdateTime
	 * @throws ValidationException
	 */
	public static void lastOrderState (Long lastUpdateTime) throws ValidationException {
		System.out.println ("last order state: " + lastUpdateTime);
    	ResponseWrapper rw = new ResponseWrapper();
    	String str = "";
    	
    	if (lastUpdateTime != 0l) {
			List<kz.sushimi.console.persistence.orders.Order> list = OperatorService.getLastState(lastUpdateTime);
			ArrayList<PreviewOrderModel> models = OperatorService.createDeliveredOrdersList(list);
			//ArrayList<OperatorOrdersModel> models = OperatorService.createOrdersList2(currentOrders, newOrders, 1l);
			if (models.size() != 0) {
				for (int i=0; i<models.size();i++) {
					if (models.get(i).getState() == OrderState.REGISTERED)
						str = str + "Заказ #" + models.get(i).getOrderNumber() + ". Зарегистрирован.";
					else if (models.get(i).getState() == OrderState.IN_PROGRESS)
						str = str + "Заказ #" + models.get(i).getOrderNumber() + ". Готовится.";
					else if (models.get(i).getState() == OrderState.WAITING_FOR_DELIVERY)
						str = str + "Заказ #" + models.get(i).getOrderNumber() + ". Приготовлен. Ждет курьера.";
					else if (models.get(i).getState() == OrderState.ON_DELIVERY)
						str = str + "Заказ #" + models.get(i).getOrderNumber() + ". Заказ взят курьером.";
					else if (models.get(i).getState() == OrderState.DELIVERED)
						str = str + "Заказ #" + models.get(i).getOrderNumber() + ". Доставлен.";
					str = str + "<br>";
				}
				
				rw.success = true;
				rw.message = str;
				
				renderJSON(rw);
			}
			else {
	    		rw.success = false;
	    		rw.message = "";
	    		renderJSON(rw);
			}
    	}
    	
    	else {
    		rw.success = false;
    		rw.message = "";
    		renderJSON(rw);
    	}
	}
	/**
	 * Изменение курьера
	 * @param orderId
	 * @param courierId
	 * @throws ValidationException
	 */
	
	public static void updateCourier (Long orderId, Long courierId) throws ValidationException {
		System.out.println ("updateCourier" + orderId + "; " + courierId);
		ArrayList<OrderState> stateList = new ArrayList<OrderState>();
		stateList.add(OrderState.ON_DELIVERY);
		
		JPA.em().createQuery("Update OrderHistory set user.id = :courierId where order.id = :orderId and orderState in (:states)").setParameter("courierId", courierId).setParameter("states", stateList).setParameter("orderId", orderId).executeUpdate();
		
	}
	
	/**
	 * Запрос на сайт о передвижение курьеров
	 */
	
	public static void readCourierPosition () throws ValidationException {
		/**
		 * Принципи работы:
		 * 1. Берем из OrderHistory записи заказов со статусом 'ON_DELIVERY'и датой создания от 00:00:00;
		 * 2. Формируем массив моделей курьеров: id, и время от 00:00:00;
		 * 3. Отправляем данный массив на сайт;
		 * 4. На сайте формируется массив курьеров с их текущими точками за целый день;
		 * 5. Приходит с сайта массив;
		 * 6. Обрабатываем их и отправляем на клиент!
		 */
		
		List<User> list = OperatorService.getCourierList();
		ArrayList<CourierModel> arrayCouriers = OperatorService.createCourierList(list);
		
	
		Gson gson = new Gson();
		
		
		Logger.info("Server start integration");
	   	HttpResponse response = WS.url(URL_HOST + URL_PUT_ORDERS_HISTORY_CONTEXT).post();
    	String requestBody = response.getString();
		Gson gson1 = new Gson();
		CourierModel[] courierModels = gson1.fromJson(requestBody, CourierModel[].class);
	
		
		if (courierModels != null) {
			List<OrderHistory> list2 = JPA.em().createQuery("from OrderHistory where orderState = 'ON_DELIVERY'").getResultList();
			Long timeStatus = System.currentTimeMillis();
			
			//List<User> courierList = OperatorService.getCourierList();
			//rayList<CourierModel> courierIds = OperatorService.createCourierList(courierList);
			ArrayList<CourierModel> courierFinish = new ArrayList<CourierModel>();
			for (CourierModel couriers : courierModels) {
				String orders = "";
				String info = "";
				CourierModel model = new CourierModel();
				model.setId(couriers.getId());
				
				model.setGeoPosition(couriers.getGeoPosition());
				model.setPointsCount(couriers.getGeoPosition().size());
				
				
				model.setName(couriers.getName());
				
				//model.setDate(couriers.getDate());
				
				if (couriers.getDate() != null){
					if (System.currentTimeMillis() - couriers.getDate().getTime() > 3600000l)
						model.setTimeActive("более часа назад");
					else {
						SimpleDateFormat timer = new SimpleDateFormat("mm");
						String str = "";
						str = timer.format(System.currentTimeMillis() -  couriers.getDate().getTime()) + " минут(-ы) назад";
						char c = str.charAt(0);
						char d = 0;
						if (c == d) {
							str.substring(1);
						}
						model.setTimeActive(str);
					}
				}
				
				else {
					model.setTimeActive("Отсутствует информация");
				}
				
				if (couriers.getDate() != null) {
					if (timeStatus - couriers.getDate().getTime() > 600000l) {
						model.setStatus(0);
					}
					else
						model.setStatus(1);
				}
				
				else
					model.setStatus(1);
				
				if (couriers.getGeoLatitude() != null && couriers.getGeoLongitude() != null) {
					model.setGeoLatitude(couriers.getGeoLatitude());
					model.setGeoLongitude(couriers.getGeoLongitude());
				}
				
				else{
					model.setStatus(2);
				}
				
				for (kz.sushimi.console.persistence.orders.OrderHistory order2 : list2) {
					//System.out.println (order.getUser().getName() + "----" + order2.getUser().getName());
					if (couriers.getId() == order2.getUser().getId()) {
						orders = orders + order2.getOrder().getOrderNumber() + ", ";
						info = info + "<b>Номер заказа:</b> " + order2.getOrder().getOrderNumber() + "<br>";
						if (order2.getOrder().getClient().getName() != null)
							info = info + "<b>Клиент: </b>" + order2.getOrder().getClient().getName() + "<br>";
						if (order2.getOrder().getClient().getPhoneNumber() != null)
							info = info + "<b>Телефон: </b>" + order2.getOrder().getClient().getPhoneNumber() + "<br>";
						if (order2.getOrder().getClientAddress() != null)
							info = info  + "<b>Адрес: </b>" + order2.getOrder().getClientAddress().getFullAddress() + "<br>";
						
						info = info + "<br><br>";
					}
				}
				model.setAddressesOnDelivery(info);
				if (StringUtils.isNotEmpty(orders))
				model.setOrdersOnDelivery(orders.substring(0, orders.length() - 2));
				courierFinish.add(model);
				}
			Logger.info("Finish server integration");
			StoreWrapper wrapper = new StoreWrapper();
			wrapper.success = true;
			wrapper.totalCount = ProductService.getProductsCount();
			wrapper.data = courierFinish.toArray();
			renderJSON(wrapper);
			//renderJSON(courierFinish);
		}
	}
	
}
