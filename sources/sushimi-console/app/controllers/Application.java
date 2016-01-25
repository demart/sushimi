package controllers;

import java.util.List;

import controllers.Secure.Security;
import play.Logger;
import kz.sushimi.console.models.ResponseWrapper;
import kz.sushimi.console.persistence.warehouses.WarehouseIncome;
import kz.sushimi.console.services.WarehouseService;

public class Application extends SecuredController {
	
    public static void index() {
        render();
    }

    
    public static void arm_index() {
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