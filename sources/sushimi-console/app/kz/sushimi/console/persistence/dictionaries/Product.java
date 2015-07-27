package kz.sushimi.console.persistence.dictionaries;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import kz.sushimi.console.persistence.PersistentObject;

import play.db.jpa.Model;

/**
 * Справочник товаров
 * 
 * @author Demart
 *
 */
@Entity
@Table(name = "dic_products")
public class Product extends PersistentObject {
	
	/**
	 * Код продукта (Артикул)
	 */
	@Column(name="code", length=50)
	private String code;
	
	/**
	 * Наименование
	 */
	@Column(name="name", length=300)
	private String name;

	/**
	 * Описание
	 */
	@Column(name="description", length=500)
	private String description;
	
	@Column(name="image_link")
	private String imageLink;
	
	@Column(name="small_image_link")
	private String smallImageLink;
	
	@Column(name="icon_image_link")
	private String iconImageLink;	
	
	/**
	 * Категория продукта
	 */
	@ManyToOne
	private Category category;

	/**
	 * Калькуляция продукта
	 */
	@OneToMany(mappedBy="product")
	private List<ProductCosting> calculations;
	
	
	@Column(name="order_number")
	private Integer orderNumber;
	
	/**
	 * Цена продукта
	 */
	@Column(name="cost")
	private Integer cost;

	/**
	 * Цена для отпуска в бар
	 */
	@Column(name="bar_cost")
	private Integer barCost;
	
	/**
	 * Себестоимость
	 */
	@Column(name="cost_price")
	private Integer costPrice;
	
	/**
	 * Кол-во единиц в порции
	 */
	@Column(name="item_count")
	private Integer itemCount;
	
	/**
	 * Нужно для предложения соусов и так далее 
	 * 
	 */
	@Enumerated(EnumType.STRING)
	@Column(name="type")
	private ProductType type = ProductType.NONE;
	
	/**
	 * Чей продукт (наш или робина)
	 */
	@Enumerated(EnumType.STRING)
	@Column
	private ProductOwner owner = ProductOwner.SUSHIMI;
	
	
	@Column(name="deleted")
	private boolean isDeleted;
	
	@Column(name="published")
	private boolean isPublished;

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

	public Category getCategory() {
		return category;
	}

	public void setCategory(Category category) {
		this.category = category;
	}

	public List<ProductCosting> getCalculations() {
		return calculations;
	}

	public void setCalculations(List<ProductCosting> calculations) {
		this.calculations = calculations;
	}

	public Integer getOrderNumber() {
		return orderNumber;
	}

	public void setOrderNumber(Integer orderNumber) {
		this.orderNumber = orderNumber;
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

	public boolean isDeleted() {
		return isDeleted;
	}

	public void setDeleted(boolean isDeleted) {
		this.isDeleted = isDeleted;
	}

	public boolean isPublished() {
		return isPublished;
	}

	public void setPublished(boolean isPublished) {
		this.isPublished = isPublished;
	}	
	
}
