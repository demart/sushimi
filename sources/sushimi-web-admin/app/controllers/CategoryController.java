package controllers;

import java.util.ArrayList;
import java.util.List;

import com.google.gson.Gson;

import kz.sushimi.admin.exceptions.PlatformException;
import kz.sushimi.admin.models.dictionaries.CategoryModel;
import kz.sushimi.admin.models.wrapper.ResponseWrapper;
import kz.sushimi.admin.persistence.dictionaries.Category;
import kz.sushimi.admin.service.users.UserService;
import kz.sushimi.admin.services.dictionaries.CategoryService;
import play.Logger;
import play.mvc.Controller;

public class CategoryController  extends Controller {
	
	public static void readAllCategories () throws PlatformException {
		Logger.info("Read all categories. User is " + Security.connected());
		
		ResponseWrapper wrapper = new ResponseWrapper();
		
		if (UserService.checkTitleToUse(Security.connected()) == true) {
			List<Category> list = CategoryService.getCategories();
			Logger.info("Size of list " + list.size());
			ArrayList<CategoryModel> models = CategoryService.listOfCategories(list);
			Logger.info("Size of models " + models.size());
			wrapper.data = models.toArray();
			wrapper.success = true;
			renderJSON(wrapper);
		}
		
		else {
			wrapper.message = "User is " + Security.connected() + " not rights";
			wrapper.success = false;
			renderJSON(wrapper);
		}
	}
	
	public static void readComboListCategory () throws PlatformException {
		Logger.info("Read all categories for combo list. User is " + Security.connected());
		
		ResponseWrapper wrapper = new ResponseWrapper();
		
		if (UserService.checkTitleToUse(Security.connected()) == true) {
			List<Category> list = CategoryService.getCategories();
			Logger.info("Size of list " + list.size());
			ArrayList<CategoryModel> models = CategoryService.comboListOfCategories(list);
			Logger.info("Size of models " + models.size());
			wrapper.data = models.toArray();
			wrapper.success = true;
			renderJSON(wrapper);
		}
		
		else {
			wrapper.message = "User is " + Security.connected() + " not rights";
			wrapper.success = false;
			renderJSON(wrapper);
		}
	}
	
	public static void updateCurrentCategory () throws PlatformException {
		Logger.info ("Update current category. User is " + Security.connected());
		
		ResponseWrapper wrapper = new ResponseWrapper();
		
		if (UserService.checkTitleToUse(Security.connected()) == true) {
			String requestBody = params.current().get("body");
			Logger.info("Update: " + requestBody);
			if (!requestBody.startsWith("["))
				requestBody = "[" + requestBody + "]";
				
			Gson gson = new Gson();
			CategoryModel[] models = gson.fromJson(requestBody, CategoryModel[].class);
			
			CategoryService.updateCurrentCategory(models, Security.connected());
			
			wrapper.success = true;
			renderJSON(wrapper);
		}
		
		else {
			wrapper.message = "User is " + Security.connected() + " not rights";
			wrapper.success = false;
			renderJSON(wrapper);
		}
	}

}
