package kz.sushimi.console.persistence.orders;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import kz.sushimi.console.persistence.PersistentObject;
import kz.sushimi.console.persistence.dictionaries.Product;
import kz.sushimi.console.persistence.warehouses.WarehouseOutcome;
import play.db.jpa.Model;


/**
 * 
 * Позиция заказа
 * 
 * @author Demart
 *
 */
@Entity
@Table(name = "orders_items")
public class OrderItem extends PersistentObject {
	
	/**
	 * Заказ
	 */
	@ManyToOne
	private Order order;
	
	/**
	 * Продукт
	 */
	@ManyToOne
	private Product product;

	/**
	 * Списание ингредиентов со склада
	 */
	@ManyToMany(cascade={CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REMOVE})
	private List<WarehouseOutcome> warehouseOutcomes;
	
	/**
	 * Кол-во всего 
	 */
	@Column
	private Integer count;	

	/**
	 * Кол-во бесплатных
	 */
	@Column
	private Integer freeCount;	
	
	/**
	 * Общая сумма и платных и бесплатных позиций
	 */
	@Column
	private Integer sum;

	/**
	 * Себестоимость продукта
	 */
	@Column(name="net_cost")
	private Integer netCost;
	
	
	public Integer getNetCost() {
		return netCost;
	}

	public void setNetCost(Integer netCost) {
		this.netCost = netCost;
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

	public List<WarehouseOutcome> getWarehouseOutcomes() {
		return warehouseOutcomes;
	}

	public void setWarehouseOutcomes(List<WarehouseOutcome> warehouseOutcomes) {
		this.warehouseOutcomes = warehouseOutcomes;
	}

	public Integer getCount() {
		return count;
	}

	public void setCount(Integer count) {
		this.count = count;
	}

	public Integer getFreeCount() {
		return freeCount;
	}

	public void setFreeCount(Integer freeCount) {
		this.freeCount = freeCount;
	}

	public Integer getSum() {
		return sum;
	}

	public void setSum(Integer sum) {
		this.sum = sum;
	}

	
}