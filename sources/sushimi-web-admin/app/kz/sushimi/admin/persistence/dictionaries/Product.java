package kz.sushimi.admin.persistence.dictionaries;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

/**
 * Справочник товаров
 * 
 * @author Demart
 *
 */
@Entity
@Table(name = "products")
public class Product {
	
	@Id
	@GeneratedValue()
	@Column(name="id")
	private long id;
	
	@Column(name="code")
	private String code;
	
	@Column(name="name")
	private String name;

	@Column(name="description")
	private String description;
	
	@Column(name="image_link")
	private String imageLink;
	
	@Column(name="small_image_link")
	private String smallImageLink;
	
	@Column(name="icon_image_link")
	private String iconImageLink;	
	
	@ManyToOne
	private Category category;
/*
	@ManyToMany()
	private List<Ingredient> ingredients;
	*/
	@Column(name="order_number")
	private int orderNumber;
	
	@Column(name="cost")
	private int cost;

	@Column(name="item_count")
	private int itemCount;

	@Column(name="rating")
	private Float rating;		
	
	@Column(name="proteins")
	private float proteins;
	
	@Column(name="carbohydrates")
	private float carbohydrates;
	
	@Column(name="fats")
	private float fats;
	
	@Column(name="calories")
	private String calories;
	
	@Column(name="weight")
	private String weight;	

	
	// Products Criteria
	@Column(name="recomended")
	private boolean isRecomended;	
	
	@Column(name="is_new")
	private boolean isNew;
	
	@Column(name="is_hit")
	private boolean isHit;
	
	@Column(name="is_hot")
	private boolean isHot;
	
	@Column(name="is_vegatable")
	private boolean isVegetable;
	
	@Column(name="popular")
	private boolean isPopular;	
	
	@Column(name="popular_sex")
	private int popularSex;	
	
	@Column(name="popular_age")
	private int popularAge;	
	
	/**
	 * Нужно для предложения соусов и так далее 
	 * 
	 */
	@Enumerated(EnumType.STRING)
	@Column(name="type")
	private ProductType type;
	
	@Column(name="deleted")
	private boolean isDeleted;
	
	@Column(name="published")
	private boolean isPublished;
	
	public Float getRating() {
		return rating;
	}

	public void setRating(Float rating) {
		this.rating = rating;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public int getOrderNumber() {
		return orderNumber;
	}

	public void setOrderNumber(int orderNumber) {
		this.orderNumber = orderNumber;
	}

	public String getIconImageLink() {
		return iconImageLink;
	}

	public void setIconImageLink(String iconImageLink) {
		this.iconImageLink = iconImageLink;
	}

	public boolean isAvailable() {
		return isPublished && !isDeleted;
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

	public ProductType getType() {
		return type;
	}

	public void setType(ProductType type) {
		this.type = type;
	}

	public String getCalories() {
		return calories;
	}

	public void setCalories(String calories) {
		this.calories = calories;
	}
/*
	public List<Ingredient> getIngredients() {
		return ingredients;
	}

	public void setIngredients(List<Ingredient> ingredients) {
		this.ingredients = ingredients;
	}
*/
	public String getWeight() {
		return weight;
	}

	public void setWeight(String weight) {
		this.weight = weight;
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

	public long getId() {
		return id;
	}

	public void setId(long id) {
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

	public Category getCategory() {
		return category;
	}

	public void setCategory(Category category) {
		this.category = category;
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
