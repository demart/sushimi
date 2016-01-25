package controllers;

import java.util.Calendar;
import java.util.List;

import kz.sushimi.models.AnnouncementModel;
import kz.sushimi.models.PageModel;
import kz.sushimi.models.announcement.GetAnnouncementsAjaxResponse;
import kz.sushimi.models.announcement.GetNewsAjaxRequest;
import kz.sushimi.models.announcement.GetPromotionsAjaxRequest;
import kz.sushimi.persistence.Announcement;
import kz.sushimi.service.AnnouncementsService;
import kz.sushimi.service.PageService;
import play.Logger;
import play.db.jpa.JPA;
import play.mvc.Controller;

import com.google.gson.Gson;

public class AnnouncementController extends Controller {

	/**
     * Список новостей
     */
	public static void news() {
		// PAGE
		PageModel page = PageService.getPage("NEWS");
		
		// DATA
		List<String> years =  JPA.em()
				.createQuery("Select publishYear from Announcement where isDeleted = false and isPublished = true and type = 0 group by publishYear")
				.getResultList();
    	renderTemplate("Announcements/news.html", years, page);
	}
	
    
    public static void newsPreview(int year, int month, int date, String uniqueName) {
		// PAGE
		PageModel page = PageService.getPage("NEWS_PREVIEW");
    	
		// DATA
    	Calendar startDate = Calendar.getInstance();
    	startDate.set(Calendar.YEAR, year);
    	startDate.set(Calendar.MONTH, month-1);
    	startDate.set(Calendar.DATE, date-1);
    	startDate.set(Calendar.HOUR_OF_DAY, 23);
    	startDate.set(Calendar.MINUTE, 59);
    	startDate.set(Calendar.SECOND, 59);
    	
    	Calendar endDate = Calendar.getInstance();
    	endDate.set(Calendar.YEAR, year);
    	endDate.set(Calendar.MONTH, month-1);
    	endDate.set(Calendar.DATE, date);
    	endDate.set(Calendar.HOUR_OF_DAY, 23);
    	endDate.set(Calendar.MINUTE, 59);
    	endDate.set(Calendar.SECOND, 59);
    	
    	Announcement model = AnnouncementsService.getAnnouncement(uniqueName, startDate, endDate);
    	if (model == null || model.isDeleted() || !model.isPublished() || model.getType() != 0) 
    		error();
    	
       	// Get Prev News
    	boolean prev = false;
    	AnnouncementModel prevModel = null;
    	Announcement prevAnn = AnnouncementsService.getPrevAnnouncement(model, 0);
    	if (prevAnn != null) {
    		prev = true;
    		prevModel = new AnnouncementModel(prevAnn);
    	}
    	
    	// Get Next News
    	boolean next = false;
    	AnnouncementModel nextModel = null;
    	Announcement nextAnn = AnnouncementsService.getNextAnnouncement(model, 0);
    	if (nextAnn != null) {
    		next = true;
    		nextModel = new AnnouncementModel(nextAnn);
    	}
    	
    	renderTemplate("Announcements/news_preview.html", model, next, nextModel, prev, prevModel, page);
    }
	
