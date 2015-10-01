package kz.sushimi.console.persistence.orders.site;

import java.util.Calendar;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.apache.commons.lang.StringUtils;

import kz.sushimi.console.persistence.PersistentObject;
import kz.sushimi.console.persistence.orders.OrderType;
import kz.sushimi.console.persistence.orders.PayMethod;

/**
 * Заказ с сайта
 * 
 * @author Demart
 *
 */
@Entity
@Table(name = "orders_sites")
public class SiteOrder extends PersistentObject {
	
	@Column(name="order_number")
	private String orderNumber;
	
	@Enumerated(EnumType.STRING)
	@Column
	private SiteOrderStatus status;
	
	/**
	 * Каналы получения заказов
	 */
	@Enumerated(EnumType.STRING)
	@Column(name="source")
	private SiteOrderSource source;	
	
	/**
	 * Скидка при получении заказа (Например на мобильники по умолчанию 5 процентов)
	 */
	@Column(name="source_discount")
	private Integer sourceDiscount;
	
	@Column
	private String key; 
	
	@Column(name="order_sum")
	private int orderSum;
	
	@Column(name="order_time")
	private Calendar orderTime;	
	
	@OneToMany(mappedBy="order")
	private List<SiteOrderItem> orderItems;	
	
	@Column(name="person_phone")
	private String personPhone;
	
	@Column(name="person_name")
	private String personName;
	
	@Column(name="person_count")
	private int personCount;

	@Column(name="person_remark")
	private String personRemark;

	@Column(name="person_email")
	private String personEmail;	
	
	@Column(name="person_cash")
	private int personCash;	
	
	// Delivery Detail
	
	@Column(name="department_code")
	private String departmentCode;
	
	@Enumerated(EnumType.STRING)
	@Column(name="order_type")
	private OrderType orderType;
	
	@Column(name="delivery_time")
	private Calendar deliveryTime;
	
	@Enumerated(EnumType.STRING)
	@Column(name="pay_method")
	private PayMethod payMethod;

	// ====================
	// === ADDRESS ========
	// ====================
	
	@Column(name="city_code")
	private String cityCode;
	
	@Column(name="address_city_name")
	private String addressCityName;
	
	@Column(name="address_street_name")
	private String addressStreetName;
	
	@Column(name="address_house")
	private String addressHouse;
	
	@Column(name="address_corpus")
	private String addressCorpus;
	
	@Column(name="address_building")
	private String addressBuilding;
	
	@Column(name="address_flat")
	private String addressFlat;
	
	@Column(name="address_porch")
	private String addressPorch;
	
	@Column(name="address_door_code")
	private String addressDoorCode;
	
	@Column(name="address_floor")
	private String addressFloor;
	
	@Column(name="address_room")
	private String addressRoom;
	
	@Column(name="address_office")
	private String addressOffice;
	
	@Column(name="geo_latitude")
	private String GeoLatitude;
	
	@Column(name="geo_longitude")
	private String GeoLongitude;

	@Column(length=500)
	private String reason;
	
	public String getFullAddress() {
		String fullAddress = "";
		if (!StringUtils.isEmpty(addressCityName)) fullAddress += addressCityName;
		if (!StringUtils.isEmpty(addressStreetName)) fullAddress += ", " + addressStreetName;
		if (!StringUtils.isEmpty(addressHouse)) fullAddress += ", дом " + addressHouse;
		if (!StringUtils.isEmpty(addressCorpus)) fullAddress += ", " + addressCorpus;
		if (!StringUtils.isEmpty(addressBuilding)) fullAddress += ", " + addressBuilding;
		if (!StringUtils.isEmpty(addressFlat)) fullAddress += ", кв " + addressFlat;
		if (!StringUtils.isEmpty(addressPorch)) fullAddress += ", " + addressPorch;
		if (!StringUtils.isEmpty(addressDoorCode)) fullAddress += ", код домофона " + addressDoorCode;
		if (!StringUtils.isEmpty(addressFloor)) fullAddress += ", этаж " + addressFloor;
		if (!StringUtils.isEmpty(addressRoom)) fullAddress += ", комната " + addressRoom;
		if (!StringUtils.isEmpty(addressOffice)) fullAddress += ", офис " + addressOffice;

		if (fullAddress.startsWith(",") && fullAddress.length() > 1)
			fullAddress = fullAddress.substring(1);
		
		return fullAddress;
	}
	
	public String getReason() {
		return reason;
	}

	public void setReason(String reason) {
		this.reason = reason;
	}

	public SiteOrderStatus getStatus() {
		return status;
	}

	public void setStatus(SiteOrderStatus status) {
		this.status = status;
	}

	public String getOrderNumber() {
		return orderNumber;
	}

	public void setOrderNumber(String orderNumber) {
		this.orderNumber = orderNumber;
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

	public List<SiteOrderItem> getOrderItems() {
		return orderItems;
	}

	public void setOrderItems(List<SiteOrderItem> orderItems) {
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

	public OrderType getOrderType() {
		return orderType;
	}

	public void setOrderType(OrderType orderType) {
		this.orderType = orderType;
	}

	public Calendar getDeliveryTime() {
		return deliveryTime;
	}

	public void setDeliveryTime(Calendar deliveryTime) {
		this.deliveryTime = deliveryTime;
	}

	public PayMethod getPayMethod() {
		return payMethod;
	}

	public void setPayMethod(PayMethod payMethod) {
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

	public SiteOrderSource getSource() {
		return source;
	}

	public void setSource(SiteOrderSource source) {
		this.source = source;
	}

	public Integer getSourceDiscount() {
		return sourceDiscount;
	}

	public void setSourceDiscount(Integer sourceDiscount) {
		this.sourceDiscount = sourceDiscount;
	}
	
}
