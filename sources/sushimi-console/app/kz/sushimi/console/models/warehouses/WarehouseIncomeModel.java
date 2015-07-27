package kz.sushimi.console.models.warehouses;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

import kz.sushimi.console.persistence.warehouses.WarehouseIncomeType;

/**
 * Модель прихода товара
 * 
 * @author Demart
 *
 */
public class WarehouseIncomeModel {
	
	private Long id;
	
	/**
	 * Номер накладной (для связи всех вместе)
	 */
	private String invoiceNumber;
	
	/**
	 * Товар на складе
	 */
	private Long warehouseItemId;
	
	/**
	 * Товар на складе
	 */
	private String warehouseItemName;
	
	/**
	 * Тип операции прихода
	 */
	private WarehouseIncomeType type;
	
	/**
	 * Ингридиент поступающий на склад
	 */
	private Long ingredientId;

	/**
	 * Ингридиент поступающий на склад
	 */
	private String ingredientName;	
	
	/**
	 * Вес брутто (семга с головой и костями)
	 */
	private Float grossWeight;

	/**
	 * Единица измерения брутто
	 */
	private Long grossUnitId;

	/**
	 * Единица измерения брутто
	 */
	private String grossUnitName;
	
	/**
	 * Вес нетто (Семга без головы и костей)
	 */
	private Float netWeight;
	
	/**
	 * Единица измерения нетто
	 */	
	private Long netUnitId;

	/**
	 * Единица измерения нетто
	 */	
	private String netUnitName;	
	
	/**
	 * Стоимость товара
	 */
	private Integer	price;
	
	/**
	 * Пользователь купивший товар
	 */
	private Long purchaseUserId;
	
	private String purchaseUserName;
	
	/**
	 * Дата и время прихода
	 */
	private String incomeDate;
	
	public String user;
	public Date createdDate;
	public Date modifiedDate;
	
	
	public Calendar getIncomeCalendar() throws ParseException {
		SimpleDateFormat sdf = new SimpleDateFormat("dd.M.yyyy HH:mm:ss");
		Date date = sdf.parse(incomeDate);
		Calendar cal = Calendar.getInstance();
		cal.setTimeInMillis(date.getTime());
		return cal;
	}
	
	public Long getPurchaseUserId() {
		return purchaseUserId;
	}
	public String getWarehouseItemName() {
		return warehouseItemName;
	}
	public void setWarehouseItemName(String warehouseItemName) {
		this.warehouseItemName = warehouseItemName;
	}
	public String getIngredientName() {
		return ingredientName;
	}
	public void setIngredientName(String ingredientName) {
		this.ingredientName = ingredientName;
	}
	public String getGrossUnitName() {
		return grossUnitName;
	}
	public void setGrossUnitName(String grossUnitName) {
		this.grossUnitName = grossUnitName;
	}
	public String getNetUnitName() {
		return netUnitName;
	}
	public void setNetUnitName(String netUnitName) {
		this.netUnitName = netUnitName;
	}
	public String getPurchaseUserName() {
		return purchaseUserName;
	}
	public void setPurchaseUserName(String purchaseUserName) {
		this.purchaseUserName = purchaseUserName;
	}
	public void setPurchaseUserId(Long purchaseUserId) {
		this.purchaseUserId = purchaseUserId;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getInvoiceNumber() {
		return invoiceNumber;
	}
	public void setInvoiceNumber(String invoiceNumber) {
		this.invoiceNumber = invoiceNumber;
	}
	public Long getWarehouseItemId() {
		return warehouseItemId;
	}
	public void setWarehouseItemId(Long warehouseItemId) {
		this.warehouseItemId = warehouseItemId;
	}
	public WarehouseIncomeType getType() {
		return type;
	}
	public void setType(WarehouseIncomeType type) {
		this.type = type;
	}
	public Long getIngredientId() {
		return ingredientId;
	}
	public void setIngredientId(Long ingredientId) {
		this.ingredientId = ingredientId;
	}
	public Float getGrossWeight() {
		return grossWeight;
	}
	public void setGrossWeight(Float grossWeight) {
		this.grossWeight = grossWeight;
	}
	public Long getGrossUnitId() {
		return grossUnitId;
	}
	public void setGrossUnitId(Long grossUnitId) {
		this.grossUnitId = grossUnitId;
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
	public Long getNetUnitId() {
		return netUnitId;
	}
	public void setNetUnitId(Long netUnitId) {
		this.netUnitId = netUnitId;
	}

	public String getIncomeDate() {
		return incomeDate;
	}
	public void setIncomeDate(String incomeDate) {
		this.incomeDate = incomeDate;
	}
	public String getUser() {
		return user;
	}
	public void setUser(String user) {
		this.user = user;
	}
	public Date getCreatedDate() {
		return createdDate;
	}
	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}
	public Date getModifiedDate() {
		return modifiedDate;
	}
	public void setModifiedDate(Date modifiedDate) {
		this.modifiedDate = modifiedDate;
	}
		
}
