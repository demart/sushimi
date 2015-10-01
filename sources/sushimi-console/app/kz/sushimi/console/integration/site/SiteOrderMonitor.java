package kz.sushimi.console.integration.site;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;

import kz.sushimi.console.persistence.orders.OrderType;
import kz.sushimi.console.persistence.orders.PayMethod;
import kz.sushimi.console.persistence.orders.site.SiteOrder;
import kz.sushimi.console.persistence.orders.site.SiteOrderSource;
import kz.sushimi.console.persistence.orders.site.SiteOrderItem;
import kz.sushimi.console.persistence.orders.site.SiteOrderStatus;
import kz.sushimi.console.services.SiteOrderService;
import play.Logger;
import play.db.jpa.JPA;
import play.jobs.Every;
import play.jobs.Job;
import play.libs.WS;
import play.libs.WS.HttpResponse;

import com.google.gson.Gson;


/**
 * Процесс запускает службу по получением заказов с сайта
 * 
 * @author Demart
 *
 */
@Every("30s")
public class SiteOrderMonitor extends Job {

	/**
	 * Адрес сайта куда обращаться за заказами
	 */
	//public static final String URL_HOST = "http://sushimi.kz";
	public static final String URL_HOST = "http://localhost:9001";
	
	/**
	 * Путь до списка не обработанных заказов
	 */
	public static final String URL_GET_ORDERS_CONTEXT = "/system/orders/list";
	
	/**
	 * Путь до функции подтверждения обработки заказов
	 */
	public static final String URL_CONFIRM_ORDERS_CONTEXT = "/system/orders/confirm";
	
	/**
	 * Запускаем процесс прослушивания заказов с сайта
	 */
    public void doJob() {
    	Logger.info("Integration: invoking getOrders");
    	HttpResponse response = WS.url(URL_HOST + URL_GET_ORDERS_CONTEXT).post();
    	String requestBody = response.getString();
		Gson gson = new Gson();
		OrderModel[] orderModels = gson.fromJson(requestBody, OrderModel[].class);
		List<Integer> ids = ConvertOrder(orderModels);
		
		if (ids.size() > 0) {
			Logger.info(gson.toJson(ids));
			response = WS.url(URL_HOST + URL_CONFIRM_ORDERS_CONTEXT).body(gson.toJson(ids)).post();
		}
		Logger.info("Integration: invoking getOrders finished");
    }
    
    
    private List<Integer> ConvertOrder(OrderModel[] orderModels) {
    	List<Integer> ids = new ArrayList<Integer>();
    	
    	if (orderModels != null && orderModels.length > 0) {
	    	for (OrderModel orderModel : orderModels) {
	    		
	    		ids.add(orderModel.getId());
	    		
	    		if (SiteOrderService.isExist(orderModel.getOrderNumber())) {
	    			Logger.info("Order skipped, already exist");
	    			continue;
	    		}
	    			
	    		SiteOrder siteOrder = new SiteOrder();
	    		siteOrder.setStatus(SiteOrderStatus.RECEIVED);
	    		siteOrder.setOrderNumber(orderModel.getOrderNumber());
	    		
	    		// discount & channels
	    		siteOrder.setSource(SiteOrderSource.valueOf(orderModel.getSource()));
	    		siteOrder.setSourceDiscount(orderModel.getSourceDiscount());
	    		
	    		// address
	    		siteOrder.setAddressBuilding(orderModel.getAddressBuilding());
	    		siteOrder.setAddressCityName(orderModel.getAddressCityName());
	    		siteOrder.setAddressCorpus(orderModel.getAddressCorpus());
	    		siteOrder.setAddressDoorCode(orderModel.getAddressDoorCode());
	    		siteOrder.setAddressFlat(orderModel.getAddressFlat());
	    		siteOrder.setAddressFloor(orderModel.getAddressFloor());
	    		siteOrder.setAddressHouse(orderModel.getAddressHouse());
	    		siteOrder.setAddressOffice(orderModel.getAddressOffice());
	    		siteOrder.setAddressPorch(orderModel.getAddressPorch());
	    		siteOrder.setAddressRoom(orderModel.getAddressRoom());
	    		siteOrder.setAddressStreetName(orderModel.getAddressStreetName());
	    		
	    		siteOrder.setCityCode(orderModel.getCityCode());
	    		siteOrder.setDeliveryTime(orderModel.getDeliveryTime());
	    		siteOrder.setDepartmentCode(orderModel.getDepartmentCode());
	    		siteOrder.setGeoLatitude(orderModel.getGeoLatitude());
	    		siteOrder.setGeoLongitude(orderModel.getGeoLongitude());
	    		
	    		siteOrder.setKey(orderModel.getKey());
	    		siteOrder.setOrderSum(orderModel.getOrderSum());
	    		siteOrder.setOrderTime(orderModel.getOrderTime());
	    		siteOrder.setOrderType(OrderType.valueOf(orderModel.getDeliveryType()));
	    		siteOrder.setPayMethod(PayMethod.valueOf(orderModel.getPayMethod()));
	    		
	    		siteOrder.setPersonCash(orderModel.getPersonCash());
	    		siteOrder.setPersonCount(orderModel.getPersonCount());
	    		siteOrder.setPersonEmail(orderModel.getPersonEmail());
	    		siteOrder.setPersonPhone(orderModel.getPersonPhone());
	    		siteOrder.setPersonRemark(orderModel.getPersonRemark());
	    		siteOrder.setPersonName(orderModel.getPersonName());
	    		
	    		siteOrder.save();
	    		
	    		for (OrderItemModel orderItemModel : orderModel.getOrderItems()) {
					SiteOrderItem siteOrderItem = new SiteOrderItem();
					siteOrderItem.setCount(orderItemModel.getCount());
					siteOrderItem.setOrder(siteOrder);
					siteOrderItem.setPrice(orderItemModel.getPrice());
					siteOrderItem.setProductCode(orderItemModel.getProductCode());
					siteOrderItem.setProductCost(orderItemModel.getProductCost());
					siteOrderItem.setProductName(orderItemModel.getProductName());
					siteOrderItem.setSiteId(orderItemModel.getId());
					siteOrderItem.setSum(orderItemModel.getSum());
					
		    		siteOrderItem.save();
				}
			}
    	
    	}
    	
    	return ids;
    }
}