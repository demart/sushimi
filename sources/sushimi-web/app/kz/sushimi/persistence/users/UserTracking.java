package kz.sushimi.persistence.users;

import java.util.Calendar;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;


/**
 * Геопозиции пользователя с фиксированным временем
 * 
 * @author artem.demidovich
 * 
 */
@Entity
@Table(name = "users_trackings")
public class UserTracking {

	@Id
	@GeneratedValue(generator="user_tracking_seq")
	@SequenceGenerator(name="user_tracking_seq",sequenceName="user_tracking_seq", allocationSize=1)
	private Long id;
	
	@ManyToOne
	private User user;
	
	@Column(name="track_date")
	private Calendar date;
	
	@Column(name="longitude")
	private String longitude;
	
	@Column(name="latitude")
	private String latitude;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Calendar getDate() {
		return date;
	}

	public void setDate(Calendar date) {
		this.date = date;
	}

	public String getLongitude() {
		return longitude;
	}

	public void setLongitude(String longitude) {
		this.longitude = longitude;
	}

	public String getLatitude() {
		return latitude;
	}

	public void setLatitude(String latitude) {
		this.latitude = latitude;
	}
	
}
