package controllers;

import java.util.ArrayList;
import java.util.List;

import kz.sushimi.console.exceptions.ValidationException;
import kz.sushimi.console.models.StoreWrapper;
import kz.sushimi.console.models.dictionaries.ProductCostingModel;
import kz.sushimi.console.models.dictionaries.ProductModel;
import kz.sushimi.console.services.dictionaries.ProductService;
import play.Logger;
import play.mvc.Controller;

import com.google.gson.Gson;

/**
 * Контроллер для управления продуктами
 * 
 * @author Demart
 *
 */
public class ProductCostingController extends Controller {
	
	public static void read(Long productId, int page, int start, int limit) {
		String requestBody = params.current().get("body");
		Logger.info("ProductCosting.read: " + requestBody);
	
		List<kz.sushimi.console.persistence.dictionaries.ProductCosting> list = ProductService.getProductCostings(productId, start, limit);
		Logger.info("Size():" + list.size());
		ArrayList<ProductCostingModel> models = new ArrayList<ProductCostingModel>(); 
		for (kz.sushimi.console.persistence.dictionaries.ProductCosting productCosting : list) {
			ProductCostingModel model = new ProductCostingModel();
			
			model.setProductId(productCosting.getProduct().getId());
			model.setProductName(productCosting.getProduct().getName());
			
			model.setWarehouseItemId(productCosting.getWarehouseItem().getId());
			model.setWarehouseItemName(productCosting.getWarehouseItem().getIngredient().getName());
			
			model.setIngredientId(productCosting.getIngredient().getId());
			model.setIngredientName(productCosting.getIngredient().getName());
			
			model.setUnitId(productCosting.getIngredient().getUnit().getId());
			model.setUnitName(productCosting.getIngredient().getUnit().getName());
			
			model.setAmount(productCosting.getAmount());
			
			model.setUser(productCosting.getUser() == null ? "" : productCosting.getUser().getName());
			if (productCosting.getCreatedDate() != null)
				model.setCreatedDate(productCosting.getCreatedDate().getTime());
			model.setId(productCosting.getId());
			if (productCosting.getModifiedDate() != null)
				model.setModifiedDate(productCosting.getModifiedDate().getTime());
			
			models.add(model);
		}
	
		StoreWrapper wrapper = new StoreWrapper();
		wrapper.success = true;
		wrapper.totalCount = ProductService.getProductCostingsCount(productId);
		wrapper.data = models.toArray();
		renderJSON(wrapper);
	}
	
	
	/**
	 * Добавить новую запись
	 * 
	 * @param model
	 * @throws ValidationException 
	 */
	public static void create(Long productId) throws ValidationException {
		String requestBody = params.current().get("body");
		Logger.info("Create: " + requestBody);
		Logger.info("Create.ProductId: " + productId);
		if (!requestBody.startsWith("["))
			requestBody = "[" + requestBody + "]";
			
		Gson gson = new Gson();
		ProductCostingModel[] models = gson.fromJson(requestBody, ProductCostingModel[].class);
		Logger.info("Model.lenght: " + models.length);
		ProductService.addProductCosting(productId, models, Security.connected());
		
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
	public static void update(Long productId) throws ValidationException {
		String requestBody = params.current().get("body");
		Logger.info("Update: " + requestBody);
		Logger.info("Create.ProductId: " + productId);
		if (!requestBody.startsWith("["))
			requestBody = "[" + requestBody + "]";
		Gson gson = new Gson();
		Logger.info("Update: " + requestBody);
		ProductCostingModel[] models = gson.fromJson(requestBody, ProductCostingModel[].class);
		Logger.info("Model.lenght: " + models.length);
		ProductService.updateProductCosting(models, Security.connected());
		
		StoreWrapper wrapper = new StoreWrapper();
		wrapper.success = true;
		renderJSON(wrapper);
	}	
	
	public static void destroy(long id) throws ValidationException {
		Logger.info("ID:" + id);
		ProductService.deleteProductCosting(id, Security.connected());
		StoreWrapper wrapper = new StoreWrapper();
		wrapper.success = true;
		renderJSON(wrapper);
	}
}
