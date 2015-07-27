package controllers;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

import kz.sushimi.console.exceptions.ValidationException;
import kz.sushimi.console.models.StoreWrapper;
import kz.sushimi.console.models.warehouses.WarehouseIncomeModel;
import kz.sushimi.console.services.WarehouseService;
import play.Logger;
import play.mvc.Controller;

import com.google.gson.Gson;

public class WarehouseIncomeController extends Controller {
	
	public static void read(Long productId, int page, int start, int limit) {
		String requestBody = params.current().get("body");
		Logger.info("WarehouseIncome.read: " + requestBody);
	
		List<kz.sushimi.console.persistence.warehouses.WarehouseIncome> list = WarehouseService.getWarehouseIncomes(start, limit);
		
		ArrayList<WarehouseIncomeModel> models = new ArrayList<WarehouseIncomeModel>(); 
		for (kz.sushimi.console.persistence.warehouses.WarehouseIncome warehouseIncome : list) {
			WarehouseIncomeModel model = new WarehouseIncomeModel();
			
			model.setId(warehouseIncome.getId());
			
			model.setWarehouseItemId(warehouseIncome.getWarehouseItem().getId());
			model.setWarehouseItemName(warehouseIncome.getWarehouseItem().getIngredient().getName());
			
			model.setGrossUnitId(warehouseIncome.getGrossUnit().getId());
			model.setGrossUnitName(warehouseIncome.getGrossUnit().getName());
			model.setGrossWeight(warehouseIncome.getGrossWeight());
			
			model.setNetUnitId(warehouseIncome.getNetUnit().getId());
			model.setNetUnitName(warehouseIncome.getNetUnit().getName());
			model.setNetWeight(warehouseIncome.getNetWeight());
			
			model.setIngredientId(warehouseIncome.getIngredient().getId());
			model.setIngredientName(warehouseIncome.getIngredient().getName());
			
			model.setInvoiceNumber(warehouseIncome.getInvoiceNumber());
			model.setPrice(warehouseIncome.getPrice());
			model.setType(warehouseIncome.getType());
		
			model.setPurchaseUserId(warehouseIncome.getPurchaseUser().getId());
			model.setPurchaseUserName(warehouseIncome.getPurchaseUser().getName());
			
			model.setUser(warehouseIncome.getUser() == null ? "" : warehouseIncome.getUser().getName());
			if (warehouseIncome.getCreatedDate() != null)
				model.setCreatedDate(warehouseIncome.getCreatedDate().getTime());
			model.setId(warehouseIncome.getId());
			if (warehouseIncome.getModifiedDate() != null)
				model.setModifiedDate(warehouseIncome.getModifiedDate().getTime());
			
			models.add(model);
		}
	
		StoreWrapper wrapper = new StoreWrapper();
		wrapper.success = true;
		wrapper.totalCount = WarehouseService.getWarehouseIncomesCount();
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
		WarehouseIncomeModel[] models = gson.fromJson(requestBody, WarehouseIncomeModel[].class);
		Logger.info("Model.lenght: " + models.length);
		WarehouseService.addWarehouseIncome(models, Security.connected());
		
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
		WarehouseIncomeModel[] models = gson.fromJson(requestBody, WarehouseIncomeModel[].class);
		Logger.info("Model.lenght: " + models.length);
		WarehouseService.updateWarehouseIncome(models, Security.connected());
		
		StoreWrapper wrapper = new StoreWrapper();
		wrapper.success = true;
		renderJSON(wrapper);
	}	
	
	public static void destroy(long id) throws ValidationException {
		Logger.info("ID:" + id);
		WarehouseService.deleteWarehouseIncome(id, Security.connected());
		StoreWrapper wrapper = new StoreWrapper();
		wrapper.success = true;
		renderJSON(wrapper);
	}
	
}
