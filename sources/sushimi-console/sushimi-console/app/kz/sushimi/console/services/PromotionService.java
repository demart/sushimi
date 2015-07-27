package kz.sushimi.console.services;

import java.util.List;

import kz.sushimi.console.persistence.promotions.Promotion;
import play.db.jpa.JPA;

public class PromotionService {

	public static List<Promotion> getPromotions(int start, int limit) {
		return JPA.em().createQuery("from Promotion where isPublished= true and isDeleted = false")
				.setMaxResults(limit).setFirstResult(start).getResultList();
	}
	
}
