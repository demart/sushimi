package kz.sushimi.persistence.dictionaries;

public enum ProductType {
	
	/**
	 * Данный продукт относиться к другой категории
	 */
	NONE,
	
	/**
	 * Данный продукт относиться к СУШИ (Можно предлагать соусы для суши)
	 */
	SUSHI,
	
	/**
	 * Данный продукт относиться к ПИЦЦЕ (Можно предлагать соусы для пиццы)
	 */
	PIZZA,

	/**
	 * Соевый соус
	 */
	SOY,
	
	/**
	 * Васаби
	 */
	VASABI,
	
	/**
	 * Имбирь
	 */
	IMBIR,
}
