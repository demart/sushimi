package kz.sushimi.console.models.orders;

import java.util.Calendar;
import java.util.Date;

import kz.sushimi.console.persistence.orders.OrderState;
import kz.sushimi.console.persistence.orders.OrderType;

/**
 * Модель отображения данных в таблицах заказов
 * @author Demart
 *
 */
public class OrderModel {
	
	private Long id;
	
	private String orderNumber;
	
	private String clientName;
	
	private String clientPhone;
	
	private String clientAddress;
	
	/**
	 * Состояние заказа
	 */
	private OrderState state;
	
	/**
	 * Тип заказа (в бар, доставка, доставка ко времени)
	 */
	private OrderType type;
	
	private Integer sum;
	
	private Date orderDate;
	
	private Date deliveryDate;
	
	private String reason;
	
	private String comment;
	
	public String getOrderNumber() {
		return orderNumber;
	}

	public void setOrderNumber(String orderNumber) {
		this.orderNumber = orderNumber;
	}

	public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
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
