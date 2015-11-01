package controllers;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import kz.sushimi.models.integration.CourierGeoPosition;
import kz.sushimi.models.integration.CourierModel;
import kz.sushimi.models.integration.OrderModel;
import kz.sushimi.models.integration.RegisterPhoneModel;
import kz.sushimi.models.integration.order.SushimiWebOrderHistoryModel;
import kz.sushimi.models.integration.order.SushimiWebOrderModel;
import kz.sushimi.models.integration.order.SushimiWebOrderSynchronizationResult;
import kz.sushimi.persistence.orders.Order;
import kz.sushimi.persistence.orders.OrderHistory;
import kz.sushimi.persistence.users.User;
import kz.sushimi.persistence.users.UserTracking;
import kz.sushimi.service.IntegrationService;
import kz.sushimi.service.broadcast.PhoneService;
import play.Logger;
import play.db.jpa.JPA;
import play.mvc.Controller;

import com.google.gson.Gson;

/**
 * Контроллер предназначенный для обеспечения интеграции с системой управления заказами
 * @author Demart
 *
 */
public class IntegrationController extends Controller {

	/**
	 * Возвращает список не обработанных заказов
	 */
	public static void getOrders() {
		List<Order> orders = IntegrationService.getOrders();
		if (orders != null && orders.size() > 0)
			Logger.info("Integration getOrders.size: "+ orders.size());
		
		List<OrderModel> orderModels = new ArrayList<OrderModel>();
		for (Order order : orders) {
			orderModels.add(new OrderModel(order));
		}
		renderJSON(orderModels);
	}
	
	/**
	 * Подтверждает выгруженные с сайта заказы
	 */
	public static void confirmOrders() {
		Logger.info("Integration confirmOrders invoked");
    	String requestBody = params.current().get("body");
		Gson gson = new Gson();
		Integer[] model = gson.fromJson(requestBody, Integer[].class);
		if (model == null || model.length < 1)
			renderJSON("0");
		
		int rowAffected = IntegrationService.confirmOrders(model);
		Logger.info("Integration Order confirmation affected rows :" + model.length);
		renderJSON(rowAffected);
	}
	
	/**
	 * Регистрирует новый телефон из системы заказов операторов
	 */
	public static void registerPhone() {
		Logger.info("Integration registerPhone invoked");
		String requestBody = params.current().get("body");
		Gson gson = new Gson();
		RegisterPhoneModel[] models = gson.fromJson(requestBody, RegisterPhoneModel[].class);
		if (models == null) return;
		
		for (RegisterPhoneModel registerPhoneModel : models) {
			if (registerPhoneModel == null)
				continue;
			PhoneService.addOrUpdatePhone(registerPhoneModel.phone, registerPhoneModel.name);			
		}
	}
	
	public static void synchronizeOrder() {
		Logger.info("Integration synchronize order invoked");
		String requestBody = params.current().get("body");
		Gson gson = new Gson();
		Logger.info("Body: " + requestBody);
		SushimiWebOrderModel orderModel = gson.fromJson(requestBody, SushimiWebOrderModel.class);
		SushimiWebOrderSynchronizationResult result = new SushimiWebOrderSynchronizationResult();
		if (orderModel == null) {
			// TODO
			result.message = "Error during parsing JSON object of synchronizing order.";
			result.success = false;
		} else {
			IntegrationService.synchronizeOrder(orderModel);
			result.message = "Order was successfully synchronized.";
			result.success = true;
		}
		
		renderJSON(result);
	}
	
	
	public static void synchronizeOrderHistory() {
		Logger.info("Integration synchronize order history invoked");
		String requestBody = params.current().get("body");
		Gson gson = new Gson();
		Logger.info("Body: " + requestBody);
		SushimiWebOrderHistoryModel orderHistoryModel = gson.fromJson(requestBody, SushimiWebOrderHistoryModel.class);
		SushimiWebOrderSynchronizationResult result = new SushimiWebOrderSynchronizationResult();
		if (orderHistoryModel == null) {
			// TODO
			result.message = "Error during parsing JSON object of synchronizing order history.";
			result.success = false;
		} else {
			Long orderHistoryId = IntegrationService.synchronizeOrderHistory(orderHistoryModel);
			result.message = "Order was successfully synchronized.";
			result.siteRecordId = orderHistoryId.toString();
			result.success = true;
		}
		
		renderJSON(result);
	}
	
