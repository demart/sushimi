package kz.sushimi.models.order;

import java.util.ArrayList;
import java.util.List;

import play.Logger;

import kz.sushimi.persistence.Cart;
import kz.sushimi.persistence.CartItem;
import kz.sushimi.persistence.dictionaries.City;
import kz.sushimi.persistence.dictionaries.Product;
import kz.sushimi.persistence.dictionaries.ProductType;
import kz.sushimi.service.DictionaryService;
import kz.sushimi.service.ProductService;

public class CartModel {

	private Integer CityId;
	private int Count;
	private List<Integer> DisabledItems = new ArrayList<Integer>();
	private boolean IsEmpty;
	
	private List<CartProductModel> Items = new ArrayList<CartProductModel>();
	
	private Integer MinSum;
	private Integer OrderId;
	private Integer Sum;
	private List<String> Toppings = new ArrayList<String>();
	private Integer Version;
	
	public CartModel() {}	
	
	public CartModel(Cart cart, String view) {
		buildCartModel2(cart, view);
	}
	
	public static int MIN_ORDER_SUM = 3000; 
	
	public static int freeSaucePerOrderSum = 2000; // Бесплатно соусы при этой сумме
		
	public void buildCartModel2(Cart cart, String view){		
		Version = 1;
		if (cart == null) {
			// Empty Cart
			IsEmpty = true;
			Count = 0;
			Sum = 0;
			OrderId = 0;
			City city = DictionaryService.getDefaultCity();
			if (city != null)
				CityId = city.getId();
			MinSum = DictionaryService.getDefaultMinSum();
			
		} else {
			CityId = cart.getCity().getId();
			MinSum = cart.getCity().getMinOrderSum();
			Count = cart.getItems().size();
			Sum = 0;
			
			// Есть ли суши в заказе и на какую сумму
			int sum = 0;
			boolean isExistSushi = false;
			Product sauceSoyProduct = null;
			Product sauceVasabiProduct = null;
			Product sauceImbirProduct = null;
			for (CartItem item : cart.getItems()) {
				if (item.getProduct() != null) {
					if (item.getProduct().getType() == ProductType.SUSHI) {
						isExistSushi = true;
						sum += item.getCount() * item.getProduct().getCost();
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
			int freeSauceCount = sum / freeSaucePerOrderSum;		
			
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
				
				Items.add(cartModel);
				Sum += (int)cartModel.getCost();
			}
			
			if (isExistSushi && "EXTEND".equals(view) && freeSauceCount > 0) {
				addFreeSauce(sauceImbirProduct, ProductType.IMBIR, freeSauceCount);
				addFreeSauce(sauceVasabiProduct, ProductType.VASABI, freeSauceCount);
				addFreeSauce(sauceSoyProduct, ProductType.SOY, freeSauceCount);
			}
			
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
			Items.add(cartModel);
		}
	}
	
	
	// ==================================================
	// ==================================================
	
	public void buildCartModel(Cart cart){		
		Version = 1;
		if (cart == null) {
			// Empty Cart
			IsEmpty = true;
			Count = 0;
			Sum = 0;
			OrderId = 0;
			City city = DictionaryService.getDefaultCity();
			if (city != null)
				CityId = city.getId();
			MinSum = DictionaryService.getDefaultMinSum();
			
		} else {
			CityId = cart.getCity().getId();
			MinSum = cart.getCity().getMinOrderSum();
			Count = cart.getItems().size();
			Sum = 0;
			
			for (CartItem cartItem : cart.getItems()) {
				CartProductModel cartModel = new CartProductModel();
				cartModel.setCost(cartItem.getProduct().getCost() * cartItem.getCount());
				cartModel.setCount(cartItem.getCount());
				
				Sum += (int)cartModel.getCost();
				
				CartProductItemModel cartProductItem = new CartProductItemModel(cartItem, 0);
				cartModel.setItem(cartProductItem);
				
				Items.add(cartModel);
			}
		}
	}
	
	/// =============================
	
	
	public Integer getCityId() {
		return CityId;
	}
	public void setCityId(Integer cityId) {
		CityId = cityId;
	}
	public int getCount() {
		return Count;
	}
	public void setCount(int count) {
		Count = count;
	}
	public List<Integer> getDisabledItems() {
		return DisabledItems;
	}
	public void setDisabledItems(List<Integer> disabledItems) {
		DisabledItems = disabledItems;
	}
	public boolean isIsEmpty() {
		return IsEmpty;
	}
	public void setIsEmpty(boolean isEmpty) {
		IsEmpty = isEmpty;
	}
	public List<CartProductModel> getItems() {
		return Items;
	}
	public void setItems(List<CartProductModel> items) {
		Items = items;
	}
	public Integer getMinSum() {
		return MinSum;
	}
	public void setMinSum(Integer minSum) {
		MinSum = minSum;
	}
	public Integer getOrderId() {
		return OrderId;
	}
	public void setOrderId(Integer orderId) {
		OrderId = orderId;
	}
	public Integer getSum() {
		return Sum;
	}
	public void setSum(Integer sum) {
		Sum = sum;
	}
	public List<String> getToppings() {
		return Toppings;
	}
	public void setToppings(List<String> toppings) {
		Toppings = toppings;
	}
	public Integer getVersion() {
		return Version;
	}
	public void setVersion(Integer version) {
		Version = version;
	}
	
}
