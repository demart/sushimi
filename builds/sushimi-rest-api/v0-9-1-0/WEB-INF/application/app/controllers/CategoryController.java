package controllers;

import java.util.List;

import kz.sushimi.restapi.v1.exceptions.ErrorCode;
import kz.sushimi.restapi.v1.exceptions.SushimiValidationException;
import kz.sushimi.restapi.v1.models.CategoryModel;
import kz.sushimi.restapi.v1.models.RequestHeaderModel;
import kz.sushimi.restapi.v1.models.wrapper.Wrapper;
import kz.sushimi.restapi.v1.service.CategoryService;

import org.apache.commons.lang.StringUtils;

import play.Logger;
import play.db.jpa.JPA;
import play.mvc.Controller;


public class CategoryController extends Controller {
	
	/**
	 * Возвращает категории товаров. Для того чтобы получить корневые категории необходимо предавать null в запросе
	 * @param parentId Идентификатор категории (или null если нужны корневые)
	 */
    public static void getCategories(String parentId) {
    	try {
    		RequestHeaderModel headerModel = RequestHeaderModel.extractHeaders(request);
			Logger.info(headerModel.getMessageForLogging());
		
    		List<CategoryModel> models = null;
	    	if (StringUtils.isNotEmpty(parentId)) {
	    		Long pId = null;
	    		try {
	    			pId = Long.valueOf(parentId);
	    		} catch (NumberFormatException nFe) {
	    			throw new SushimiValidationException(ErrorCode.VALIDATION_ERROR, "Parent categoryId is incorrect");
	    		}
	    		models = CategoryService.getCategories(pId);
	    	} else
	    		models = CategoryService.getCategories(null);
	    	
	    	if (models == null || models.size() == 0)
				renderJSON(Wrapper.getNoContent());
			else
				renderJSON(Wrapper.getSuccess(models));
    	} catch (SushimiValidationException sVE) {
    		renderJSON(Wrapper.getBadRequest(sVE));
    	}	catch(Throwable ex) {
    		renderJSON(Wrapper.getServerError(ErrorCode.UNDEFINED_ERROR, ex));
    	}
    }

}