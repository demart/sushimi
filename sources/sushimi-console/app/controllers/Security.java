package controllers;

import play.Logger;
import kz.sushimi.console.persistence.users.User;

public class Security extends Secure.Security  {

	 static boolean authenticate(String username, String password) {
		 //Logger.info("authenticate Login: " + username + " password: " + password);
		 User user =  User.find("login = ?1 and password = ?2", username, password).first();
		 return user != null;
	 }
	 
}