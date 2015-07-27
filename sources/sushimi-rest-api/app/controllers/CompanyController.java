package controllers;

import java.util.List;

import kz.sushimi.restapi.v1.exceptions.ErrorCode;
import kz.sushimi.restapi.v1.models.CompanyInfoModel;
import kz.sushimi.restapi.v1.models.DeliveryServicePointModel;
import kz.sushimi.restapi.v1.models.RequestHeaderModel;
import kz.sushimi.restapi.v1.models.wrapper.Wrapper;
import kz.sushimi.restapi.v1.service.CompanyService;
import play.Logger;
import play.mvc.Controller;

public class CompanyController extends Controller  {
	
	/**
	 * Возвращает информацию о компании
	 */
	public static void getCompanyInfo() {
		try {
			RequestHeaderModel headerModel = RequestHeaderModel.extractHeaders(request);
			Logger.info(headerModel.getMessageForLogging());
		
			CompanyInfoModel model = CompanyService.getCompanyInfo();
	
			if (model == null)
				renderJSON(Wrapper.getNoContent());
			renderJSON(Wrapper.getSuccess(model));
	
			//} catch (SushimiValidationException sVE) {
			//	renderJSON(Wrapper.getBadRequest(sVE));	
		} catch (Throwable ex) {
			renderJSON(Wrapper.getServerError(ErrorCode.UNDEFINED_ERROR, ex));
		}
	}
	
	
	/**
	 * Возвращает информацию о службе доставки
	 */
	public static void getDeliveryPoints() {
		try {
			RequestHeaderModel headerModel = RequestHeaderModel.extractHeaders(request);
			Logger.info(headerModel.getMessageForLogging());
		
			List<DeliveryServicePointModel> models = CompanyService.getDeliveryPoints();
	
			if (models == null || models.size() == 0)
				renderJSON(Wrapper.getNoContent());
			renderJSON(Wrapper.getSuccess(models));
	
			//} catch (SushimiValidationException sVE) {
			//	renderJSON(Wrapper.getBadRequest(sVE));	
		} catch (Throwable ex) {
			renderJSON(Wrapper.getServerError(ErrorCode.UNDEFINED_ERROR, ex));
		}
	}	
	
}
