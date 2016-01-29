package controllers;


import kz.sushimi.admin.persistence.users.User;
import kz.sushimi.admin.service.users.UserService;
import play.Logger;
import play.mvc.Before;
import play.mvc.Controller;
import play.mvc.With;


	@With(Secure.class)
	public class SecuredController extends Controller  {

	    @Before
	    static void setConnectedUser() {
	        if(Security.isConnected()) {
	        	Logger.info("setConnectedUser() Security.connected: " + Security.connected());
	        	User user = UserService.isConnected(Security.connected());
	        	
	        	if (user != null) {
	        		renderArgs.put("user_name", user.getName());
	            	renderArgs.put("user_role", user.getRole());
	        	}
	        	
	        	else {
	        		Logger.info("User not found");
	        	}
	        }
	    }
	    
	    
	}

