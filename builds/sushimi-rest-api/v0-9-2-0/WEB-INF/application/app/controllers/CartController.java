package controllers;

import kz.sushimi.persistence.Cart;
import kz.sushimi.restapi.v1.exceptions.ErrorCode;
import kz.sushimi.restapi.v1.exceptions.SushimiException;
import kz.sushimi.restapi.v1.exceptions.SushimiValidationException;
import kz.sushimi.restapi.v1.models.RequestHeaderModel;
import kz.sushimi.restapi.v1.models.cart.AddProductsModel;
import kz.sushimi.restapi.v1.models.cart.CartInfoModel;
import kz.sushimi.restapi.v1.models.cart.CartModel;
import kz.sushimi.restapi.v1.models.cart.ChangeCartModel;
import kz.sushimi.restapi.v1.models.cart.ChangeCartResponseModel;
import kz.sushimi.restapi.v1.models.cart.ProductItemModel;
import kz.sushimi.restapi.v1.models.cart.RemoveProductItemModel;
import kz.sushimi.restapi.v1.models.cart.ReplaceProductItemsModel;
import kz.sushimi.restapi.v1.models.wrapper.Wrapper;
import kz.sushimi.restapi.v1.service.CartService;

import org.apache.commons.lang.StringUtils;

import play.Logger;
import play.db.jpa.JPA;
import play.mvc.Controller;

import com.google.gson.Gson;
import com.google.gson.JsonSyntaxException;

public class CartController extends Controller {

	/**
	 * Что идет в наборе к сушам
	 */
	public static void getCartInfo() {
		try {
			RequestHeaderModel headerModel = RequestHeaderModel.extractHeaders(request);
			Logger.info(headerModel.getMessageForLogging());
		
			CartInfoModel result = CartService.getCartInfo();
	    	renderJSON(Wrapper.getSuccess(result));
    	} catch (Throwable ex) {
    		ex.printStackTrace();
    		renderJSON(Wrapper.getServerError(ErrorCode.UNDEFINED_ERROR, ex));
    	}
	}
	
	
	/**
	 * Возвращает информацию по выбранной корзине
	 * @param cartId идентификатор корзины клиента
	 */
	public static void getCart(String cartId){
    	try {
    		RequestHeaderModel headerModel = RequestHeaderModel.extractHeaders(request);
			Logger.info(headerModel.getMessageForLogging());
		
    		if (!StringUtils.isNotBlank(cartId))
    			throw new SushimiValidationException(ErrorCode.VALIDATION_ERROR, "CartId parameter is missing");
	    		
			Cart cart = CartService.getCurrentCart(cartId, false);
	    	CartModel result = new CartModel(cart, "EXTEND");
	    	renderJSON(Wrapper.getSuccess(result));
	    	
    	} catch (SushimiValidationException sVE) {
    		sVE.printStackTrace();
    		renderJSON(Wrapper.getBadRequest(sVE));
    	} catch (Throwable ex) {
    		ex.printStackTrace();
    		renderJSON(Wrapper.getServerError(ErrorCode.UNDEFINED_ERROR, ex));
    	}
	}
	
