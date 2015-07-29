package kz.sushimi.console.models.orders;

import java.util.Calendar;
import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.OneToMany;

import kz.sushimi.console.persistence.orders.OrderState;
import kz.sushimi.console.persistence.orders.OrderType;
import kz.sushimi.console.persistence.orders.PayMethod;
import kz.sushimi.console.persistence.orders.site.SiteOrderItem;
import kz.sushimi.console.persistence.orders.site.SiteOrderSource;
import kz.sushimi.console.persistence.orders.site.SiteOrderStatus;

/**
 * Модель просмотра заказа
 * @author Demart
 *
 */
public class PreviewSiteOrderModel {

	private Long id;
	
	private Integer siteId;
	
	private SiteOrderStatus status;
	
	private String key; 
	
	private Integer orderSum;
	
	private SiteOrderSource source;
	
	private Integer sourceDiscount;
	
	private Date orderTime;
	
	private Long orderTimeLong;
	
	private List<PreviewSiteOrderItemModel> items;	
	
	private String personPhone;
	
	private String personName;
	
	private Integer personCount;

	private String personRemark;
	
	private String personEmail;	
	
	private Integer personCash;	
	
	private OrderType orderType;
	
	private Date deliveryTime;
	
	private Long deliveryTimeLong;
	
	private Integer deliveryPrice;
	
	private PayMethod payMethod;

	// ====================
	// === ADDRESS ========
	// ====================
	
	private String address;
	
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
	
	private String reason;

	
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

	public Long getOrderTimeLong() {
		return orderTimeLong;
	}

	public void setOrderTimeLong(Long orderTimeLong) {
		this.orderTimeLong = orderTimeLong;
	}

	public Long getDeliveryTimeLong() {
		return deliveryTimeLong;
	}

	public void setDeliveryTimeLong(Long deliveryTimeLong) {
		this.deliveryTimeLong = deliveryTimeLong;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Integer getSiteId() {
		return siteId;
	}

	public void setSiteId(Integer siteId) {
		this.siteId = siteId;
	}

	public SiteOrderStatus getStatus() {
		return status;
	}

	public void setStatus(SiteOrderStatus status) {
		this.status = status;
	}

	public String getKey() {
		return key;
	}

	public void setKey(String key) {
		this.key = key;
	}

	public Integer getOrderSum() {
		return orderSum;
	}

	public void setOrderSum(Integer orderSum) {
		this.orderSum = orderSum;
	}

	public Date getOrderTime() {
		return orderTime;
	}

	public void setOrderTime(Date orderTime) {
		this.orderTime = orderTime;
	}

	public List<PreviewSiteOrderItemModel> getItems() {
		return items;
	}

	public void setItems(List<PreviewSiteOrderItemModel> items) {
		this.items = items;
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

	public Integer getPersonCount() {
		return personCount;
	}

	public void setPersonCount(Integer personCount) {
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

	public Integer getPersonCash() {
		return personCash;
	}

	public void setPersonCash(Integer personCash) {
		this.personCash = personCash;
	}

	public OrderType getOrderType() {
		return orderType;
	}

	public void setOrderType(OrderType orderType) {
		this.orderType = orderType;
	}

	public Date getDeliveryTime() {
		return deliveryTime;
	}

	public void setDeliveryTime(Date deliveryTime) {
		this.deliveryTime = deliveryTime;
	}

	public PayMethod getPayMethod() {
		return payMethod;
	}

	public void setPayMethod(PayMethod payMethod) {
		this.payMethod = payMethod;
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

	public String getReason() {
		return reason;
	}

	public void setReason(String reason) {
		this.reason = reason;
	}

	public Integer getDeliveryPrice() {
		return deliveryPrice;
	}

	public void setDeliveryPrice(Integer deliveryPrice) {
		this.deliveryPrice = deliveryPrice;
	}

}
