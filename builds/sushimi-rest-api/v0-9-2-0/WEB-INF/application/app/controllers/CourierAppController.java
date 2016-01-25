package controllers;

import java.util.List;

import kz.sushimi.persistence.users.User;
import kz.sushimi.restapi.v1.exceptions.ErrorCode;
import kz.sushimi.restapi.v1.exceptions.SushimiException;
import kz.sushimi.restapi.v1.exceptions.SushimiValidationException;
import kz.sushimi.restapi.v1.models.courier.UserAuthenticateResultModel;
import kz.sushimi.restapi.v1.models.courier.UserLoginRequestModel;
import kz.sushimi.restapi.v1.models.courier.UserOrderModel;
import kz.sushimi.restapi.v1.models.courier.UserReadOrdersRequestModel;
import kz.sushimi.restapi.v1.models.courier.UserUpdateGeolocationCoordinateModel;
import kz.sushimi.restapi.v1.models.courier.UserUpdateOrderStateModel;
import kz.sushimi.restapi.v1.models.wrapper.Wrapper;
import kz.sushimi.restapi.v1.service.OrderService;
import kz.sushimi.restapi.v1.service.UserService;
import play.Logger;
import play.mvc.Controller;

import com.google.gson.Gson;
import com.google.gson.JsonSyntaxException;

public class CourierAppController extends Controller {
	
	/**
	 * Авторизация курьера в системе
	 * 	1. Передача Login
	 * 	2. Передача PUSH ID
	 * 	3. Передача данных о девайсе и версии приложения
	 * 	4. 
	 */
    public static void authenticate() {
    	try {
    		UserLoginRequestModel model = null;
	    	try {
				String requestBody = params.current().get("body");
				Logger.info("authenticate body: %s", requestBody);
				Gson gson = new Gson();
				model = gson.fromJson(requestBody, UserLoginRequestModel.class);
			} catch (JsonSyntaxException jSE) {
				throw new SushimiValidationException(ErrorCode.JSON_PARSE_ERROR, "COURIER: authenticate request json is incorrect.");
			}   	
	    	if (model == null)
	    		throw new SushimiValidationException(ErrorCode.VALIDATION_ERROR, "COURIER: authenticate request model is empty.");
	    	
	    	UserAuthenticateResultModel result = UserService.authenticate(model);
	    	renderJSON(Wrapper.getSuccess(result));
	    	
	    	// RETURN RESULT	    	
    	} catch (SushimiException sEx) {
    		renderJSON(Wrapper.getServerError(sEx.getCode(), sEx));
    	} catch (Throwable ex) {
			ex.printStackTrace();
			renderJSON(Wrapper.getServerError(ErrorCode.UNDEFINED_ERROR, ex));
		}
    }
    
    
    /**
     * Получение списка заказов для курьера
     * @param orderState 
     * 					ON_DELIVERY - заказы курьера на доставке, 
     * 					DELIVERED - доставленные заказы за период
     * 					WAITING_FOR_DELIVERY - ожидающие доставки
     * 					IN_PROGRESS - в работе
     */
    public static void readOrders(String orderState) {
    	// TODO добавить период для доставленных заказов
    	try {
    		UserReadOrdersRequestModel model = null;
	    	try {
				String requestBody = params.current().get("body");
				Logger.info("courier order read request body: %s", requestBody);
				Gson gson = new Gson();
				model = gson.fromJson(requestBody, UserReadOrdersRequestModel.class);
			} catch (JsonSyntaxException jSE) {
				throw new SushimiValidationException(ErrorCode.JSON_PARSE_ERROR, "COURIER: read orders request json is incorrect.");
			}   	
	    	if (model == null)
	    		throw new SushimiValidationException(ErrorCode.VALIDATION_ERROR, "COURIER: read orders request model is empty.");
	    	
	    	// Проверяем авторизован ли пользователь
	    	User user = UserService.getUserByAuthToken(model.authToken);
	    	
	    	// Список заказов курьера по критериям
	    	List<UserOrderModel> orders = OrderService.readOrders(user, model);
	    	
	    	renderJSON(Wrapper.getSuccess(orders));
	    	
	    	// RETURN RESULT	    	
    	} catch (SushimiException sEx) {
    		renderJSON(Wrapper.getServerError(sEx.getCode(), sEx));
    	} catch (Throwable ex) {
			ex.printStackTrace();
			renderJSON(Wrapper.getServerError(ErrorCode.UNDEFINED_ERROR, ex));
		}
    }        
    
