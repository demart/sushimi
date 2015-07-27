package kz.sushimi.console.models.orders;

import java.util.Date;
import java.util.List;

import kz.sushimi.console.persistence.orders.OrderType;

/**
 * Модель создания заказа
 * 
 * @author Demart
 *
 */
public class CreateOrderModel {

	private Long clientId;
	
	private Long clientAddressId;
	
	private Long siteId;
	
	private Long promotionId;
	
	private OrderType type;
	
	private Integer personCount;
	
	private Integer personCash;
	
	private Date orderTime;
	
	private Date toTime;
	
	private String comment;

	private List<CreateOrderItemModel> items;
	
	private Long deliveryPriceId;
	
	public Long getDeliveryPriceId() {
		return deliveryPriceId;
	}

	public void setDeliveryPriceId(Long deliveryPriceId) {
		this.deliveryPriceId = deliveryPriceId;
	}

	public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}

	public Date getOrderTime() {
		return orderTime;
	}

	public void setOrderTime(Date orderTime) {
		this.orderTime = orderTime;
	}

	public Long getSiteId() {
		return siteId;
	}

	public void setSiteId(Long siteId) {
		this.siteId = siteId;
	}

	public Integer getPersonCash() {
		return personCash;
	}

	public void setPersonCash(Integer personCash) {
		this.personCash = personCash;
	}

	public Long getClientId() {
		return clientId;
	}

	public void setClientId(Long clientId) {
		this.clientId = clientId;
	}

	public Long getClientAddressId() {
		return clientAddressId;
	}

	public void setClientAddressId(Long clientAddresId) {
		this.clientAddressId = clientAddresId;
	}

	public Long getPromotionId() {
		return promotionId;
	}

	public void setPromotionId(Long promotionId) {
		this.promotionId = promotionId;
	}

	public OrderType getType() {
		return type;
	}

	public void setType(OrderType type) {
		this.type = type;
	}

	public Integer getPersonCount() {
		return personCount;
	}

	public void setPersonCount(Integer personCount) {
		this.personCount = personCount;
	}

	public Date getToTime() {
		return toTime;
	}

	public void setToTime(Date toTime) {
		this.toTime = toTime;
	}

	public List<CreateOrderItemModel> getItems() {
		return items;
	}

	public void setItems(List<CreateOrderItemModel> items) {
		this.items = items;
	}

}
