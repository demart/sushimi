package kz.sushimi.models.integration;

import java.util.Calendar;
import java.util.Date;
import java.util.List;

import kz.sushimi.models.integration.CourierGeoPosition;


public class CourierModel {

	private List<CourierGeoPosition> geoPosition;

	/**
	 * Идентификатор записи
	 */
	private Long id;
	
	/**
	 * Имя пользователя
	 */
	private String name;
	
	/**
	 * Взятые заказы курьером
	 */
	private String ordersOnDelivery;
	
	
	/**
	 * Адреса доставок
	 */
	private String addressesOnDelivery;
	
	public String geoLatitude;
	
	public String geoLongitude;
	
	/**
	 * 
	 * Время последнего апдейта
	 */
	private Date date;
	
	public void setGeoPosition(List<CourierGeoPosition> geoPosition) {
		this.geoPosition = geoPosition;
	}
	
	public List<CourierGeoPosition> getGeoPosition() {
		return geoPosition;
	}
	
	
	public void setDate(Date date){
		this.date = date;
	}
	

	public void setGeoLatitude(String geoLatitude) {
		this.geoLatitude = geoLatitude;
	}
	
	public void setGeoLongitude(String geoLongitude) {
		this.geoLongitude = geoLongitude;
	}
	
	
	public void setOrdersOnDelivery(String ordersOnDelivery) {
		this.ordersOnDelivery = ordersOnDelivery;
	}
	
	public String getOrdersOnDelivery () {
		return ordersOnDelivery;
	}
	
	public void setAddressesOnDelivery(String addressesOnDelivery) {
		this.addressesOnDelivery = addressesOnDelivery;
	}
	
	public String getAddressesOnDelivery () {
		return addressesOnDelivery;
	}
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	
	
}
