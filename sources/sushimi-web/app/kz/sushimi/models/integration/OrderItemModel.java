package kz.sushimi.models.integration;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import kz.sushimi.persistence.dictionaries.Product;
import kz.sushimi.persistence.orders.Order;
import kz.sushimi.persistence.orders.OrderItem;

/**
 * Модель позиций товаров для интеграции с системой управления заказами
 * 
 * @author Demart
 *
 */
public class OrderItemModel {

	public OrderItemModel(OrderItem item) {
		buildModel(item);
	}
	
	private void buildModel(OrderItem item) {
		this.count = item.getCount();
		this.id = item.getId();
		this.price = item.getPrice();
		this.productCode = item.getProduct().getCode();
		this.productCost = item.getProduct().getCost();
		this.productName = item.getProduct().getName();
		this.sum = item.getSum();
	}
	

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
}
