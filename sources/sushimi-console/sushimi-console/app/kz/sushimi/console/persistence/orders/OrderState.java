package kz.sushimi.console.persistence.orders;

/**
 * Состояние заказа
 * 
 * @author Demart
 *
 */
public enum OrderState {

	NONE,

	/**
	 * Зарегистрирован
	 */
	REGISTERED,
	
	/**
	 * В обработке
	 */
	IN_PROGRESS,
	
	/**
	 * Отправлен на доставку
	 */
	ON_DELIVERY,
	
	/**
	 * Доставлен
	 */
	DELIVERED,
	
	/**
	 * Возврат
	 */
	RETURNED,
	
	/**
	 * Заказ отменен
	 */
	CANCELED
}
