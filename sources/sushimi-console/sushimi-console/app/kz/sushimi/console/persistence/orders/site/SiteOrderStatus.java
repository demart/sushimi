package kz.sushimi.console.persistence.orders.site;

/**
 * Статус обработки запроса с сайта
 * 
 * @author Demart
 *
 */
public enum SiteOrderStatus {

	/**
	 * Все варианты
	 */
	NONE,
	
	/**
	 * Получен с сайта
	 */
	RECEIVED,
	
	/**
	 * Зарегистрирован
	 */
	REGISTERED,
	
	/**
	 * Отменен
	 */
	CANCELED

}
