package kz.sushimi.restapi.v1.models.cart;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

import kz.sushimi.persistence.Cart;
import kz.sushimi.persistence.CartItem;
import kz.sushimi.persistence.dictionaries.City;
import kz.sushimi.persistence.dictionaries.Product;
import kz.sushimi.persistence.dictionaries.ProductType;
import kz.sushimi.restapi.v1.service.DictionaryService;
import kz.sushimi.restapi.v1.service.ProductService;

public class CartModel {

	private String id;
	private Integer cityId;
	private int count;
	private boolean isEmpty;
	
	private List<CartProductModel> items = new ArrayList<CartProductModel>();
	
	private Integer minSum;
	private Integer sum;

	public CartModel() {}	
	
	public CartModel(Cart cart, String view) {
		buildCartModel2(cart, view);
	}
	
	public static int freeSaucePerOrderSum = 2000; // Бесплатно соусы при этой сумме
		
	public void buildCartModel2(Cart cart, String view){
		if (cart == null) {
			// Empty Cart
			isEmpty = true;
			count = 0;
			sum = 0;
			City city = DictionaryService.getDefaultCity();
			if (city != null)
				cityId = city.getId();
			minSum = DictionaryService.getDefaultMinSum();
			
		} else {
			id = cart.getSession();
			cityId = cart.getCity().getId();
			minSum = cart.getCity().getMinOrderSum();
			count = cart.getItems().size();
			sum = 0;
			
			// Есть ли суши в заказе и на какую сумму
			int sumInternal = 0;
			boolean isExistSushi = false;
			Product sauceSoyProduct = null;
			Product sauceVasabiProduct = null;
			Product sauceImbirProduct = null;
			for (CartItem item : cart.getItems()) {
				if (item.getProduct() != null) {
					if (item.getProduct().getType() == ProductType.SUSHI) {
						isExistSushi = true;
						sumInternal += item.getCount() * item.getProduct().getCost();
					}
					
					if (item.getProduct().getType() == ProductType.IMBIR)
						sauceImbirProduct = item.getProduct(); 
					if (item.getProduct().getType() == ProductType.SOY)
						sauceSoyProduct = item.getProduct();
					if (item.getProduct().getType() == ProductType.VASABI)
						sauceVasabiProduct = item.getProduct();
				}
			}
			
			// Кол-во бесплатных соусов
			int freeSauceCount = sumInternal / freeSaucePerOrderSum;		
			
			for (CartItem cartItem : cart.getItems()) {
				CartProductModel cartModel = new CartProductModel();
				cartModel.setCost(cartItem.getProduct().getCost() * cartItem.getCount());
				cartModel.setCount(cartItem.getCount());
				
				CartProductItemModel cartProductItem = new CartProductItemModel(cartItem, 0);
				cartModel.setItem(cartProductItem);
				
				if (isExistSushi && "EXTEND".equals(view)) {
					if (sauceImbirProduct != null && sauceImbirProduct == cartItem.getProduct()) {
						cartProductItem = new CartProductItemModel(cartItem, freeSauceCount);
						cartModel.setItem(cartProductItem);
						cartModel.setCount(cartModel.getCount() + freeSauceCount);					
					}
					if (sauceVasabiProduct != null && sauceVasabiProduct == cartItem.getProduct()) {
						cartProductItem = new CartProductItemModel(cartItem, freeSauceCount);
						cartModel.setItem(cartProductItem);
						cartModel.setCount(cartModel.getCount() + freeSauceCount);
					}
					if (sauceSoyProduct != null && sauceSoyProduct == cartItem.getProduct()) {
						cartProductItem = new CartProductItemModel(cartItem, freeSauceCount);
						cartModel.setItem(cartProductItem);
						cartModel.setCount(cartModel.getCount() + freeSauceCount);
					}
				} else {
					
				}
				
				cartModel.setCategoryOrderNumber(cartItem.getProduct().getCategory().getOrderNumber());
				cartModel.setProductOrderNumber(cartItem.getProduct().getOrderNumber());
				
				items.add(cartModel);
				sum += (int)cartModel.getCost();
			}
			
			if (isExistSushi && "EXTEND".equals(view) && freeSauceCount > 0) {
				addFreeSauce(sauceImbirProduct, ProductType.IMBIR, freeSauceCount);
				addFreeSauce(sauceVasabiProduct, ProductType.VASABI, freeSauceCount);
				addFreeSauce(sauceSoyProduct, ProductType.SOY, freeSauceCount);
			}
			
		}	
		if (items != null) {
			Collections.sort(items, new Comparator<CartProductModel>() {

				@Override
				public int compare(CartProductModel o1, CartProductModel o2) {
					int c;
				    c = o1.getCategoryOrderNumber().compareTo(o2.getCategoryOrderNumber());
				    if (c == 0)
				       c = o1.getProductOrderNumber().compareTo(o2.getProductOrderNumber());
				    return c;
				}

				});
		}
	}
	
	
	/**
	 * Добавляет бесплатный продукт
	 * @param cart - Корзина
	 * @param type - Тип добавляемого продукта
	 * @param freeSauceCount - кол-во бесплантных штук
	 * @param isExistInCart - существует ли товар в корзине
	 */
	private void addFreeSauce(Product sauce, ProductType type, int freeSauceCount) {
		if (sauce == null) {
			sauce = ProductService.getProductByType(type);
			CartProductModel cartModel = new CartProductModel();
			cartModel.setCost(0);
			cartModel.setCount(freeSauceCount);
			
			CartItem cartItem = new CartItem();
			cartItem.setCount(freeSauceCount);
			cartItem.setProduct(sauce);
			
			CartProductItemModel cartProductItem = new CartProductItemModel(cartItem, freeSauceCount);
			cartModel.setItem(cartProductItem);
			
			cartModel.setCategoryOrderNumber(sauce.getCategory().getOrderNumber());
			cartModel.setProductOrderNumber(sauce.getOrderNumber());
			
			items.add(cartModel);
		}
	}
	
	
	// ==================================================
	// ==================================================
	
