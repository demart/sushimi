package kz.sushimi.console.services;

import java.util.List;

import kz.sushimi.console.persistence.orders.site.SiteOrder;
import play.db.jpa.JPA;

/**
 * Сервис для работы с заказами с сайта
 * 
 * @author Demart
 *
 */
public class SiteOrderService {

	public static boolean isExist(int id) {
		List<SiteOrder> list = JPA.em().createQuery("from SiteOrder where siteId = :id")
			.setParameter("id", id).getResultList();
		if (list.size() > 0)
			return true;
		return false;
	}
	
}
