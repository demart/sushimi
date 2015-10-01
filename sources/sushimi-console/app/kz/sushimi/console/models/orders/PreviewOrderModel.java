package kz.sushimi.console.models.orders;

import java.util.Date;
import java.util.List;

import kz.sushimi.console.models.clients.ManyClientModel;
import kz.sushimi.console.persistence.orders.OrderSource;
import kz.sushimi.console.persistence.orders.OrderState;
import kz.sushimi.console.persistence.orders.OrderType;

/**
 * Модель просмотра заказа
 * @author Demart
 *
 */
public class PreviewOrderModel {

	
	private Long id;
	
	private String orderNumber;
	
	private OrderSource source;
	
	private Integer sourceDiscount;
	
	private String clientName;
	
	private String clientPhone;
	
	private String clientAddress;
	
	private Integer clientCount;
	
	private Integer clientCash;
	
	private String promotionName;
	
	private Float promotionDiscount;
	
	private List<PreviewOrderItemModel> items;
	
	
	
	private OrderState state;
	
	private OrderType type;
	
	private Integer sum;
	
	private Date orderDate;
	
	private Long orderDateLong;
	
	private Date deliveryDate;
	
	private Long deliveryDateLong;
	
	private String deliveryPriceName;
	
	private Integer deliveryPrice;
	
	private Integer deliveryExtraCost;
	
	private String reason;
	
	private String comment;
	
	private Integer status;
	
	private Long lastUpdateTime;
	
	private String deliveryDateKitchen;
	
	private String timer;
	
	private Integer statusType;
	
	private String deliveryDateDelivery;
	
	private List<ArmCourierManyOrdersModel> orders;
	
	public List<ArmCourierManyOrdersModel> getOrders() {
		return orders;
	}

	public void setOrderss(List<ArmCourierManyOrdersModel> orders) {
		this.orders = orders;
	}
	
	public void setStatusType(Integer statusType) {
		this.statusType = statusType;
	}
	
	public void setTimer(String timer) {
		this.timer = timer;
	}
	
	public void setDeliveryDateKitchen(String deliveryDateKitchen) {
		this.deliveryDateKitchen = deliveryDateKitchen;
	}
	
	public void setDeliveryDateDelivery(String deliveryDateDelivery) {
		this.deliveryDateDelivery = deliveryDateDelivery;
	}
	
	public void setStatus (Integer status) {
		this.status = status;
	}
	
	public Integer getStatus() {
		return status;
	}

	public void setlastUpdateTime (Long lastUpdateTime) {
		this.lastUpdateTime = lastUpdateTime;
	}

	
	public OrderSource getSource() {
		return source;
	}

	public void setSource(OrderSource source) {
		this.source = source;
	}

	public Integer getSourceDiscount() {
		return sourceDiscount;
	}

	public void setSourceDiscount(Integer sourceDiscount) {
		this.sourceDiscount = sourceDiscount;
	}

	public String getOrderNumber() {
		return orderNumber;
	}

	public void setOrderNumber(String orderNumber) {
		this.orderNumber = orderNumber;
	}

	public Long getOrderDateLong() {
		return orderDateLong;
	}

	public void setOrderDateLong(Long orderDateLong) {
		this.orderDateLong = orderDateLong;
	}

	public Long getDeliveryDateLong() {
		return deliveryDateLong;
	}

	public void setDeliveryDateLong(Long deliveryDateLong) {
		this.deliveryDateLong = deliveryDateLong;
	}

	public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getClientName() {
		return clientName;
	}

	public void setClientName(String clientName) {
		this.clientName = clientName;
	}

	public String getClientPhone() {
		return clientPhone;
	}

	public void setClientPhone(String clientPhone) {
		this.clientPhone = clientPhone;
	}

	public String getClientAddress() {
		return clientAddress;
	}

	public void setClientAddress(String clientAddress) {
		this.clientAddress = clientAddress;
	}

	public Integer getClientCount() {
		return clientCount;
	}

	public void setClientCount(Integer clientCount) {
		this.clientCount = clientCount;
	}

	public Integer getClientCash() {
		return clientCash;
	}

	public void setClientCash(Integer clientCash) {
		this.clientCash = clientCash;
	}

	public String getPromotionName() {
		return promotionName;
	}

	public void setPromotionName(String promotionName) {
		this.promotionName = promotionName;
	}

	public Float getPromotionDiscount() {
		return promotionDiscount;
	}

	public void setPromotionDiscount(Float promotionDiscount) {
		this.promotionDiscount = promotionDiscount;
	}

	public List<PreviewOrderItemModel> getItems() {
		return items;
	}

	public void setItems(List<PreviewOrderItemModel> items) {
		this.items = items;
	}

	public OrderState getState() {
		return state;
	}

	public void setState(OrderState state) {
		this.state = state;
	}

	public OrderType getType() {
		return type;
	}

	public void setType(OrderType type) {
		this.type = type;
	}

	public Integer getSum() {
		return sum;
	}

	public void setSum(Integer sum) {
		this.sum = sum;
	}

	public Date getOrderDate() {
		return orderDate;
	}

	public void setOrderDate(Date orderDate) {
		this.orderDate = orderDate;
	}

	public Date getDeliveryDate() {
		return deliveryDate;
	}

	public void setDeliveryDate(Date deliveryDate) {
		this.deliveryDate = deliveryDate;
	}

	public String getReason() {
		return reason;
	}

	public void setReason(String reason) {
		this.reason = reason;
	}

	public String getDeliveryPriceName() {
		return deliveryPriceName;
	}

	public void setDevieryPriceName(String deliveryPriceName) {
		this.deliveryPriceName = deliveryPriceName;
	}

	public Integer getDeliveryPrice() {
		return deliveryPrice;
	}

	public void setDeliveryPrice(Integer deliveryPrice) {
		this.deliveryPrice = deliveryPrice;
	}

	public Integer getDeliveryExtraCost() {
		return deliveryExtraCost;
	}

	public void setDeliveryExtraCost(Integer deliveryExtraCost) {
		this.deliveryExtraCost = deliveryExtraCost;
	}

	public void setDeliveryPriceName(String deliveryPriceName) {
		this.deliveryPriceName = deliveryPriceName;
	}
	
}
