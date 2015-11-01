package kz.sushimi.console.models.users;

import java.util.Calendar;
import java.util.Date;
import java.util.List;

import kz.sushimi.console.persistence.orders.OrderType;
import kz.sushimi.console.persistence.users.UserRole;
import kz.sushimi.console.models.users.CourierGeoPosition;

public class CourierModel {
	
	/**
	 * Позиции курьера
	 */
	
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
	
	public Integer status;
	
	public String timeActive;
	
	public Integer pointsCount;
	
	public void setPointsCount (Integer pointsCount) {
		this.pointsCount = pointsCount;
	}
	
	public void setTimeActive (String timeActive) {
		this.timeActive= timeActive;
	}
	
	
	
	/**
	 * 
	 * Время последнего апдейта
	 */
	private Date date;
	
	public void setStatus(Integer status) {
		this.status = status;
	}
	
	public void setDate(Date date){
		this.date = date;
	}
	
	public void setGeoPosition(List<CourierGeoPosition> geoPosition) {
		this.geoPosition = geoPosition;
	}
	
	public List<CourierGeoPosition> getGeoPosition() {
		return geoPosition;
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
	
	public String getGeoLatitude() {
		return geoLatitude;
	}
	
	public String getGeoLongitude () {
		return geoLongitude;
	}

	public Date getDate () {
		return date;
	}
	
	

}
