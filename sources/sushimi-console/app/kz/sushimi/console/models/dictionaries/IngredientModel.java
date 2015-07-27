package kz.sushimi.console.models.dictionaries;

import java.util.Date;

/**
 * Модель ингредиентов
 * 
 * @author Demart
 *
 */
public class IngredientModel {

	/**
	 * Идентификатор записи
	 */
	private Long id;
	
	/**
	 * Наименование ингридиента
	 */
	private String name;
	
	/**
	 * Описание ингредиента
	 */
	private String description;
	
	/**
	 * Единица измерения ID
	 */
	private Long unitId;
	
	/**
	 * Единица измерения название
	 */
	private String unitName;
	
	/**
	 * Пользователь создавший запись
	 */
	private String user;
	
	/**
	 * Дата создания
	 */
	private Date createdDate;
	
	/**
	 * Дата изменения
	 */
	private Date modifiedDate;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

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
}
