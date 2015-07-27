package kz.sushimi.console.models.warehouses;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.ManyToOne;

import kz.sushimi.console.persistence.dictionaries.Ingredient;

/**
 * Модель позиции на складе
 * 
 * @author Demart
 *
 */
public class WarehouseItemModel {

	/**
	 * Идентификатор записи
	 */
	private Long id;
	
	/**
	 * Ингридиент идентификатор
	 */
	private Long ingredientId;

	/**
	 * Ингридиент наименование
	 */
	private String ingredientName;	
	
	/**
	 * Единица измерения
	 */
	private Long unitId;

	/**
	 * Единица измерения
	 */
	private String unitName;	
		
	
	
	/**
	 * Кол-во
	 */
	private Float amount;


	public String user;
	public Date createdDate;
	public Date modifiedDate;
	
	
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
	
}
