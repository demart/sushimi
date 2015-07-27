package kz.sushimi.console.models.orders;

/**
 * Тип отображаемых данных в таблицах
 * @author Demart
 *
 */
public enum OrderViewType {
	
	/**
	 * Все заказы
	 */
	ALL,
	
	/**
	 * Зарегистрированные
	 */
	REGISTERED,
	
	/**
	 * В процессе работы
	 */
	IN_PROGRESS,
	
	/**
	 * В процессе доставки
	 */
	ON_DELIVERY,
	
	/**
	 * Завершенные
	 */
	COMPLETED,
	
	/**
	 * Отмененные
	 */
	CANCELED,
}