    /**
     * Регистрирует последние отметки о нахождение курьера
     * 1. Фиксирует последные координаты в профиле
     * 2. Если есть заказы на доставке обновляет их
     */
    public static void updateGeolocationCoordinate() {
    	try {
    		UserUpdateGeolocationCoordinateModel model = null;
	    	try {
				String requestBody = params.current().get("body");
				Gson gson = new Gson();
				model = gson.fromJson(requestBody, UserUpdateGeolocationCoordinateModel.class);
			} catch (JsonSyntaxException jSE) {
				throw new SushimiValidationException(ErrorCode.JSON_PARSE_ERROR, "COURIER: Update geolocation request json is incorrect.");
			}   	
	    	if (model == null)
	    		throw new SushimiValidationException(ErrorCode.VALIDATION_ERROR, "COURIER: Update geolocation request model is empty.");
	    	
	    	// Проверяем авторизован ли пользователь
	    	User user = UserService.getUserByAuthToken(model.authToken);
	    	
	    	// Обновляем геопозицию пользователя
	    	UserService.updateGeolocationCoordinate(user, model);
	    	
	    	// Находим и обновляем координаты нахождения заказов курьера
	    	OrderService.updateOrderGeolocation(user, model);
	    	
	    	// Отвечаем мобильному приложению, что всё хорошо
	    	renderJSON(Wrapper.getSuccess(null));
	    	
	    	// TODO Добавить исключения авторизации возвращая HTTP 401
	    	
    	} catch (SushimiException sEx) {
    		renderJSON(Wrapper.getServerError(sEx.getCode(), sEx));
    	} catch (Throwable ex) {
			ex.printStackTrace();
			renderJSON(Wrapper.getServerError(ErrorCode.UNDEFINED_ERROR, ex));
		}
    }
    
    /**
     * Завершить заказ
     */
    public static void completeOrder() {
    	try {
    		UserUpdateOrderStateModel model = null;
	    	try {
				String requestBody = params.current().get("body");
				Gson gson = new Gson();
				model = gson.fromJson(requestBody, UserUpdateOrderStateModel.class);
			} catch (JsonSyntaxException jSE) {
				throw new SushimiValidationException(ErrorCode.JSON_PARSE_ERROR, "COURIER: Complete order request json is incorrect.");
			}   	
	    	if (model == null)
	    		throw new SushimiValidationException(ErrorCode.VALIDATION_ERROR, "COURIER: Complete order request model is empty.");

	    	// Проверяем авторизован ли пользователь
	    	User user = UserService.getUserByAuthToken(model.authToken);
	    	
	    	OrderService.completeOrder(user, model);
	    	// RETURN RESULT
	    	renderJSON(Wrapper.getSuccess(null));
    	} catch (Throwable ex) {
			ex.printStackTrace();
			renderJSON(Wrapper.getServerError(ErrorCode.UNDEFINED_ERROR, ex));
		}
    }
    
    /**
     * Отозвать заказ 
     */
    public static void returnOrder() {
    	try {
    		UserUpdateOrderStateModel model = null;
	    	try {
				String requestBody = params.current().get("body");
				Gson gson = new Gson();
				model = gson.fromJson(requestBody, UserUpdateOrderStateModel.class);
			} catch (JsonSyntaxException jSE) {
				throw new SushimiValidationException(ErrorCode.JSON_PARSE_ERROR, "COURIER: Return order request json is incorrect.");
			}   	
	    	if (model == null)
	    		throw new SushimiValidationException(ErrorCode.VALIDATION_ERROR, "COURIER: Return order request model is empty.");

	    	// Проверяем авторизован ли пользователь
	    	User user = UserService.getUserByAuthToken(model.authToken);
	    	
	    	OrderService.returnOrder(user, model);
	    	// RETURN RESULT
	    	renderJSON(Wrapper.getSuccess(null));
    	} catch (Throwable ex) {
			ex.printStackTrace();
			renderJSON(Wrapper.getServerError(ErrorCode.UNDEFINED_ERROR, ex));
		}
    }
    
}
