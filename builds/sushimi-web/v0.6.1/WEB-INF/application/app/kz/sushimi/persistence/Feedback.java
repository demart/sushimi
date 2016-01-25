package kz.sushimi.persistence;

import java.util.Calendar;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;


@Entity
@Table(name = "feedbacks")
public class Feedback {
	
	@Id
	@GeneratedValue()
	@Column(name="id")
	private long id;
	
	@Column(name="client_name")
	private String clientName;
	
	@Column(name="phone_number")
	private String phoneNumber;
	
	@Column(name="text", length=1000)
	private String text;
	
	@Column(name="city_name")
	private String cityName;
	
	@Column(name="order_number")
	private String orderNumber;

	@Column(name="restaurant_name")
	private String restaurantName;
	
	/**
	 * Причина публикации или отклонения
	 */
	@Column(name="reason")
	private String reason;	
	
	@Enumerated(EnumType.STRING)
	@Column(name="type")
	private FeedbackType type;

	@Enumerated(EnumType.STRING)
	@Column(name="status")
	private FeedbackStatus status;

	@Column(name="published")
	private boolean isPublished;	
	
	@Column(name="created_date")
	private Calendar createdDate;

	public String getClientName() {
		return clientName;
	}

	public void setClientName(String clientName) {
		this.clientName = clientName;
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

	public String getCityName() {
		return cityName;
	}

	public void setCityName(String cityName) {
		this.cityName = cityName;
	}

	public String getOrderNumber() {
		return orderNumber;
	}

	public void setOrderNumber(String orderNumber) {
		this.orderNumber = orderNumber;
	}

	public String getRestaurantName() {
		return restaurantName;
	}

	public void setRestaurantName(String restaurantName) {
		this.restaurantName = restaurantName;
	}

	public String getReason() {
		return reason;
	}

	public void setReason(String reason) {
		this.reason = reason;
	}

	public FeedbackType getType() {
		return type;
	}

	public void setType(FeedbackType type) {
		this.type = type;
	}

	public FeedbackStatus getStatus() {
		return status;
	}

	public void setStatus(FeedbackStatus status) {
		this.status = status;
	}

	public boolean isPublished() {
		return isPublished;
	}

	public void setPublished(boolean isPublished) {
		this.isPublished = isPublished;
	}

	public Calendar getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(Calendar createdDate) {
		this.createdDate = createdDate;
	}
	
}
