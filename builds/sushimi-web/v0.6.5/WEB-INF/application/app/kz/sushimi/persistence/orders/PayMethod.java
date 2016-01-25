package kz.sushimi.persistence.orders;

public enum PayMethod {

	/**
	 * Наличными
	 */
	CASH,
	
	/**
	 * Банковская карта (Курьеру)
	 */
	CREDIT_CARD_ON_DELIVERY,
	
	/**
	 * Онлайн оплата кредиткой
	 */
	CREDIT_CARD
	
}
