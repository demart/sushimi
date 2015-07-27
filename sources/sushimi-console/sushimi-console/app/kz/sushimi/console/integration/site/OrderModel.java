package kz.sushimi.console.integration.site;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

/**
 * Модель передачи данных в систему управления заказами
 * 
 * @author Demart
 *
 */
public class OrderModel {
	
	private int id;
	
	private String key; 
	
	private int orderSum;
	
	private Calendar orderTime;	
	
	private List<OrderItemModel> orderItems;	
	
	private String personPhone;
	
	private String personName;
	
	private int personCount;

	private String personRemark;

	private String personEmail;	
	
	private int personCash;	
	
	// Delivery Detail
	
	private String departmentCode;
	
	private String deliveryType;
	
	private Calendar deliveryTime;
	
	private String payMethod;

	// ====================
	// === ADDRESS ========
	// ====================
	
	private String cityCode;
	
	private String addressCityName;
	
	private String addressStreetName;
	
	private String addressHouse;
	
	private String addressCorpus;
	
	private String addressBuilding;
	
	private String addressFlat;
	
	private String addressPorch;
	
	private String addressDoorCode;
	
	private String addressFloor;
	
	private String addressRoom;
	
	private String addressOffice;
	
	private String GeoLatitude;
	
	private String GeoLongitude;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getKey() {
		return key;
	}

	public void setKey(String key) {
		this.key = key;
	}

	public int getOrderSum() {
		return orderSum;
	}

	public void setOrderSum(int orderSum) {
		this.orderSum = orderSum;
	}

	public Calendar getOrderTime() {
		return orderTime;
	}

	public void setOrderTime(Calendar orderTime) {
		this.orderTime = orderTime;
	}

	public List<OrderItemModel> getOrderItems() {
		return orderItems;
	}

	public void setOrderItems(List<OrderItemModel> orderItems) {
		this.orderItems = orderItems;
	}

	public String getPersonPhone() {
		return personPhone;
	}

	public void setPersonPhone(String personPhone) {
		this.personPhone = personPhone;
	}

	public String getPersonName() {
		return personName;
	}

	public void setPersonName(String personName) {
		this.personName = personName;
	}

	public int getPersonCount() {
		return personCount;
	}

	public void setPersonCount(int personCount) {
		this.personCount = personCount;
	}

	public String getPersonRemark() {
		return personRemark;
	}

	public void setPersonRemark(String personRemark) {
		this.personRemark = personRemark;
	}

	public String getPersonEmail() {
		return personEmail;
	}

	public void setPersonEmail(String personEmail) {
		this.personEmail = personEmail;
	}

	public int getPersonCash() {
		return personCash;
	}

	public void setPersonCash(int personCash) {
		this.personCash = personCash;
	}

	public String getDepartmentCode() {
		return departmentCode;
	}

	public void setDepartmentCode(String departmentCode) {
		this.departmentCode = departmentCode;
	}

	public String getDeliveryType() {
		return deliveryType;
	}

	public void setDeliveryType(String deliveryType) {
		this.deliveryType = deliveryType;
	}

	public Calendar getDeliveryTime() {
		return deliveryTime;
	}

	public void setDeliveryTime(Calendar deliveryTime) {
		this.deliveryTime = deliveryTime;
	}

	public String getPayMethod() {
		return payMethod;
	}

	public void setPayMethod(String payMethod) {
		this.payMethod = payMethod;
	}

	public String getCityCode() {
		return cityCode;
	}

	public void setCityCode(String cityCode) {
		this.cityCode = cityCode;
	}

	public String getAddressCityName() {
		return addressCityName;
	}

	public void setAddressCityName(String addressCityName) {
		this.addressCityName = addressCityName;
	}

	public String getAddressStreetName() {
		return addressStreetName;
	}

	public void setAddressStreetName(String addressStreetName) {
		this.addressStreetName = addressStreetName;
	}

	public String getAddressHouse() {
		return addressHouse;
	}

	public void setAddressHouse(String addressHouse) {
		this.addressHouse = addressHouse;
	}

	public String getAddressCorpus() {
		return addressCorpus;
	}

	public void setAddressCorpus(String addressCorpus) {
		this.addressCorpus = addressCorpus;
	}

	public String getAddressBuilding() {
		return addressBuilding;
	}

	public void setAddressBuilding(String addressBuilding) {
		this.addressBuilding = addressBuilding;
	}

	public String getAddressFlat() {
		return addressFlat;
	}

	public void setAddressFlat(String addressFlat) {
		this.addressFlat = addressFlat;
	}

	public String getAddressPorch() {
		return addressPorch;
	}

	public void setAddressPorch(String addressPorch) {
		this.addressPorch = addressPorch;
	}

	public String getAddressDoorCode() {
		return addressDoorCode;
	}

	public void setAddressDoorCode(String addressDoorCode) {
		this.addressDoorCode = addressDoorCode;
	}

	public String getAddressFloor() {
		return addressFloor;
	}

	public void setAddressFloor(String addressFloor) {
		this.addressFloor = addressFloor;
	}

	public String getAddressRoom() {
		return addressRoom;
	}

	public void setAddressRoom(String addressRoom) {
		this.addressRoom = addressRoom;
	}

	public String getAddressOffice() {
		return addressOffice;
	}

	public void setAddressOffice(String addressOffice) {
		this.addressOffice = addressOffice;
	}

	public String getGeoLatitude() {
		return GeoLatitude;
	}

	public void setGeoLatitude(String geoLatitude) {
		GeoLatitude = geoLatitude;
	}

	public String getGeoLongitude() {
		return GeoLongitude;
	}

	public void setGeoLongitude(String geoLongitude) {
		GeoLongitude = geoLongitude;
	}
	
}
