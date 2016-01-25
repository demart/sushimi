package kz.sushimi.service.broadcast;

import java.util.Calendar;
import java.util.List;
import java.util.UUID;

import kz.sushimi.persistence.broadcast.phone.Phone;
import play.db.jpa.JPA;

public class PhoneService {


	public static void addOrUpdatePhone(String phone, String name) {
		if (phone == null || "".equals(phone))
			return;
		// To lower case just to keep in db everything OK
		phone = phone.toLowerCase().trim();
		
		List<Phone> phones = JPA.em().createQuery("from Phone where phone = :phone")
				.setParameter("phone", phone)
				.getResultList();
		if (phones.size() > 0) {
			// update
			Phone phoneObj = phones.get(0);
			if (name != null && !"".equals(name))
				phoneObj.setName(name);
			phoneObj.setModifiedDate(Calendar.getInstance());
			JPA.em().persist(phoneObj);
		}else {
			// insert
			Phone phoneNew = new Phone();
			phoneNew.setCreatedDate(Calendar.getInstance());
			phoneNew.setModifiedDate(Calendar.getInstance());
			phoneNew.setPhone(phone);
			phoneNew.setIsSubscribed(true);
			phoneNew.setName(name);
			phoneNew.setUniqueKey(UUID.randomUUID().toString());
			phoneNew.setUnsubscribeDate(null);
			JPA.em().persist(phoneNew);
		}
	}
	
	public static void unsubscribePhone(String phone) {
		if (phone == null || "".equals(phone))
			return;
		phone = phone.toLowerCase().trim();
		List<Phone> phones = JPA.em().createQuery("from Phone where phone = :phone")
				.setParameter("phone", phone)
				.getResultList();
		if (phones.size() < 1)
			return;
		
		Phone phoneObj = phones.get(0);
		phoneObj.setUnsubscribeDate(Calendar.getInstance());
		phoneObj.setIsSubscribed(false);
		JPA.em().persist(phoneObj);		
	}
}
