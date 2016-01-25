package kz.sushimi.restapi.v1.models;

import java.util.Calendar;
import java.util.List;

public class RestaurantModel {

	private Long id;
	private String title;
	private String description;
	private String imageUrl;
	private String phoneNumber;
	private String workhours;
	// Location Section
	private String address;
	private float latitude;
	private float longitude;
	
	/**
	 * Basic photo in restaurant
	 */
	private List<RestaurantPhotoModel> photos;
	
	/**
	 * Promo photos gathered from promo sections (maybe promo for this restaurant only or smth else)
	 */
	private List<RestaurantPhotoModel> promoPhotos;
	
	private Long modifiedDate;

	public List<RestaurantPhotoModel> getPromoPhotos() {
		return promoPhotos;
	}

	public void setPromoPhotos(List<RestaurantPhotoModel> promoPhotos) {
		this.promoPhotos = promoPhotos;
	}

	public String getWorkhours() {
		return workhours;
	}

	public void setWorkhours(String workhours) {
		this.workhours = workhours;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getImageUrl() {
		return imageUrl;
	}

	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}

	public String getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public float getLatitude() {
		return latitude;
	}

	public void setLatitude(float latitude) {
		this.latitude = latitude;
	}

	public float getLongitude() {
		return longitude;
	}

	public void setLongitude(float longitude) {
		this.longitude = longitude;
	}

	public List<RestaurantPhotoModel> getPhotos() {
		return photos;
	}

	public void setPhotos(List<RestaurantPhotoModel> photos) {
		this.photos = photos;
	}

	public Long getModifiedDate() {
		return modifiedDate;
	}

	public void setModifiedDate(Long modifiedDate) {
		this.modifiedDate = modifiedDate;
	}

}
