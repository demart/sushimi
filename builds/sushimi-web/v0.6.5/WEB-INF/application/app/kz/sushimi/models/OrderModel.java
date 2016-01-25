package kz.sushimi.models;

import java.util.ArrayList;
import java.util.List;

public class OrderModel {

	/**
	 * Города доступные для заказа
	 */
	private List<CityModel> cities = new ArrayList<CityModel>();

	/**
	 * Кол-во предлагаемого времени
	 */
	private int timePeriodCount;

	// ==========================	
	// ==========================
	
	public List<CityModel> getCities() {
		return cities;
	}

	public void setCities(List<CityModel> cities) {
		this.cities = cities;
	}

	public int getTimePeriodCount() {
		return timePeriodCount;
	}

	public void setTimePeriodCount(int timePeriodCount) {
		this.timePeriodCount = timePeriodCount;
	}
	
}