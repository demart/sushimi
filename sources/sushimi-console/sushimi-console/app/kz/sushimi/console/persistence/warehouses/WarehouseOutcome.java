package kz.sushimi.console.persistence.warehouses;

import java.util.Calendar;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import kz.sushimi.console.persistence.PersistentObject;
import kz.sushimi.console.persistence.dictionaries.Ingredient;
import kz.sushimi.console.persistence.dictionaries.Unit;
import kz.sushimi.console.persistence.users.User;
import play.db.jpa.Model;

/**
 * Операции склада
 * Приход / Расход
 * @author Demart
 *
 */
@Entity
@Table(name = "warehouse_outcomes")
public class WarehouseOutcome extends PersistentObject {
	
	// TODO Сделать связь с продукцией
	
	/**
	 * Тип операции расхода
	 */
	@Enumerated(EnumType.STRING)
	@Column
	private WarehouseOutcomeType type = WarehouseOutcomeType.NONE;
	
	/**
	 * Товар на складе
	 */
	@ManyToOne(cascade={CascadeType.PERSIST, CascadeType.MERGE})
	private WarehouseItem warehouseItem;	
	
	/**
	 * Ингридиент склада
	 */
	@ManyToOne
	private Ingredient ingredient;
	
	/**
	 * Сколько списывается
	 */
	@Column
	private Float amount;

	/**
	 * Единица измерения списивыемого товара
	 */
	@ManyToOne
	private Unit unit;
	
	/**
	 * Дата и время расхода
	 */
	@Column
	private Calendar outcomeDate;
	
	/**
	 * Причина списания товара
	 */
	@Column(length=500)
	private String outcomeReason;

	public WarehouseOutcomeType getType() {
		return type;
	}

	public void setType(WarehouseOutcomeType type) {
		this.type = type;
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

	public Float getAmount() {
		return amount;
	}

	public void setAmount(Float amount) {
		this.amount = amount;
	}

	public Unit getUnit() {
		return unit;
	}

	public void setUnit(Unit unit) {
		this.unit = unit;
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
}