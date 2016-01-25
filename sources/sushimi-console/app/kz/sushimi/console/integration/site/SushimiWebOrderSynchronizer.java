package kz.sushimi.console.integration.site;

import java.util.ArrayList;
import java.util.List;

import kz.sushimi.console.integration.site.models.SushimiWebOrderClientAddressModel;
import kz.sushimi.console.integration.site.models.SushimiWebOrderClientModel;
import kz.sushimi.console.integration.site.models.SushimiWebOrderItemModel;
import kz.sushimi.console.integration.site.models.SushimiWebOrderModel;
import kz.sushimi.console.integration.site.models.SushimiWebOrderSynchronizationResult;
import kz.sushimi.console.persistence.dictionaries.ProductType;
import kz.sushimi.console.persistence.orders.Order;
import kz.sushimi.console.persistence.orders.OrderItem;
import kz.sushimi.console.services.OrderService;
import play.Logger;
import play.jobs.Every;
import play.jobs.Job;
import play.libs.WS;
import play.libs.WS.HttpResponse;

import com.google.gson.Gson;


@Every("10s")
public class SushimiWebOrderSynchronizer extends Job {

	/**
	 * Адрес сайта куда обращаться за заказами
	 */
	//public static final String URL_HOST = "http://sushimi.kz";
	public static final String URL_HOST = "http://localhost:9001";
	
	/**
	 * Путь до регистрации или обновления нового заказа
	 */
	public static final String URL_PUT_ORDERS_CONTEXT = "/system/orders/synchronize";
	
	/**
	 * Запускаем процесс поиска новых заказов, которые нужно синхронизировать с сайтом
	 * @throws InterruptedException 
	 */
    public void doJob() {
    	Logger.info("Integration: Reading orders to synchronize with SushimiWeb...");
    	
    	// 1. Get not synchronized orders
    	// 2. Convert orders
    	// 3. Send orders in the loop
    	
    	List<Order> orders = OrderService.getNotSychronizedOrdersWithWeb();
    	if (orders.size() > 0) { 
    		Gson gson = new Gson();
    		for (Order order : orders) {
    			if (order == null) continue;
    			
    			try {
    				SushimiWebOrderModel model = convertOrderToSushimiWebOrderModel(order);
    				Logger.info(gson.toJson(model));
    				HttpResponse response = WS.url(URL_HOST + URL_PUT_ORDERS_CONTEXT).body(gson.toJson(model)).post();
    				String responseBody = response.getString();
    				
    				SushimiWebOrderSynchronizationResult result = gson.fromJson(responseBody, SushimiWebOrderSynchronizationResult.class);
    				if (result == null) {
    					// Что-то не так, наверное нужно поругаться
    					continue;
    				}
    				
    				// TODO 
    				// 1. Сделать обрабтку со стороны сайта (новый или существующий)
    				// 2. Возвращать ID записи не сайте
    				// 3. Отправлять изменение статуса обработки заказа
    				// 4. Получать изменения о местоположении товара на доставке (синхронизировать id нужно)
    				// Вопросы:
    				//		Как передавать курьера который взял заказ
    				//		Как передавать точки где он был
    				//		Как на сайте понять что он везет несколько заказов
    				
    				if (result.success) {
    					// Сохраняем факт того что мы успешно просинхронизировали заказы
    					Logger.info("Integration: OrderId: %s OrderNumber: %s synchronized", order.getId(), order.getOrderNumber());
    					order.setIsSynchronized(true);
    					order.save();
    				} else {
    					Logger.error("Integration: OrderId: %s synchronization with SushimiWeb error, message: %s", order.getId(), result.message);
    					continue;
    				}
    				
    			} catch (Throwable e) {
    				Logger.error(e, "Integration: OrderId: %s failed to synchronize with SushimiWeb", order.getId());
    			}
			}
    	}
    	
    	Logger.info("Integration: Reading orders to synchronize with SushimiWeb completed.");
    }

