package kz.sushimi.admin.models.dictionaries;

import kz.sushimi.admin.exceptions.PlatformException;
import kz.sushimi.admin.persistence.dictionaries.Category;
import kz.sushimi.admin.persistence.dictionaries.Product;
import kz.sushimi.admin.persistence.dictionaries.ProductType;

public class ProductModel {

	private Long id;
	
	private String name;
	
	private Integer cost;
	
	private String categoryName;
	
	private Long categoryId;
	
	private String description;
	
	private boolean published;
	
	private String code;
	
	private Category category;
	
	private ProductType type;
	
	private Integer itemCount;
	
	public static ProductModel buildProduct (Product product) throws PlatformException {
		if (product == null)
			throw new PlatformException ("Model of product is null");
		
			ProductModel model = new ProductModel();
			
			model.id = product.getId();
			model.name = product.getName();
			model.cost = product.getCost();
			model.categoryId = product.getCategory().getId();
			model.categoryName = product.getCategory().getName();
			model.description = product.getDescription();
			model.published = product.isPublished();
			model.code = product.getCode();
			model.type = product.getType();
			model.itemCount = product.getItemCount();
		
		
		return model;
	}
	
	public Long getId () {
		return id;
	}
	
	public String getDescription () {
		return description;
	}
	
	public String getCode () {
		return code;
	}
	
	public Integer getCost () {
		return cost;
	}
	
	public boolean isPublished () {
		return published;
	}
	
	public Category getCategory () {
		return category;
	}
	
	public String getName () {
		return name;
	}
	
	public Long getCategoryId() {
		return categoryId;
	}
	
	public ProductType getType() {
		return type;
	}
	
	public Integer getItemCount () {
		return itemCount;
	}
	
}
