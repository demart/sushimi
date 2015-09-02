package controllers;

import kz.sushimi.console.exceptions.ValidationException;
import kz.sushimi.console.models.ResponseWrapper;
import kz.sushimi.console.models.users.UserModel;
import kz.sushimi.console.persistence.users.User;
import kz.sushimi.console.services.UserService;
import play.mvc.Controller;

public class ArmApplication extends Controller {
    
    public static void index() {
        renderTemplate("Application/arm_index.html");
    }
    
    public static void login(String login){
    	ResponseWrapper rw = new ResponseWrapper();
    	if (login == null || "".equals(login)) {
    		rw.success = false;
    		rw.message = "Необходимо ввести логин";
    		renderJSON(rw);
    	}
    	
    	try {
			User currentUser = UserService.getUserByLogin(login);
			if (currentUser == null) {
				rw.success = false;
	    		rw.message = "Пользователь не найден, введите другой логин";
	    		renderJSON(rw);
			}

			session.put("username", currentUser.getLogin());
			
			UserModel model = new UserModel();
			model.setId(currentUser.getId());
			model.setLogin(currentUser.getLogin());
			model.setName(currentUser.getName());
			model.setRole(currentUser.getRole());

			rw.success = true;
			rw.data = model;
			renderJSON(rw);
		} catch (ValidationException e) {
			e.printStackTrace();
    		rw.success = false;
    		rw.message = "Ошибка при чтение информации из БД:" + e.getMessage();
    		renderJSON(rw);
		}
    	
    }
    
    public static void logout() {
    	session.clear();
        response.removeCookie("rememberme");
        ResponseWrapper rw = new ResponseWrapper();
        rw.success = true;
        rw.message = "Вы успешно вышли из системы";
        renderJSON(rw);
    }
    
    public static void getUser() {
    	String login = session.get("username");
    	ResponseWrapper rw = new ResponseWrapper();
    	
    	if (login == null || "".equals(login)) {
    		rw.success = false;
    		rw.message = "Необходимо авторизоваться";
    		renderJSON(rw);
    	}
    	
     	try {
			User currentUser = UserService.getUserByLogin(login);
			if (currentUser == null) {
				rw.success = false;
	    		rw.message = "Пользователь не найден, необходима повторная авторизация";
	    		renderJSON(rw);
			}
			
			UserModel model = new UserModel();
			model.setId(currentUser.getId());
			model.setLogin(currentUser.getLogin());
			model.setName(currentUser.getName());
			model.setRole(currentUser.getRole());

			rw.success = true;
			rw.data = model;
			renderJSON(rw);
		} catch (ValidationException e) {
			e.printStackTrace();
    		rw.success = false;
    		rw.message = "Ошибка при чтение информации из БД:" + e.getMessage();
    		renderJSON(rw);
		}
    }
}