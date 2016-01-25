package controllers;

import java.util.List;

import kz.sushimi.restapi.v1.exceptions.ErrorCode;
import kz.sushimi.restapi.v1.exceptions.SushimiException;
import kz.sushimi.restapi.v1.exceptions.SushimiValidationException;
import kz.sushimi.restapi.v1.models.RequestHeaderModel;
import kz.sushimi.restapi.v1.models.RestaurantModel;
import kz.sushimi.restapi.v1.models.wrapper.ResponseStatus;
import kz.sushimi.restapi.v1.models.wrapper.Wrapper;
import kz.sushimi.restapi.v1.service.RestaurantService;
import play.Logger;
import play.db.jpa.JPA;
import play.mvc.Controller;

public class RestaurantController  extends Controller {
		
	/**
	 * Возвращает список ресторанов
	 */
	public static void getRestaurantList() {
		try {
			RequestHeaderModel headerModel = RequestHeaderModel.extractHeaders(request);
			Logger.info(headerModel.getMessageForLogging());
		
			List<RestaurantModel> models = RestaurantService.getRestaurants();
			if (models == null || models.size() == 0)
				renderJSON(Wrapper.getNoContent());
			else
				renderJSON(Wrapper.getSuccess(models));
			
		} catch(Throwable ex) {
			renderJSON(Wrapper.getServerError(ErrorCode.UNDEFINED_ERROR, ex));
    	}
	}

	/**
	 * Возвращает информацию о выбранном ресторане
	 * @param restaurantId идентификатор ресторана
	 */
	public static void getRestaurant(String restaurantId) {
		try {
			RequestHeaderModel headerModel = RequestHeaderModel.extractHeaders(request);
			Logger.info(headerModel.getMessageForLogging());
		
			Long pId = null;
			try {
				pId = Long.valueOf(restaurantId);
			} catch (NumberFormatException nFe) {
				throw new SushimiValidationException(ErrorCode.VALIDATION_ERROR, "RestaurantId parameter is incorrect");
			}
			
			RestaurantModel model = RestaurantService.getRestaurant(pId);
			if (model == null)
				renderJSON(Wrapper.getNoContent());
			else
				renderJSON(Wrapper.getSuccess(model));	
			
		} catch (SushimiValidationException sVEx) {
			renderJSON(Wrapper.getBadRequest(sVEx));
		} catch (SushimiException sEx) {
			renderJSON(Wrapper.getServerError(sEx));
    	} catch(Throwable ex) {
    		renderJSON(Wrapper.getServerError(ErrorCode.UNDEFINED_ERROR, ex));
    	}	 	
	}
	
}
