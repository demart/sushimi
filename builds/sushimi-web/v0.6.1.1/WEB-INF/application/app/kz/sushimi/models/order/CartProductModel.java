package kz.sushimi.models.order;

public class CartProductModel {

	private float Cost;
	private int Count;
	private CartProductItemModel Item;
	public float getCost() {
		return Cost;
	}
	public void setCost(float cost) {
		Cost = cost;
	}
	public int getCount() {
		return Count;
	}
	public void setCount(int count) {
		Count = count;
	}
	public CartProductItemModel getItem() {
		return Item;
	}
	public void setItem(CartProductItemModel item) {
		Item = item;
	}
	
	
}
