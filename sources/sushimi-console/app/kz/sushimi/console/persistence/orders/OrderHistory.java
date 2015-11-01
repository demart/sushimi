package kz.sushimi.console.persistence.orders;

import java.util.Calendar;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import kz.sushimi.console.persistence.PersistentObject;
import kz.sushimi.console.persistence.users.User;
import play.db.jpa.Model;

/**
 * История изменения заказа
 * 
 * @author Demart
 *
 */
@Entity
@Table(name = "orders_history")
public class OrderHistory extends PersistentObject {

	@ManyToOne
	private Order order;
	

	
	/**
	 * Статус заказа
	 */
	@Enumerated(EnumType.STRING)
	@Column
	private OrderState orderState;
	
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
	 * Синхронизирована ли запись с сайтом?
	 */
	@Column(name="is_synchronized")
	private Boolean isSynchronized;
	
	/**
	 * Id записи на сайте
	 */
	@Column(name="site_record_id")
	private Long siteRecordId;



	public Order getOrder() {
		return order;
	}

	public void setOrder(Order order) {
		this.order = order;
	}

	public OrderState getOrderState() {
		return orderState;
	}

	public void setOrderState(OrderState orderState) {
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

	public Long getSiteRecordId() {
		return siteRecordId;
	}

	public void setSiteRecordId(Long siteRecordId) {
		this.siteRecordId = siteRecordId;
	}
	
}
