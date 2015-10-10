package controllers;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import javax.xml.transform.TransformerException;

import kz.sushimi.console.exceptions.ValidationException;
import kz.sushimi.console.models.StoreWrapper;
import kz.sushimi.console.models.orders.OrderModel;
import kz.sushimi.console.models.orders.PreviewOrderItemModel;
import kz.sushimi.console.models.orders.PreviewOrderModel;
import kz.sushimi.console.persistence.orders.OrderItem;
import kz.sushimi.console.persistence.orders.OrderType;
import kz.sushimi.console.services.OperatorService;
import kz.sushimi.console.services.dictionaries.ProductService;
import play.Logger;

import play.mvc.Controller;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;



public class OperatorController extends Controller {
	
	public static void readCurrentOrders () {
		System.out.println ("Read current orders");
		
		List<kz.sushimi.console.persistence.orders.Order> list = OperatorService.getCurrentOrders();
		ArrayList<PreviewOrderModel> models = OperatorService.createOrdersList(list);
		
		StoreWrapper wrapper = new StoreWrapper();
		wrapper.success = true;
		wrapper.totalCount = ProductService.getProductsCount();
		wrapper.data = models.toArray();
		renderJSON(wrapper);
	}
	


}
