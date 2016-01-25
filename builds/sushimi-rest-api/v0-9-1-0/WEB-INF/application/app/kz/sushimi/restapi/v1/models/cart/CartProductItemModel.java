package kz.sushimi.restapi.v1.models.cart;

import java.util.ArrayList;
import java.util.List;

import kz.sushimi.persistence.CartItem;
import kz.sushimi.persistence.dictionaries.Product;

public class CartProductItemModel {

	public String category;
	public long id;
	public String code;
	public String name;
	public String path;
	public float price;
	public List<CartProductItemFileModel> files = new ArrayList<CartProductItemFileModel>();
	
	public String description;
	public int sort;
	public long uid;
	public String unitName;
	public String weight;
	public int freeCount = 0;

	public CartProductItemModel(){}
	
	public CartProductItemModel(CartItem cartItem, int freeCount) {
		buildModel(cartItem, freeCount);
	}
	
	
	public void buildModel(CartItem cartItem, int freeCount) {
		Product product = cartItem.getProduct();
		id = product.getId();
		code = product.getCode();
		name = cartItem.getProduct().getName();
		path = "~/menu/item/" + product.getId() + "/";
		price = product.getCost();
		description = product.getDescription();
		uid = product.getId();
		unitName = "гр.";
		weight = product.getWeight() + product.getCalories();
		this.freeCount = freeCount; // Кол-во бесплатного товара
		buildCartProductImages(product);
	}
	
	
	public void buildCartProductImages(Product product) {
		CartProductItemFileModel image = new CartProductItemFileModel();
		image.extension = ".jpg";
		image.height = 346;
		image.id = 343;
		image.link = "/public/images/menu/items/"+product.getImageLink();
		image.name = product.getImageLink();
		
		CartProductItemFileModel thumb = new CartProductItemFileModel();
		
		thumb.extension = ".png";
		thumb.height = 32;
		thumb.id = 5680;
		thumb.link = "/public/images/menu/items/"+product.getIconImageLink();
		thumb.name = product.getIconImageLink();
		thumb.width = 32;
		image.thumbnails.add(thumb);
		image.width = 435;
		
		files.add(image);
		
	}
	
}

