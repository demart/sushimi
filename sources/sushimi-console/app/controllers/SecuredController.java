package controllers;

import kz.sushimi.console.persistence.users.User;
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
            User user = User.find("login", Security.connected()).first();
            renderArgs.put("user_id", user.getId());
            renderArgs.put("user_name", user.getName());
            renderArgs.put("user_login", user.getLogin());
            renderArgs.put("user_role", user.getRole());
        }
    }
    
    
}
