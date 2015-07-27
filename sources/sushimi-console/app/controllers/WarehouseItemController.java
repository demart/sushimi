package controllers;

import java.util.ArrayList;
import java.util.List;

import kz.sushimi.console.exceptions.ValidationException;
import kz.sushimi.console.models.StoreWrapper;
import kz.sushimi.console.models.dictionaries.ProductCostingModel;
import kz.sushimi.console.models.warehouses.WarehouseItemModel;
import kz.sushimi.console.persistence.warehouses.WarehouseItem;
import kz.sushimi.console.services.WarehouseService;
import kz.sushimi.console.services.dictionaries.ProductService;
import play.Logger;
import play.mvc.Controller;

import com.google.gson.Gson;

public class WarehouseItemController extends Controller {
	
	public static void read(Long productId, int page, int start, int limit) {
		String requestBody = params.current().get("body");
		Logger.info("WarehouseItem.read: " + requestBody);
	
		List<kz.sushimi.console.persistence.warehouses.WarehouseItem> list = WarehouseService.getWarehouseItems(start, limit);
		
		ArrayList<WarehouseItemModel> models = new ArrayList<WarehouseItemModel>(); 
		for (kz.sushimi.console.persistence.warehouses.WarehouseItem warehouseItem : list) {
			WarehouseItemModel model = new WarehouseItemModel();
			
			model.setId(warehouseItem.getId());
			
			model.setAmount(warehouseItem.getAmount());
			model.setIngredientId(warehouseItem.getIngredient().getId());
			model.setIngredientName(warehouseItem.getIngredient().getName());
			
			model.setUnitId(warehouseItem.getIngredient().getUnit().getId());
			model.setUnitName(warehouseItem.getIngredient().getUnit().getName());
			
			model.setUser(warehouseItem.getUser() == null ? "" : warehouseItem.getUser().getName());
			if (warehouseItem.getCreatedDate() != null)
				model.setCreatedDate(warehouseItem.getCreatedDate().getTime());
			model.setId(warehouseItem.getId());
			if (warehouseItem.getModifiedDate() != null)
				model.setModifiedDate(warehouseItem.getModifiedDate().getTime());
			
			models.add(model);
		}
	
		StoreWrapper wrapper = new StoreWrapper();
		wrapper.success = true;
		wrapper.totalCount = WarehouseService.getWarehouseItemsCount();
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
		WarehouseItemModel[] models = gson.fromJson(requestBody, WarehouseItemModel[].class);
		Logger.info("Model.lenght: " + models.length);
		WarehouseService.addWarehouseItem(models, Security.connected());
		
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
		WarehouseItemModel[] models = gson.fromJson(requestBody, WarehouseItemModel[].class);
		Logger.info("Model.lenght: " + models.length);
		WarehouseService.updateWarehouseItem(models, Security.connected());
		
		StoreWrapper wrapper = new StoreWrapper();
		wrapper.success = true;
		renderJSON(wrapper);
	}	
	
	public static void destroy(long id) throws ValidationException {
		Logger.info("ID:" + id);
		WarehouseService.deleteWarehouseItem(id, Security.connected());
		StoreWrapper wrapper = new StoreWrapper();
		wrapper.success = true;
		renderJSON(wrapper);
	}
	
}
