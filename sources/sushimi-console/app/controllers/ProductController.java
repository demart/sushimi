package controllers;

import java.util.ArrayList;
import java.util.List;

import kz.sushimi.console.exceptions.ValidationException;
import kz.sushimi.console.models.StoreWrapper;
import kz.sushimi.console.models.dictionaries.ProductModel;
import kz.sushimi.console.models.orders.OrderProductModel;
import kz.sushimi.console.persistence.dictionaries.ProductType;
import kz.sushimi.console.services.dictionaries.ProductService;
import play.Logger;
import play.mvc.Controller;

import com.google.gson.Gson;

/**
 * Контроллер для управления продуктами
 * 
 * @author Demart
 *
 */
public class ProductController extends Controller {
	
	
	public static void readAllProducts(int page, int start, int limit) {
		String requestBody = params.current().get("body");
		Logger.info("ProductForOrders.read: " + requestBody);
	
		int count = Integer.valueOf(ProductService.getProductsCount().toString());
		List<kz.sushimi.console.persistence.dictionaries.Product> list = ProductService.getProducts(0, count);
		
		ArrayList<OrderProductModel> models = new ArrayList<OrderProductModel>(); 
		for (kz.sushimi.console.persistence.dictionaries.Product product : list) {
			OrderProductModel model = new OrderProductModel();
			model.setId(product.getId());
			model.setCode(model.getCode());
			model.setName(product.getName());
			model.setAmount(0);
			model.setCost(product.getCost());
			model.setBarCost(product.getBarCost());

			model.setOwner(product.getOwner());
			model.setType(product.getType());
			
			if (product.getCategory() != null) {
				model.setCategoryId(product.getCategory().getId());
				model.setCategoryName(product.getCategory().getName());
			}
			
			models.add(model);
		}
	
		StoreWrapper wrapper = new StoreWrapper();
		wrapper.success = true;
		wrapper.totalCount = count;
		wrapper.data = models.toArray();
		renderJSON(wrapper);		
	}
	
	
	public static void read(int page, int start, int limit) {
		String requestBody = params.current().get("body");
		Logger.info("Product.read: " + requestBody);
	
		List<kz.sushimi.console.persistence.dictionaries.Product> list = ProductService.getProducts(start, limit);
		
		ArrayList<ProductModel> models = new ArrayList<ProductModel>(); 
		for (kz.sushimi.console.persistence.dictionaries.Product product : list) {
			ProductModel model = new ProductModel();
			
			model.setName(product.getName());
			model.setCode(product.getCode());
			model.setType(product.getType());
			model.setOwner(product.getOwner());
			model.setDescription(product.getDescription());
			model.setBarCost(product.getBarCost());
			model.setCost(product.getCost());
			model.setCostPrice(product.getCostPrice());
			
			if (product.getCategory() != null) {
				model.setCategoryId(product.getCategory().getId());
				model.setCategoryName(product.getCategory().getName());
			}
			
			model.setUser(product.getUser() == null ? "" : product.getUser().getName());
			if (product.getCreatedDate() != null)
				model.setCreatedDate(product.getCreatedDate().getTime());
			model.setId(product.getId());
			if (product.getModifiedDate() != null)
				model.setModifiedDate(product.getModifiedDate().getTime());
			
			models.add(model);
		}
	
		StoreWrapper wrapper = new StoreWrapper();
		wrapper.success = true;
		wrapper.totalCount = ProductService.getProductsCount();
		wrapper.data = models.toArray();
		renderJSON(wrapper);
	}
	
	
	/**
	 * Добавить новую запись
	 * 
	 * @param model
	 * @throws ValidationException 
	 */
	public static void create() throws ValidationException {
		String requestBody = params.current().get("body");
		Logger.info("Create: " + requestBody);
		if (!requestBody.startsWith("["))
			requestBody = "[" + requestBody + "]";
			
		Gson gson = new Gson();
		ProductModel[] models = gson.fromJson(requestBody, ProductModel[].class);
		Logger.info("Model.lenght: " + models.length);
		ProductService.addProduct(models, Security.connected());
		
		StoreWrapper wrapper = new StoreWrapper();
		wrapper.success = true;
		renderJSON(wrapper);
	}
	
	
	/**
	 * Обновить запись
	 * 
	 * @param model
	 * @throws ValidationException 
	 */
	public static void update() throws ValidationException {
		String requestBody = params.current().get("body");
		Logger.info("Update: " + requestBody);
		if (!requestBody.startsWith("["))
			requestBody = "[" + requestBody + "]";
		Gson gson = new Gson();
		Logger.info("Update: " + requestBody);
		ProductModel[] models = gson.fromJson(requestBody, ProductModel[].class);
		Logger.info("Model.lenght: " + models.length);
		ProductService.updateProduct(models, Security.connected());
		
		StoreWrapper wrapper = new StoreWrapper();
		wrapper.success = true;
		renderJSON(wrapper);
	}	
	
	public static void destroy(long id) throws ValidationException {
		Logger.info("ID:" + id);
		ProductService.deleteProduct(id, Security.connected());
		StoreWrapper wrapper = new StoreWrapper();
		wrapper.success = true;
		renderJSON(wrapper);
	}
}
