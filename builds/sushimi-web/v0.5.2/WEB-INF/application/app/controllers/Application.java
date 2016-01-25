package controllers;

import play.*;
import play.data.parsing.MultipartStream;
import play.db.jpa.JPA;
import play.mvc.*;

import java.io.File;
import java.util.*;

import javax.persistence.Query;

import kz.sushimi.models.AnnouncementModel;
import kz.sushimi.models.MainPageModel;
import kz.sushimi.models.vacancy.VacancyGroup;
import kz.sushimi.persistence.Announcement;
import kz.sushimi.persistence.dictionaries.Category;
import kz.sushimi.persistence.dictionaries.Product;
import kz.sushimi.persistence.vacancies.Vacancy;
import kz.sushimi.service.AnnouncementsService;
import kz.sushimi.service.ProductService;
import kz.sushimi.service.VacancyService;

public class Application extends Controller {

	public static void yandex(){
		renderTemplate("/Application/188105c048ad.html");
	}
	

	public static void sitemap(){
		renderTemplate("/Application/sitemap.xml");
	}
	
	
    public static void index() {
    	Logger.debug("Action [index] invoked");
    	
    	List<AnnouncementModel> slides = AnnouncementsService.getAnnouncementSlidesForMainPage();
    	List<AnnouncementModel> events = AnnouncementsService.getAnnouncementsForMainPage();
    	List<Product> products = ProductService.getProductsForMainPage();
    	
    	MainPageModel model = new MainPageModel(products, slides, events);
    	
        render(model);
    }

    public static void about() {
    	Logger.debug("Action [about] invoked");
    	render();
    }            
    
    public static void contacts() {
    	Logger.debug("Action [contacts] invoked");
    	render();
    }    
    
    public static void delivery() {
    	Logger.debug("Action [delivery] invoked");
    	render();
    }
    
    public static void terms() {
    	Logger.debug("Action [terms] invoked");
    	render();
    }
    

    public static void vacancy(String vacancyId, String name, String birth, String phone, String email, File fileUpload) {
    	Logger.debug("Action [vacancy] invoked");

    	int vacancyIdVal = 0;
    	boolean isError = false;
    	if (vacancyId == null || vacancyId.isEmpty()) isError = true;
    	try {
    		vacancyIdVal = Integer.parseInt(vacancyId);
    	} catch(Throwable e) {
    		isError = true;
    	}
    	
    	if (name == null || name.isEmpty()) isError = true;
    	if (birth == null || birth.isEmpty()) isError = true;
    	if (phone == null || phone.isEmpty()) isError = true;
    	if (email == null || email.isEmpty()) isError = true;
    	if (fileUpload == null) isError = true;
    	
    	// saving
    	boolean isAccepted = false;
    	if (isError == false)
    		isAccepted = VacancyService.saveVacancyApplication(vacancyIdVal, name, birth, phone, email, fileUpload);
    	
    	render(isAccepted);
    }
    
    public static void vacancies() {
    	Logger.debug("Action [vacancies] invoked");
    	
    	List<kz.sushimi.persistence.vacancies.VacancyGroup> vacancyGroups = VacancyService.getVacancyGroups();
    	
    	List<VacancyGroup> groups = new ArrayList<VacancyGroup>();
    	for (kz.sushimi.persistence.vacancies.VacancyGroup vacancyGroup : vacancyGroups) {
			groups.add(new VacancyGroup(vacancyGroup));
		}
    	
    	renderJSON(groups);
    }
       
}