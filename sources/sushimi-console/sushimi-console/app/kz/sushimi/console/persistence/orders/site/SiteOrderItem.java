package kz.sushimi.console.persistence.orders.site;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import kz.sushimi.console.persistence.PersistentObject;

/**
 * Позиция заказа с сайта
 * 
 * @author Demart
 *
 */
@Entity
@Table(name = "orders_sites_items")
public class SiteOrderItem extends PersistentObject {

	@ManyToOne
	private SiteOrder order;
	
	@Column
	private int siteId;
	
	/**
	 * Уникальный код продукта для связи
	 */
	@Column(name="product_code")
	private String productCode;
	
	/**
	 * Название продукта
	 */
	@Column(name="product_name")
	private String productName; 
	
	/**
	 * Цена товара
	 */
	@Column(name="product_cost")
	private int productCost;
	
	/**
	 * Кол-во единиц
	 */
	@Column
	private int count;
	
	/**
	 * Цена за единицу (со скидкой если такая есть)
	 */
	@Column
	private int price;
	
	/**
	 * Сумма всех колличеств товара
	 */
	@Column
	private int sum;

	public SiteOrder getOrder() {
		return order;
	}

	public void setOrder(SiteOrder order) {
		this.order = order;
	}

	public int getSiteId() {
		return siteId;
	}

	public void setSiteId(int siteId) {
		this.siteId = siteId;
	}

	public String getProductCode() {
		return productCode;
	}

	public void setProductCode(String productCode) {
		this.productCode = productCode;
	}

	public String getProductName() {
		return productName;
	}

	public void setProductName(String productName) {
		this.productName = productName;
	}

	public int getProductCost() {
		return productCost;
	}

	public void setProductCost(int productCost) {
		this.productCost = productCost;
	}

	public int getCount() {
		return count;
	}

	public void setCount(int count) {
		this.count = count;
	}

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
}