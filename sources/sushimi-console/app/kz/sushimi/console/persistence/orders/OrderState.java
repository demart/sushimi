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
	 * Заказ ожидает в очереди на производтсво
	 */
	//WAITING_FOR_PRODUCING,	
	
	/**
	 * В обработке
	 */
	//IN_PROGRESS,

	/**
	 * Производство взяло заказ на обработку
	 */
	IN_PROGRESS,
	
	/**
	 * Заказ подготовлен, собран и готов для того чтобы доставить заказ клиенту
	 */
	WAITING_FOR_DELIVERY,	
	
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