	   /**
     * Просмотр новости
     */
    public static void newsListAjax() {
    	String requestBody = params.current().get("body");
		Gson gson = new Gson();
		GetNewsAjaxRequest request = gson.fromJson(requestBody, GetNewsAjaxRequest.class);
		
		if (request.getYear() == null) {
			return;
		}
		
    	Calendar startDate = Calendar.getInstance();
    	startDate.set(Integer.valueOf(request.getYear()), 1, 1);
    	
    	Calendar endDate = Calendar.getInstance();
    	endDate.set(Integer.valueOf(request.getYear()), 12, 31);
		
        List<Announcement> announcements = AnnouncementsService.getNewsAnnouncements(startDate, endDate);
    	
        renderJSON(new GetAnnouncementsAjaxResponse(announcements));        
    }
    
    
    // ==============================
    // ======= ACTIONS ==============
    // ==============================
	/**
     * Список акции
     */
	public static void actions() {
		// PAGE
		PageModel page = PageService.getPage("PROMO");
		
		renderTemplate("Announcements/actions.html", page);
	}
	
	
    /**
     * Просмотр списка акций
     */
    public static void actionsListAjax() {
    	String requestBody = params.current().get("body");
		Gson gson = new Gson();
		GetPromotionsAjaxRequest request = gson.fromJson(requestBody, GetPromotionsAjaxRequest.class);
		
    	Calendar curTime = Calendar.getInstance();
    	curTime.setTimeInMillis(System.currentTimeMillis());
    	
        List<Announcement> announcements = AnnouncementsService.getActionsAnnouncements(curTime, request.isActive());
        renderJSON(new GetAnnouncementsAjaxResponse(announcements));
    }

	
	/**
	 * Просмотр акции
	 * @param id
	 */
	public static void actionsPreview(int year, int month, int date, String uniqueName) {
		// PAGE
		PageModel page = PageService.getPage("PROMO_PREVIEW");
				
		// DATA
		Calendar startDate = Calendar.getInstance();
    	startDate.set(Calendar.YEAR, year);
    	startDate.set(Calendar.MONTH, month-1);
    	startDate.set(Calendar.DATE, date-1);
    	startDate.set(Calendar.HOUR_OF_DAY, 23);
    	startDate.set(Calendar.MINUTE, 59);
    	startDate.set(Calendar.SECOND, 59);
    	
    	Calendar endDate = Calendar.getInstance();
    	endDate.set(Calendar.YEAR, year);
    	endDate.set(Calendar.MONTH, month-1);
    	endDate.set(Calendar.DATE, date);
    	endDate.set(Calendar.HOUR_OF_DAY, 23);
    	endDate.set(Calendar.MINUTE, 59);
    	endDate.set(Calendar.SECOND, 59);
    	
    	Announcement model = AnnouncementsService.getAnnouncement(uniqueName, startDate, endDate);
    	if (model == null || model.isDeleted() || !model.isPublished() || model.getType() != 1) 
    		error();

    	Calendar curTime = Calendar.getInstance();
    	curTime.setTimeInMillis(System.currentTimeMillis());
    	Long daysLeft = Long.valueOf((model.getEndDate().getTime().getTime() - curTime.getTime().getTime()) / (1000 * 60 * 60 * 24));    	
    	
    	String daysLeftText = null;
    	if (daysLeft.toString().endsWith("1"))  daysLeftText = daysLeft + " день";
    	if (daysLeft.toString().endsWith("2")) daysLeftText = daysLeft + " дня";
    	if (daysLeft.toString().endsWith("3")) daysLeftText = daysLeft + " дня";
    	if (daysLeft.toString().endsWith("4")) daysLeftText = daysLeft + " дня";
    	if (daysLeft.toString().endsWith("5")) daysLeftText = daysLeft + " дней";
    	if (daysLeft.toString().endsWith("6")) daysLeftText = daysLeft + " дней";
    	if (daysLeft.toString().endsWith("7")) daysLeftText = daysLeft + " дней";
    	if (daysLeft.toString().endsWith("8")) daysLeftText = daysLeft + " дней";
    	if (daysLeft.toString().endsWith("9")) daysLeftText = daysLeft + " дней";
    	if (daysLeft.toString().endsWith("0")) daysLeftText = daysLeft + " дней";
    	
       	// Get Prev News
    	boolean prev = false;
    	AnnouncementModel prevModel = null;
    	Announcement prevAnn = AnnouncementsService.getPrevAnnouncement(model, 1);
    	if (prevAnn != null) {
    		prev = true;
    		prevModel = new AnnouncementModel(prevAnn);
    	}
    	
    	// Get Next News
    	boolean next = false;
    	AnnouncementModel nextModel = null;
    	Announcement nextAnn = AnnouncementsService.getNextAnnouncement(model, 1);
    	if (nextAnn != null) {
    		next = true;
    		nextModel = new AnnouncementModel(nextAnn);
    	}
    	
    	renderTemplate("Announcements/actions_preview.html", model, daysLeftText, next, nextModel, prev, prevModel, page);
	}
    
}
