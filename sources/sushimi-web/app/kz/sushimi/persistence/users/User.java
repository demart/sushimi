package kz.sushimi.persistence.users;

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


/**
 * Пользователи системы
 * 
 * @author Demart
 *
 */
@Entity
@Table(name = "users")
public class User {
	
	@Id
	@GeneratedValue(generator="user_seq")
	@SequenceGenerator(name="user_seq",sequenceName="user_seq", allocationSize=1)
	private Long id;
	
	@Column(name="code", nullable=false)
	private String code;
	
	@Column(name="name")
	private String name;

	@Column(name="login", length=20)
	private String login;
	
	@Column(name="password", length=20)
	private String password;
	
	@Enumerated(EnumType.STRING)
	@Column(name="role")
	private UserRole role = UserRole.OPERATOR;

	/**
	 * Включена ли учетная запись или нет
	 */
	@Column
	private Boolean enabled;
	
	/**
	 * Город в котором работает пользователь (Курьер)
	 */
	@ManyToOne
	private City city;
	
	/**
	 * Последняя позиция
	 */
	@Column(name="last_latitude")
	private String lastLatitude;
	
	/**
	 * Последняя позиция
	 */
	@Column(name="last_longitude")
	private String lastLongitude;
	
	/**
	 * Последнее обновление точек нахождение пользователя
	 */
	@Column(name="last_geolocation_sync_time")
	private Calendar lastGeolocationSyncTime; 

	// ====================
	// DEVICE INFORMATION
	// ====================
	
	/**
	 * Версия мобильного приложения которое установлено
	 */
	@Column(name="m_app_verison")
	private String mobileAppVersion;
	
	/**
	 * Операционная система на телефоне
	 */
	@Column(name="m_operation_system")
	private UserMobileOperationSystem mobileOperationSystem;
	
	/**
	 * Версия операционной системы
	 */
	@Column(name="m_operation_system_version")
	private String mobileOperationSystemVersion;
	
	/**
	 * Идентификатор для отправки PUSH уведомлений курьерам и другим
	 */
	@Column(name="m_push_key")
	private String mobilePushKey;
	
	/**
	 * SSO Token для авторизации в мобильном приложении
	 */
	@Column(name="m_auth_token")
	private String mobileAuthToken;
	
	/**
	 * Последние отметки на карте где был пользователь
	 */
	@OneToMany(mappedBy="user")
	private List<UserTracking> userTrackings;
	
	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public List<UserTracking> getUserTrackings() {
		return userTrackings;
	}

	public void setUserTrackings(List<UserTracking> userTrackings) {
		this.userTrackings = userTrackings;
	}

	public String getMobileAuthToken() {
		return mobileAuthToken;
	}

	public void setMobileAuthToken(String mobileAuthToken) {
		this.mobileAuthToken = mobileAuthToken;
	}

	public String getMobileAppVersion() {
		return mobileAppVersion;
	}

	public void setMobileAppVersion(String mobileAppVersion) {
		this.mobileAppVersion = mobileAppVersion;
	}

	public UserMobileOperationSystem getMobileOperationSystem() {
		return mobileOperationSystem;
	}

	public void setMobileOperationSystem(
			UserMobileOperationSystem mobileOperationSystem) {
		this.mobileOperationSystem = mobileOperationSystem;
	}

	public String getMobileOperationSystemVersion() {
		return mobileOperationSystemVersion;
	}

	public void setMobileOperationSystemVersion(String mobileOperationSystemVersion) {
		this.mobileOperationSystemVersion = mobileOperationSystemVersion;
	}

	public String getMobilePushKey() {
		return mobilePushKey;
	}

	public void setMobilePushKey(String mobilePushKey) {
		this.mobilePushKey = mobilePushKey;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public City getCity() {
		return city;
	}

	public void setCity(City city) {
		this.city = city;
	}

	public String getLastLatitude() {
		return lastLatitude;
	}

	public void setLastLatitude(String lastLatitude) {
		this.lastLatitude = lastLatitude;
	}

	public String getLastLongitude() {
		return lastLongitude;
	}

	public void setLastLongitude(String lastLongitude) {
		this.lastLongitude = lastLongitude;
	}

	public Calendar getLastGeolocationSyncTime() {
		return lastGeolocationSyncTime;
	}

	public void setLastGeolocationSyncTime(Calendar lastGeolocationSyncTime) {
		this.lastGeolocationSyncTime = lastGeolocationSyncTime;
	}

	public Boolean getEnabled() {
		return enabled;
	}

	public void setEnabled(Boolean enabled) {
		this.enabled = enabled;
	}

	public String getLogin() {
		return login;
	}

	public void setLogin(String login) {
		this.login = login;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public UserRole getRole() {
		return role;
	}

	public void setRole(UserRole role) {
		this.role = role;
	}





}
