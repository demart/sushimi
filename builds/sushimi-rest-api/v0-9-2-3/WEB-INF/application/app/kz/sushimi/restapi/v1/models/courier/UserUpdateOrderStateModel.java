package kz.sushimi.restapi.v1.models.courier;

import kz.sushimi.persistence.orders.PayMethod;

/**
 * Модель для произведения действия над заказом
 * 
 * @author artem.demidovich
 *
 */
public class UserUpdateOrderStateModel extends SecuredRequestBaseModel {
	
	/**
	 * Номер заказа
	 */
	public String orderNumber;
	
	/**
	 * Причина, если был отказ от заказа
	 */
	public String reason;
	
	/**
	 * Способ оплаты
	 */
	public PayMethod payMethod;
	
	/**
	 * Номер кредитной карты если оплачивали ей
	 */
	public String creditCardNumber;
}
