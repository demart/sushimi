package kz.sushimi.persistence;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import kz.sushimi.persistence.dictionaries.Product;


/**
 * Класс для хранения позиций товаров в корзине
 * 
 * @author Demart
 *
 */
@Entity
@Table(name = "cart_items")
public class CartItem {
	
	@Id
	@GeneratedValue
	@Column
	private int id;
	
	@ManyToOne
	private Cart cart;
	
	@ManyToOne
	private Product product;
	
	@Column
	private int count;
	
	// ============================
	
	public int getId() {
		return id;
	}
	
	public void setId(int id) {
		this.id = id;
	}

	public Cart getCart() {
		return cart;
	}

	public void setCart(Cart cart) {
		this.cart = cart;
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
