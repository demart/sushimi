package controllers;

import java.util.ArrayList;
import java.util.List;

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
	
}
