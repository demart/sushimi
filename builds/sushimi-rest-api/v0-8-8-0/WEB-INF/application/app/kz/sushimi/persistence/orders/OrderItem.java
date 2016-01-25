package kz.sushimi.persistence.orders;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import kz.sushimi.persistence.dictionaries.Product;

@Entity
@Table(name = "orders_items")
public class OrderItem {
	
	@Id
	@GeneratedValue()
	@Column(name="id")
	private int id;
	
	@ManyToOne
	private Order order;
	
	@ManyToOne
	private Product product;
	
	/**
	 * Кол-во единиц
	 */
	@Column(name="count")
	private int count;
	
	/**
	 * Цена за единицу (со скидкой если такая есть)
	 */
	@Column(name="price")
	private int price;
	
	/**
	 * Сумма всех колличеств товара
	 */
	@Column(name="sum")
	private int sum;

	
	public int getPrice() {
		return price;
	}

	public void setPrice(int price) {
		this.price = price;
	}

	public int getSum() {
		return sum;
	}

	public void setSum(int sum) {
		this.sum = sum;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public Order getOrder() {
		return order;
	}

	public void setOrder(Order order) {
		this.order = order;
	}

	public Product getProduct() {
		return product;
	}

	public void setProduct(Product product) {
		this.product = product;
	}

	public int getCount() {
		return count;
	}

	public void setCount(int count) {
		this.count = count;
	}
	
}
