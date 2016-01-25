package controllers;

import kz.sushimi.models.order.AddProductsModel;
import kz.sushimi.models.order.CartModel;
import kz.sushimi.models.order.CartType;
import kz.sushimi.models.order.ChangeCartModel;
import kz.sushimi.models.order.ChangeCartResponseModel;
import kz.sushimi.models.order.GetCartModel;
import kz.sushimi.models.order.ProductItemModel;
import kz.sushimi.models.order.RemoveProductItemModel;
import kz.sushimi.models.order.ReplaceProductItemsModel;
import kz.sushimi.persistence.Cart;
import kz.sushimi.service.CartService;
import play.Logger;
import play.mvc.Controller;

import com.google.gson.Gson;

public class CartController extends Controller {

    
    public static void addProductToCartAjax() {
    	Logger.debug("Action [addProductToCartAjax] invoked");
    	
    	String requestBody = params.current().get("body");
		Gson gson = new Gson();
		AddProductsModel model = gson.fromJson(requestBody, AddProductsModel.class);
    	if (model.Cart == null)
    		model.Cart = CartType.LITE;
    	
		ProductItemModel modelItem = model.getItems().get(0);
		Cart cart = CartService.AddProductsToCart(modelItem.getKey(), modelItem.getValue());
    	
		CartModel result = new CartModel(cart, model.Cart.toString());
    	
    	renderJSON(result);
    	ok();
    }
    
    public static void getCartAjax() {
    	Logger.debug("Action [getCartAjax] invoked");
    	String requestBody = params.current().get("body");
    	Gson gson = new Gson();
    	GetCartModel model = gson.fromJson(requestBody, GetCartModel.class);
    	if (model.Cart == null)
    		model.Cart = CartType.LITE;
    	Cart cart = CartService.getCurrentCart(false);
    	CartModel result = new CartModel(cart, model.Cart.toString());
    	renderJSON(result);
    }
    
    public static void removeProductInCartAjax() {
    	Logger.debug("Action [removeProductInCartAjax] invoked");
    	
    	String requestBody = params.current().get("body");
		Gson gson = new Gson();
		RemoveProductItemModel model = gson.fromJson(requestBody, RemoveProductItemModel.class);
    	if (model.Cart == null)
    		model.Cart = CartType.LITE;
    	Cart cart = CartService.removeProductFromCart(model.getId(), model.getCityId());
    	CartModel result = new CartModel(cart, model.Cart.toString());
    	renderJSON(result);
    }
    
    public static void replaceProductInCartAjax() {
    	Logger.debug("Action [replaceProductInCartAjax] invoked");
    	
    	String requestBody = params.current().get("body");
		Gson gson = new Gson();
		ReplaceProductItemsModel model = gson.fromJson(requestBody, ReplaceProductItemsModel.class);
    	if (model.Cart == null)
    		model.Cart = CartType.LITE;
    	Cart cart = CartService.replaceProductInCart(model.getCityId(), model.getItems());
    	CartModel result = new CartModel(cart, model.Cart.toString());
    	renderJSON(result);
    }
    
    
    public static void changeCartAjax() {
    	Logger.debug("Action [changeCartAjax] invoked");
    	
    	String requestBody = params.current().get("body");
		Gson gson = new Gson();
		ChangeCartModel model = gson.fromJson(requestBody, ChangeCartModel.class);

		Cart cart = CartService.getCurrentCart(false);
		int minOrderSum = CartService.changeCart(cart, model.getId(), model.getCityId());
		
		ChangeCartResponseModel result = new ChangeCartResponseModel();
		result.setData(minOrderSum);
		
		if (cart.getTotalCartSum() < minOrderSum) {
			result.setHeading("Внимание!");
			result.setMessage("Минимальная сумма заказа " + minOrderSum + " тенге");
			result.setMessageType("warning");
			result.setSuccess(false);
		} else {
			result.setSuccess(true);
		}
		
		result.setTimeout(0);
		
    	renderJSON(result);
    }

}
