package controllers;

import java.util.ArrayList;
import java.util.List;

import com.google.gson.Gson;

import kz.sushimi.admin.exceptions.PlatformException;
import kz.sushimi.admin.models.users.UserModel;
import kz.sushimi.admin.models.wrapper.ResponseWrapper;
import kz.sushimi.admin.persistence.users.User;
import kz.sushimi.admin.service.users.UserService;
import play.Logger;
import play.mvc.Controller;

public class UserController extends Controller {
	
	public static void readAllStaff () throws PlatformException {
		Logger.info("Read all staf. User is " + Security.connected());
		
		ResponseWrapper wrapper = new ResponseWrapper();
		
		if (UserService.checkTitleToUse(Security.connected()) == true) {
			List<User> users = UserService.getAllStaff();
			
			Logger.info ("Count = " + users.size());
			
			ArrayList<UserModel> models = UserService.listOfStaff(users);
			
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
	
	public static void addNewStaff () throws PlatformException {
		Logger.info ("Add new staff. User is " + Security.connected());
		
		ResponseWrapper wrapper = new ResponseWrapper();
		
		if (UserService.checkTitleToUse(Security.connected()) == true) {
			String requestBody = params.current().get("body");
			Logger.info("Create: " + requestBody);
			if (!requestBody.startsWith("["))
				requestBody = "[" + requestBody + "]";
				
			Gson gson = new Gson();
			UserModel[] models = gson.fromJson(requestBody, UserModel[].class);
			
			UserService.addNewStaff (models, Security.connected());
			
			wrapper.success = true;
			renderJSON(wrapper);
		}
		
		else {
			wrapper.message = "User is " + Security.connected() + " not rights";
			wrapper.success = false;
			renderJSON(wrapper);
		}
	}
	
	
	public static void updateCurrentStaff () throws PlatformException {
		Logger.info ("Update current staff. User is " + Security.connected());
		
		ResponseWrapper wrapper = new ResponseWrapper();
		
		if (UserService.checkTitleToUse(Security.connected()) == true) {
			String requestBody = params.current().get("body");
			Logger.info("Update: " + requestBody);
			if (!requestBody.startsWith("["))
				requestBody = "[" + requestBody + "]";
				
			Gson gson = new Gson();
			UserModel[] models = gson.fromJson(requestBody, UserModel[].class);
			
			UserService.updateCurrentStaff(models, Security.connected());
			
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
