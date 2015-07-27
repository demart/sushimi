package kz.sushimi.console.models.dictionaries;

import java.util.Date;

/**
 * Модель калькуляции продукта
 * 
 * @author Demart
 *
 */
public class ProductCostingModel {

	/**
	 *  Record Id
	 */
	private Long id;
	
	/**
	 * Идентификатор продукта
	 */
	private Long productId;
	
	/**
	 * Название продукта
	 */
	private String productName;
	
	/**
	 * Позиция на складе (Айди)
	 */
	private Long warehouseItemId;
	
	/**
	 * Позиция на складе (Наименование)
	 */
	private String warehouseItemName;
	
	/**
	 * Идентификатор ингредиента
	 */
	private Long ingredientId;
	
	/**
	 * Наименование ингредиента
	 */
	private String ingredientName;
	
	/**
	 * Идентификатор единицы измерения
	 */
	private Long unitId;
	
	/**
	 * Наименования единицы измерения
	 */
	private String unitName;
	
	/**
	 * Кол-во ингредиента со склада
	 */
	private Integer amount;


	public String user;
	public Date createdDate;
	public Date modifiedDate;	
	
	public String getUser() {
		return user;
	}

	public void setUser(String user) {
		this.user = user;
	}

	public Date getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}

	public Date getModifiedDate() {
		return modifiedDate;
	}

	public void setModifiedDate(Date modifiedDate) {
		this.modifiedDate = modifiedDate;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getProductId() {
		return productId;
	}

	public void setProductId(Long productId) {
		this.productId = productId;
	}

	public String getProductName() {
		return productName;
	}

	public void setProductName(String productName) {
		this.productName = productName;
	}

	public Long getWarehouseItemId() {
		return warehouseItemId;
	}

	public void setWarehouseItemId(Long warehouseItemId) {
		this.warehouseItemId = warehouseItemId;
	}

	public String getWarehouseItemName() {
		return warehouseItemName;
	}

	public void setWarehouseItemName(String warehouseItemName) {
		this.warehouseItemName = warehouseItemName;
	}

	public Long getIngredientId() {
		return ingredientId;
	}

	public void setIngredientId(Long ingredientId) {
		this.ingredientId = ingredientId;
	}

	public String getIngredientName() {
		return ingredientName;
	}

	public void setIngredientName(String ingredientName) {
		this.ingredientName = ingredientName;
	}

	public Long getUnitId() {
		return unitId;
	}

	public void setUnitId(Long unitId) {
		this.unitId = unitId;
	}

	public String getUnitName() {
		return unitName;
	}

	public void setUnitName(String unitName) {
		this.unitName = unitName;
	}

	public Integer getAmount() {
		return amount;
	}

	public void setAmount(Integer amount) {
		this.amount = amount;
	}
	
}
