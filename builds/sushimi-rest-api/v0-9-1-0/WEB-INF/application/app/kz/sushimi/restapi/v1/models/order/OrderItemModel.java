package kz.sushimi.restapi.v1.models.order;

import kz.sushimi.persistence.orders.OrderItem;
import kz.sushimi.restapi.v1.models.ProductModel;

public class OrderItemModel {

	private int id;

	
	private ProductModel product;
	
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
	
	public OrderItemModel() {}

	public static OrderItemModel buildFromOrderItem(OrderItem orderItem) {
		OrderItemModel oim = new OrderItemModel();
		oim.count = orderItem.getCount();
		oim.id = orderItem.getId();
		oim.price = orderItem.getPrice();
		oim.sum = orderItem.getSum();
		oim.product = ProductModel.buildFromProduct(orderItem.getProduct());
		return oim;
	}
	
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public ProductModel getProduct() {
		return product;
	}

	public void setProduct(ProductModel product) {
		this.product = product;
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
