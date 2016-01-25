package kz.sushimi.restapi.v1.models.courier;

import java.util.Calendar;

import kz.sushimi.persistence.orders.OrderProcess;

/**
 *  Модель для отправки запроса на получение списка заказов
 */
public class UserReadOrdersRequestModel extends SecuredRequestBaseModel {

	public OrderProcess orderState;
	
	public Calendar filterStartDate;
	
	public Calendar filterEndDate;
	
}
