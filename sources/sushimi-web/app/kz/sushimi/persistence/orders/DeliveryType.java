package kz.sushimi.persistence.orders;

/**
 * Типы доставки заказов
 * 
 * @author Demart
 *
 */
public enum DeliveryType {

	/**
	 * Заказ на баре
	 */
	BAR,
	
	/**
	 * Доставка товара
	 */
	DELIVERY,
	
	/**
	 * Доставка ко времени
	 */
	DELIVERY_IN_TIME,
	
	/**
	 * Самовывоз товара из выбранного ресторана
	 */
	SELF_SERVICE
}
