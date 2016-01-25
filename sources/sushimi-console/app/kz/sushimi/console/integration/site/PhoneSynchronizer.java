package kz.sushimi.console.integration.site;

import java.util.List;

import com.google.gson.Gson;

import kz.sushimi.console.persistence.clients.ClientPhoneSync;
import kz.sushimi.console.persistence.clients.ClientPhoneSyncStatus;
import play.Logger;
import play.db.jpa.JPA;
import play.jobs.Every;
import play.jobs.Job;
import play.libs.WS;


//@Every("12s")
public class PhoneSynchronizer extends Job {
	
	/**
	 * Адрес сайта куда обращаться за заказами
	 */
	//public static final String URL_HOST = "http://sushimi.kz";
	public static final String URL_HOST = "http://localhost:9001";
	/**
	 * Путь до регистрации телефонов
	 */
	public static final String URL_REGISTER_PHONE_CONTEXT = "/system/register/phone";
	
	/**
	 * Запускаем процесс прослушивания телефонов и emails
	 */
	public void doJob() {
    	Logger.info("Synchronization Phone and Email started");
    	
    	List<ClientPhoneSync> clientPhoneList = JPA.em().createQuery("from ClientPhoneSync where status = :status")
    			.setParameter("status", ClientPhoneSyncStatus.NEW).getResultList();
    	Gson gson = new Gson();
    	
    	for (ClientPhoneSync clientPhoneSync : clientPhoneList) {
			RegisterPhoneModel model = new RegisterPhoneModel();
			model.name = clientPhoneSync.name;
			model.phone = clientPhoneSync.phone;
			
			RegisterPhoneModel[] models = new RegisterPhoneModel[1];
			models[0] = model;
			Logger.info(gson.toJson(model));
			WS.url(URL_HOST + URL_REGISTER_PHONE_CONTEXT).body(gson.toJson(models)).post();
			
			clientPhoneSync.status = ClientPhoneSyncStatus.SENT;
			clientPhoneSync.save();
		}

    	Logger.info("Synchronization Phone and Email finished");
	}
}
