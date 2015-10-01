package kz.aphion.sushimi.mobile.courierapp.data.models;

/**
 * Типы доставки заказов
 * 
 * @author Demart
 *
 */
public enum DeliveryType {

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
