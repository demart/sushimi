package kz.sushimi.models.order;

import java.util.List;

public class AddProductsModel {

	private List<ProductItemModel> Items;
	public CartType Cart;
	

	public CartType getCart() {
		return Cart;
	}

	public void setCart(CartType cart) {
		Cart = cart;
	}

	public List<ProductItemModel> getItems() {
		return Items;
	}

	public void setItems(List<ProductItemModel> items) {
		Items = items;
	}
	
}
