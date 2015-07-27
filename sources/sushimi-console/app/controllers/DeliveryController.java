package controllers;

import java.util.ArrayList;
import java.util.List;

import kz.sushimi.console.models.StoreWrapper;
import kz.sushimi.console.models.dictionaries.ProductCostingModel;
import kz.sushimi.console.models.orders.DeliveryExtraPriceModel;
import kz.sushimi.console.models.orders.PromotionModel;
import kz.sushimi.console.services.PromotionService;
import kz.sushimi.console.services.dictionaries.DeliveryPriceService;
import kz.sushimi.console.services.dictionaries.ProductService;
import play.Logger;
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
	
}
