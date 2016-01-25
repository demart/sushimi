package kz.sushimi.persistence.orders;

import java.util.Calendar;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import kz.sushimi.persistence.dictionaries.City;
import kz.sushimi.persistence.dictionaries.Department;

import org.apache.commons.lang.StringUtils;

import play.Logger;


/**
 * Заказ пользователя
 * 
 * @author Demart
 *
 */
@Entity
@Table(name = "orders")
public class Order {
	
	@Id
	@GeneratedValue(generator="order_sequence")
	@SequenceGenerator(name="order_sequence",sequenceName="order_sequence", allocationSize=1)
	@Column(name="id")
	private int id;
	
	@Column(name="key")
	private String key; 
	
	/**
	 * Каналы получения заказов
	 */
	@Enumerated(EnumType.STRING)
	@Column(name="source")
	private OrderSource source;
	
	/**
	 * Скидка при получении заказа (Например на мобильники по умолчанию 5 процентов)
	 */
	@Column(name="source_discount")
	private Integer sourceDiscount;	
	
	@Column(name="source_system_name")
	private String sourceSystemName;
	
	@Column(name="source_system_version")
	private String sourceSystemVersion;
	
	@Column(name="source_app_version")
	private String sourceAppVersion;
	
	
	@Column(name="order_number")	
	private String orderNumber;
	
	@Column(name="order_sum")
	private int orderSum;
	
	@Column(name="order_time")
	private Calendar orderTime;	
	
	@OneToMany(mappedBy="order")
	private List<OrderItem> orderItems;	
	
	@Enumerated(EnumType.STRING)
	@Column(name="processed")
	private OrderProcess processed;
	
	@OneToMany(mappedBy="order")
	private List<OrderHistory> orderHistory;	
	
	// Person Info
	
	@Column(name="person_phone")
	private String personPhone;
	
	@Column(name="person_name")
	private String personName;
	
	@Column(name="person_count")
	private int personCount;

	@Column(name="person_remark", length=500)
	private String personRemark;

	@Column(name="person_email", length=256)
	private String personEmail;	
	
	@Column(name="person_cash")
	private int personCash;	
	
	/**
	 * Персональная скидка клиента (Накапливаемый процент)
	 */
	@Column(name="client_discount")
	private Integer clientDiscount;
	
	// Delivery Detail
	
	@ManyToOne
	private Department department;
	
	@Enumerated(EnumType.STRING)
	@Column(name="delivery_type")
	private DeliveryType deliveryType;
	
	@Column(name="delivery_time", nullable=true)
	private Calendar deliveryTime;
	
	@Enumerated(EnumType.STRING)
	@Column(name="pay_method")
	private PayMethod payMethod;

	// ====================
	// ===== EXTRA ========
	// ====================
	
	/**
	 * Дополнительная цена доставки
	 */
	@Column(name="delivery_extra_price")
	private Integer deliveryExtraPrice;
	
	/**
	 * Название акции в заказе
	 */
	@Column(name="promo_name")
	private String promotionName;
	
	/**
	 * Процент скидки по акции в заказе
	 */
	@Column(name="promo_discount")
	private Integer promotionDiscount;
	
	/**
	 * Тип промо, товар в подарок, скидка и т.д.
	 */
	@Enumerated(EnumType.STRING)
	@Column(name="promo_value_type")
	private PromotionValueType promotionValueType;
	
	/**
	 * Код продукта по акции
	 */
	@Column(name="promo_product_code")
	private String promotionProductCode;
	
	/**
	 * Причина отказа или отмены заказа
	 */
	@Column(name="reason")
	private String reason;
	
	
	// ====================
	// === ADDRESS ========
	// ====================
	
	@ManyToOne
	private City city;
	
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
	
	@Column(name="operator_code")
	private String operatorCode;
	
	@Column(name="cook_code")
	private String cookCode;
	
	@Column(name="courier_code")
	private String courierCode;
	
	// ========================
	
	public OrderHistory getLastOrderHistory() {
		OrderHistory orderHistory = null;
		for (OrderHistory oh: this.orderHistory) {
			if (orderHistory == null) 
				orderHistory = oh;
			if (orderHistory.getId() <= oh.getId())
				orderHistory = oh;
		}
		
		Logger.info("Last orderHistory status: " + orderHistory.getOrderState());
		
		return orderHistory;
	}
	
	
	// ========================
	
	public String getGeoLatitude() {
		return GeoLatitude;
	}

	public List<OrderHistory> getOrderHistory() {
		return orderHistory;
	}


	public void setOrderHistory(List<OrderHistory> orderHistory) {
		this.orderHistory = orderHistory;
	}


	public String getOperatorCode() {
		return operatorCode;
	}


	public void setOperatorCode(String operatorCode) {
		this.operatorCode = operatorCode;
	}


	public String getCookCode() {
		return cookCode;
	}


	public void setCookCode(String cookCode) {
		this.cookCode = cookCode;
	}


