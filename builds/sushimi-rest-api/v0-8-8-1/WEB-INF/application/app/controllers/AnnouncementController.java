package controllers;

import java.util.List;

import kz.sushimi.restapi.v1.exceptions.ErrorCode;
import kz.sushimi.restapi.v1.exceptions.SushimiValidationException;
import kz.sushimi.restapi.v1.models.AnnouncementModel;
import kz.sushimi.restapi.v1.models.wrapper.Wrapper;
import kz.sushimi.restapi.v1.service.AnnouncementService;

import org.apache.commons.lang.StringUtils;

import play.db.jpa.JPA;
import play.mvc.Controller;
import play.mvc.Http.Header;

public class AnnouncementController extends Controller {

	/**
	 * Возращает список объявлений, если не указан тип то возвращает все.
	 * @param type - тип объявлений (0 - новости, 1 - промо-акции)
	 */
	public static void getAnnouncementList(String type) {
		Header appVersionHeader = request.headers.get("AppVersion");
		Header systemApplicationIdentifier = request.headers.get("SystemApplicationIdentifier");
		Header systemName = request.headers.get("SystemName");
		Header systemUniqueIdentifier = request.headers.get("SystemUniqueIdentifier");
		Header systemVersion = request.headers.get("SystemVersion");
		System.out.println("Key: " + appVersionHeader.name + " Value: " + appVersionHeader.value());
		System.out.println("Key: " + systemApplicationIdentifier.name + " Value: " + systemApplicationIdentifier.value());
		System.out.println("Key: " + systemName.name + " Value: " + systemName.value());
		System.out.println("Key: " + systemUniqueIdentifier.name + " Value: " + systemUniqueIdentifier.value());
		System.out.println("Key: " + systemVersion.name + " Value: " + systemVersion.value());
		
		try {
			List<AnnouncementModel> models = null;
			if (StringUtils.isNotEmpty(type)) {
		    	Integer pId = null;
		    	try {
		    		pId = Integer.valueOf(type);
		    	} catch (NumberFormatException nFe) {
		    		throw new SushimiValidationException(ErrorCode.VALIDATION_ERROR, "Announcement Type parameter is incorrect");
		    	}	
		    	models = AnnouncementService.getAnnouncements(pId);
			} else
				models = AnnouncementService.getAnnouncements(null);
	    	
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

	/**
	 * Возвращает данные объявления, по указанному идентификатору
	 * @param announcementId - идентификатор объявления
	 */
	public static void getAnnouncement(String announcementId) {
		try {
	    	if (StringUtils.isNotEmpty(announcementId)) {
	    		Long pId = null;
	    		try {
	    			pId = Long.valueOf(announcementId);
	    		} catch (NumberFormatException nFe) {
	    			throw new SushimiValidationException(ErrorCode.VALIDATION_ERROR, "AnnouncementId parameter is incorrect");
	    		}
	    		AnnouncementModel model = AnnouncementService.getAnnouncement(pId);
	    		if (model == null)
	    			renderJSON(Wrapper.getNoContent());
	    		renderJSON(Wrapper.getSuccess(model));
	    	} else 
	    		throw new SushimiValidationException(ErrorCode.VALIDATION_ERROR,"Missed announcementId identificator", null);
		
		} catch (SushimiValidationException sVE) {
			renderJSON(Wrapper.getBadRequest(sVE));
		}	catch(Throwable ex) {
    		renderJSON(Wrapper.getServerError(ErrorCode.UNDEFINED_ERROR, ex));
    	}
	}
}
