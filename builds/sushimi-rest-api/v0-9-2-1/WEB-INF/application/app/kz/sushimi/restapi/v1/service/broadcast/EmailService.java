package kz.sushimi.restapi.v1.service.broadcast;

import java.util.Calendar;
import java.util.List;
import java.util.UUID;

import org.hibernate.id.GUIDGenerator;

import kz.sushimi.persistence.broadcast.email.Email;
import play.db.jpa.JPA;


public class EmailService {

	public static void addOrUpdateEmail(String email, String name) {
		if (email == null || "".equals(email))
			return;
		// To lower case just to keep in db everything OK
		email = email.toLowerCase().trim();
		
		List<Email> emails = JPA.em().createQuery("from Email where email = :email")
				.setParameter("email", email)
				.getResultList();
		if (emails.size() > 0) {
			// update
			Email emailObj = emails.get(0);
			if (name != null && !"".equals(name))
				emailObj.setName(name);
			emailObj.setModifiedDate(Calendar.getInstance());
			JPA.em().persist(emailObj);
		}else {
			// insert
			Email emailNew = new Email();
			emailNew.setCreatedDate(Calendar.getInstance());
			emailNew.setModifiedDate(Calendar.getInstance());
			emailNew.setEmail(email);
			emailNew.setIsSubscribed(true);
			emailNew.setName(name);
			emailNew.setUniqueKey(UUID.randomUUID().toString());
			emailNew.setUnsubscribeDate(null);
			JPA.em().persist(emailNew);
		}
	}
	
	public static void unsubscribeEmail(String email) {
		if (email == null || "".equals(email))
			return;
		email = email.toLowerCase().trim();
		List<Email> emails = JPA.em().createQuery("from Email where email = :email")
				.setParameter("email", email)
				.getResultList();
		if (emails.size() < 1)
			return;
		
		Email emailObj = emails.get(0);
		emailObj.setUnsubscribeDate(Calendar.getInstance());
		emailObj.setIsSubscribed(false);
		JPA.em().persist(emailObj);		
	}
}
