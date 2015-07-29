package kz.sushimi.console.models.orders;

import java.util.Calendar;
import java.util.Date;

import kz.sushimi.console.persistence.orders.OrderType;
import kz.sushimi.console.persistence.orders.site.SiteOrderSource;
import kz.sushimi.console.persistence.orders.site.SiteOrderStatus;

/**
 * Модель данных заказа с сайта отображаемые в таблице
 * @author Demart
 *
 */
public class SiteOrderModel {
	
	private Long id;
	
	private String clientName;
	
	private String clientPhone;
	
	private String clientAddress;
	
	/**
	 * Состояние заказа с сайта
	 */
	private SiteOrderStatus status;
	
	/**
	 * Тип заказа (в бар, доставка, доставка ко времени)
	 */
	private OrderType type;
	
	private Integer sum;
	
	private Date orderDate;
	
	private Date deliveryDate;

	private String reason;
	
	private String personRemark;
	
	private SiteOrderSource source;
	
	private Integer sourceDiscount;
	
	
	public SiteOrderSource getSource() {
		return source;
	}

	public void setSource(SiteOrderSource source) {
		this.source = source;
	}

	public Integer getSourceDiscount() {
		return sourceDiscount;
	}

	public void setSourceDiscount(Integer sourceDiscount) {
		this.sourceDiscount = sourceDiscount;
	}

	public String getPersonRemark() {
		return personRemark;
	}

	public void setPersonRemark(String personRemark) {
		this.personRemark = personRemark;
	}

	public String getReason() {
		return reason;
	}

	public void setReason(String reason) {
		this.reason = reason;
	}

	public Integer getSum() {
		return sum;
	}

	public void setSum(Integer sum) {
		this.sum = sum;
	}

	public OrderType getType() {
		return type;
	}

	public void setType(OrderType type) {
		this.type = type;
	}

	public SiteOrderStatus getStatus() {
		return status;
	}

	public void setStatus(SiteOrderStatus status) {
		this.status = status;
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

}
