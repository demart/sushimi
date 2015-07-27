package kz.sushimi.console.models.orders;

import kz.sushimi.console.persistence.dictionaries.ProductType;

/**
 * Просмотр позиций заказа
 * @author Demart
 *
 */
public class PreviewOrderItemModel {

	private Long id;
	
	private String name;
	
	private String category;
	
	private Integer count;
	
	private Integer sum;

	private ProductType type;
	
	private Integer cost;
	
	public Integer getCost() {
		return cost;
	}

	public void setCost(Integer cost) {
		this.cost = cost;
	}

	public ProductType getType() {
		return type;
	}

	public void setType(ProductType type) {
		this.type = type;
	}

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

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public Integer getCount() {
		return count;
	}

	public void setCount(Integer count) {
		this.count = count;
	}

	public Integer getSum() {
		return sum;
	}

	public void setSum(Integer sum) {
		this.sum = sum;
	}
	
}
