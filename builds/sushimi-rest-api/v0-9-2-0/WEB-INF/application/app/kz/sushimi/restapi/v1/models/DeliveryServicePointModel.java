package kz.sushimi.restapi.v1.models;

import kz.sushimi.persistence.dictionaries.DeliveryServicePoint;

public class DeliveryServicePointModel {

	private int id;
	private String title;
	private String workhours;
	private String minOrderSum;
	private String deliveryArea;
	private String deliveryAreaImageUrl;
	private String deliveryAreaRemarks;
	private String address;
	private Float addressGeoLatitude;
	private Float addressGeoLongitude;	
	private String phoneNumber;
	
	public static DeliveryServicePointModel buildFromDeliveryServicePoint(DeliveryServicePoint deliveryServicePoint) {
		DeliveryServicePointModel model = new DeliveryServicePointModel();
		model.setAddress(deliveryServicePoint.getAddress());
		model.setAddressGeoLatitude(deliveryServicePoint.getAddressGeoLatitude());
		model.setAddressGeoLongitude(deliveryServicePoint.getAddressGeoLongitude());
		model.setDeliveryArea(deliveryServicePoint.getDeliveryArea());
		model.setDeliveryAreaImageUrl(deliveryServicePoint.getDeliveryAreaImageUrl());
		model.setDeliveryAreaRemarks(deliveryServicePoint.getDeliveryAreaRemarks());
		model.setId(deliveryServicePoint.getId());
		model.setMinOrderSum(deliveryServicePoint.getMinOrderSum());
		model.setPhoneNumber(deliveryServicePoint.getPhoneNumber());
		model.setTitle(deliveryServicePoint.getTitle());
		model.setWorkhours(deliveryServicePoint.getWorkhours());
		return model;
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

}
