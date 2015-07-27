package kz.sushimi.console.persistence.dictionaries;

import java.util.Calendar;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import kz.sushimi.console.persistence.PersistentObject;

import play.db.jpa.Model;

/**
 * Единицы измерения товаров
 * 
 * @author Demart
 *
 */
@Entity
@Table(name = "dic_units")
public class Unit extends PersistentObject {
	
	/**
	 *	Наименование единиц измерения (Килограмм) 
	 */
	@Column(length=50)
	private String name;
	
	/**
	 * Сокращение (кг.)
	 */
	@Column(length=10)
	private String shortName;

	
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getShortName() {
		return shortName;
	}

	public void setShortName(String shortName) {
		this.shortName = shortName;
	}
	
}
