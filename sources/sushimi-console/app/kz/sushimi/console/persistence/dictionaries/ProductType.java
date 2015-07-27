package kz.sushimi.console.persistence.dictionaries;

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
	
	/**
	 * Палочки для еды
	 */
	STICKS,
	
	/**
	 * Жевательная резинка
	 */
	CHEWING_GUM,
	
	/**
	 * Коробка
	 */
	PACKAGING,
	
	/**
	 * Маленький котейнер
	 */
	SMALL_SAUCE_CONTAINER,

	/**
	 * Большой котейнер
	 */
	BIG_SAUCE_CONTAINER,
}
