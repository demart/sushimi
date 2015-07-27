package kz.sushimi.console.models.warehouses;

import java.util.Calendar;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.ManyToOne;

import kz.sushimi.console.persistence.dictionaries.Ingredient;
import kz.sushimi.console.persistence.dictionaries.Unit;
import kz.sushimi.console.persistence.warehouses.WarehouseItem;
import kz.sushimi.console.persistence.warehouses.WarehouseOutcomeType;

/**
 * Модель расхода со склада
 * 
 * @author Demart
 *
 */
public class WarehouseOutcomeModel {

	private Long id;
	
	/**
	 * Тип операции расхода
	 */
	private WarehouseOutcomeType type;
	
	/**
	 * Товар на складе
	 */
	private Long warehouseItemId;
	
	private String warehouseItemName;
	
	/**
	 * Ингридиент склада
	 */
	private Long ingredientId;
	private String ingredientName;
	
	/**
	 * Сколько списывается
	 */
	private Float amount;

	/**
	 * Единица измерения списивыемого товара
	 */
	private Long unitId;
	
	private String unitName;
	
	/**
	 * Дата и время расхода
	 */
	private Calendar outcomeDate;
	
	/**
	 * Причина списания товара
	 */
	private String outcomeReason;
	
	public String user;
	public Date createdDate;
	public Date modifiedDate;
	
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public WarehouseOutcomeType getType() {
		return type;
	}
	public void setType(WarehouseOutcomeType type) {
		this.type = type;
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
	public Float getAmount() {
		return amount;
	}
	public void setAmount(Float amount) {
		this.amount = amount;
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
	public Calendar getOutcomeDate() {
		return outcomeDate;
	}
	public void setOutcomeDate(Calendar outcomeDate) {
		this.outcomeDate = outcomeDate;
	}
	public String getOutcomeReason() {
		return outcomeReason;
	}
	public void setOutcomeReason(String outcomeReason) {
		this.outcomeReason = outcomeReason;
	}
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
}
