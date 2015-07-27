package controllers;

import java.util.List;

import play.Logger;

import kz.sushimi.console.persistence.warehouses.WarehouseIncome;
import kz.sushimi.console.services.WarehouseService;

public class Application extends SecuredController {
	
    public static void index() {
        render();
    }

}