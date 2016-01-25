package controllers;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import org.apache.commons.lang.StringUtils;

import com.google.gson.Gson;

import kz.sushimi.console.exceptions.ValidationException;
import kz.sushimi.console.models.StoreWrapper;
import kz.sushimi.console.models.dictionaries.DeliveryPriceModel;
import kz.sushimi.console.models.dictionaries.ProductCostingModel;
import kz.sushimi.console.models.orders.DeliveryExtraPriceModel;
import kz.sushimi.console.models.orders.PromotionModel;
import kz.sushimi.console.models.users.UserModel;
import kz.sushimi.console.persistence.users.User;
import kz.sushimi.console.services.PromotionService;
import kz.sushimi.console.services.dictionaries.DeliveryPriceService;
import kz.sushimi.console.services.dictionaries.ProductService;
import play.Logger;
import play.db.jpa.JPA;
import play.mvc.Controller;

/**
 * 
 * Контроллер для работы c информацией о доставке 
 * 
 * @author Demart
 *
 */
public class DeliveryController extends Controller {

	public static void readExtraPrices(int page, int start, int limit) {
		String requestBody = params.current().get("body");
		Logger.info("DeliveryExtraPrices.read: " + requestBody);
	
		List<kz.sushimi.console.persistence.dictionaries.DeliveryPrice> list = DeliveryPriceService.getDeliveryExtraPrices(start, limit);
		Logger.info("Size():" + list.size());
		ArrayList<DeliveryExtraPriceModel> models = new ArrayList<DeliveryExtraPriceModel>(); 
		for (kz.sushimi.console.persistence.dictionaries.DeliveryPrice dep : list) {
			DeliveryExtraPriceModel model = new DeliveryExtraPriceModel();
			
			model.setId(dep.getId());
			model.setName(dep.getName());
			model.setPrice(dep.getPrice());
		
			models.add(model);
		}
	
		StoreWrapper wrapper = new StoreWrapper();
		wrapper.success = true;
		wrapper.totalCount = list.size();
		wrapper.data = models.toArray();
		renderJSON(wrapper);
	}
	
	public static void read(int page, int start, int limit) {
		String requestBody = params.current().get("body");
		Logger.info("DeliveryPrice.read: " + requestBody);

		List<kz.sushimi.console.persistence.dictionaries.DeliveryPrice> list = DeliveryPriceService.getDeliveryPrices(start, limit);
		
		ArrayList<DeliveryPriceModel> models = new ArrayList<DeliveryPriceModel>(); 
		for (kz.sushimi.console.persistence.dictionaries.DeliveryPrice deliveryPrice : list) {
			DeliveryPriceModel model = new DeliveryPriceModel();
			
			if (deliveryPrice.getDeleted()==false) {
				model.setId(deliveryPrice.getId());
				model.setName(deliveryPrice.getName());
				model.setPrice(deliveryPrice.getPrice());
			
			
			model.setUser(deliveryPrice.getUser() == null ? "" : deliveryPrice.getUser().getName());
			if (deliveryPrice.getCreatedDate() != null)
				model.setCreatedDate(deliveryPrice.getCreatedDate().getTime());
			if (deliveryPrice.getModifiedDate() != null)
				model.setModifiedDate(deliveryPrice.getModifiedDate().getTime());
			
			models.add(model);
			}
		}

		StoreWrapper wrapper = new StoreWrapper();
		wrapper.success = true;
		wrapper.totalCount = DeliveryPriceService.getDeliveryPricesCount();
		wrapper.data = models.toArray();
		renderJSON(wrapper);
	}
	

