package kz.sushimi.console.models.orders;

import java.util.Calendar;
import java.util.Date;

import kz.sushimi.console.persistence.promotions.PromotionType;
import kz.sushimi.console.persistence.promotions.PromotionValueType;
import kz.sushimi.console.persistence.dictionaries.Product;

/**
 * Модель акций
 * 
 * @author Demart
 *
 */
public class PromotionModel {

	private Long id;

	/**
	 * Название акции
	 */
	private String name;
	
	/**
	 * Название продукта в подарок
	 */
	private Product product;
	
	private String productIdName;
	
	/**
	 * Тип акции
	 */
	private PromotionType type;
	
	/**
	 * Вид вознаграждения (Скидка, Продукция)
	 */
	private PromotionValueType valueType;
	
	
	/**
	 * С какого времени действует
	 */
	private Date fromTime;
	
	/**
	 * По какое время действует
	 */
	private Date toTime;
	
	/**
	 * Начинается с суммы заказа
	 */
	private Integer orderSum;
	
	
	/**
	 * Процент скидки
	 */
	private Float discount;
	
	
	/**
	 * Продукт в подарок
	 */
	private Long productId;
	
	/**
	 * Кол-во продукта в подарок
	 */
	private Integer productCount;
	
	
	private Boolean isPublished;
	
	public Boolean getIsPublished() {
		return isPublished;
	}
	public void setIsPublished(Boolean isPublished) {
		this.isPublished = isPublished;
	}
	
	public Product getProduct() {
		return product;
	}

	public void setProduct(Product product) {
		this.product = product;
	}
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getProductIdName() {
		return productIdName;
	}

	public void setProductIdName(String productIdName) {
		this.productIdName = productIdName;
	}
	
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

	public Date getFromTime() {
		return fromTime;
	}

	public void setFromTime(Date fromTime) {
		this.fromTime = fromTime;
	}

	public Date getToTime() {
		return toTime;
	}

	public void setToTime(Date toTime) {
		this.toTime = toTime;
	}

	public Integer getOrderSum() {
		return orderSum;
	}

	public void setOrderSum(Integer orderSum) {
		this.orderSum = orderSum;
	}

	public Float getDiscount() {
		return discount;
	}

	public void setDiscount(Float discount) {
		this.discount = discount;
	}

	public Long getProductId() {
		return productId;
	}

	public void setProductId(Long productId) {
		this.productId = productId;
	}

	public Integer getProductCount() {
		return productCount;
	}

	public void setProductCount(Integer productCount) {
		this.productCount = productCount;
	}


	

	
}
