package kz.sushimi.restapi.v1.models;

import java.util.Calendar;

import kz.sushimi.persistence.dictionaries.Product;
import kz.sushimi.persistence.dictionaries.ProductType;

public class ProductModel {

	private long id;
	
	private String code;
	
	private String name;

	private String description;
	
	private String imageLink;
	
	private String smallImageLink;
	
	private String iconImageLink;	
	
	private CategoryModel category;
	
	private int orderNumber;
	
	private int cost;

	private int itemCount;
	
	private float proteins;
	
	private float carbohydrates;
	
	private float fats;
	
	private String calories;
	
	private String weight;	

	private boolean isRecomended;	
	
	private boolean isNew;
	
	private boolean isHit;
	
	private boolean isHot;
	
	private boolean isVegetable;
	
	private boolean isPopular;	
	
	private int popularSex;	
	
	private int popularAge;	

	private ProductType type;

	public long getId() {
		return id;
	}

	public void setId(long id) {
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

	public CategoryModel getCategory() {
		return category;
	}

	public void setCategory(CategoryModel category) {
		this.category = category;
	}

	public int getOrderNumber() {
		return orderNumber;
	}

	public void setOrderNumber(int orderNumber) {
		this.orderNumber = orderNumber;
	}

	public int getCost() {
		return cost;
	}

	public void setCost(int cost) {
		this.cost = cost;
	}

	public int getItemCount() {
		return itemCount;
	}

	public void setItemCount(int itemCount) {
		this.itemCount = itemCount;
	}

	public float getProteins() {
		return proteins;
	}

	public void setProteins(float proteins) {
		this.proteins = proteins;
	}

	public float getCarbohydrates() {
		return carbohydrates;
	}

	public void setCarbohydrates(float carbohydrates) {
		this.carbohydrates = carbohydrates;
	}

	public float getFats() {
		return fats;
	}

	public void setFats(float fats) {
		this.fats = fats;
	}

	public String getCalories() {
		return calories;
	}

	public void setCalories(String calories) {
		this.calories = calories;
	}

	public String getWeight() {
		return weight;
	}

	public void setWeight(String weight) {
		this.weight = weight;
	}

	public boolean isRecomended() {
		return isRecomended;
	}

	public void setRecomended(boolean isRecomended) {
		this.isRecomended = isRecomended;
	}

	public boolean isNew() {
		return isNew;
	}

	public void setNew(boolean isNew) {
		this.isNew = isNew;
	}

	public boolean isHit() {
		return isHit;
	}

	public void setHit(boolean isHit) {
		this.isHit = isHit;
	}

	public boolean isHot() {
		return isHot;
	}

	public void setHot(boolean isHot) {
		this.isHot = isHot;
	}

	public boolean isVegetable() {
		return isVegetable;
	}

	public void setVegetable(boolean isVegetable) {
		this.isVegetable = isVegetable;
	}

	public boolean isPopular() {
		return isPopular;
	}

	public void setPopular(boolean isPopular) {
		this.isPopular = isPopular;
	}

	public int getPopularSex() {
		return popularSex;
	}

	public void setPopularSex(int popularSex) {
		this.popularSex = popularSex;
	}

	public int getPopularAge() {
		return popularAge;
	}

	public void setPopularAge(int popularAge) {
		this.popularAge = popularAge;
	}

	public ProductType getType() {
		return type;
	}

	public void setType(ProductType type) {
		this.type = type;
	}

	public static ProductModel buildFromProduct(Product product) {
		ProductModel pm = new ProductModel();
		
		pm.setId(product.getId());
		pm.setCalories(product.getCalories());
		pm.setCarbohydrates(product.getCarbohydrates());
		pm.setCode(product.getCode());
		pm.setCost(product.getCost());
		pm.setDescription(product.getDescription());
		pm.setFats(product.getFats());
		pm.setHit(product.isHit());
		pm.setHot(product.isHot());
		pm.setIconImageLink(product.getIconImageLink());
		pm.setImageLink(product.getImageLink());
		pm.setName(product.getName());
		pm.setNew(product.isNew());
		pm.setOrderNumber(product.getOrderNumber());
		pm.setPopular(product.isPopular());
		pm.setPopularAge(product.getPopularAge());
		pm.setPopularSex(product.getPopularSex());
		pm.setProteins(product.getProteins());
		pm.setRecomended(product.isRecomended());
		pm.setSmallImageLink(product.getSmallImageLink());
		pm.setType(product.getType());
		pm.setVegetable(product.isVegetable());
		pm.setWeight(product.getWeight());

		CategoryModel categoryModel = new CategoryModel();
		categoryModel.setId(product.getCategory().getId());
		categoryModel.setName(product.getCategory().getName());
		// TODO add image url link
		// categoryModel.setImageUrl(produc);
		// TODO add last modified date
		categoryModel.setLastModifiedDate(Calendar.getInstance().getTimeInMillis());
		pm.setCategory(categoryModel);
		
		return pm;
	}
	
	
}
