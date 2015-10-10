package kz.sushimi.console.integration.site;

import java.util.List;

import com.google.gson.Gson;

import kz.sushimi.console.integration.site.models.SushimiWebOrderHistoryModel;
import kz.sushimi.console.integration.site.models.SushimiWebOrderModel;
import kz.sushimi.console.integration.site.models.SushimiWebOrderSynchronizationResult;
import kz.sushimi.console.persistence.orders.Order;
import kz.sushimi.console.persistence.orders.OrderHistory;
import kz.sushimi.console.services.OrderService;
import play.Logger;
import play.jobs.Every;
import play.jobs.Job;
import play.libs.WS;
import play.libs.WS.HttpResponse;


//@Every("10s")
public class SushimiWebOrderHistorySynchronizer extends Job {

	/**
	 * Адрес сайта куда обращаться за заказами
	 */
	//public static final String URL_HOST = "http://sushimi.kz";
	public static final String URL_HOST = "http://localhost:9001";
	
	/**
	 * Путь до регистрации или обновления нового заказа
	 */
	public static final String URL_PUT_ORDERS_HISTORY_CONTEXT = "/system/orders/history/synchronize";
	
	/**
	 * Запускаем процесс поиска новых заказов, которые нужно синхронизировать с сайтом
	 * @throws InterruptedException 
	 */
    public void doJob() {
    	Logger.info("Integration: Reading orders history to synchronize with SushimiWeb...");
    	
    	
    	List<OrderHistory> ordersHistory = OrderService.getNotSychronizedOrdersHistoryWithWeb();
    	if (ordersHistory.size() > 0) { 
    		Gson gson = new Gson();
    		for (OrderHistory orderHistory : ordersHistory) {
    			if (orderHistory == null) continue;
    			
    			try {
    				SushimiWebOrderHistoryModel model = convertOrderHistoryToSushimiWebOrderHistoryModel(orderHistory);
    				Logger.info(gson.toJson(model));
    				HttpResponse response = WS.url(URL_HOST + URL_PUT_ORDERS_HISTORY_CONTEXT).body(gson.toJson(model)).post();
    				String responseBody = response.getString();
    				
    				SushimiWebOrderSynchronizationResult result = gson.fromJson(responseBody, SushimiWebOrderSynchronizationResult.class);
    				if (result == null) {
    					// TODO Что-то не так, наверное нужно поругаться
    					continue;
    				}
    				
    				if (result.success) {
    					// Сохраняем факт того что мы успешно просинхронизировали заказы
    					Logger.info("Integration: OrderId: %s SiteOrderId: %s synchronized", orderHistory.getId(), result.siteRecordId);
    					orderHistory.setIsSynchronized(true);
    					orderHistory.setSiteRecordId(Long.valueOf(result.siteRecordId));
    					orderHistory.save();
    				} else {
    					Logger.error("Integration: OrderHistoryId: %s synchronization with SushimiWeb error, message: %s", orderHistory.getId(), result.message);
    					continue;
    				}
    				
    			} catch (Throwable e) {
    				Logger.error(e, "Integration: OrderHistoryId: %s failed to synchronize with SushimiWeb", orderHistory.getId());
    			}
			}
    	}
    	
    	Logger.info("Integration: Reading orders to synchronize with SushimiWeb completed.");
    	
    	Logger.info("Logger history count: " + ordersHistory.size());
    	
    }

	private SushimiWebOrderHistoryModel convertOrderHistoryToSushimiWebOrderHistoryModel(OrderHistory orderHistory) {
		SushimiWebOrderHistoryModel model = new SushimiWebOrderHistoryModel();
		
		model.date = orderHistory.getDate();
		model.geoLatitude = orderHistory.getGeoLatitude();
		model.geoLongitude = orderHistory.getGeoLongitude();
		model.id = orderHistory.id;
		model.orderNumber = orderHistory.getOrder().getOrderNumber();
		model.orderState = orderHistory.getOrderState();
		model.user = orderHistory.getUser() != null ? orderHistory.getUser().getCode() : null;
		
		return model;
	}
	
}
