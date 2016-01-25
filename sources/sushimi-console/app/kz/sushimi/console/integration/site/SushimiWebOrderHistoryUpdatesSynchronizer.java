package kz.sushimi.console.integration.site;

import java.util.ArrayList;
import java.util.List;

import kz.sushimi.console.integration.site.models.SushimiWebOrderHistoryModel;
import kz.sushimi.console.persistence.clients.Client;
import kz.sushimi.console.persistence.orders.Order;
import kz.sushimi.console.persistence.orders.OrderHistory;
import kz.sushimi.console.persistence.orders.OrderState;
import kz.sushimi.console.services.OrderService;
import play.Logger;
import play.jobs.Every;
import play.jobs.Job;
import play.libs.WS;
import play.libs.WS.HttpResponse;

import com.google.gson.Gson;


//@Every("15s")
public class SushimiWebOrderHistoryUpdatesSynchronizer extends Job {

	/**
	 * Адрес сайта куда обращаться за заказами
	 */
	//public static final String URL_HOST = "http://sushimi.kz";
	public static final String URL_HOST = "http://localhost:9001";
	
	/**
	 * Путь до получения изменений в заказах
	 */
	public static final String URL_GET_ORDERS_HISTORY_UPDATES_CONTEXT = "/system/orders/history/get/updates";
	
	/**
	 * Путь до подтверждения получения изменений в заказа с сайта
	 */
	public static final String URL_CONFIRM_ORDERS_HISTORY_UPDATES_CONTEXT = "/system/orders/history/confirm/updates";
	
	
	
	/**
	 * Запускаем процесс получения изменений в заказах (например изменилось передвижение курьера, или заказ доставили)
	 * @throws InterruptedException 
	 */
    public void doJob() {
    	Logger.info("Integration: Reading orders history updates in SushimiWeb...");
    	
    	// TODO Передавать город и отедление которое синхронизирует изменения
    	HttpResponse response = WS.url(URL_HOST + URL_GET_ORDERS_HISTORY_UPDATES_CONTEXT).post();
    	String requestBody = response.getString();
		Gson gson = new Gson();
		SushimiWebOrderHistoryModel[] orderModels = gson.fromJson(requestBody, SushimiWebOrderHistoryModel[].class);
		
		List<Long> ids = processOrderHistoryUpdates(orderModels);
		
		if (ids.size() > 0) {
			Logger.info(gson.toJson(ids));
			response = WS.url(URL_HOST + URL_CONFIRM_ORDERS_HISTORY_UPDATES_CONTEXT).body(gson.toJson(ids)).post();
		}
    	
    	Logger.info("Integration: Reading orders history updates in SushimiWeb completed.");
    }
	
    
    public List<Long> processOrderHistoryUpdates(SushimiWebOrderHistoryModel[] models) {
    	List<Long> ids = new ArrayList<Long>();
    	
    	if (models == null || models.length < 1)
    		return ids;
    		
    	for (SushimiWebOrderHistoryModel model : models) {
			if (model == null)
				continue;
			
			Order order = OrderService.getOrderByNumber(model.orderNumber);
			if (order == null) {
				// TODO Заказа не нашлось, а синхронизировать предлагают, что делать? Пока пропустим				
				ids.add(model.id);
				continue;
			}
			
			OrderHistory oh = OrderService.geOrderHistoryBySiteRecordId(model.id);
			if (oh == null)
				oh = new OrderHistory();
			
			oh.setOrder(order);
			oh.setDate(model.date);
			oh.setGeoLatitude(model.geoLatitude);
			oh.setGeoLongitude(model.geoLongitude);
			oh.setIsSynchronized(true);
			oh.setOrderState(model.orderState);
			oh.setSiteRecordId(model.id);
			
			// TOOD Синхронизировать пользователя изменившего статус
			//oh.setUser(model.user);
			
			oh.save();
			
			// По идее с сайта могут приходить либо изменения точке ON_DELIVERY либо DELIVERED, но так как 
			// есть вероятность того что заказ могут закрыть в консоле а тут синхронизация пойдет позже
			// То может получиться изменения статуса с DELIVERED обрабтно на ON_DELIVERY
			if (model.orderState == OrderState.DELIVERED && order.getOrderState() != OrderState.DELIVERED) {
				order.setOrderState(OrderState.DELIVERED);
				order.save();
				
				// Вставить добавление к общей сумме заказа клиента
				Client client = order.getClient();
				if (client != null) {
					Integer totalOrderSum = client.getTotalOrderSum();
					if (totalOrderSum == null)
						totalOrderSum = 0;
					totalOrderSum = totalOrderSum + order.getOrderSum();
					client.setTotalOrderSum(totalOrderSum);
					client.save();
				}
			}
			
			
			ids.add(model.id);
		}
    	
    	return ids;
    }
    
}
