package controllers;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

import kz.sushimi.models.AnnouncementModel;
import kz.sushimi.models.MainPageModel;
import kz.sushimi.models.PageModel;
import kz.sushimi.models.vacancy.VacancyGroup;
import kz.sushimi.persistence.broadcast.push.Push;
import kz.sushimi.persistence.dictionaries.Product;
import kz.sushimi.service.AnnouncementsService;
import kz.sushimi.service.PageService;
import kz.sushimi.service.ProductService;
import kz.sushimi.service.VacancyService;
import kz.sushimi.services.push.APNSManager;
import play.Logger;
import play.db.jpa.JPA;
import play.mvc.Controller;

import com.relayrides.pushy.apns.util.ApnsPayloadBuilder;
import com.relayrides.pushy.apns.util.MalformedTokenStringException;
import com.relayrides.pushy.apns.util.SimpleApnsPushNotification;
import com.relayrides.pushy.apns.util.TokenUtil;

public class Application extends Controller {

	public static void yandex(){
		renderTemplate("/Application/188105c048ad.html");
	}
	

	public static void sitemap(){
		renderTemplate("/Application/sitemap.xml");
	}
	
	
	public static void sendPush(){
		byte[] token;
		try {
			List<Push> pushes = JPA.em().createQuery("from Push where isSubscribed = true").getResultList();
			for (Push push : pushes) {
				token = TokenUtil.tokenStringToByteArray(
						push.getPushKey());
				ApnsPayloadBuilder payloadBuilder = new ApnsPayloadBuilder();
				payloadBuilder.setAlertBody("Заказ поступил оператору. Ожидайте звонка.");
				//payloadBuilder.setAlertTitle("Заказ № 01005539"); // 
				payloadBuilder.setSoundFileName("ring-ring.aiff");
				//payloadBuilder.addCustomProperty("a", "1");
				//payloadBuilder.setAlertBody("При покупке 2х пицц, 3ая бесплатно!");
				payloadBuilder.addCustomProperty("n", "01005549");
				payloadBuilder.addCustomProperty("o", "46359a39-a684-4e39-a236-c5ff82a1428c");
				String payload = payloadBuilder.buildWithMaximumLength(5048);
				Logger.info(payload);
				SimpleApnsPushNotification notif = new SimpleApnsPushNotification(token, payload);
				APNSManager.getInstance().getPushManager().getQueue().put(notif);
			}
		} catch (MalformedTokenStringException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
    public static void index() {
    	// PAGE
    	PageModel page = PageService.getPage("INDEX"); 
    	
    	// DATA
    	List<AnnouncementModel> slides = AnnouncementsService.getAnnouncementSlidesForMainPage();
    	List<AnnouncementModel> events = AnnouncementsService.getAnnouncementsForMainPage();
    	List<Product> products = ProductService.getProductsForMainPage();
    	
    	MainPageModel model = new MainPageModel(products, slides, events);
    	
        render(model, page);
    }

    public static void about() {
    	// PAGE
    	PageModel page = PageService.getPage("ABOUT"); 
    	
    	// DATA
    	render(page);
    }            
    
    public static void contacts() {
    	// PAGE
    	PageModel page = PageService.getPage("CONTACTS"); 
    	
    	// DATA
    	render(page);
    }    
    
    public static void delivery() {
    	// PAGE
    	PageModel page = PageService.getPage("DELIVERY"); 
    	
    	// DATA
    	render(page);
    }
    
    public static void terms() {
    	// PAGE
    	PageModel page = PageService.getPage("DELIVERY_TERMS"); 
    	
    	// DATA
    	render(page);
    }
    

    public static void vacancy(String vacancyId, String name, String birth, String phone, String email, File fileUpload) {
    	// PAGE
    	PageModel page = PageService.getPage("VACANCIES"); 
    	
    	// DATA
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
    	
    	render(isAccepted, page);
    }
    
    public static void vacancies() {
    	List<kz.sushimi.persistence.vacancies.VacancyGroup> vacancyGroups = VacancyService.getVacancyGroups();
    	
    	List<VacancyGroup> groups = new ArrayList<VacancyGroup>();
    	for (kz.sushimi.persistence.vacancies.VacancyGroup vacancyGroup : vacancyGroups) {
			groups.add(new VacancyGroup(vacancyGroup));
		}
    	
    	renderJSON(groups);
    }
       
}