package kz.sushimi.restapi.v1.models.cart;

import java.util.List;

public class ReplaceProductItemsModel {

	private List<ProductItemModel> items;

	public List<ProductItemModel> getItems() {
		return items;
	}

	public void setItems(List<ProductItemModel> items) {
		this.items = items;
	}
}
