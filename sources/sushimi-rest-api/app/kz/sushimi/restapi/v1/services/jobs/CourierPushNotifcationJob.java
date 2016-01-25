package kz.sushimi.restapi.v1.services.jobs;

import java.util.Calendar;
import java.util.List;

import net.sf.oval.internal.Log;
import kz.sushimi.persistence.orders.OrderHistory;
import kz.sushimi.persistence.orders.OrderProcess;
import kz.sushimi.persistence.users.User;
import kz.sushimi.persistence.users.UserMobileOperationSystem;
import kz.sushimi.restapi.v1.service.OrderService;
import kz.sushimi.restapi.v1.service.UserService;
import kz.sushimi.restapi.v1.services.push.AndroidPushRequestWrapper;
import play.Logger;
import play.jobs.Every;
import play.jobs.Job;
import play.libs.WS;
import play.libs.WS.HttpResponse;
import play.libs.WS.WSRequest;

import com.google.gson.Gson;

@Every("30s")
public class CourierPushNotifcationJob extends Job {

	// Время последней проверки на наличие новых изменений
	private static Calendar lastCheckTime;
	
	public void doJob() {
    	Logger.debug("Courier push notification job started.");
    	
		if (lastCheckTime == null)
			lastCheckTime = Calendar.getInstance();
    	
		Logger.debug("Last check was at:" + lastCheckTime.getTime().toGMTString());
		
    	// найти записи в истории заказов по которым еще не отправили уведомление
    	// Получить список курьеров с мобильными девайсами (возможно тех кто заходил сегодня с 5 утра
    	// чтобы отсечь не работающих сегодня
    	
    	// TODO Решить отправлять серию одиночных уведомлений или группвой
    	// Пока будет одиночный
		
    	List<OrderHistory> orderHistories = OrderService.getOrdersHistoryForCouirerNotification(lastCheckTime);
    	if (orderHistories != null && orderHistories.size() > 0) {
    		// нужно уведомить курьеров
    		
    		List<User> couriers = UserService.getActiveCouriers();
    		if (couriers != null && couriers.size() > 0) {
    			// Есть курьеры которых можно уведомить
    			Gson gson = new Gson();
    			
    			for (User user : couriers) {
					if (user.getMobileOperationSystem() == null || user.getMobilePushKey() == null) {
						Logger.debug("Courier " + user.getCode() + " doent have OS or PushKey to send notificaiton");
						continue;
					}

					if (user.getMobileOperationSystem() != UserMobileOperationSystem.ANDROID) {
						Logger.debug("Courier " + user.getCode() + " doen't support ANDROID");
						continue;
					}
					
					// Рассылаем курьеру изменения по истории заказов
					for (OrderHistory orderHistory : orderHistories) {
						String message = getPushMessage(orderHistory);
						
						try {
							// Send Push
							WSRequest request = WS.url("https://gcm-http.googleapis.com/gcm/send");
							request.headers.put("Authorization", "key=AIzaSyC-kOubHvrfP_J4-V3LV3lz_WRrhWeqPyc"); // Пока хардкод
							request.headers.put("Content-Type", "application/json");
							AndroidPushRequestWrapper pushRequestObject = new AndroidPushRequestWrapper(user.getMobilePushKey(), message);
							Logger.debug("JSON request: " + gson.toJson(pushRequestObject));
							request.body(gson.toJson(pushRequestObject));
							HttpResponse response = request.post();
							Logger.debug("Response: " + response.getString());
							Logger.debug("Push notification was sent to Courier " + user.getCode());
						} catch (Throwable ex) {
							Logger.error(ex, "Error during send Android Push notificaiton");
						}
					}
					
				}
    			
    		}
    	} else {
    		Logger.debug("Couirier push no any orders hostory changes...");
    	}
    	
    	// Указываем новое время для последующей синхронизации
    	lastCheckTime = Calendar.getInstance();
    	
    	Logger.debug("Courier push notification job finished");
	}
	
	/**
	 * Подготавливает сообщение для отправки по PUSH (Пока только для Андроид)
	 * @param orderHistory
	 * @return
	 */
	private String getPushMessage(OrderHistory orderHistory) {
		if (orderHistory.getOrderState() == OrderProcess.IN_PROGRESS) {
			return "Заказ № " + orderHistory.getOrder().getOrderNumber() + " поступил на кухню.";
		}
		
		if (orderHistory.getOrderState() == OrderProcess.WAITING_FOR_DELIVERY) {
			return "Заказ № " + orderHistory.getOrder().getOrderNumber() + " готов. Ожидает курьера.";
		}
		
		if (orderHistory.getOrderState() == OrderProcess.ON_DELIVERY) {
			User courier = UserService.getUserByCode(orderHistory.getUser());
			if (courier == null) {
				return "Заказ № " + orderHistory.getOrder().getOrderNumber() + " забрал: " + orderHistory.getUser();
			} else {
				return "Заказ № " + orderHistory.getOrder().getOrderNumber() + " забрал: " + courier.getName();
			}
		}
		
		return "Заказ № " + orderHistory.getOrder().getOrderNumber() + ". Статус:" + orderHistory.getOrderState();
	}
	
}