	public String getCourierCode() {
		return courierCode;
	}


	public void setCourierCode(String courierCode) {
		this.courierCode = courierCode;
	}


	public Integer getClientDiscount() {
		return clientDiscount;
	}

	public void setClientDiscount(Integer clientDiscount) {
		this.clientDiscount = clientDiscount;
	}

	public PromotionValueType getPromotionValueType() {
		return promotionValueType;
	}

	public void setPromotionValueType(PromotionValueType promotionValueType) {
		this.promotionValueType = promotionValueType;
	}

	public String getPromotionProductCode() {
		return promotionProductCode;
	}

	public void setPromotionProductCode(String promotionProductCode) {
		this.promotionProductCode = promotionProductCode;
	}

	public Integer getDeliveryExtraPrice() {
		return deliveryExtraPrice;
	}

	public void setDeliveryExtraPrice(Integer deliveryExtraPrice) {
		this.deliveryExtraPrice = deliveryExtraPrice;
	}

	public String getPromotionName() {
		return promotionName;
	}

	public void setPromotionName(String promotionName) {
		this.promotionName = promotionName;
	}

	public Integer getPromotionDiscount() {
		return promotionDiscount;
	}

	public void setPromotionDiscount(Integer promotionDiscount) {
		this.promotionDiscount = promotionDiscount;
	}

	public String getReason() {
		return reason;
	}

	public void setReason(String reason) {
		this.reason = reason;
	}

	public String getSourceSystemName() {
		return sourceSystemName;
	}

	public void setSourceSystemName(String sourceSystemName) {
		this.sourceSystemName = sourceSystemName;
	}

	public String getSourceSystemVersion() {
		return sourceSystemVersion;
	}

	public void setSourceSystemVersion(String sourceSystemVersion) {
		this.sourceSystemVersion = sourceSystemVersion;
	}

	public String getSourceAppVersion() {
		return sourceAppVersion;
	}

	public void setSourceAppVersion(String sourceAppVersion) {
		this.sourceAppVersion = sourceAppVersion;
	}

	public Integer getSourceDiscount() {
		return sourceDiscount;
	}

	public void setSourceDiscount(Integer sourceDiscount) {
		this.sourceDiscount = sourceDiscount;
	}

	public OrderSource getSource() {
		return source;
	}

	public void setSource(OrderSource source) {
		this.source = source;
	}

	public String getPersonEmail() {
		return personEmail;
	}

	public void setPersonEmail(String personEmail) {
		this.personEmail = personEmail;
	}

	public void setGeoLatitude(String geoLatitude) {
		GeoLatitude = geoLatitude;
	}

	public String getKey() {
		return key;
	}

	public void setKey(String key) {
		this.key = key;
	}

	public String getGeoLongitude() {
		return GeoLongitude;
	}

	public void setGeoLongitude(String geoLongitude) {
		GeoLongitude = geoLongitude;
	}

	public String getAddress() {
		String fullAddress = "";
		if (!StringUtils.isEmpty(addressCityName)) fullAddress += addressCityName;
		if (!StringUtils.isEmpty(addressStreetName)) fullAddress += ", " + addressStreetName;
		if (!StringUtils.isEmpty(addressHouse)) fullAddress += ", дом " +  addressHouse;
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
	
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public Calendar getOrderTime() {
		return orderTime;
	}

	public void setOrderTime(Calendar orderTime) {
		this.orderTime = orderTime;
	}

	public String getOrderNumber() {
		return orderNumber;
	}

	public void setOrderNumber(String orderNumber) {
		this.orderNumber = orderNumber;
	}

	public int getOrderSum() {
		return orderSum;
	}

	public void setOrderSum(int orderSum) {
		this.orderSum = orderSum;
	}

	public City getCity() {
		return city;
	}

	public void setCity(City city) {
		this.city = city;
	}

	public Department getDepartment() {
		return department;
	}

	public void setDepartment(Department department) {
		this.department = department;
	}

	public int getPersonCount() {
		return personCount;
	}

	public void setPersonCount(int personCount) {
		this.personCount = personCount;
	}

	public DeliveryType getDeliveryType() {
		return deliveryType;
	}

	public void setDeliveryType(DeliveryType deliveryType) {
		this.deliveryType = deliveryType;
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

	public List<OrderItem> getOrderItems() {
		return orderItems;
	}

	public void setOrderItems(List<OrderItem> orderItems) {
		this.orderItems = orderItems;
	}

	public OrderProcess getProcessed() {
		return processed;
	}

	public void setProcessed(OrderProcess processed) {
		this.processed = processed;
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

	public String getPersonRemark() {
		return personRemark;
	}

	public void setPersonRemark(String personRemark) {
		this.personRemark = personRemark;
	}

	public int getPersonCash() {
		return personCash;
	}

	public void setPersonCash(int personCash) {
		this.personCash = personCash;
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
	
}