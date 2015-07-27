package kz.sushimi.console.persistence.warehouses;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import kz.sushimi.console.persistence.PersistentObject;
import kz.sushimi.console.persistence.dictionaries.Ingredient;
import play.db.jpa.Model;

/**
 * Складскые учеты
 * 
 * @author Demart
 *
 */
@Entity
@Table(name = "warehouse_items")
public class WarehouseItem extends PersistentObject {
	
	/**
	 * Ингридиент
	 */
	@ManyToOne
	private Ingredient ingredient;

	/**
	 * Кол-во
	 */
	@Column(name="amount_")
	private Float amount;

	/**
	 * Расходные операции
	 */
	@OneToMany(mappedBy="warehouseItem")
	private List<WarehouseIncome> incomes;	
	
	/**
	 * Расходные операции
	 */
	@OneToMany(mappedBy="warehouseItem")
	private List<WarehouseOutcome> outcomes;

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

	public List<WarehouseIncome> getIncomes() {
		return incomes;
	}

	public void setIncomes(List<WarehouseIncome> incomes) {
		this.incomes = incomes;
	}

	public List<WarehouseOutcome> getOutcomes() {
		return outcomes;
	}

	public void setOutcomes(List<WarehouseOutcome> outcomes) {
		this.outcomes = outcomes;
	}
}
