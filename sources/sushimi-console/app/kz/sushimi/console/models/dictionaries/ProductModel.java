package kz.sushimi.console.models.dictionaries;

import java.util.Date;

import kz.sushimi.console.persistence.dictionaries.ProductOwner;
import kz.sushimi.console.persistence.dictionaries.ProductType;

/**
 * Модель продукта
 * 
 * @author Demart
 *
 */
public class ProductModel {

	/**
	 * Идентификатор записи
	 */
	private Long id;
	
	/**
	 * Код продукта (Артикул)
	 */
	private String code;
	
	/**
	 * Наименование
	 */
	private String name;

	/**
	 * Описание
	 */
	private String description;
	
	private String imageLink;
	
	private String smallImageLink;
	
	private String iconImageLink;	
	
	/**
	 * Категория продукта
	 */
	private Long categoryId;
	
	/**
	 * Категория продукта
	 */
	private String categoryName;
	
	/**
	 * Цена продукта
	 */	
	private Integer cost;

	/**
	 * Цена для отпуска в бар
	 */
	private Integer barCost;
	
	/**
	 * Себестоимость
	 */
	private Integer costPrice;
	
	/**
	 * Кол-во единиц в порции
	 */
	private Integer itemCount;
	
	/**
	 * Нужно для предложения соусов и так далее 
	 * 
	 */
	private ProductType type;
	
	/**
	 * Чей продукт (наш или робина)
	 */
	private ProductOwner owner;


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

	public String getCategoryName() {
		return categoryName;
	}

	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
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

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getImageLink() {
		return imageLink;
	}

	public void setImageLink(String imageLink) {
		this.imageLink = imageLink;
	}

	public String getSmallImageLink() {
		return smallImageLink;
	}

	public void setSmallImageLink(String smallImageLink) {
		this.smallImageLink = smallImageLink;
	}

	public String getIconImageLink() {
		return iconImageLink;
	}

	public void setIconImageLink(String iconImageLink) {
		this.iconImageLink = iconImageLink;
	}

	public Long getCategoryId() {
		return categoryId;
	}

	public void setCategoryId(Long categoryId) {
		this.categoryId = categoryId;
	}

	public Integer getCost() {
		return cost;
	}

	public void setCost(Integer cost) {
		this.cost = cost;
	}

	public Integer getBarCost() {
		return barCost;
	}

	public void setBarCost(Integer barCost) {
		this.barCost = barCost;
	}

	public Integer getCostPrice() {
		return costPrice;
	}

	public void setCostPrice(Integer costPrice) {
		this.costPrice = costPrice;
	}

	public Integer getItemCount() {
		return itemCount;
	}

	public void setItemCount(Integer itemCount) {
		this.itemCount = itemCount;
	}

	public ProductType getType() {
		return type;
	}

	public void setType(ProductType type) {
		this.type = type;
	}

	public ProductOwner getOwner() {
		return owner;
	}

	public void setOwner(ProductOwner owner) {
		this.owner = owner;
	}
}
