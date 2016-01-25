package controllers;

import kz.sushimi.persistence.orders.Order;
import kz.sushimi.restapi.v1.exceptions.ErrorCode;
import kz.sushimi.restapi.v1.exceptions.SushimiException;
import kz.sushimi.restapi.v1.exceptions.SushimiValidationException;
import kz.sushimi.restapi.v1.models.RequestHeaderModel;
import kz.sushimi.restapi.v1.models.order.OrderModel;
import kz.sushimi.restapi.v1.models.order.RegisterOrderModel;
import kz.sushimi.restapi.v1.models.wrapper.Wrapper;
import kz.sushimi.restapi.v1.service.CartService;
import kz.sushimi.restapi.v1.service.OrderService;

import org.h2.util.StringUtils;

import play.Logger;
import play.db.jpa.JPA;
import play.mvc.Controller;

import com.google.gson.Gson;
import com.google.gson.JsonSyntaxException;

public class OrderController extends Controller {
	
	/**
	 * Регистрация заказа
	 */
    public static void registerOrder() {
		try {
			RequestHeaderModel headerModel = RequestHeaderModel.extractHeaders(request);
			Logger.info(headerModel.getMessageForLogging());
		
			RegisterOrderModel model = null;
			
			try {
				String requestBody = params.current().get("body");
		    	Gson gson = new Gson();
				model = gson.fromJson(requestBody, RegisterOrderModel.class);
			} catch(JsonSyntaxException jSE) {
				throw new SushimiValidationException(ErrorCode.JSON_PARSE_ERROR, "RegisterOrder json is incorrect", jSE);
			}
			
			Order order = null;
			OrderModel orderModel = null;
			try {
				order = OrderService.registerOrder(model, headerModel);
				orderModel = OrderModel.buildOrderModel(order);
			} catch (Throwable ex) {
				JPA.em().getTransaction().rollback();
				throw ex;
			}

			try {
				CartService.clearCart(model.cartId);
			} catch (Throwable ex) {
				// TODO insert exceptions
				play.Logger.error("Error during try to clear cart after creation order", ex);
			}
	    	// TODO Сделать нормальную модель для ответа об успешном создании заказа
	    	renderJSON(Wrapper.getSuccess(orderModel));
		} catch (SushimiValidationException sVE) {
			renderJSON(Wrapper.getBadRequest(sVE));
		}catch (SushimiException sEx) {
			renderJSON(Wrapper.getServerError(sEx));
		} catch (Throwable ex) {
			ex.printStackTrace();
			renderJSON(Wrapper.getServerError(ErrorCode.UNDEFINED_ERROR, ex));
		}
    }

    /**
     * Просмотр зарегистрированного заказа
     * @param orderId - номер заказа
     */
    public static void readOrder(String orderKey) {
    	try {
    		RequestHeaderModel headerModel = RequestHeaderModel.extractHeaders(request);
			Logger.info(headerModel.getMessageForLogging());
		
    		if (StringUtils.isNullOrEmpty(orderKey))
    			throw new SushimiValidationException(ErrorCode.VALIDATION_ERROR, "Order orderKey is incorrect");
    		
    		Order order = OrderService.getOrderByKey(orderKey);
    		if (order == null)
    			renderJSON(Wrapper.getNoContent());
    		
    		OrderModel om = OrderModel.buildOrderModel(order);
    		renderJSON(Wrapper.getSuccess(om));

    	} catch (SushimiValidationException sVE) {
    		renderJSON(Wrapper.getBadRequest(sVE));	
    	} catch (SushimiException sEX) {
    		renderJSON(Wrapper.getServerError(sEX));
    	} catch (Throwable ex) {
    		renderJSON(Wrapper.getServerError(ErrorCode.UNDEFINED_ERROR, ex));
    	} 
    }	
    
}
