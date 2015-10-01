package kz.sushimi.persistence.orders;

public enum OrderSource {
	
	/**
	 * Заказы с сайта
	 */
	WEB,
	
	/**
	 * Заказы с мобильного
	 */
	MOBILE,
	
	/**
	 * Заказы от оператора
	 */
	CALL_CENTER,
	
	/**
	 * Заказ поступил со смарт тв
	 */
	SMART_TV,
	
}
