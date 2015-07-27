package kz.sushimi.console.integration.site;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;


/**
 * Модель позиций товаров для интеграции с системой управления заказами
 * 
 * @author Demart
 *
 */
public class OrderItemModel {

	private int id;
	
	/**
	 * Уникальный код продукта для связи
	 */
	private String productCode;
	
	/**
	 * Название продукта
	 */
	private String productName; 
	
	/**
	 * Цена товара
	 */
	private int productCost;
	
	/**
	 * Кол-во единиц
	 */
	private int count;
	
	/**
	 * Цена за единицу (со скидкой если такая есть)
	 */
	private int price;
	
	/**
	 * Сумма всех колличеств товара
	 */
	private int sum;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
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