	public static void getOrderHistoryUpdates() {
		Logger.info("Integration getOrderHistory invoked");
		String requestBody = params.current().get("body");
		Logger.info("Body: " + requestBody);
		
		List<OrderHistory> ordersHistory = IntegrationService.getOrdersHistoryUpdates();
		if (ordersHistory.size() > 0)
			Logger.info("Orders History Updates found count: " + ordersHistory.size());
		
		List<SushimiWebOrderHistoryModel> models = new ArrayList<SushimiWebOrderHistoryModel>();
		for (OrderHistory orderHistory : ordersHistory) {
			SushimiWebOrderHistoryModel model = new SushimiWebOrderHistoryModel();
			
			model.id = orderHistory.getId();
			model.date = orderHistory.getDate();
			model.geoLatitude = orderHistory.getGeoLatitude();
			model.geoLongitude = orderHistory.getGeoLongitude();
			model.orderNumber = orderHistory.getOrder().getOrderNumber();
			model.orderState = orderHistory.getOrderState();
			model.user = orderHistory.getUser();
			
			models.add(model);
		}
		
		renderJSON(models);
	}
	
	/**
	 * Подтверждение синхронизации изменений в статусах заказа
	 */
	public static void comfirmOrderHistoryUpdates() {
		Logger.info("Integration confirmOrders invoked");
    	String requestBody = params.current().get("body");
		Gson gson = new Gson();
		Long[] ids = gson.fromJson(requestBody, Long[].class);
		if (ids == null || ids.length < 1)
			renderJSON("0");
		
		int rowAffected = IntegrationService.confirmOrdersHistoryUpdates(ids);
		Logger.info("Integration OrderHistory updats confirmation affected rows :" + ids.length);
		renderJSON(rowAffected);
	}
	
	/**
	 * Отправка позиций курьера
	 */
	public static void courierPosition () {
		//String requestBody = params.current().get("body");
	//	Gson gson = new Gson();
		Logger.info("Start site integration courier position");
		
		List<User> list = JPA.em().createQuery("from User where role = 'COURIER' order by id desc").getResultList();
		
		ArrayList<CourierModel> models = new ArrayList<CourierModel> ();
		
	
		 
		for (User model : list) {
			CourierModel couriers = new CourierModel();
			couriers.setId(model.getId());
			
			List<OrderHistory> list2 = JPA.em().createQuery("from OrderHistory where user = :nameCourier and orderState = 'ON_DELIVERY' order by id desc").setParameter("nameCourier", model.getName()).getResultList();
			//Integer count = 0;
			//Logger.info("ok");
			Calendar date = Calendar.getInstance();
			for (OrderHistory orders : list2) {
				date = orders.getDate();
				//Logger.info("" + date);
				break;
			}
			
			List<UserTracking> list3 = JPA.em().createQuery("from UserTracking where user.id = :idCourier and date > :date order by id asc").setParameter("idCourier", model.getId()).setParameter("date", date).getResultList();
			
			ArrayList<CourierGeoPosition> mods = new ArrayList<CourierGeoPosition>();
			for (int i=0; i < list3.size(); i++) {
				//System.out.println (i);
				CourierGeoPosition mod = new CourierGeoPosition();
				mod.setGeoLatitude(list3.get(i).getLatitude());
				mod.setGeoLongitude(list3.get(i).getLongitude());
				mods.add(mod);
			}
			couriers.setGeoPosition(mods);
			
			couriers.setName(model.getName());
			couriers.setGeoLatitude(model.getLastLatitude());
			couriers.setGeoLongitude(model.getLastLongitude());
			couriers.setDate(model.getLastGeolocationSyncTime().getTime());
			models.add(couriers);
			//ids.add(model.getId());
		}
		

		Logger.info("Finish site integration courier position");
		renderJSON(models);
	}
	
	
}
