package kz.sushimi.models.order;

import java.util.ArrayList;
import java.util.List;

import kz.sushimi.persistence.CartItem;
import kz.sushimi.persistence.dictionaries.Product;

public class CartProductItemModel {

	public String Category;
	public int	DiscountCount;
	public int DiscountId;
	public int DiscountPrice;
	public String DiscountPriceString;
	public String DiscountTime;
	public long Id;
	public String Name;
	public String Path;
	public float Price;
	public int PriceRound;
	public String PriceString;
	
	public List<PropertyModel> Properties = new ArrayList<PropertyModel>();
	
	public List<CartProductItemFileModel> Files = new ArrayList<CartProductItemFileModel>();
	
	public int Rating;
	public String RatingRound;
	public String RecomItems;
	public String Remark;
	public int Sort;
	public List<Integer> Timestamp;
	public long Uid;
	public String UnitName;
	public String Users;
	public int Version;
	public boolean Visible;
	public String Weight;
	public int category_id;
	public int FreeCount = 0;

	public CartProductItemModel(){}
	
	public CartProductItemModel(CartItem cartItem, int freeCount) {
		buildModel(cartItem, freeCount);
	}
	
	
	public void buildModel(CartItem cartItem, int freeCount) {
		Product product = cartItem.getProduct();
		category_id = 1;
		Id = product.getId();
		Name = cartItem.getProduct().getName();
		Path = "~/menu/item/" + product.getId() + "/";
		Price = product.getCost();
		PriceRound = product.getCost();
		PriceString = String.valueOf(product.getCost());
		// property = null
		RatingRound = "0.000";
		Remark = product.getDescription();
		Uid = product.getId();
		UnitName = "гр.";
		Version = 1;
		Visible = true;
		Weight = product.getWeight() + product.getCalories();
		FreeCount = freeCount; // Кол-во бесплатного товара
		buildCartProductImages(product);
	}
	
	
	public void buildCartProductImages(Product product) {
		CartProductItemFileModel image = new CartProductItemFileModel();
		image.Extension = ".jpg";
		image.Height = 346;
		image.Id = 343;
		image.King = 1;
		image.Link = "/public/images/menu/items/"+product.getImageLink();
		image.Name = product.getImageLink();
		image.Path = product.getImageLink();
		image.SubFolder = "imagesmenu";
		
		
		CartProductItemFileModel thumb = new CartProductItemFileModel();
		
		thumb.Extension = ".png";
		thumb.Height = 32;
		thumb.Id = 5680;
		thumb.King = 1;
		thumb.Link = "/public/images/menu/items/"+product.getIconImageLink();
		thumb.Name = product.getIconImageLink();
		thumb.Path = product.getIconImageLink();
		thumb.SubFolder = "imagesmenu";
		thumb.Visible = false;
		thumb.Width = 32;
		
		image.Thumbnails.add(thumb);
		
		image.Version = 0;
		image.Visible = false;
		image.Width = 435;
		
		Files.add(image);
		
	}
	
}