	/**
	 * Позволяет изменить город и проверить минимальную сумму заказа
	 * @param cartId идентификатор корзины клиента
	 */
	public static void changeCart(String cartId){
		try {
			RequestHeaderModel headerModel = RequestHeaderModel.extractHeaders(request);
			Logger.info(headerModel.getMessageForLogging());
		
			if (!StringUtils.isNotBlank(cartId))
    			throw new SushimiValidationException(ErrorCode.VALIDATION_ERROR, "CartId parameter is missing");
	    	
			ChangeCartModel model = null;
			try {
				String requestBody = params.current().get("body");
				Gson gson = new Gson();
				model = gson.fromJson(requestBody, ChangeCartModel.class);
			} catch (JsonSyntaxException jSE) {
				throw new SushimiValidationException(ErrorCode.JSON_PARSE_ERROR, "changeCart json is incorrect");
			}

			Cart cart = CartService.getCurrentCart(cartId, false);
			if (cart == null)
				throw new SushimiException(ErrorCode.VALIDATION_ERROR, "cart not found");
			
			int minOrderSum = CartService.changeCart(cart, model.getCityId());

			ChangeCartResponseModel result = new ChangeCartResponseModel();
			result.setMinOrderSum(minOrderSum);
			result.setTimeout(0);

			if (cart.getTotalCartSum() < minOrderSum) {
				result.setHeading("Внимание!");
				result.setMessage("Минимальная сумма заказа " + minOrderSum
						+ " тенге");
				result.setMessageType("warning");
				result.setSuccess(false);
			} else {
				result.setSuccess(true);
			}
			
			renderJSON(Wrapper.getSuccess(result));

		} catch (SushimiValidationException sVE) {
			renderJSON(Wrapper.getBadRequest(sVE));
		} catch (SushimiException sEx) {
			renderJSON(Wrapper.getServerError(sEx));
		} catch (Throwable ex) {
			ex.printStackTrace();
			renderJSON(Wrapper.getServerError(ErrorCode.UNDEFINED_ERROR, ex));
		}
	}
	
	/**
	 * Добавляет выбранный товар в корзину клиента
	 * @param cartId идентификатор корзины клиента
	 */
	public static void addProductToCart(String cartId){
		try {
			RequestHeaderModel headerModel = RequestHeaderModel.extractHeaders(request);
			Logger.info(headerModel.getMessageForLogging());
		
			if (!StringUtils.isNotBlank(cartId))
				throw new SushimiValidationException(ErrorCode.VALIDATION_ERROR, "CartId parameter is missing");
	    	
			AddProductsModel model = null;
			try {
				String requestBody = params.current().get("body");
				Gson gson = new Gson();
				model = gson.fromJson(requestBody, AddProductsModel.class);
			} catch (JsonSyntaxException jSE) {
				throw new SushimiValidationException(ErrorCode.JSON_PARSE_ERROR, "addProduct json is incorrect",jSE);
			}
			
			if (model == null || model.getItems() == null)
				throw new SushimiValidationException(ErrorCode.VALIDATION_ERROR, "addProduct items are missing");
			Cart cart = CartService.AddProductsToCart(cartId, model.getItems());
			
			CartModel result = new CartModel(cart, "EXTEND");
			renderJSON(Wrapper.getSuccess(result));
		
		} catch (SushimiValidationException sVE) {
			renderJSON(Wrapper.getBadRequest(sVE));
		} catch (SushimiException sEx) {
			renderJSON(Wrapper.getServerError(sEx));
		} catch (Throwable ex) {
			renderJSON(Wrapper.getServerError(ErrorCode.UNDEFINED_ERROR, ex));
		}
	}
	
	public static void clearAndAddProductToCart(String cartId){
		try {
			RequestHeaderModel headerModel = RequestHeaderModel.extractHeaders(request);
			Logger.info(headerModel.getMessageForLogging());
		
			if (!StringUtils.isNotBlank(cartId))
				throw new SushimiValidationException(ErrorCode.VALIDATION_ERROR, "CartId parameter is missing");
	    	
			AddProductsModel model = null;
			try {
				String requestBody = params.current().get("body");
				Gson gson = new Gson();
				model = gson.fromJson(requestBody, AddProductsModel.class);
			} catch (JsonSyntaxException jSE) {
				throw new SushimiValidationException(ErrorCode.JSON_PARSE_ERROR, "addProduct json is incorrect",jSE);
			}
			
			if (model == null || model.getItems() == null)
				throw new SushimiValidationException(ErrorCode.VALIDATION_ERROR, "addProduct items are missing");
			
			CartService.cleanCart(cartId);
			Cart cart = CartService.AddProductsToCart(cartId, model.getItems());
			
			CartModel result = new CartModel(cart, "EXTEND");
			renderJSON(Wrapper.getSuccess(result));
		
		} catch (SushimiValidationException sVE) {
			renderJSON(Wrapper.getBadRequest(sVE));
		} catch (SushimiException sEx) {
			renderJSON(Wrapper.getServerError(sEx));
		} catch (Throwable ex) {
			renderJSON(Wrapper.getServerError(ErrorCode.UNDEFINED_ERROR, ex));
		}
	}
	
