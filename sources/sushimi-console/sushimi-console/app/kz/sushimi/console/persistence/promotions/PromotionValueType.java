package kz.sushimi.console.persistence.promotions;

/**
 * Какой тип подарка действует
 * 
 * @author Demart
 *
 */
public enum PromotionValueType {

	/**
	 * Не указано
	 */
	NONE, 
	
	/**
	 * Скидка (Например после 5 тыс 5% скидка)
	 */
	DISCOUNT,
	
	/**
	 * Продукция (Например фила в подарок)
	 */
	PRODUCT,
	
	/**
	 * Скидка и продукция
	 */
	DP,
	
}
