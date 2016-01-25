package kz.sushimi.models.order;

import java.util.List;

public class ReplaceProductItemsModel {

	//{"Items":[{"Key":479,"Value":2},{"Key":386,"Value":2}],"CityId":"1"}
	
	private String CityId;
	
	private List<ProductItemModel> Items;

	public CartType Cart;
	
	
	public CartType getCart() {
		return Cart;
	}

	public void setCart(CartType cart) {
		Cart = cart;
	}

	public String getCityId() {
		return CityId;
	}

	public void setCityId(String cityId) {
		CityId = cityId;
	}

	public List<ProductItemModel> getItems() {
		return Items;
	}

	public void setItems(List<ProductItemModel> items) {
		Items = items;
	}
	
	
}
