package kz.sushimi.restapi.v1.models.cart;

public class CartProductModel {

	private float cost;
	private int count;
	private CartProductItemModel item;
	
	private Integer categoryOrderNumber;
	private Integer productOrderNumber;
	
	public float getCost() {
		return cost;
	}
	public void setCost(float cost) {
		this.cost = cost;
	}
	public int getCount() {
		return this.count;
	}
	public void setCount(int count) {
		this.count = count;
	}
	public CartProductItemModel getItem() {
		return item;
	}
	public void setItem(CartProductItemModel item) {
		this.item = item;
	}
	
	public Integer getCategoryOrderNumber() {
		return categoryOrderNumber;
	}
	public void setCategoryOrderNumber(Integer categoryOrderNumber) {
		this.categoryOrderNumber = categoryOrderNumber;
	}
	public Integer getProductOrderNumber() {
		return productOrderNumber;
	}
	public void setProductOrderNumber(Integer productOrderNumber) {
		this.productOrderNumber = productOrderNumber;
	}
	
}
