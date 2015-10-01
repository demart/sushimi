package kz.sushimi.console.integration.site.models;

import java.util.Calendar;

import kz.sushimi.console.persistence.orders.OrderState;

public class SushimiWebOrderHistoryModel {

	public Long id;
	
	public String orderNumber;
	
	public OrderState orderState;
	
	public Calendar date;
	
	public String geoLatitude;
	
	public String geoLongitude;
	
	public String user;

}
