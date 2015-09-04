package controllers;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import kz.sushimi.models.PageModel;
import kz.sushimi.models.RegisterOrderModel;
import kz.sushimi.models.announcement.GetAnnouncementsAjaxResponse;
import kz.sushimi.models.feedback.FeedbackModel;
import kz.sushimi.models.feedback.FeedbackCityModel;
import kz.sushimi.models.feedback.FeedbackListRequestModel;
import kz.sushimi.models.feedback.FeedbackRegisterModel;
import kz.sushimi.models.feedback.FeedbackRegisterResponseModel;
import kz.sushimi.models.feedback.FeedbackRestaurantModel;
import kz.sushimi.models.feedback.FeedbackTypeModel;
import kz.sushimi.models.feedback.FeedbacksWrapperModel;
import kz.sushimi.persistence.FeedbackType;
import kz.sushimi.persistence.dictionaries.City;
import kz.sushimi.persistence.dictionaries.Department;
import kz.sushimi.service.DictionaryService;
import kz.sushimi.service.FeedbackService;
import kz.sushimi.service.PageService;
import play.Logger;
import play.mvc.Controller;
import play.mvc.Scope.Session;

import com.google.gson.Gson;

public class FeedbackController extends Controller {

	public static void index() {    	
		// PAGE
    	PageModel page = PageService.getPage("FEEDBACK"); 
    	
    	// DATA
		FeedbacksWrapperModel feedBackModel = FeedbackService.getFeedbacks(0, null);
		List<FeedbackTypeModel> feedBackTypeModels = getFeedbackTypes();
		renderTemplate("/Application/feedback.html", feedBackModel, feedBackTypeModels, page);
	}
	
	public static List<FeedbackTypeModel> getFeedbackTypes() {
		List<FeedbackTypeModel> models = new ArrayList<FeedbackTypeModel>();
		models.add(new FeedbackTypeModel(FeedbackType.ALL, "Все отзывы"));
		models.add(new FeedbackTypeModel(FeedbackType.FEEDBACK, "Отзывы/Пожелания"));
		models.add(new FeedbackTypeModel(FeedbackType.DELIVERY, "Доставка"));
		models.add(new FeedbackTypeModel(FeedbackType.RESTAURANT, "Рестораны"));
		models.add(new FeedbackTypeModel(FeedbackType.WEB, "Сайт"));
		models.add(new FeedbackTypeModel(FeedbackType.MOBILE, "Мобильные приложения"));
		return models;
	}
	
	public static void getFeedbacks(Integer page, String type) {
		String requestBody = params.current().get("body");
    	Gson gson = new Gson();
    	FeedbackListRequestModel requestModel = gson.fromJson(requestBody, FeedbackListRequestModel.class);
		Logger.info(requestBody);
		FeedbacksWrapperModel model = FeedbackService.getFeedbacks(requestModel.page, requestModel.type);
		renderJSON(model);
	}
	
	public static void  getFeedbackDetail(Long id) {
		// PAGE
    	PageModel page = PageService.getPage("FEEDBACK_DETAIL"); 
    	
    	// DATA
		FeedbackModel feedbackModel = FeedbackService.getFeedbackById(id);
		renderTemplate("/Application/feedbackDetail.html", feedbackModel, page);
	}
	
	public static void registerFeedback() {
		String requestBody = params.current().get("body");
    	Gson gson = new Gson();
    	FeedbackRegisterModel requestModel = gson.fromJson(requestBody, FeedbackRegisterModel.class);
		boolean result = FeedbackService.registerFeedback(requestModel);
		
		FeedbackRegisterResponseModel model = new FeedbackRegisterResponseModel();
		model.Success = result;
		model.Timeout = 0;
		model.Message = result == true ? "Отзыв успешно зарегистрирован. Спасибо!" : "Ошибка при попытке зарегистрировать запрос, попробуйте позднее.";;
		model.Data = null;
		model.MessageType = result == true ? "success" : "warning";
		renderJSON(model);
	}
	
	public static void getCities(){
		List<FeedbackCityModel> models = new ArrayList<FeedbackCityModel>();
		List<City> cities =  DictionaryService.getCities();
		for (City city : cities)
			models.add(new FeedbackCityModel(city.getName(), city.getId()));
		renderJSON(models);
	}
    
	public static void getRestaurants(){
		List<FeedbackRestaurantModel> models = new ArrayList<FeedbackRestaurantModel>();
		List<Department> restaurants =  DictionaryService.getCityDepartments(DictionaryService.getDefaultCity());
		for (Department restaurant : restaurants)
			models.add(new FeedbackRestaurantModel(restaurant.getName(), restaurant.getId()));
		renderJSON(models);
	}
	
}