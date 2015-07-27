package controllers;

import java.util.ArrayList;
import java.util.List;

import kz.sushimi.models.CityModel;
import kz.sushimi.models.OrderModel;
import kz.sushimi.models.PageModel;
import kz.sushimi.models.RegisterOrderModel;
import kz.sushimi.models.order.RegisteredOrderModel;
import kz.sushimi.persistence.Cart;
import kz.sushimi.persistence.dictionaries.City;
import kz.sushimi.persistence.orders.Order;
import kz.sushimi.service.CartService;
import kz.sushimi.service.DictionaryService;
import kz.sushimi.service.OrderService;
import kz.sushimi.service.PageService;
import play.Logger;
import play.db.jpa.JPA;
import play.mvc.Controller;

import com.google.gson.Gson;

public class OrderController extends Controller {

	/**
	 * Просмотр корзины товара
	 */
    public static void order() {
    	// PAGE
    	PageModel page = PageService.getPage("ORDER"); 
    	
    	// DATA
    	List<City> citiesEntity = DictionaryService.getCities();
    	Cart cart = CartService.getCurrentCart(false);
    	
    	List<CityModel> cities = new ArrayList<CityModel>();
    	for (City city : citiesEntity) {
    		if (cart != null && city.getId() == cart.getCity().getId())
    			cities.add(new CityModel(city, true));
    		else
    			cities.add(new CityModel(city, false));
		}
    	
    	OrderModel model = new OrderModel();
    	model.setCities(cities);
    	model.setTimePeriodCount(20);
    	
    	boolean isCart = true;
    	
    	renderTemplate("/Products/order.html", model, isCart, page);
    }	
	
    /**
     * Поиск улицы по совпадению
     * @param id - Идентификатор города
     * @param term - Часть названия улицы
     */
    public static void searchStreetAjax(String id, String term) {
    	// TODO Справочник улиц сделать
    	//String requestBody = params.current().get("body");
    	renderJSON("[]");
    }
    
    
	/**
	 * Регистрация заказа
	 */
    public static void registerOrderAjax() {
    	String requestBody = params.current().get("body");
    	Gson gson = new Gson();
		RegisterOrderModel model = gson.fromJson(requestBody, RegisterOrderModel.class);
		
		Logger.info(requestBody);
		
    	Order order = OrderService.registerOrder(model);
    	CartService.clearCart();
    	
    	renderJSON("{\"Success\":true, \"orderId\":\"" + order.getKey() + "\"}");
    }
    
    /**
     * Просмотр зарегистрированного заказа
     * @param orderId - номер заказа
     */
    public static void completedOrder(String orderId) {
    	// PAGE
    	PageModel page = PageService.getPage("COMPLETED_ORDER"); 
    	
    	// DATA
    	Order order = OrderService.getOrderByKey(orderId);
    	RegisteredOrderModel orderModel = new RegisteredOrderModel(order);
    	
    	if (JPA.em().getTransaction() != null && JPA.em().getTransaction().isActive())
    		JPA.em().getTransaction().rollback();
    	
    	renderTemplate("/Products/completed_order.html", orderModel, page);
    }	
	
}
