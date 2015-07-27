package controllers;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import com.google.gson.Gson;

import kz.sushimi.console.exceptions.ValidationException;
import kz.sushimi.console.models.StoreWrapper;
import kz.sushimi.console.models.dictionaries.CityModel;
import kz.sushimi.console.services.dictionaries.CityService;
import play.Logger;
import play.mvc.Http.Request;


public class CityController extends SecuredController {

	
	public static void read(int page, int start, int limit) {
		String requestBody = params.current().get("body");
		Logger.info("City.read: " + requestBody);

		List<kz.sushimi.console.persistence.dictionaries.City> list = CityService.getCities(start, limit);
		
		ArrayList<CityModel> models = new ArrayList<CityModel>(); 
		for (kz.sushimi.console.persistence.dictionaries.City city : list) {
			CityModel model = new CityModel();
			model.setId(city.getId());
			model.setName(city.getName());
			model.setCode(city.getCode());
			
			model.setUser(city.getUser() == null ? "" : city.getUser().getName());
			if (city.getCreatedDate() != null)
				model.setCreatedDate(city.getCreatedDate().getTime());
			if (city.getModifiedDate() != null)
				model.setModifiedDate(city.getModifiedDate().getTime());
			
			models.add(model);
		}

		StoreWrapper wrapper = new StoreWrapper();
		wrapper.success = true;
		wrapper.totalCount = CityService.getCitiesCount();
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
		CityModel[] models = gson.fromJson(requestBody, CityModel[].class);
		Logger.info("Model.lenght: " + models.length);
		CityService.addCities(models, Security.connected());
		
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
		CityModel[] models = gson.fromJson(requestBody, CityModel[].class);
		Logger.info("Model.lenght: " + models.length);
		CityService.updateCities(models, Security.connected());
		
		StoreWrapper wrapper = new StoreWrapper();
		wrapper.success = true;
		renderJSON(wrapper);
	}	
	
	public static void destroy(long id) throws ValidationException {
		Logger.info("ID:" + id);
		CityService.deleteCity(id, Security.connected());
		StoreWrapper wrapper = new StoreWrapper();
		wrapper.success = true;
		renderJSON(wrapper);
	}
}
