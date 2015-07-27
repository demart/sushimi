package controllers;

import java.util.ArrayList;
import java.util.List;

import kz.sushimi.console.exceptions.ValidationException;
import kz.sushimi.console.models.StoreWrapper;
import kz.sushimi.console.models.dictionaries.UnitModel;
import kz.sushimi.console.services.dictionaries.CityService;
import kz.sushimi.console.services.dictionaries.UnitService;
import play.Logger;

import com.google.gson.Gson;

public class UnitController extends SecuredController {

	public static void read(int page, int start, int limit) {
		String requestBody = params.current().get("body");
		Logger.info("Unit.read: " + requestBody);
		
		List<kz.sushimi.console.persistence.dictionaries.Unit> list = UnitService.getUnits(start, limit);
		
		ArrayList<UnitModel> models = new ArrayList<UnitModel>(); 
		for (kz.sushimi.console.persistence.dictionaries.Unit unit : list) {
			UnitModel model = new UnitModel();
			if (unit.getCreatedDate() != null)
				model.createdDate = unit.getCreatedDate().getTime();
			model.id = unit.getId();
			if (unit.getModifiedDate() != null)
				model.modifiedDate = unit.getModifiedDate().getTime();
			model.name = unit.getName();
			model.shortName = unit.getShortName();
			model.user = unit.getUser() == null ? "" : unit.getUser().getName();
			models.add(model);
		}
		
		StoreWrapper wrapper = new StoreWrapper();
		wrapper.success = true;
		wrapper.totalCount = UnitService.getUnitsCount();
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
		UnitModel[] models = gson.fromJson(requestBody, UnitModel[].class);
		Logger.info("Model.lenght: " + models.length);
		UnitService.addUnits(models, Security.connected());
		
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
		UnitModel[] models = gson.fromJson(requestBody, UnitModel[].class);
		Logger.info("Model.lenght: " + models.length);
		UnitService.updateUnits(models, Security.connected());
		
		StoreWrapper wrapper = new StoreWrapper();
		wrapper.success = true;
		renderJSON(wrapper);
	}	
	
	public static void destroy(long id) throws ValidationException {
		Logger.info("ID:" + id);
		UnitService.deleteUnit(id, Security.connected());
		StoreWrapper wrapper = new StoreWrapper();
		wrapper.success = true;
		renderJSON(wrapper);
	}
	
}
