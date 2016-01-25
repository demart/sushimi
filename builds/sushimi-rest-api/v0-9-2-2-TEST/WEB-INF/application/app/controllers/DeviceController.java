package controllers;

import kz.sushimi.restapi.v1.exceptions.ErrorCode;
import kz.sushimi.restapi.v1.exceptions.SushimiException;
import kz.sushimi.restapi.v1.exceptions.SushimiValidationException;
import kz.sushimi.restapi.v1.models.RequestHeaderModel;
import kz.sushimi.restapi.v1.models.device.DevicePushRequestModel;
import kz.sushimi.restapi.v1.models.wrapper.Wrapper;
import kz.sushimi.restapi.v1.service.DeviceService;
import play.Logger;
import play.mvc.Controller;

import com.google.gson.Gson;
import com.google.gson.JsonSyntaxException;

public class DeviceController extends Controller {

	/**
	 * Регистрирует идентификатор для отправки пуш уведомлений
	 */
	public static void registerOrUpdateDeviceToken() {
		try {
			RequestHeaderModel headerModel = RequestHeaderModel.extractHeaders(request);
			Logger.info(headerModel.getMessageForLogging());

			String requestBody = params.current().get("body");
			Logger.trace("Device registerOrUpdateDeviceToken invoked with body {0}", requestBody);
			
			DevicePushRequestModel model;
			try {	
				Gson gson = new Gson();
				model = gson.fromJson(requestBody, DevicePushRequestModel.class);
			} catch (JsonSyntaxException jSE) {
				throw new SushimiValidationException(ErrorCode.JSON_PARSE_ERROR, "registerDeviceTokenToken json is incorrect");
			}
			
			DeviceService.registerOrUpdatePushToken(model);
			renderJSON(Wrapper.getSuccess(null));
			
		} catch (SushimiValidationException sVE) {
			renderJSON(Wrapper.getBadRequest(sVE));
		} catch (Throwable ex) {
			ex.printStackTrace();
			renderJSON(Wrapper.getServerError(ErrorCode.UNDEFINED_ERROR, ex));
		}
	}
	
	
}
