package kz.sushimi.console.persistence.dictionaries;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OrderBy;
import javax.persistence.Table;

import kz.sushimi.console.persistence.PersistentObject;

import play.db.jpa.Model;

/**
 * Справочник категорий товаров
 * 
 * @author Demart
 *
 */
@Entity
@Table(name = "dic_categories")
public class Category extends PersistentObject {
	
	/**
	 * Код категории (Артикул)
	 */
	@Column(name="code", length=50)
	private String code;	
	
	/**
	 * Наименование категории
	 */
	@Column(name="name", length=100)
	private String name;
	
	/**
	 * Ссылка на родительскую категорию
	 */
	@ManyToOne
	private Category category;
	
	@Column(name="deleted")
	private boolean isDeleted;
	
	@Column(name="published")
	private boolean isPublished;

	/**
	 * Сортировка
	 */
	@Column(name="order_number")
	private int orderNumber;
	
	/**
	 * Продукты в категории
	 */
	@OneToMany(mappedBy="category")
	@OrderBy(value="orderNumber asc")
	private List<Product> products;
	
	/**
	 * Список дочерних категорий
	 */
	@OneToMany(mappedBy="category")
	private List<Category> categories;
	
	/**
	 * К какой кухне относиться
	 */
	@Enumerated(EnumType.STRING)
	@Column(name="type", length=100)
	private CategoryType type = CategoryType.NONE;

	
	
	
	
	/**
	 * Доступна ли категория
	 * @return
	 */
	public boolean isAvailable() {
		return isPublished && !isDeleted;
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

	public Category getCategory() {
		return category;
	}

	public void setCategory(Category category) {
		this.category = category;
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

	public int getOrderNumber() {
		return orderNumber;
	}

	public void setOrderNumber(int orderNumber) {
		this.orderNumber = orderNumber;
	}

	public List<Product> getProducts() {
		return products;
	}

	public void setProducts(List<Product> products) {
		this.products = products;
	}

	public List<Category> getCategories() {
		return categories;
	}

	public void setCategories(List<Category> categories) {
		this.categories = categories;
	}

	public CategoryType getType() {
		return type;
	}

	public void setType(CategoryType type) {
		this.type = type;
	}	
	
}
