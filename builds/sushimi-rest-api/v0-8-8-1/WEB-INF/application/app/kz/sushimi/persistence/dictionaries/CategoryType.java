package kz.sushimi.persistence.dictionaries;

/**
 * Принадлежность категории к кухне
 * @author Demart
 *
 */
public enum CategoryType {

	/**
	 * Не указано
	 */
	NONE,
	/**
	 * Японская кухня
	 */
	SUSHI,
	
	/**
	 * Европейская кухня
	 */
	ANTISUSHI,
	
	/**
	 * Относиться к обоим кухням (Например напитки)
	 */
	BOTH
	
}
