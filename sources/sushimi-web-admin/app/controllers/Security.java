package controllers;

import play.Logger;

import org.apache.commons.lang.StringUtils;

import kz.sushimi.admin.exceptions.PlatformException;
import kz.sushimi.admin.persistence.users.User;
import kz.sushimi.admin.service.users.UserService;

public class Security extends Secure.Security  {

	 static boolean authenticate (String username, String password) {
		 Logger.info("authenticate Login: " + username + " password: " + password);
		 
		if (StringUtils.isEmpty(username) || StringUtils.isEmpty(password))
			Logger.info("Login or password is null");
			
		 User user =  UserService.authauthenticate(username, password);
		 if (user != null) {
			 System.out.println ("OK");
			 return true;
		 }
		 else {
			 System.out.println ("ERROR");
			 return false;
		 }
	 }
	 
}