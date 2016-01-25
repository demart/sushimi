package kz.sushimi.restapi.v1.models.courier;

import java.util.Calendar;

import kz.sushimi.persistence.orders.DeliveryType;
import kz.sushimi.persistence.orders.OrderProcess;
import kz.sushimi.persistence.orders.OrderSource;
import kz.sushimi.persistence.orders.PayMethod;


/**
 * Модель заказа для курьерского приложения
 *  
 * @author artem.demidovich
 *
 */
public class UserOrderModel {
	
	public Integer id;
	
	public String orderNumber;
	
	public String clientName;
	
	public String clientPhone;
	
	public String clientComment;
	
	public Calendar orderTime;
	
	public Calendar deliveryTime;
	
	public DeliveryType deliveryType;
	
	public OrderSource source;
	
	public OrderProcess orderState;
	
	public PayMethod payMethod;
	
	public Integer orderSum;
	
	public String address;
}
