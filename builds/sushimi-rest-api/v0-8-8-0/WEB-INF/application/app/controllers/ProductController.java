package controllers;

import java.util.List;

import kz.sushimi.restapi.v1.exceptions.ErrorCode;
import kz.sushimi.restapi.v1.exceptions.SushimiException;
import kz.sushimi.restapi.v1.exceptions.SushimiValidationException;
import kz.sushimi.restapi.v1.models.ProductModel;
import kz.sushimi.restapi.v1.models.wrapper.ResponseStatus;
import kz.sushimi.restapi.v1.models.wrapper.Wrapper;
import kz.sushimi.restapi.v1.service.ProductService;

import org.apache.commons.lang.StringUtils;

import play.db.jpa.JPA;
import play.mvc.Controller;

public class ProductController extends Controller {
	
	/**
	 * Возвращает список товаров в выбранной категории
	 * @param categoryId идентификатор категории (если null то возвращает все товары по всем категориям
	 */
	public static void getProducts(String categoryId) {
		List<ProductModel> models = null;
		try {
	    	if (StringUtils.isNotEmpty(categoryId)) {
	    		Long pId = null;
	    		try {
	    			pId = Long.valueOf(categoryId);
	    		} catch (NumberFormatException nFe) {
	    			throw new SushimiValidationException(ErrorCode.VALIDATION_ERROR, "Products categoryId is incorrect");
	    		}
	    		models = ProductService.getProducts(pId);
	    	} else
	    		models = ProductService.getProducts(null);
	    	
	    	if (models == null || models.size() == 0)
				renderJSON(Wrapper.getNoContent());
			else
				renderJSON(Wrapper.getSuccess(models));
		} catch (SushimiValidationException sVE) {
			renderJSON(Wrapper.getBadRequest(sVE));	
    	} catch(Throwable ex) {
    		renderJSON(Wrapper.getServerError(ErrorCode.UNDEFINED_ERROR, ex));
    	}
	}
	
	/**
	 * Возвращает информацию по выбранному товару
	 * @param productId Идентификатор товара
	 */
	public static void getProduct(String productId) {
		try {
	    	Long pId = null;
	    	try {
	    		pId = Long.valueOf(productId);
	    	} catch (NumberFormatException nFe) {
	    		throw new SushimiValidationException(ErrorCode.VALIDATION_ERROR, "ProductId is incorrect");
	    	}
	    	
	    	ProductModel model = ProductService.getProduct(pId);
	    	if (model == null)
	    		renderJSON(Wrapper.getNoContent());
	    	else
	    		renderJSON(Wrapper.getSuccess(model));

		} catch (SushimiValidationException sEx) {
			renderJSON(Wrapper.getBadRequest(sEx));
    	} catch(Throwable ex) {
    		renderJSON(Wrapper.getServerError(ErrorCode.UNDEFINED_ERROR, ex));
    	}		
	}	 
	
}
