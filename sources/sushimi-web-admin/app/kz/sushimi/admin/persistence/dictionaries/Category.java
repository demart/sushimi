package kz.sushimi.admin.persistence.dictionaries;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OrderBy;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.hibernate.annotations.Where;


/**
 * Справочник категорий товаров
 * 
 * @author Demart
 *
 */
@Entity
@Table(name = "categories")
public class Category {
	
	@Id
	@GeneratedValue()
	@Column(name="id")
	private long id;
	
	@Column(name="code")
	private String code;	
	
	@Column(name="name")
	private String name;
	
	@Column(name="unique_name")
	private String uniqueName;
	
	@Column(name="image_link")
	private String imageLink;
	
	@Column(name="top_menu_image_link")
	private String topMenuImageLink;
	
	@Column(name="top_menu_available")
	private Boolean topMenuAvailable;
	
	@ManyToOne
	private Category category;
	
	@ManyToOne
	private Category mobileCategory;
	
	@Column(name="deleted")
	private boolean isDeleted;
	
	@Column(name="published")
	private boolean isPublished;

	@Column(name="order_number")
	private Integer orderNumber;

	@Column(name="mobile_order_number")
	private Integer mobileOrderNumber;	
	
	/*
	@OneToMany(mappedBy="category")
	@OrderBy(value="orderNumber asc")
	private List<Product> products;
	*/
	@OneToMany(mappedBy="category")
	private List<Category> categories;
	
	@OneToMany(mappedBy="mobileCategory")
	private List<Category> mobileCategories;

	/**
	 * Ссылка на мета информацию о странице
	 */
	/*
	@OneToMany(mappedBy="category")
	@Where(clause="is_active = 'true'")
	private List<Page> pages;
	*/
	/**
	 * К какой кухне относиться
	 */
	@Enumerated(EnumType.STRING)
	@Column(name="type")
	private CategoryType type;
	
	/**
	 * Для отображения на клиенте
	 */
	@Transient
	private boolean isSelected;
	
	public Boolean isTopMenuAvailable() {
		return topMenuAvailable;
	}

	public void setTopMenuAvailable(Boolean topMenuAvailable) {
		this.topMenuAvailable = topMenuAvailable;
	}

	public String getTopMenuImageLink() {
		return topMenuImageLink;
	}

	public void setTopMenuImageLink(String topMenuImageLink) {
		this.topMenuImageLink = topMenuImageLink;
	}
	
	public String getImageLink() {
		return imageLink;
	}

	public void setImageLink(String imageLink) {
		this.imageLink = imageLink;
	}
/*
	public List<Page> getPages() {
		return pages;
	}

	public void setPages(List<Page> pages) {
		this.pages = pages;
	}
*/
	public void setOrderNumber(Integer orderNumber) {
		this.orderNumber = orderNumber;
	}

	public void setMobileOrderNumber(Integer mobileOrderNumber) {
		this.mobileOrderNumber = mobileOrderNumber;
	}

	public int getMobileOrderNumber() {
		return mobileOrderNumber;
	}

	public void setMobileOrderNumber(int mobileOrderNumber) {
		this.mobileOrderNumber = mobileOrderNumber;
	}

	public Category getMobileCategory() {
		return mobileCategory;
	}

	public void setMobileCategory(Category mobileCategory) {
		this.mobileCategory = mobileCategory;
	}

	public List<Category> getMobileCategories() {
		return mobileCategories;
	}

	public void setMobileCategories(List<Category> mobileCategories) {
		this.mobileCategories = mobileCategories;
	}

	public boolean isSelected() {
		return isSelected;
	}

	public void setSelected(boolean isSelected) {
		this.isSelected = isSelected;
	}

	public CategoryType getType() {
		return type;
	}

	public void setType(CategoryType type) {
		this.type = type;
	}

	public boolean isAvailable() {
		return isPublished && !isDeleted;
	}	
	
	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public List<Category> getCategories() {
		return categories;
	}

	public void setCategories(List<Category> categories) {
		this.categories = categories;
	}

	public String getUniqueName() {
		return uniqueName;
	}

	public void setUniqueName(String uniqueName) {
		this.uniqueName = uniqueName;
	}
/*
	public List<Product> getProducts() {
		return products;
	}

	public void setProducts(List<Product> products) {
		this.products = products;
	}
*/
	public int getOrderNumber() {
		return orderNumber;
	}

	public void setOrderNumber(int orderNumber) {
		this.orderNumber = orderNumber;
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
	
}
