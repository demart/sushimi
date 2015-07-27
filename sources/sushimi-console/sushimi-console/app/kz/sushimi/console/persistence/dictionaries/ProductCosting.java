package kz.sushimi.console.persistence.dictionaries;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import kz.sushimi.console.persistence.PersistentObject;
import kz.sushimi.console.persistence.warehouses.WarehouseItem;
import play.db.jpa.Model;

/**
 * Калькуляция товара
 * 
 * @author Demart
 *
 */
@Entity
@Table(name = "dic_products_costing")
public class ProductCosting extends PersistentObject {

	/**
	 * Продукт к которому относиться данная калькуляция
	 */
	@ManyToOne
	private Product product;
	
	/**
	 * Свзяь с позицией на складе
	 */
	@ManyToOne
	private WarehouseItem warehouseItem;
	
	/**
	 * Ингридиент состава продукции
	 */
	@ManyToOne
	private Ingredient ingredient;
	
	/**
	 * Единица измерения
	 */
	@ManyToOne
	private Unit unit;
	/**
	 * Сколько требуется ингридиента
	 */
	@Column
	private Integer amount;
	
	
	public Product getProduct() {
		return product;
	}
	public void setProduct(Product product) {
		this.product = product;
	}
	public WarehouseItem getWarehouseItem() {
		return warehouseItem;
	}
	public void setWarehouseItem(WarehouseItem warehouseItem) {
		this.warehouseItem = warehouseItem;
	}
	public Ingredient getIngredient() {
		return ingredient;
	}
	public void setIngredient(Ingredient ingredient) {
		this.ingredient = ingredient;
	}
	public Unit getUnit() {
		return unit;
	}
	public void setUnit(Unit unit) {
		this.unit = unit;
	}
	public Integer getAmount() {
		return amount;
	}
	public void setAmount(Integer amount) {
		this.amount = amount;
	}
	
	
}
