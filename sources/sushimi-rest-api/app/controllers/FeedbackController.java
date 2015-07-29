package controllers;

import java.util.ArrayList;
import java.util.List;

import kz.sushimi.persistence.FeedbackType;
import kz.sushimi.persistence.dictionaries.City;
import kz.sushimi.persistence.dictionaries.Department;
import kz.sushimi.restapi.v1.exceptions.ErrorCode;
import kz.sushimi.restapi.v1.exceptions.SushimiException;
import kz.sushimi.restapi.v1.exceptions.SushimiValidationException;
import kz.sushimi.restapi.v1.models.feedback.FeedbackCityModel;
import kz.sushimi.restapi.v1.models.feedback.FeedbackListRequestModel;
import kz.sushimi.restapi.v1.models.feedback.FeedbackMetaInformationModel;
import kz.sushimi.restapi.v1.models.feedback.FeedbackRegisterModel;
import kz.sushimi.restapi.v1.models.feedback.FeedbackRegisterResponseModel;
import kz.sushimi.restapi.v1.models.feedback.FeedbackRestaurantModel;
import kz.sushimi.restapi.v1.models.feedback.FeedbackTypeModel;
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
		FeedbacksWrapperModel model = FeedbackService.getFeedbacks(page, pageSize, type);
		renderJSON(Wrapper.getSuccess(model));
	}
	
	public static void getFeedbackMetaInfo() {
		FeedbackMetaInformationModel model = new FeedbackMetaInformationModel();
		
		// Feedback types
		List<FeedbackTypeModel> feedbackTypeModels = new ArrayList<FeedbackTypeModel>();
		feedbackTypeModels.add(new FeedbackTypeModel(FeedbackType.FEEDBACK, "Отзывы/Пожелания"));
		feedbackTypeModels.add(new FeedbackTypeModel(FeedbackType.DELIVERY, "Доставка"));
		feedbackTypeModels.add(new FeedbackTypeModel(FeedbackType.RESTAURANT, "Рестораны"));
		feedbackTypeModels.add(new FeedbackTypeModel(FeedbackType.WEB, "Сайт"));
		feedbackTypeModels.add(new FeedbackTypeModel(FeedbackType.MOBILE, "Мобильные приложения"));
		
		model.types = feedbackTypeModels;
		// Feedback Cities + Restaurants
		List<FeedbackCityModel> cityModels = new ArrayList<FeedbackCityModel>();
		List<City> cities =  DictionaryService.getCities();
		for (City city : cities) {
			// Restaurant
			List<Department> restaurants = DictionaryService.getCityDepartments(DictionaryService.getDefaultCity().getId());
			List<FeedbackRestaurantModel> restaurantModels = new ArrayList<FeedbackRestaurantModel>();
			for (Department restaurant : restaurants)
				restaurantModels.add(new FeedbackRestaurantModel(restaurant.getName(), restaurant.getId()));
			FeedbackCityModel cityModel = new FeedbackCityModel(city.getName(), city.getId());
			cityModel.restaurants = restaurantModels;
			cityModels.add(cityModel);
		}
		model.cities = cityModels;
		renderJSON(Wrapper.getSuccess(model));
	}
	
	public static void getFeedbackTypes() {
		List<FeedbackTypeModel> models = new ArrayList<FeedbackTypeModel>();
		models.add(new FeedbackTypeModel(FeedbackType.FEEDBACK, "Отзывы/Пожелания"));
		models.add(new FeedbackTypeModel(FeedbackType.DELIVERY, "Доставка"));
		models.add(new FeedbackTypeModel(FeedbackType.RESTAURANT, "Рестораны"));
		models.add(new FeedbackTypeModel(FeedbackType.WEB, "Сайт"));
		models.add(new FeedbackTypeModel(FeedbackType.MOBILE, "Мобильные приложения"));
		renderJSON(Wrapper.getSuccess(models));
	}
	
	public static void getCities(){
		List<FeedbackCityModel> models = new ArrayList<FeedbackCityModel>();
		List<City> cities =  DictionaryService.getCities();
		for (City city : cities)
			models.add(new FeedbackCityModel(city.getName(), city.getId()));
		renderJSON(Wrapper.getSuccess(models));
	}
    
	public static void getRestaurants(Integer cityId){
		List<FeedbackRestaurantModel> models = new ArrayList<FeedbackRestaurantModel>();
		List<Department> restaurants;
		
		if (cityId == null) {
			// Potential null problem
			restaurants =  DictionaryService.getCityDepartments(DictionaryService.getDefaultCity().getId());	
		} else {
			restaurants =  DictionaryService.getCityDepartments(cityId);
		}
		
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
