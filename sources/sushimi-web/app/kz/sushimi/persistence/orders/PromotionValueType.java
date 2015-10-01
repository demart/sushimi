package kz.sushimi.persistence.orders;

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
	 * Скидка на суши (Например после 5 тыс 5% скидка)
	 */
	DISCOUNT,
	
	/**
	 * Продукция (Например фила в подарок)
	 */
	PRODUCT,
	
	/**
	 *  Скидка на суши и продукция в подарок
	 */
	DP,
	
	/**
	 * Скидка на всё меню
	 */
	DISCOUNT_ALL,
	
	/**
	 * Cкидка на всё меню и продукция в подарок
	 */
	DPA,
}
