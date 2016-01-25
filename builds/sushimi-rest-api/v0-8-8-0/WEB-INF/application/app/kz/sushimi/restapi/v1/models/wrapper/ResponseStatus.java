package kz.sushimi.restapi.v1.models.wrapper;

public enum ResponseStatus {
	/**
	 * Операция успешно выполнена
	 */
	SUCCESS,
	
	/**
	 * Данные не найдены
	 */
	NO_CONTENT,
	
	/**
	 * Ошибки в запросе (валидация)
	 */
	BAD_REQUEST,
	
	/**
	 * Ошибка сервера
	 */
	SERVER_ERROR
}
