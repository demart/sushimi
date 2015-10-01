package kz.sushimi.console.services;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import javax.persistence.Query;

import org.apache.commons.lang.StringUtils;

import kz.sushimi.console.exceptions.ValidationException;
import kz.sushimi.console.models.orders.CancelSiteOrderModel;
import kz.sushimi.console.models.orders.PreviewSiteOrderItemModel;
import kz.sushimi.console.models.orders.PreviewSiteOrderModel;
import kz.sushimi.console.persistence.dictionaries.Product;
import kz.sushimi.console.persistence.orders.site.SiteOrder;
import kz.sushimi.console.persistence.orders.site.SiteOrderItem;
import kz.sushimi.console.persistence.orders.site.SiteOrderStatus;
import kz.sushimi.console.services.dictionaries.ProductService;
import play.db.jpa.JPA;

/**
 * Сервис для работы с заказами с сайта
 * 
 * @author Demart
 *
 */
public class SiteOrderService {

	public static boolean isExist(String orderNumber) {
		List<SiteOrder> list = JPA.em().createQuery("from SiteOrder where orderNumber = :orderNumber")
			.setParameter("orderNumber", orderNumber).getResultList();
		if (list.size() > 0)
			return true;
		return false;
	}
	

	public static List<SiteOrder> getSiteOrders(SiteOrderStatus status, int start, int limit) {
		Query query = null;
		if (status == SiteOrderStatus.NONE) { 
			query = JPA.em().createQuery("from SiteOrder order by deliveryTime asc");
		} else {
			query = JPA.em().createQuery("from SiteOrder where status=:status order by deliveryTime asc ")
				.setParameter("status", status);
		}
		return query.setMaxResults(limit).setFirstResult(start).getResultList();
	}
	
	
	public static Long getSiteOrderCountByStatus(SiteOrderStatus status){
		Query query = null;
		if (status == SiteOrderStatus.NONE) { 
			query = JPA.em().createQuery("select count(*) from SiteOrder");
		} else {
			query = JPA.em().createQuery("select count(*) from SiteOrder where status=:status")
				.setParameter("status", status);
		}
		return (Long)query.getSingleResult();
	}

	
	public static Long getSiteOrderCountByStatus(SiteOrderStatus status, Long lastCheck){
		Query query = null;
		Calendar createdDate = Calendar.getInstance();
		createdDate.setTimeInMillis(lastCheck);
		if (status == SiteOrderStatus.NONE) { 
			query = JPA.em().createQuery("select count(*) from SiteOrder where createdDate > :lastCheck")
				.setParameter("lastCheck", createdDate);
		} else {
			query = JPA.em().createQuery("select count(*) from SiteOrder where status=:status and createdDate > :lastCheck")
				.setParameter("lastCheck", createdDate)
				.setParameter("status", status);
		}
		return (Long)query.getSingleResult();
	}	
	

	public static void cancelSiteOrder(CancelSiteOrderModel model, String connected) throws ValidationException {
		if (model == null)
			throw new ValidationException("Model is null");
		
		if (model.getSiteOrderId() == null || model.getSiteOrderId() < 1)
			throw new ValidationException("SiteOrderId is null");
		
		if (StringUtils.isEmpty(model.getReason()))
			throw new ValidationException("Reason is null");
		
		if (model.getState() == null)
			throw new ValidationException("State is null");
	
	
		
		SiteOrder order = SiteOrder.findById(model.getSiteOrderId());
		if (order == null)
			throw new ValidationException("SiteOrder not found");
		
		order.setStatus(model.getState());
		order.setReason(model.getReason());
		
		order.save();
	}


	public static PreviewSiteOrderModel previewSiteOrder(Long orderId, String connected) throws ValidationException {
		SiteOrder order = SiteOrder.findById(orderId);
		if (order == null)
			throw new ValidationException("SiteOrder not found");
		
		PreviewSiteOrderModel model = new PreviewSiteOrderModel();
		model.setId(order.getId());
		
		model.setSource(order.getSource());
		model.setSourceDiscount(order.getSourceDiscount());
		
		model.setStatus(order.getStatus());
		model.setOrderNumber(order.getOrderNumber());
		
		if (order.getDeliveryTime() != null) {
			model.setDeliveryTime(order.getDeliveryTime().getTime());
			model.setDeliveryTimeLong(order.getDeliveryTime().getTimeInMillis());
		}
		
		if (order.getOrderTime() != null) {
			model.setOrderTime(order.getOrderTime().getTime());
			model.setOrderTimeLong(order.getOrderTime().getTimeInMillis());
		}
		
		model.setOrderSum(order.getOrderSum());
		model.setOrderType(order.getOrderType());
		model.setPayMethod(order.getPayMethod());
		model.setPersonCash(order.getPersonCash());
		model.setPersonCount(order.getPersonCount());
		model.setPersonEmail(order.getPersonEmail());
		model.setPersonName(order.getPersonName());
		model.setPersonPhone(order.getPersonPhone());
		model.setPersonRemark(order.getPersonRemark());
		
		model.setAddressBuilding(order.getAddressBuilding());
		model.setAddressCityName(order.getAddressCityName());
		model.setAddressCorpus(order.getAddressCorpus());
		model.setAddressDoorCode(order.getAddressDoorCode());
		model.setAddressFlat(order.getAddressFlat());
		model.setAddressFloor(order.getAddressFloor());
		model.setAddressHouse(order.getAddressHouse());
		model.setAddressOffice(order.getAddressOffice());
		model.setAddressPorch(order.getAddressPorch());
		model.setAddressRoom(order.getAddressRoom());
		model.setAddressStreetName(order.getAddressStreetName());
		model.setAddress(order.getFullAddress());

		model.setGeoLatitude(order.getGeoLatitude());
		model.setGeoLongitude(order.getGeoLongitude());
		
		model.setReason(order.getReason());
		
		model.setItems(new ArrayList<PreviewSiteOrderItemModel>());
		for (SiteOrderItem orderItem : order.getOrderItems()) {
			PreviewSiteOrderItemModel item = new PreviewSiteOrderItemModel();
			
			Product product = ProductService.getProductByCode(orderItem.getProductCode());
			if (product == null)
				throw new ValidationException("Product by code not found, Code: " + orderItem.getProductCode());
			
			item.setCategory(product.getCategory().getName());
			item.setProductId(product.getId());
			item.setCode(product.getCode());
			item.setCost(product.getCost());
			item.setCount(orderItem.getCount());
			item.setName(product.getName());
			item.setSiteId(orderItem.getSiteId());
			item.setSum(orderItem.getSum());
			item.setType(product.getType());
			
			model.getItems().add(item);
		}
		
		return model;
	}
	
	
}
