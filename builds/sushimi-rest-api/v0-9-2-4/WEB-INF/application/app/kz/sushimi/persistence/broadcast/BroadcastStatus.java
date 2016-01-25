package kz.sushimi.persistence.broadcast;

public enum BroadcastStatus {

	/**
	 * Рассылка ожидает запуска
	 */
	NEW,
	
	/**
	 * Рассылка запущена
	 */
	STARTED,
	
	/**
	 * Рассылка завершена
	 */
	FINISHED,
	
}
