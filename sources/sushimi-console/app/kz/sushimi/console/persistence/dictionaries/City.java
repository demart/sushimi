package kz.sushimi.console.persistence.dictionaries;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import kz.sushimi.console.persistence.PersistentObject;

import play.db.jpa.Model;

/**
 * Справочник городов
 * 
 * @author Demart
 *
 */
@Entity
@Table(name = "dic_cities")
public class City extends PersistentObject {
	
	/**
	 * Код города (для интеграции)
	 */
	private String code;
	
	/**
	 * Назание города
	 */
	@Column(length=100)
	private String name;
	
	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	
}