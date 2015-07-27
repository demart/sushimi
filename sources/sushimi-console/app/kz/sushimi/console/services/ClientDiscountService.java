package kz.sushimi.console.services;

import kz.sushimi.console.persistence.clients.ClientDiscount;

public class ClientDiscountService {

	
	public static ClientDiscount getCurrentDiscount(Integer totalOrderSum) {
		if (totalOrderSum == null)
			totalOrderSum = 0;
		
		ClientDiscount cd = ClientDiscount.find("fromSum <= ? and ? <= toSum", totalOrderSum,totalOrderSum).first();
		return cd;
	}
	
	
	public static ClientDiscount getNextDiscount(Integer totalOrderSum) {
		if (totalOrderSum == null)
			totalOrderSum = 0;
		
		ClientDiscount cd = ClientDiscount.find("fromSum >= ?  order by fromSum asc", totalOrderSum).first();
		return cd;
	}
}
