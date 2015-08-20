package controllers;

import java.util.ArrayList;
import java.util.List;
import java.util.Calendar;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import kz.sushimi.console.exceptions.ValidationException;
import kz.sushimi.console.models.StoreWrapper;
import kz.sushimi.console.models.dictionaries.ProductCostingModel;
import kz.sushimi.console.models.orders.PromotionModel;
import kz.sushimi.console.services.PromotionService;
import kz.sushimi.console.services.dictionaries.ProductService;
import play.Logger;
import play.mvc.Controller;

/**
 * 
 * Контроллер для работы с акциями 
 * 
 * @author Demart
 *
 */
public class PromotionController extends Controller {

	public static void read(int page, int start, int limit) {
		String requestBody = params.current().get("body");
		Logger.info("Promotions.read: " + requestBody);
	
		List<kz.sushimi.console.persistence.promotions.Promotion> list = PromotionService.getPromotions(start, limit);
		Logger.info("Size():" + list.size());
		ArrayList<PromotionModel> models = new ArrayList<PromotionModel>(); 
		for (kz.sushimi.console.persistence.promotions.Promotion promo : list) {
			PromotionModel model = new PromotionModel();
			
			model.setId(promo.getId());
			model.setName(promo.getName());
			
			model.setDiscount(promo.getDiscount());
			
			if (promo.getFromTime() != null)
				model.setFromTime(promo.getFromTime().getTime());
			if (promo.getToTime() != null)
				model.setFromTime(promo.getToTime().getTime());
			
			model.setType(promo.getType());
			model.setValueType(promo.getValueType());
			
			models.add(model);
		}
	
		StoreWrapper wrapper = new StoreWrapper();
		wrapper.success = true;
		wrapper.totalCount = list.size();
		wrapper.data = models.toArray();
		renderJSON(wrapper);
	}
	
	public static void readAdmin(int page, int start, int limit) {
		String requestBody = params.current().get("body");
		Logger.info("Promotion.readAdmin: " + requestBody);

		List<kz.sushimi.console.persistence.promotions.Promotion> list = PromotionService.getAdminPromotions(start, limit);
		
		ArrayList<PromotionModel> models = new ArrayList<PromotionModel>(); 
		for (kz.sushimi.console.persistence.promotions.Promotion promotion : list) {
			PromotionModel model = new PromotionModel();
			model.setId(promotion.getId());
			model.setName(promotion.getName());
			model.setDiscount(promotion.getDiscount());			
			model.setValueType(promotion.getValueType());
			model.setType(promotion.getType());
			model.setOrderSum(promotion.getOrderSum());
			model.setProductCount(promotion.getProductCount());
			model.setIsPublished(promotion.getPublished());
			//model.setProductId(promotion.getProductId());

				if (promotion.getProduct() != null) {
				model.setProductId(promotion.getProduct().getId());
				model.setProductIdName(promotion.getProduct().getName());
				}
			
			if (promotion.getFromTime() != null)
				model.setFromTime(promotion.getFromTime().getTime());
			if (promotion.getToTime() != null)
				model.setToTime(promotion.getToTime().getTime());
				
			models.add(model);
		}

		StoreWrapper wrapper = new StoreWrapper();
		wrapper.success = true;
		wrapper.totalCount = list.size();
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
			
		//Gson gson = new Gson();
		Gson gson = new GsonBuilder().setDateFormat("MM/dd/yyyy").create();
		PromotionModel[] models = gson.fromJson(requestBody, PromotionModel[].class);
		Logger.info("Model.lenght: " + models.length);
		PromotionService.addPromotions(models, Security.connected());
		
		StoreWrapper wrapper = new StoreWrapper();
		wrapper.success = true;
		renderJSON(wrapper);
	}
	
	public static void update() throws ValidationException {
		String requestBody = params.current().get("body");
		Logger.info("Update: " + requestBody);
		if (!requestBody.startsWith("["))
			requestBody = "[" + requestBody + "]";
		//Gson gson = new Gson();
		Gson gson = new GsonBuilder().setDateFormat("MM/dd/yyyy").create();
		Logger.info("Update: " + requestBody);
		PromotionModel[] models = gson.fromJson(requestBody, PromotionModel[].class);
		Logger.info("Model.lenght: " + models.length);
		PromotionService.updatePromotions(models, Security.connected());
		
		StoreWrapper wrapper = new StoreWrapper();
		wrapper.success = true;
		renderJSON(wrapper);
	}	
	
	public static void destroy(long id) throws ValidationException {
		Logger.info("ID:" + id);
		PromotionService.deletePromotion(id, Security.connected());
		StoreWrapper wrapper = new StoreWrapper();
		wrapper.success = true;
		renderJSON(wrapper);
	}
	
}
