package kz.sushimi.persistence.broadcast;

public enum BroadcastAddresseeStatus {
	
	/**
	 * Не отправлено
	 */
	READY,
	
	/**
	 * Отправлено
	 */
	SENT,
	
	/**
	 * Просмотрено или открыто
	 */
	OPENED,
	
	/**
	 * Ошибка при отправке
	 */
	ERROR,
}
