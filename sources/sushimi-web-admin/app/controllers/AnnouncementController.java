package controllers;

import java.util.ArrayList;
import java.util.List;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import kz.sushimi.admin.exceptions.PlatformException;
import kz.sushimi.admin.models.dictionaries.AnnouncementModel;
import kz.sushimi.admin.models.wrapper.ResponseWrapper;
import kz.sushimi.admin.persistence.dictionaries.Announcement;
import kz.sushimi.admin.service.users.UserService;
import kz.sushimi.admin.services.dictionaries.AnnouncementService;
import play.Logger;
import play.mvc.Controller;

public class AnnouncementController extends Controller {

	public static void readAllAnnouncements () throws PlatformException {
		Logger.info("Read all announcements. User is " + Security.connected());
		
		ResponseWrapper wrapper = new ResponseWrapper();
		
		if (UserService.checkTitleToUse(Security.connected()) == true) {
			List<Announcement> list = AnnouncementService.getAllAnnouncements();
			
			Logger.info ("Count = " + list.size());
			
			ArrayList<AnnouncementModel> models = AnnouncementService.listOfAnnouncements(list);
			
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
	
	public static void updateCurrentAnnouncement () throws PlatformException {
		Logger.info ("Update current staff. User is " + Security.connected());
		
		ResponseWrapper wrapper = new ResponseWrapper();
		
		if (UserService.checkTitleToUse(Security.connected()) == true) {
			String requestBody = params.current().get("body");
			Logger.info("Update: " + requestBody);
			if (!requestBody.startsWith("["))
				requestBody = "[" + requestBody + "]";
				
			Gson gson = new GsonBuilder().setDateFormat("MM/dd/yyyy").create();
			AnnouncementModel[] models = gson.fromJson(requestBody, AnnouncementModel[].class);
			
			AnnouncementService.updateCurrentAnnouncement(models, Security.connected());
			
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
