package controllers;

import play.*;
import play.mvc.*;

import java.util.*;

import controllers.Secure.Security;
import kz.sushimi.admin.models.wrapper.ResponseWrapper;
import models.*;

public class Application extends SecuredController {

    public static void index() {
        render();
    }

    public static void logout() {
    	Security.onDisconnect();
        session.clear();
        response.removeCookie("rememberme");
        Security.onDisconnected();
        flash.success("secure.logout");
        ResponseWrapper rw = new ResponseWrapper();
        rw.success = true;
        rw.message = "Вы успешно вышли из системы";
        renderJSON(rw);
    }
}