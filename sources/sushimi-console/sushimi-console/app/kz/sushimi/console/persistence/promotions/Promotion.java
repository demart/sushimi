package kz.sushimi.console.persistence.promotions;

import java.util.Calendar;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import kz.sushimi.console.persistence.PersistentObject;
import kz.sushimi.console.persistence.dictionaries.Product;
import kz.sushimi.console.persistence.users.User;
import play.db.jpa.Model;

/**
 * Акции на продвижение товара
 * 
 * @author Demart
 *
 */

@Entity
@Table(name = "promotions")
public class Promotion extends PersistentObject {

	/**
	 * Название акции
	 */
	@Column
	private String name;
	
	/**
	 * Тип акции
	 */
	@Enumerated(EnumType.STRING)
	@Column
	private PromotionType type = PromotionType.NONE;
	
	/**
	 * Вид вознаграждения (Скидка, Продукция)
	 */
	@Enumerated(EnumType.STRING)
	@Column
	private PromotionValueType valueType = PromotionValueType.NONE;
	
	
	/**
	 * С какого времени действует
	 */
	@Column
	private Calendar fromTime;
	
	/**
	 * По какое время действует
	 */
	@Column
	private Calendar toTime;
	
	/**
	 * Начинается с суммы заказа
	 */
	@Column
	private int orderSum;
	
	
	/**
	 * Процент скидки
	 */
	@Column
	private Float discount;
	
	
	/**
	 * Продукт в подарок
	 */
	@ManyToOne
	private Product product;
	
	/**
	 * Кол-во продукта в подарок
	 */
	@Column
	private Integer productCount;	
	
	@Column(name="deleted")
	private boolean isDeleted;
	
	@Column(name="published")
	private boolean isPublished;

	
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public PromotionType getType() {
		return type;
	}

	public void setType(PromotionType type) {
		this.type = type;
	}

	public PromotionValueType getValueType() {
		return valueType;
	}

	public void setValueType(PromotionValueType valueType) {
		this.valueType = valueType;
	}

	public Calendar getFromTime() {
		return fromTime;
	}

	public void setFromTime(Calendar fromTime) {
		this.fromTime = fromTime;
	}

	public Calendar getToTime() {
		return toTime;
	}

	public void setToTime(Calendar toTime) {
		this.toTime = toTime;
	}

	public int getOrderSum() {
		return orderSum;
	}

	public void setOrderSum(int orderSum) {
		this.orderSum = orderSum;
	}

	public Float getDiscount() {
		return discount;
	}

	public void setDiscount(Float discount) {
		this.discount = discount;
	}

	public Product getProduct() {
		return product;
	}

	public void setProduct(Product product) {
		this.product = product;
	}

	public Integer getProductCount() {
		return productCount;
	}

	public void setProductCount(Integer productCount) {
		this.productCount = productCount;
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
