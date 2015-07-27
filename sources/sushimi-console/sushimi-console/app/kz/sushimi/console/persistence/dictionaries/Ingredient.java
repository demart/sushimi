package kz.sushimi.console.persistence.dictionaries;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import kz.sushimi.console.persistence.PersistentObject;

import play.db.jpa.Model;

/**
 * Справочник ингридиентов
 * 
 * @author Demart
 *
 */
@Entity
@Table(name = "dic_ingredients")
public class Ingredient extends PersistentObject {

	/**
	 * Наименование ингридиента
	 */
	@Column(length=150)
	private String name;
	
	/**
	 * Описание ингредиента
	 */
	@Column(length=500)
	private String description;
	
	/**
	 * Единица измерения
	 */
	@ManyToOne
	private Unit unit;

	
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Unit getUnit() {
		return unit;
	}

	public void setUnit(Unit unit) {
		this.unit = unit;
	}

}
