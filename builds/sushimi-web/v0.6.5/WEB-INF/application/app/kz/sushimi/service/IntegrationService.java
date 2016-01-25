package kz.sushimi.service;

import java.util.ArrayList;
import java.util.List;

import kz.sushimi.models.integration.order.SushimiWebOrderHistoryModel;
import kz.sushimi.models.integration.order.SushimiWebOrderModel;
import kz.sushimi.persistence.orders.Order;
import kz.sushimi.persistence.orders.OrderHistory;
import kz.sushimi.persistence.orders.OrderProcess;
import kz.sushimi.persistence.users.User;
import kz.sushimi.persistence.users.UserRole;

import org.hibernate.util.ArrayHelper;

import play.Logger;
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
	
	
	
	/**
	 * Подтверждает что статусы успешно обновлены кольсолью
	 * @param ids
	 * @return
	 */
	public static int confirmOrdersHistoryUpdates(Long[] ids) {
		ArrayList list = new ArrayList(); 
		ArrayHelper.addAll(list, ids);
		int rowAffected = JPA.em().createQuery("update OrderHistory set isSynchronized = true where id in :ids")
			.setParameter("ids",  list)
			.executeUpdate();
		return rowAffected;
	}	
	
	/**
	 * Метод синхронизирует данные заказа из консоли оператора.
	 * Если заказ уже существует в базе, то обновляет его содержимое, например человек что-то изменил при голосовом общении.
	 */
	public static void synchronizeOrder(SushimiWebOrderModel orderModel) {
		Order order = OrderService.getOrderByNumber(orderModel.orderNumber);
		if (order == null) {
			// Заказ не существует - Создать
			Logger.info("Create new order from console: %s ", orderModel.orderNumber);
			OrderService.registerOrderFromCallCenter(orderModel);
		} else {
			// Заказ существует - Обновлять
			Logger.info("Update existing order: %s ", orderModel.orderNumber);
			OrderService.updateExistingOrderByCallCenter(orderModel, order);
		}
		
	}

	public static Long synchronizeOrderHistory(SushimiWebOrderHistoryModel orderHistoryModel) {
		Order order = OrderService.getOrderByNumber(orderHistoryModel.orderNumber);
		if (order == null)
			throw new NullPointerException("Order with number: " + orderHistoryModel.orderNumber + " not found!");
		
		// TODO ORDER HISTORY CHECK EXISTANCE IN OUR DB BEFORE INSERTING NEW ONE
		// Например может получиться так что взял один курьер, не довез и потом его передал другому, оператор может его
		// переназначить
		
		OrderHistory oh = new OrderHistory();
		oh.setOrder(order);
		oh.setConsoleRecordId(orderHistoryModel.id);
		oh.setDate(orderHistoryModel.date);
		
		// Выставляет нахождение заказа
		if (orderHistoryModel.geoLatitude != null && orderHistoryModel.geoLongitude != null) {
			oh.setGeoLatitude(orderHistoryModel.geoLatitude);
			oh.setGeoLongitude(orderHistoryModel.geoLongitude);
		} else {
			// Если данные не пришли с консоли то выставляем на основе расположение отделения
			if (order.getDepartment() != null) {
				oh.setGeoLatitude(order.getDepartment().getLatitude());
				oh.setGeoLongitude(order.getDepartment().getLongitude());
			}
		}

		oh.setIsSynchronized(true);
		oh.setOrderState(orderHistoryModel.orderState);
		oh.setUser(orderHistoryModel.user);
		
		// Извлекаем пользователя кто соверший изменение состояния заказа
		User user = null;
		if (orderHistoryModel.user != null) {
			 List<User> users = JPA.em().createQuery("from User where code = :code")
					 .setParameter("code", orderHistoryModel.user).getResultList();
			 if (users.size() > 0) {
				 user = users.get(0);
			 } else {
				 Logger.warn("Synchronize orderHistory, user with code: %s not found.", orderHistoryModel.user);
			 }
		}
		// Если курьер отчитывается по заказу, тогда можно его выставить как доставщика заказа
		// Ситуация следующая, у нас есть курьеры которые берут заказы в работу, но может так получиться,
		// что кто-то другой отправит его в работу, например операторв. В этом случае может быть проблема,
		// когда курьев в мобильном приложении тупо не найдет свой заказ. Чет типо того.
		// Если когда оператор переназначает заказ на другого курьера
		if (user != null)
			if (orderHistoryModel.orderState == OrderProcess.ON_DELIVERY ||
				orderHistoryModel.orderState == OrderProcess.DELIVERED ||
				orderHistoryModel.orderState == OrderProcess.CANCELED || 
				orderHistoryModel.orderState == OrderProcess.RETURNED) {
				if (user.getRole() == UserRole.COURIER)
					order.setCourierCode(user.getCode());
			}
 		
		if (user != null)
			if (orderHistoryModel.orderState == OrderProcess.IN_PROGRESS)
				if (user.getRole() == UserRole.COOK)
					order.setCookCode(user.getCode());
		
		if (order.getProcessed() == OrderProcess.REGISTERED) {
			if (orderHistoryModel.orderState == OrderProcess.IN_PROGRESS ||
				orderHistoryModel.orderState == OrderProcess.ON_DELIVERY ||
				orderHistoryModel.orderState == OrderProcess.WAITING_FOR_DELIVERY ||
				orderHistoryModel.orderState == OrderProcess.DELIVERED) {
				order.setProcessed(orderHistoryModel.orderState);
			}
		}
		
		if (order.getProcessed() == OrderProcess.IN_PROGRESS) {
			if (orderHistoryModel.orderState == OrderProcess.ON_DELIVERY ||
				orderHistoryModel.orderState == OrderProcess.WAITING_FOR_DELIVERY ||
				orderHistoryModel.orderState == OrderProcess.DELIVERED) {
				order.setProcessed(orderHistoryModel.orderState);
			}
		}
		
		if (order.getProcessed() == OrderProcess.WAITING_FOR_DELIVERY) {
			if (orderHistoryModel.orderState == OrderProcess.ON_DELIVERY ||
				orderHistoryModel.orderState == OrderProcess.DELIVERED) {
				order.setProcessed(orderHistoryModel.orderState);
			}
		}
		
		if (order.getProcessed() == OrderProcess.ON_DELIVERY) {
			if (orderHistoryModel.orderState == OrderProcess.DELIVERED) {
				order.setProcessed(orderHistoryModel.orderState);
				order.setCourierCode(orderHistoryModel.user);
			}
		}
		
		if (orderHistoryModel.orderState == OrderProcess.CANCELED ||
			orderHistoryModel.orderState == OrderProcess.RETURNED) {
			order.setProcessed(orderHistoryModel.orderState);
		}
		
		JPA.em().persist(oh);
		JPA.em().persist(order);
		
		return oh.getId();
	}

	/**
	 * Формирует список обновлений для консоли
	 * @return
	 */
	public static List<OrderHistory> getOrdersHistoryUpdates() {
		return OrderService.getOrdersHistoryUpdates();
	}
	
}
