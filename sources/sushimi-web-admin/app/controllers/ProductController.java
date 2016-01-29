package controllers;

import java.util.ArrayList;
import java.util.List;

import com.google.gson.Gson;

import kz.sushimi.admin.exceptions.PlatformException;
import kz.sushimi.admin.models.dictionaries.ProductModel;
import kz.sushimi.admin.models.wrapper.ResponseWrapper;
import kz.sushimi.admin.persistence.dictionaries.Product;
import kz.sushimi.admin.service.users.UserService;
import kz.sushimi.admin.services.dictionaries.ProductService;
import play.Logger;
import play.mvc.Controller;

public class ProductController extends Controller {
	
	public static void readAllProducts () throws PlatformException {
		Logger.info("Read all products. User is " + Security.connected());
		
		ResponseWrapper wrapper = new ResponseWrapper();
		
		if (UserService.checkTitleToUse(Security.connected()) == true) {
			List<Product> list = ProductService.getProducts();
			Logger.info("Size of list " + list.size());
			ArrayList<ProductModel> models = ProductService.listOfProducts(list);
			Logger.info("Size of models " + models.size());
			wrapper.data = models.toArray();
			wrapper.success = true;
			renderJSON(wrapper);
		}
		
		else {
			wrapper.message = "User is " + Security.connected() + " not rights";
			wrapper.success = false;
			renderJSON(wrapper);
		}
	}
	
	public static void updateCurrentProduct () throws PlatformException {
		Logger.info ("Update current product. User is " + Security.connected());
		
		ResponseWrapper wrapper = new ResponseWrapper();
		
		if (UserService.checkTitleToUse(Security.connected()) == true) {
			String requestBody = params.current().get("body");
			Logger.info("Update: " + requestBody);
			if (!requestBody.startsWith("["))
				requestBody = "[" + requestBody + "]";
				
			Gson gson = new Gson();
			ProductModel[] models = gson.fromJson(requestBody, ProductModel[].class);
			
			ProductService.updateCurrentProduct(models, Security.connected());
			
			wrapper.success = true;
			renderJSON(wrapper);
		}
		
		else {
			wrapper.message = "User is " + Security.connected() + " not rights";
			wrapper.success = false;
			renderJSON(wrapper);
		}
	}
	
	public static void searchProduct (String text) throws PlatformException {
		Logger.info("Search product. User is " + Security.connected());
		
		ResponseWrapper wrapper = new ResponseWrapper();
		
		if (UserService.checkTitleToUse(Security.connected()) == true) {
			List<Product> list = ProductService.searchProducts(text);
			Logger.info("Size of list " + list.size());
			ArrayList<ProductModel> models = ProductService.listOfProducts(list);
			Logger.info("Size of models " + models.size());
			wrapper.data = models.toArray();
			wrapper.success = true;
			renderJSON(wrapper);
		}
		
		else {
			wrapper.message = "User is " + Security.connected() + " not rights";
			wrapper.success = false;
			renderJSON(wrapper);
		}
	}

}
