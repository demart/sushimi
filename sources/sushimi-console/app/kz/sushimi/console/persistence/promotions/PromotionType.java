package kz.sushimi.console.persistence.promotions;

/**
 * Тип проводимой акции
 * 
 * @author Demart
 *
 */
public enum PromotionType {

	/**
	 * Не указано
	 */
	NONE, 
	
	/**
	 * Акция по превышению какой либо суммы
	 */
	SUM,
	
	/**
	 * Акция на день рождение
	 */
	BIRTHDATE,
	
	/**
	 * В период времени
	 */
	PERIOD,
	
}
