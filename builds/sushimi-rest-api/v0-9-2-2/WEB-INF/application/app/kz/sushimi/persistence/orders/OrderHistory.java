package kz.sushimi.persistence.orders;

import java.util.Calendar;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

/**
 * История изменения заказа
 * 
 * @author Demart
 *
 */
@Entity
@Table(name =  "orders_history")
public class OrderHistory {

    @Id
    @GeneratedValue
    @Column(name="id")
    public Long id;
    
	@ManyToOne
	private Order order;
	
	/**
	 * Статус заказа
	 */
	@Enumerated(EnumType.STRING)
	@Column
	private OrderProcess orderState;
	
	/**
	 * Дата изменения заказа
	 */
	@Column
	private Calendar date;
	
	/**
	 * Координата заказа
	 */
	@Column(name="geo_latitude")
	private String geoLatitude;
	
	/**
	 * Координата заказа
	 */
	@Column(name="geo_longitude")
	private String geoLongitude;
	
	/**
	 * Синхронизирована ли запись с консолью
	 */
	@Column(name="is_synchronized")
	private Boolean isSynchronized;
	
	/**
	 * Id записи в консоле
	 */
	@Column(name="console_record_id")
	private Long consoleRecordId;

	/**
	 * Пользователь изменивших состояние заказа
	 */
	@Column(name="user_name")
	private String user;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getUser() {
		return user;
	}

	public void setUser(String user) {
		this.user = user;
	}

	public Order getOrder() {
		return order;
	}

	public void setOrder(Order order) {
		this.order = order;
	}

	public OrderProcess getOrderState() {
		return orderState;
	}

	public void setOrderState(OrderProcess orderState) {
		this.orderState = orderState;
	}

	public Calendar getDate() {
		return date;
	}

	public void setDate(Calendar date) {
		this.date = date;
	}

	public String getGeoLatitude() {
		return geoLatitude;
	}

	public void setGeoLatitude(String geoLatitude) {
		this.geoLatitude = geoLatitude;
	}

	public String getGeoLongitude() {
		return geoLongitude;
	}

	public void setGeoLongitude(String geoLongitude) {
		this.geoLongitude = geoLongitude;
	}

	public Boolean getIsSynchronized() {
		return isSynchronized;
	}

	public void setIsSynchronized(Boolean isSynchronized) {
		this.isSynchronized = isSynchronized;
	}

	public Long getConsoleRecordId() {
		return consoleRecordId;
	}

	public void setConsoleRecordId(Long consoleRecordId) {
		this.consoleRecordId = consoleRecordId;
	}
	
}
