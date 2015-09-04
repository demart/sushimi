package controllers;

import java.util.ArrayList;
import java.util.List;

import com.google.gson.Gson;

import kz.sushimi.models.integration.OrderModel;
import kz.sushimi.models.integration.RegisterPhoneModel;
import kz.sushimi.persistence.orders.Order;
import kz.sushimi.service.IntegrationService;
import kz.sushimi.service.broadcast.PhoneService;
import play.Logger;
import play.mvc.Controller;

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
	
	
}
