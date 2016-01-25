package kz.sushimi.models.integration.order;

import java.util.Calendar;

import kz.sushimi.persistence.orders.OrderProcess;

public class SushimiWebOrderHistoryModel {

	public Long id;
	
	public String orderNumber;
	
	public OrderProcess orderState;
	
	public Calendar date;
	
	public String geoLatitude;
	
	public String geoLongitude;
	
	public String user;

}

