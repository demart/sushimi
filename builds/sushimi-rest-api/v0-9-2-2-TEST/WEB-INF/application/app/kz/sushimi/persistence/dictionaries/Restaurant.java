package kz.sushimi.persistence.dictionaries;

import java.util.Calendar;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.annotations.Where;

@Entity
@Table(name = "restaurants")
public class Restaurant {

	@Id
	@GeneratedValue
	@Column	
	private Long id;

	@Column
	private String title;
	
	@Column
	private String description;
	
	@Column(name="image_url")
	private String imageUrl;
	
	@Column(name="phone_number")
	private String phoneNumber;
	
	@Column
	private String workhours;
	// Location Section
	@Column
	private String address;
	
	@Column
	private float latitude;
	
	@Column
	private float longitude;
	
	@OneToMany(mappedBy="restaurant")
	@Where(clause="is_promo='false'")
	private List<RestaurantPhoto> photos;
	
	@OneToMany(mappedBy="restaurant")
	@Where(clause="is_promo='true'")
	private List<RestaurantPhoto> promoPhotos;	
	
	@Column(name="published")
	private boolean isPublished;
	
	@Column(name="deleted")
	private boolean isDeleted;
	
	@Column(name="order_number")
	private int orderNumber;
	
	@Column(name="modified_date")
	private Calendar modifiedDate;


	public List<RestaurantPhoto> getPromoPhotos() {
		return promoPhotos;
	}

	public void setPromoPhotos(List<RestaurantPhoto> promoPhotos) {
		this.promoPhotos = promoPhotos;
	}

	public int getOrderNumber() {
		return orderNumber;
	}

	public void setOrderNumber(int orderNumber) {
		this.orderNumber = orderNumber;
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

	public String getWorkhours() {
		return workhours;
	}

	public void setWorkhours(String workhours) {
		this.workhours = workhours;
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

	public List<RestaurantPhoto> getPhotos() {
		return photos;
	}

	public void setPhotos(List<RestaurantPhoto> photos) {
		this.photos = photos;
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

	public Calendar getModifiedDate() {
		return modifiedDate;
	}

	public void setModifiedDate(Calendar modifiedDate) {
		this.modifiedDate = modifiedDate;
	}
}
