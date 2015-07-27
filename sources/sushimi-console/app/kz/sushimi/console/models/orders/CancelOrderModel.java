package kz.sushimi.console.models.orders;

import kz.sushimi.console.persistence.orders.OrderState;

/**
 * Модель отмены заказа
 * 
 * @author Demart
 *
 */
public class CancelOrderModel {

	/**
	 * Id заказа
	 */
	private Long orderId;
	
	/**
	 * Тип отказа
	 */
	private OrderState state;
	
	/**
	 * Причина отказа
	 */
	private String reason;

	public OrderState getState() {
		return state;
	}

	public void setState(OrderState state) {
		this.state = state;
	}

	public Long getOrderId() {
		return orderId;
	}

	public void setOrderId(Long orderId) {
		this.orderId = orderId;
	}


	public String getReason() {
		return reason;
	}

	public void setReason(String reason) {
		this.reason = reason;
	}
	
}