    /**
	 * Конвертирует заказ в БД в модель заказа для синхронизации с сайтом
	 * @param order
	 * @return
	 */
	private SushimiWebOrderModel convertOrderToSushimiWebOrderModel(Order order) {
		SushimiWebOrderModel m = new SushimiWebOrderModel();
		
		m.client = convertOrderClient(order);
		m.clientAddress = convertClientAddress(order);
		m.clientCash = order.getClientCash();
		m.clientComment = order.getComment();
		m.clientCount = order.getPersonCount();
		m.clientDiscount = order.getClientDiscountCurrentPercent();  
		
		m.deliveryDate = order.getDeliveryDate();
		m.deliveryExtraPrice = order.getDeliveryExtraCost();
		m.payMethod = order.getPayMethod();
		
		m.items = convertOrderItems(order);
		
		m.orderDate = order.getOrderDate();
		m.orderState = order.getOrderState();
		m.orderSum = order.getOrderSum();
		
		if (order.getPromotion() != null) {
			m.promotionDiscount = order.getPromotion().getDiscount() != null 
				? order.getPromotion().getDiscount().intValue() : null;
			m.promotionName = order.getPromotion() != null ? order.getPromotion().getName() : null;
			m.promotionProductCode = order.getPromotion().getProduct() != null ? order.getPromotion().getProduct().getCode() : null;
			m.promotionValueType = order.getPromotion().getValueType();
		}
		
		m.reason = order.getReason();
		m.orderNumber = order.getOrderNumber();
		m.source = order.getSource();
		m.sourceDiscount = order.getSourceDiscount();
		m.type = order.getType();
		
		m.cityCode = "1"; //TODO вставить значения из заказа
		m.branchCode = "1"; // TODO встаивть значение из заказа
		
		m.operatorCode = order.getOperatorUser() != null ? order.getOperatorUser().getCode() : null;
		m.cookCode = order.getCookUser() != null ? order.getCookUser().getCode() : null;
		m.courierCode = order.getCookUser() != null ? order.getCookUser().getCode() : null;
		
		return m;
	}
	
	private SushimiWebOrderClientModel convertOrderClient(Order order) {
		if (order.getClient() == null)
			return null; // Наверное заказ с кафе
		
		SushimiWebOrderClientModel m = new SushimiWebOrderClientModel();
		m.name = order.getClient().getName();
		m.phone = order.getClient().getPhoneNumber();
		m.email = order.getClient().getEmail();
		
		return m;
	}
	
	private SushimiWebOrderClientAddressModel convertClientAddress(Order order) {
		if (order.getClientAddress() == null)
			return null; // Либо заказ бара либо самовывоз
		
		SushimiWebOrderClientAddressModel a = new SushimiWebOrderClientAddressModel();
		a.building = order.getClientAddress().getBuilding();
		a.cityName = order.getClientAddress().getCityName();
		a.comment = order.getClientAddress().getComment();
		a.corpus = order.getClientAddress().getCorpus();
		a.doorCode = order.getClientAddress().getDoorCode();
		a.flat = order.getClientAddress().getFlat();
		a.floor = order.getClientAddress().getFloor();
		a.geoLatitude = order.getClientAddress().getGeoLatitude();
		a.geoLongitude = order.getClientAddress().getGeoLongitude();
		a.house = order.getClientAddress().getHouse();
		a.office = order.getClientAddress().getHouse();
		a.phoneNumber = order.getClientAddress().getPhoneNumber();
		a.porch = order.getClientAddress().getPorch();
		a.room = order.getClientAddress().getRoom();
		a.streetName = order.getClientAddress().getStreetName();
		
		return a;
	}
	
	private List<SushimiWebOrderItemModel> convertOrderItems(Order order) {
		if (order.getOrderItems() == null || order.getOrderItems().size() < 1)
			return null; // Странная канеш проверка...
		
		List<SushimiWebOrderItemModel> items = new ArrayList<SushimiWebOrderItemModel>();
		for (OrderItem oI : order.getOrderItems()) {
			if (oI == null) continue;
			
			// TODO возвможно передавать
			if (oI.getProduct().getType() == ProductType.STICKS) continue;
			if (oI.getProduct().getType() == ProductType.CHEWING_GUM) continue;
			if (oI.getProduct().getType() == ProductType.PACKAGING) continue;
			if (oI.getProduct().getType() == ProductType.SMALL_SAUCE_CONTAINER) continue;
			if (oI.getProduct().getType() == ProductType.BIG_SAUCE_CONTAINER) continue;
			
			SushimiWebOrderItemModel item = new SushimiWebOrderItemModel();
			
			// Потенциально проблема, но пусть стреляет, без нее вообще не просинхронизируешь на сайте
			item.productCode = oI.getProduct().getCode();
						
			item.count = oI.getCount();
			item.freeCount = oI.getFreeCount();
			item.sum = oI.getSum();
			
			items.add(item);
		}
		return items;
	}
}
