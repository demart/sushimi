package kz.sushimi.persistence;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OrderBy;
import javax.persistence.Query;
import javax.persistence.Table;

import play.db.jpa.JPA;
import kz.sushimi.persistence.dictionaries.City;

/**
 * 
 * Клас для временного хранения корзины на сервере
 * 
 */
@Entity
@Table(name = "cart")
public class Cart {

	/**
	 * Идентификатор сессии пользователя
	 */
	@Id
	@Column(name="session")
	private String session;
	
	@Column(name="timeout")
	private long timeout;
	
	@OneToMany(mappedBy="cart")	
	private List<CartItem> items = new ArrayList<CartItem>();
	
	@ManyToOne
	private City city;
	
	// =========================
	
	public int getTotalCartSum() {
		int sum = 0;
		for (CartItem item : items) {
			sum += item.getCount() * item.getProduct().getCost();
		}
		return sum;
	}
	
	
	public City getCity() {
		return city;
	}

	public void setCity(City city) {
		this.city = city;
	}

	public String getSession() {
		return session;
	}

	public void setSession(String session) {
		this.session = session;
	}

	public long getTimeout() {
		return timeout;
	}

	public void setTimeout(long timeout) {
		this.timeout = timeout;
	}

	public List<CartItem> getItems() {
		return items;
	}
	
	public void setItems(List<CartItem> items) {
		this.items = items;
	} 
	
}
