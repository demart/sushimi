package controllers;

import java.util.ArrayList;
import java.util.List;

import kz.sushimi.persistence.dictionaries.City;
import kz.sushimi.persistence.dictionaries.Department;
import kz.sushimi.restapi.v1.exceptions.ErrorCode;
import kz.sushimi.restapi.v1.exceptions.SushimiException;
import kz.sushimi.restapi.v1.exceptions.SushimiValidationException;
import kz.sushimi.restapi.v1.models.feedback.FeedbackCityModel;
import kz.sushimi.restapi.v1.models.feedback.FeedbackListRequestModel;
import kz.sushimi.restapi.v1.models.feedback.FeedbackRegisterModel;
import kz.sushimi.restapi.v1.models.feedback.FeedbackRegisterResponseModel;
import kz.sushimi.restapi.v1.models.feedback.FeedbackRestaurantModel;
import kz.sushimi.restapi.v1.models.feedback.FeedbacksWrapperModel;
import kz.sushimi.restapi.v1.models.wrapper.Wrapper;
import kz.sushimi.restapi.v1.service.DictionaryService;
import kz.sushimi.restapi.v1.service.FeedbackService;

import org.apache.commons.lang.StringUtils;

import play.Logger;
import play.mvc.Controller;

import com.google.gson.Gson;
import com.google.gson.JsonSyntaxException;

public class FeedbackController extends Controller {
	
	public static void getFeedbacks(Integer page, Integer pageSize, String type) {
		//String requestBody = params.current().get("body");
    	//Gson gson = new Gson();
    	//FeedbackListRequestModel requestModel = gson.fromJson(requestBody, FeedbackListRequestModel.class);
		//Logger.info(requestBody);
		FeedbacksWrapperModel model = FeedbackService.getFeedbacks(page, pageSize, type);
		renderJSON(Wrapper.getSuccess(model));
	}
	
	public static void getCities(){
		List<FeedbackCityModel> models = new ArrayList<FeedbackCityModel>();
		List<City> cities =  DictionaryService.getCities();
		for (City city : cities)
			models.add(new FeedbackCityModel(city.getName(), city.getId()));
		renderJSON(Wrapper.getSuccess(models));
	}
    
	public static void getRestaurants(){
		List<FeedbackRestaurantModel> models = new ArrayList<FeedbackRestaurantModel>();
		List<Department> restaurants =  DictionaryService.getCityDepartments(DictionaryService.getDefaultCity());
		for (Department restaurant : restaurants)
			models.add(new FeedbackRestaurantModel(restaurant.getName(), restaurant.getId()));
		renderJSON(Wrapper.getSuccess(models));
	}	
	
	public static void registerFeedback() {
		String requestBody = params.current().get("body");
    	Gson gson = new Gson();
    	FeedbackRegisterModel requestModel = gson.fromJson(requestBody, FeedbackRegisterModel.class);
		boolean result = FeedbackService.registerFeedback(requestModel);
		renderJSON(Wrapper.getSuccess(null));
	}
	
}