	public void buildCartModel(Cart cart){
		if (cart == null) {
			// Empty Cart
			isEmpty = true;
			count = 0;
			sum = 0;
			City city = DictionaryService.getDefaultCity();
			if (city != null)
				cityId = city.getId();
			minSum = DictionaryService.getDefaultMinSum();
			
		} else {
			cityId = cart.getCity().getId();
			minSum = cart.getCity().getMinOrderSum();
			count = cart.getItems().size();
			sum = 0;
			
			for (CartItem cartItem : cart.getItems()) {
				CartProductModel cartModel = new CartProductModel();
				cartModel.setCost(cartItem.getProduct().getCost() * cartItem.getCount());
				cartModel.setCount(cartItem.getCount());
				
				sum += (int)cartModel.getCost();
				
				CartProductItemModel cartProductItem = new CartProductItemModel(cartItem, 0);
				cartModel.setItem(cartProductItem);
				
				items.add(cartModel);
			}
		}
	}
	
	/// =============================
	
	
	public Integer getCityId() {
		return cityId;
	}
	public void setCityId(Integer cityId) {
		this.cityId = cityId;
	}
	public int getCount() {
		return count;
	}
	public void setCount(int count) {
		this.count = count;
	}
	
	public boolean isIsEmpty() {
		return isEmpty;
	}
	public void setIsEmpty(boolean isEmpty) {
		this.isEmpty = isEmpty;
	}
	public List<CartProductModel> getItems() {
		return items;
	}
	public void setItems(List<CartProductModel> items) {
		this.items = items;
	}
	public Integer getMinSum() {
		return minSum;
	}
	public void setMinSum(Integer minSum) {
		this.minSum = minSum;
	}
	public Integer getSum() {
		return sum;
	}
	public void setSum(Integer sum) {
		this.sum = sum;
	}
	public String getId() {
		return id;
	}
	public void setCartId(String id) {
		this.id = id;
	}
}
