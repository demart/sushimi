package controllers;

import java.util.ArrayList;
import java.util.List;

import kz.sushimi.console.exceptions.ValidationException;
import kz.sushimi.console.models.StoreWrapper;
import kz.sushimi.console.models.warehouses.WarehouseOutcomeModel;
import kz.sushimi.console.services.WarehouseService;
import play.Logger;
import play.mvc.Controller;

import com.google.gson.Gson;

public class WarehouseOutcomeController extends Controller {
	
	public static void read(Long productId, int page, int start, int limit) {
		String requestBody = params.current().get("body");
		Logger.info("WarehouseOutcome.read: " + requestBody);
	
		List<kz.sushimi.console.persistence.warehouses.WarehouseOutcome> list = WarehouseService.getWarehouseOutcomes(start, limit);
		
		ArrayList<WarehouseOutcomeModel> models = new ArrayList<WarehouseOutcomeModel>(); 
		for (kz.sushimi.console.persistence.warehouses.WarehouseOutcome warehouseOutcome : list) {
			WarehouseOutcomeModel model = new WarehouseOutcomeModel();
			
			model.setId(warehouseOutcome.getId());
			
			model.setWarehouseItemId(warehouseOutcome.getWarehouseItem().getId());
			model.setWarehouseItemName(warehouseOutcome.getWarehouseItem().getIngredient().getName());
			
			model.setType(warehouseOutcome.getType());
			
			model.setAmount(warehouseOutcome.getAmount());
			model.setIngredientId(warehouseOutcome.getIngredient().getId());
			model.setIngredientName(warehouseOutcome.getIngredient().getName());
			
			model.setUnitId(warehouseOutcome.getUnit().getId());
			model.setUnitName(warehouseOutcome.getUnit().getName());
			
			model.setOutcomeDate(warehouseOutcome.getOutcomeDate());
			model.setOutcomeReason(warehouseOutcome.getOutcomeReason());
			
			model.setUser(warehouseOutcome.getUser() == null ? "" : warehouseOutcome.getUser().getName());
			if (warehouseOutcome.getCreatedDate() != null)
				model.setCreatedDate(warehouseOutcome.getCreatedDate().getTime());
			model.setId(warehouseOutcome.getId());
			if (warehouseOutcome.getModifiedDate() != null)
				model.setModifiedDate(warehouseOutcome.getModifiedDate().getTime());
			
			models.add(model);
		}
	
		StoreWrapper wrapper = new StoreWrapper();
		wrapper.success = true;
		wrapper.totalCount = WarehouseService.getWarehouseOutcomesCount();
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
		WarehouseOutcomeModel[] models = gson.fromJson(requestBody, WarehouseOutcomeModel[].class);
		Logger.info("Model.lenght: " + models.length);
		WarehouseService.addWarehouseOutcome(models, Security.connected());
		
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
		WarehouseOutcomeModel[] models = gson.fromJson(requestBody, WarehouseOutcomeModel[].class);
		Logger.info("Model.lenght: " + models.length);
		WarehouseService.updateWarehouseOutcome(models, Security.connected());
		
		StoreWrapper wrapper = new StoreWrapper();
		wrapper.success = true;
		renderJSON(wrapper);
	}	
	
	public static void destroy(long id) throws ValidationException {
		Logger.info("ID:" + id);
		WarehouseService.deleteWarehouseOutcome(id, Security.connected());
		StoreWrapper wrapper = new StoreWrapper();
		wrapper.success = true;
		renderJSON(wrapper);
	}
	
}
