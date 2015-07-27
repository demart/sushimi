package controllers;

import java.util.ArrayList;
import java.util.List;

import kz.sushimi.console.models.StoreWrapper;
import kz.sushimi.console.models.users.UserModel;
import kz.sushimi.console.persistence.users.User;
import kz.sushimi.console.services.UserService;
import play.Logger;
import play.mvc.Controller;

public class UserController extends Controller {
	
	public static void read(int page, int start, int limit) {
		String requestBody = params.current().get("body");
		Logger.info("User.read: " + requestBody);
	
		List<kz.sushimi.console.persistence.users.User> list = UserService.getUsers(start, limit);
		
		ArrayList<UserModel> models = new ArrayList<UserModel>(); 
		for (User user : list) {
			UserModel model = new UserModel();
			
			model.setId(user.getId());
			model.setName(user.getName());
			model.setLogin(user.getLogin());
			model.setPassword(user.getPassword());
			model.setRole(user.getRole());
						
			model.setUser(user.getUser() == null ? "" : user.getUser().getName());
			if (user.getCreatedDate() != null)
				model.setCreatedDate(user.getCreatedDate().getTime());
			model.setId(user.getId());
			if (user.getModifiedDate() != null)
				model.setModifiedDate(user.getModifiedDate().getTime());
			
			models.add(model);
		}
	
		StoreWrapper wrapper = new StoreWrapper();
		wrapper.success = true;
		wrapper.totalCount = UserService.getUsersCount();
		wrapper.data = models.toArray();
		renderJSON(wrapper);
	}
}
