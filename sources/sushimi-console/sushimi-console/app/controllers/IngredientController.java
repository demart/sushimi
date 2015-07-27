package controllers;

import java.util.ArrayList;
import java.util.List;

import kz.sushimi.console.exceptions.ValidationException;
import kz.sushimi.console.models.StoreWrapper;
import kz.sushimi.console.models.dictionaries.CityModel;
import kz.sushimi.console.models.dictionaries.IngredientModel;
import kz.sushimi.console.services.dictionaries.CityService;
import kz.sushimi.console.services.dictionaries.IngredientService;
import play.Logger;

import com.google.gson.Gson;

public class IngredientController extends SecuredController {

	
	public static void read(int page, int start, int limit) {
		String requestBody = params.current().get("body");
		Logger.info("Ingredient.read: " + requestBody);
		Logger.info("Ingredient.read: " + requestBody);

		List<kz.sushimi.console.persistence.dictionaries.Ingredient> list = IngredientService.getIngredients(start, limit);
		
		ArrayList<IngredientModel> models = new ArrayList<IngredientModel>(); 
		for (kz.sushimi.console.persistence.dictionaries.Ingredient ingredient : list) {
			IngredientModel model = new IngredientModel();
			if (ingredient.getCreatedDate() != null)
				model.setCreatedDate(ingredient.getCreatedDate().getTime());
			model.setId(ingredient.getId());
			if (ingredient.getModifiedDate() != null)
				model.setModifiedDate(ingredient.getModifiedDate().getTime());
			model.setName(ingredient.getName());
			model.setUser(ingredient.getUser() == null ? "" : ingredient.getUser().getName());
			model.setUnitId(ingredient.getUnit().getId());
			model.setUnitName(ingredient.getUnit().getName());
			models.add(model);
		}

		StoreWrapper wrapper = new StoreWrapper();
		wrapper.success = true;
		wrapper.totalCount = IngredientService.getIngredientsCount();
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
		IngredientModel[] models = gson.fromJson(requestBody, IngredientModel[].class);
		Logger.info("Model.lenght: " + models.length);
		IngredientService.addIngredients(models, Security.connected());
		
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
		IngredientModel[] models = gson.fromJson(requestBody, IngredientModel[].class);
		Logger.info("Model.lenght: " + models.length);
		IngredientService.updateIngredients(models, Security.connected());
		
		StoreWrapper wrapper = new StoreWrapper();
		wrapper.success = true;
		renderJSON(wrapper);
	}	
	
	public static void destroy(long id) throws ValidationException {
		Logger.info("ID:" + id);
		IngredientService.deleteIngredient(id, Security.connected());
		StoreWrapper wrapper = new StoreWrapper();
		wrapper.success = true;
		renderJSON(wrapper);
	}	
	
}
