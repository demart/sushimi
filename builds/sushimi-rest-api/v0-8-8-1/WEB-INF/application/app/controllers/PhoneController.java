package controllers;

import kz.sushimi.persistence.Cart;
import kz.sushimi.restapi.v1.exceptions.ErrorCode;
import kz.sushimi.restapi.v1.exceptions.SushimiException;
import kz.sushimi.restapi.v1.exceptions.SushimiValidationException;
import kz.sushimi.restapi.v1.models.RegisterPhoneModel;
import kz.sushimi.restapi.v1.models.cart.ChangeCartModel;
import kz.sushimi.restapi.v1.models.cart.ChangeCartResponseModel;
import kz.sushimi.restapi.v1.models.wrapper.Wrapper;
import kz.sushimi.restapi.v1.service.CartService;
import kz.sushimi.restapi.v1.service.PhoneService;

import org.apache.commons.lang.StringUtils;

import play.mvc.Controller;

import com.google.gson.Gson;
import com.google.gson.JsonSyntaxException;

public class PhoneController extends Controller {

	public static void registerPhone() {
		try {	    	
			RegisterPhoneModel model = null;
			try {
				String requestBody = params.current().get("body");
				Gson gson = new Gson();
				model = gson.fromJson(requestBody, RegisterPhoneModel.class);
			} catch (JsonSyntaxException jSE) {
				throw new SushimiValidationException(ErrorCode.JSON_PARSE_ERROR, "registerPhone json is incorrect");
			}
			
			Boolean result = PhoneService.registerOrUpdatePhone(model);
			
			renderJSON(Wrapper.getSuccess(null));

		} catch (SushimiValidationException sVE) {
			renderJSON(Wrapper.getBadRequest(sVE));
		} catch (SushimiException sEx) {
			renderJSON(Wrapper.getServerError(sEx));
		} catch (Throwable ex) {
			ex.printStackTrace();
			renderJSON(Wrapper.getServerError(ErrorCode.UNDEFINED_ERROR, ex));
		}		
	}
	
}
