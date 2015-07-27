package kz.sushimi.console.persistence.orders;

/**
 * Тип заказа
 * 
 * @author Demart
 *
 */
public enum OrderType {
	
	/**
	 * Отпускать в бар
	 */
	BAR,
	
	/**
	 * Доставка
	 */
	DELIVERY,
	
	/**
	 * Доставка ко времени
	 */
	DELIVERY_IN_TIME,
	
	/**
	 * Самовывоз
	 */
	SELF_SERVICE
}
