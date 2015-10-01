package kz.aphion.sushimi.mobile.courierapp.data.models;

/**
 * Created by artem.demidovich on 9/18/15.
 */
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

