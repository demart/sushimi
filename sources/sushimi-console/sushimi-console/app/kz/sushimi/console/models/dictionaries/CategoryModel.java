package kz.sushimi.console.models.dictionaries;

import java.util.Date;

import kz.sushimi.console.persistence.dictionaries.CategoryType;

/**
 * Модель данных для категориий
 * 
 * @author Demart
 *
 */
public class CategoryModel {
	
	/**
	 * Идентификатор записи
	 */
	private Long id;
	
	/**
	 * Код категории (Артикул)
	 */
	private String code;	
	
	/**
	 * Наименование категории
	 */
	private String name;
	
	/**
	 * Ссылка на родительскую категорию
	 */
	private Long parentCategoryId;
	
	/**
	 * Ссылка на родительскую категорию
	 */
	private String parentCategoryName;	
	
	/**
	 * Опубликована запись или нет
	 */
	private boolean isPublished;
	
	/**
	 * К какой кухне относиться
	 */
	private CategoryType type;

	public String user;
	public Date createdDate;
	public Date modifiedDate;
	
	
	public String getParentCategoryName() {
		return parentCategoryName;
	}

	public void setParentCategoryName(String parentCategoryName) {
		this.parentCategoryName = parentCategoryName;
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

	public Long getParentCategoryId() {
		return parentCategoryId;
	}

	public void setParentCategoryId(Long parentCategoryId) {
		this.parentCategoryId = parentCategoryId;
	}

	public boolean isPublished() {
		return isPublished;
	}

	public void setPublished(boolean isPublished) {
		this.isPublished = isPublished;
	}

	public CategoryType getType() {
		return type;
	}

	public void setType(CategoryType type) {
		this.type = type;
	}

}