	/**
	 * Удаляет выбранный товар из корзины клинета
	 * @param cartId идентификатор корзины клиента
	 */
	public static void removeProductFromCart(String cartId){
		try {
			RequestHeaderModel headerModel = RequestHeaderModel.extractHeaders(request);
			Logger.info(headerModel.getMessageForLogging());
		
			if (!StringUtils.isNotBlank(cartId))
				throw new SushimiValidationException(ErrorCode.VALIDATION_ERROR, "CartId parameter is missing");
	    	
			RemoveProductItemModel model = null;
			try {
		    	String requestBody = params.current().get("body");
				Gson gson = new Gson();
				model = gson.fromJson(requestBody, RemoveProductItemModel.class);
	    	} catch (JsonSyntaxException jSE) {
	    		throw new SushimiValidationException(ErrorCode.JSON_PARSE_ERROR, "removeProduct json is incorrect");
	    	}
	    	
	    	Cart cart = CartService.removeProductFromCart(cartId, model.getProductId());
	    	CartModel result = new CartModel(cart, "EXTEND");
	    	renderJSON(Wrapper.getSuccess(result));
		} catch (SushimiValidationException sVE) {
			renderJSON(Wrapper.getBadRequest(sVE));
		} catch (SushimiException sEx) {
			renderJSON(Wrapper.getServerError(sEx));
		} catch (Throwable ex) {
			renderJSON(Wrapper.getServerError(ErrorCode.UNDEFINED_ERROR, ex));
		}
	}
	
	/**
	 * Позволяет произвести в корзине клинета. Например было 2 филы стало 4. Позволяет разом менять несколько позиций
	 * @param cartId идентификатор корзины клиента
	 */
	public static void replaceProductInCart(String cartId){
		try {
			RequestHeaderModel headerModel = RequestHeaderModel.extractHeaders(request);
			Logger.info(headerModel.getMessageForLogging());
		
			if (!StringUtils.isNotBlank(cartId))
				throw new SushimiValidationException(ErrorCode.VALIDATION_ERROR, "CartId parameter is missing");
	    	
			ReplaceProductItemsModel model = null;
			try {
				String requestBody = params.current().get("body");
				Gson gson = new Gson();
				model = gson.fromJson(requestBody, ReplaceProductItemsModel.class);
			} catch (JsonSyntaxException jSE) {
				throw new SushimiValidationException(ErrorCode.JSON_PARSE_ERROR, "replaceProductInCart json is incorrect");
			}
			
	    	Cart cart = CartService.replaceProductInCart(cartId, model.getItems());
	    	CartModel result = new CartModel(cart, "EXTEND");
	    	renderJSON(Wrapper.getSuccess(result));
		} catch (SushimiValidationException sVE) {
			renderJSON(Wrapper.getBadRequest(sVE));
		} catch (SushimiException sEx) {
			renderJSON(Wrapper.getServerError(sEx));
		} catch (Throwable ex) {
			renderJSON(Wrapper.getServerError(ErrorCode.UNDEFINED_ERROR, ex));
		}
	}
	
	/**
	 * Позволяет произвести в корзине клинета. Например было 2 филы стало 4. Позволяет разом менять несколько позиций
	 * @param cartId идентификатор корзины клиента
	 */
	public static void clearCart(String cartId){
		try {
			RequestHeaderModel headerModel = RequestHeaderModel.extractHeaders(request);
			Logger.info(headerModel.getMessageForLogging());
		
			if (!StringUtils.isNotBlank(cartId))
				throw new SushimiValidationException(ErrorCode.VALIDATION_ERROR, "CartId parameter is missing");
			
	    	CartService.clearCart(cartId);
	    	renderJSON(Wrapper.getSuccess(null));
		} catch (SushimiValidationException sVE) {
			renderJSON(Wrapper.getBadRequest(sVE));
		} catch (SushimiException sEx) {
			renderJSON(Wrapper.getServerError(sEx));
		} catch (Throwable ex) {
			renderJSON(Wrapper.getServerError(ErrorCode.UNDEFINED_ERROR, ex));
		}
	}	
	
}
