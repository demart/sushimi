package kz.sushimi.console.persistence.warehouses;

import java.util.Calendar;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import kz.sushimi.console.persistence.PersistentObject;
import kz.sushimi.console.persistence.dictionaries.Ingredient;
import kz.sushimi.console.persistence.dictionaries.Unit;
import kz.sushimi.console.persistence.users.User;
import play.db.jpa.Model;

/**
 * Операция прихода на склад
 * 
 * @author Demart
 *
 */
@Entity
@Table(name = "warehouse_incomes")
public class WarehouseIncome extends PersistentObject {
	
	/**
	 * Номер накладной (для связи всех вместе)
	 */
	@Column(length=100)
	private String invoiceNumber;
	
	/**
	 * Товар на складе
	 */
	@ManyToOne
	private WarehouseItem warehouseItem;
	
	/**
	 * Тип операции прихода
	 */
	@Enumerated(EnumType.STRING)
	@Column
	private WarehouseIncomeType type = WarehouseIncomeType.NONE;
	
	/**
	 * Ингридиент поступающий на склад
	 */
	@ManyToOne
	private Ingredient ingredient;
	
	/**
	 * Вес брутто (семга с головой и костями)
	 */
	@Column
	private Float grossWeight;

	/**
	 * Единица измерения брутто
	 */
	@ManyToOne
	private Unit grossUnit;

	/**
	 * Вес нетто (Семга без головы и костей)
	 */
	@Column
	private Float netWeight;
	
	/**
	 * Стоимость товара
	 */
	@Column
	private Integer	price;
	
	/**
	 * Единица измерения нетто
	 */
	@ManyToOne	
	private Unit netUnit;
	
	/**
	 * Пользователь купивший товар
	 */
	@ManyToOne
	private User purchaseUser;	
	
	/**
	 * Дата и время прихода
	 */
	@Column
	private Calendar incomeDate;

	public String getInvoiceNumber() {
		return invoiceNumber;
	}

	public void setInvoiceNumber(String invoiceNumber) {
		this.invoiceNumber = invoiceNumber;
	}

	public WarehouseItem getWarehouseItem() {
		return warehouseItem;
	}

	public void setWarehouseItem(WarehouseItem warehouseItem) {
		this.warehouseItem = warehouseItem;
	}

	public WarehouseIncomeType getType() {
		return type;
	}

	public void setType(WarehouseIncomeType type) {
		this.type = type;
	}

	public Ingredient getIngredient() {
		return ingredient;
	}

	public void setIngredient(Ingredient ingredient) {
		this.ingredient = ingredient;
	}

	public Float getGrossWeight() {
		return grossWeight;
	}

	public void setGrossWeight(Float grossWeight) {
		this.grossWeight = grossWeight;
	}

	public Unit getGrossUnit() {
		return grossUnit;
	}

	public void setGrossUnit(Unit grossUnit) {
		this.grossUnit = grossUnit;
	}

	public Float getNetWeight() {
		return netWeight;
	}

	public void setNetWeight(Float netWeight) {
		this.netWeight = netWeight;
	}

	public Integer getPrice() {
		return price;
	}

	public void setPrice(Integer price) {
		this.price = price;
	}

	public Unit getNetUnit() {
		return netUnit;
	}

	public void setNetUnit(Unit netUnit) {
		this.netUnit = netUnit;
	}

	public User getPurchaseUser() {
		return purchaseUser;
	}

	public void setPurchaseUser(User purchaseUser) {
		this.purchaseUser = purchaseUser;
	}

	public Calendar getIncomeDate() {
		return incomeDate;
	}

	public void setIncomeDate(Calendar incomeDate) {
		this.incomeDate = incomeDate;
	}
}