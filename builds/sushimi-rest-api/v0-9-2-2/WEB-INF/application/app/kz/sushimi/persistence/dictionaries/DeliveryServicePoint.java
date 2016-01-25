package kz.sushimi.persistence.dictionaries;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;


@Entity
@Table(name = "delivery_service_points")
public class DeliveryServicePoint {

	@Id
	@GeneratedValue
	@Column
	private int id;
	
	@Column(name="order_number")
	private int orderNumber;
	
	@Column
	private String title;
	
	@Column
	private String workhours;
	
	@Column(name="min_order_sum")
	private String minOrderSum;
	
	@Column(name="delivery_area")
	private String deliveryArea;
	
	@Column(name="delivery_area_image_url")
	private String deliveryAreaImageUrl;
	
	@Column(name="delivery_area_remarks")
	private String deliveryAreaRemarks;
	
	@Column
	private String address;
	
	@Column(name="addres_geo_latitude")
	private Float addressGeoLatitude;
	
	@Column(name="address_geo_longitude")
	private Float addressGeoLongitude;	
	
	@Column(name="phone_number")
	private String phoneNumber;

	@Column(name="published")
	private boolean isPublished;
	
	@Column(name="deleted")
	private boolean isDeleted;
	
	public int getOrderNumber() {
		return orderNumber;
	}

	public void setOrderNumber(int orderNumber) {
		this.orderNumber = orderNumber;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getWorkhours() {
		return workhours;
	}

	public void setWorkhours(String workhours) {
		this.workhours = workhours;
	}

	public String getMinOrderSum() {
		return minOrderSum;
	}

	public void setMinOrderSum(String minOrderSum) {
		this.minOrderSum = minOrderSum;
	}

	public String getDeliveryArea() {
		return deliveryArea;
	}

	public void setDeliveryArea(String deliveryArea) {
		this.deliveryArea = deliveryArea;
	}

	public String getDeliveryAreaImageUrl() {
		return deliveryAreaImageUrl;
	}

	public void setDeliveryAreaImageUrl(String deliveryAreaImageUrl) {
		this.deliveryAreaImageUrl = deliveryAreaImageUrl;
	}

	public String getDeliveryAreaRemarks() {
		return deliveryAreaRemarks;
	}

	public void setDeliveryAreaRemarks(String deliveryAreaRemarks) {
		this.deliveryAreaRemarks = deliveryAreaRemarks;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public Float getAddressGeoLatitude() {
		return addressGeoLatitude;
	}

	public void setAddressGeoLatitude(Float addressGeoLatitude) {
		this.addressGeoLatitude = addressGeoLatitude;
	}

	public Float getAddressGeoLongitude() {
		return addressGeoLongitude;
	}

	public void setAddressGeoLongitude(Float addressGeoLongitude) {
		this.addressGeoLongitude = addressGeoLongitude;
	}

	public String getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

	public boolean isPublished() {
		return isPublished;
	}

	public void setPublished(boolean isPublished) {
		this.isPublished = isPublished;
	}

	public boolean isDeleted() {
		return isDeleted;
	}

	public void setDeleted(boolean isDeleted) {
		this.isDeleted = isDeleted;
	}
	
}