	/**
	 * Добавить новую запись
	 * 
	 * @param model
	 * @throws ValidationException 
	 */
	public static void create() throws ValidationException {
		String requestBody = params.current().get("body");
		Logger.info("Create: " + requestBody);
		if (!requestBody.startsWith("["))
			requestBody = "[" + requestBody + "]";
			
		Gson gson = new Gson();
		DeliveryPriceModel[] models = gson.fromJson(requestBody, DeliveryPriceModel[].class);
		Logger.info("Model.lenght: " + models.length);
		DeliveryPriceService.addDeliveryPrices(models, Security.connected());
		
		StoreWrapper wrapper = new StoreWrapper();
		wrapper.success = true;
		renderJSON(wrapper);
	}
	
	
	/**
	 * Обновить запись
	 * 
	 * @param model
	 * @throws ValidationException 
	 */
	public static void update() throws ValidationException {
		String requestBody = params.current().get("body");
		Logger.info("Update: " + requestBody);
		if (!requestBody.startsWith("["))
			requestBody = "[" + requestBody + "]";
		Gson gson = new Gson();
		Logger.info("Update: " + requestBody);
		DeliveryPriceModel[] models = gson.fromJson(requestBody, DeliveryPriceModel[].class);
		Logger.info("Model.lenght: " + models.length);
		DeliveryPriceService.updateDeliveryPrices(models, Security.connected());
		
		StoreWrapper wrapper = new StoreWrapper();
		wrapper.success = true;
		renderJSON(wrapper);
	}	
	
	public static void destroy(long id) throws ValidationException {
		Logger.info("ID:" + id);
		DeliveryPriceService.deleteDeliveryPrice(id, Security.connected());
		StoreWrapper wrapper = new StoreWrapper();
		wrapper.success = true;
		renderJSON(wrapper);
	}
	
	/**
	 * Список всех курьеров
	 * @throws ValidationException
	 */
	public static void readAllCouriers () throws ValidationException {
		Logger.info("Read All Couriers: User " + Security.connected());
		
		List<User> couriers = JPA.em().createQuery("from User where role = 'COURIER' order by id").getResultList();
		
		ArrayList<UserModel> users = new ArrayList<UserModel>();
		
		for (User user: couriers) {
			UserModel model = new UserModel();
			model.setId(user.getId());
			model.setName(user.getName());
			model.setLogin(user.getLogin());
			model.setPassword(user.getPassword());
			
			if (user.getModifiedDate() != null)
				model.setModifiedDate(user.getModifiedDate().getTime());
			
			if (user.getCreatedDate() != null)
				model.setCreatedDate(user.getCreatedDate().getTime());
			
			users.add(model);
		}
		
		StoreWrapper wrapper = new StoreWrapper();
		wrapper.success = true;
		wrapper.totalCount = users.size();
		wrapper.data = users.toArray();
		renderJSON(wrapper);
	}
	
	/**
	 * редактирование курьера
	 * @throws ValidationException
	 */
	public static void updateCourier () throws ValidationException {
		String requestBody = params.current().get("body");
		Logger.info("Update: " + requestBody);
		if (!requestBody.startsWith("["))
			requestBody = "[" + requestBody + "]";
		Gson gson = new Gson();
		Logger.info("Update: " + requestBody);
		UserModel[] models = gson.fromJson(requestBody, UserModel[].class);
		Logger.info("Model.lenght: " + models.length);
		
		for (UserModel user: models) {
			if (user == null)
				throw new ValidationException ("model null");
			
			User courier = User.findById(user.getId());
			
			if (courier == null)
				throw new ValidationException ("Not found courier");
			
			try {
			if (StringUtils.isNotEmpty(user.getLogin())) 
				courier.setLogin(user.getLogin());
			
			if (StringUtils.isNotEmpty(user.getPassword()))
				courier.setPassword(user.getPassword());
			
			if (StringUtils.isNotEmpty(user.getName()))
				courier.setName(user.getName());
			
			courier.setModifiedDate(Calendar.getInstance());
			courier.save();
			}
			catch (Exception e) {
				throw new ValidationException (e.getMessage());
			}
				
				
		}
		
		StoreWrapper wrapper = new StoreWrapper();
		wrapper.success = true;
		renderJSON(wrapper);
	}
}
