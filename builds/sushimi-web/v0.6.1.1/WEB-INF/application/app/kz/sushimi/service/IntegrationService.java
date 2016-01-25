package kz.sushimi.service;

import java.util.ArrayList;
import java.util.List;

import kz.sushimi.persistence.orders.Order;
import kz.sushimi.persistence.orders.OrderProcess;

import org.hibernate.util.ArrayHelper;

import play.db.jpa.JPA;

/**
 * Сервис для решения задач интеграции
 * 
 * @author Demart
 *
 */
public class IntegrationService {

	/**
	 * Возвращает список не обработанных заказов
	 */
	public static List<Order> getOrders() {
		List<Order> orders = JPA.em().createQuery("from Order where processed = :processed order by id asc")
		.setParameter("processed", OrderProcess.NOT_PROCESSED)
		.getResultList();
		return orders;
	}
	
	/**
	 * Подтверждает что скаченные заказы обработаны корректно
	 * @param ids
	 * @return
	 */
	public static int confirmOrders(Integer[] ids) {
		ArrayList list = new ArrayList(); 
		ArrayHelper.addAll(list, ids);
		int rowAffected = JPA.em().createQuery("update Order set processed = :processed where id in :ids")
			.setParameter("processed", OrderProcess.PROCESSED)
			.setParameter("ids",  list)
			.executeUpdate();
		return rowAffected;
	}
	
}
