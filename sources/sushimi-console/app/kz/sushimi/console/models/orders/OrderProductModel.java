package kz.sushimi.console.models.orders;

import kz.sushimi.console.persistence.dictionaries.ProductOwner;
import kz.sushimi.console.persistence.dictionaries.ProductType;

/**
 * Модель продукта в заказе
 * 
 * @author Demart
 *
 */
public class OrderProductModel {
	
	private Long id;
	
	private String code;
	
	private String name;
	
	private Integer amount;
	
	private Long categoryId;
	
	private String categoryName;
	
	private Integer cost;
	
	private Integer barCost;
	
	private ProductType type;
	
	private ProductOwner owner;

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

	public Integer getAmount() {
		return amount;
	}

	public void setAmount(Integer amount) {
		this.amount = amount;
	}

	public Long getCategoryId() {
		return categoryId;
	}

	public void setCategoryId(Long categoryId) {
		this.categoryId = categoryId;
	}

	public String getCategoryName() {
		return categoryName;
	}

	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
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
