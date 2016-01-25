package kz.sushimi.service;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import kz.sushimi.models.order.ProductItemModel;
import kz.sushimi.persistence.Cart;
import kz.sushimi.persistence.CartItem;
import kz.sushimi.persistence.dictionaries.City;
import kz.sushimi.persistence.dictionaries.Product;
import kz.sushimi.persistence.dictionaries.ProductType;
import play.Logger;
import play.db.jpa.JPA;
import play.mvc.Scope.Session;
import play.mvc.results.NotFound;

public class CartService {

	/**
	 * Сессия в течении которой будет жить временная корзина
	 */
	public static long SESSION_TIMEOUT = 18000000; // 5 hours
	
	/**
	 * Получить корзину пользователя
	 * @param createIfNoExist - Создает новую если еще не создана
	 * @return
	 */
	public static Cart getCurrentCart(boolean createIfNoExist) {
		String sessionId = Session.current().getId();
		
		Cart cart = JPA.em().find(Cart.class, sessionId);
		if (createIfNoExist)
			if (cart == null) {
				cart = new Cart();
				cart.setSession(sessionId);
				cart.setTimeout(Calendar.getInstance().getTimeInMillis()+SESSION_TIMEOUT);
				
				// Default City
				cart.setCity(DictionaryService.getDefaultCity());
				if (cart.getCity() == null)
					throw new NullPointerException("Default published city record not found");
				
				JPA.em().persist(cart);
				System.out.println("User's cart created: " + sessionId);
			} else {
				System.out.println("User's cart found: " + sessionId);
			}
		
		return cart;
	}
	
	
	public static Cart getCalculatedCurrentCart(String cartView, boolean createIfNoExist) {
		Cart cart = getCurrentCart(createIfNoExist);
		
		if (cart.getItems() == null || cart.getItems().size() == 0)
			return cart;

		if (!"EXTEND".equals(cartView))
			return cart;
		
		// Есть ли суши в заказе и на какую сумму
		int sum = 0;
		boolean isExistSushi = false;
		boolean isSauceSoyExist = false;
		boolean isSauceVasabiExist = false;
		boolean isSauceImbirExist = false;
		for (CartItem item : cart.getItems()) {
			if (item.getProduct() != null) {
				if (item.getProduct().getType() == ProductType.SUSHI) {
					isExistSushi = true;
					sum += item.getCount() * item.getProduct().getCost();
				}
			
				if (item.getProduct().getType() == ProductType.IMBIR)
					isSauceImbirExist = true;
				if (item.getProduct().getType() == ProductType.SOY)
					isSauceSoyExist = true;
				if (item.getProduct().getType() == ProductType.VASABI)
					isSauceVasabiExist = true;
			}
		}
		
		if (!isExistSushi)
			return cart;
		
		// Кол-во бесплатных соусов
		int freeSauceCount = sum / freeSaucePerOrderSum;
		if (freeSauceCount < 1) 
			return cart;
		
		Logger.info("Sum: " + sum);
		Logger.info("FreeSauceCount: " + freeSauceCount);
		
		addFreeSauce(cart, ProductType.SOY, freeSauceCount, isSauceSoyExist);
		addFreeSauce(cart, ProductType.VASABI, freeSauceCount, isSauceVasabiExist);
		addFreeSauce(cart, ProductType.IMBIR, freeSauceCount, isSauceImbirExist);
		
		return cart;
	}
	
	/**
	 * Добавляет бесплатный продукт
	 * @param cart - Корзина
	 * @param type - Тип добавляемого продукта
	 * @param freeSauceCount - кол-во бесплантных штук
	 * @param isExistInCart - существует ли товар в корзине
	 */
	private static void addFreeSauce(Cart cart, ProductType type, int freeSauceCount, boolean isExistInCart) {
		if (isExistInCart) {
			// Пробегаемся и добавляем бесплатные штуки
			for (CartItem cartItem : cart.getItems()) {
				if (cartItem.getProduct().getType() == type) {
					cartItem.setCount(cartItem.getCount() + freeSauceCount);
				}
			}
		} else {
			Product product = ProductService.getProductByType(type);
			if (product == null) { // Это плохо
				Logger.error("Type: " + type + " not found in products menu");
				return;
			}
			CartItem cartItem = new CartItem();
			cartItem.setCart(cart);
			cartItem.setCount(freeSauceCount);
			cartItem.setProduct(product);
			cart.getItems().add(cartItem);
		}
	}
	
	
	/**
	 * Добавлять выбранный товар в корзину
	 * @param productId - Идетификатор товара
	 * @param count - кол-во товара
	 * @return
	 */
	public static Cart AddProductsToCart(long productId, int count) {
		Cart cart = getCurrentCart(true);
		boolean wasUpdated = false;
		for (CartItem cartItem : cart.getItems()) {
			if (cartItem.getProduct() != null) {
				if (cartItem.getProduct().getId() == productId) {
					cartItem.setCount(cartItem.getCount()+1);
					JPA.em().persist(cartItem);
					wasUpdated = true;
					System.out.println("Update existing cartItem");
				}
			}
		}
		
		if (wasUpdated == false) {
			Product product = JPA.em().find(Product.class, productId);
			if (product == null) {
				throw new NotFound("DB does not contain record");
			}
			
			CartItem cartItem = new CartItem();
			cartItem.setCart(cart);
			cartItem.setProduct(product);
			cartItem.setCount(count);
			JPA.em().persist(cartItem);
			cart.getItems().add(cartItem);
			System.out.println("Add new cartItem");
		}
		return cart;
	}
	
	/**
	 * Удалить товар из корзины
	 * @param productId - Идентификатор товара
	 * @param CityId - Город заказа (ХЗ зачем)
	 * @return
	 */
	public static Cart removeProductFromCart(long productId, String CityId) {
		String sessionId = Session.current().getId();
		int affectedRows = JPA.em().createQuery("delete from CartItem where cart.session = :session and product.id = :id")
			.setParameter("session", sessionId)
			.setParameter("id", productId)
			.executeUpdate();
		if (affectedRows > 0) {
			System.out.println("removeProductFromCart.ProductId: " + productId + " succ removed");
		} else {
			System.out.println("removeProductFromCart.ProductId: " + productId + " not found");
		}
		Cart cart = getCurrentCart(false);
		return cart;
	}

	
	
	
	public static int freeSaucePerOrderSum = 2000; // Бесплатно соусы при этой сумме
	
	/**
	 * Изменить состав корзины
	 * @param cityId - город заказа
	 * @param items - позиции товаров в корзине
	 * @return
	 */
	public static Cart replaceProductInCart(String cityId, List<ProductItemModel> items) {
		Cart cart = getCurrentCart(false);
		
		City city = cart.getCity();
		if (city.getId() != Integer.valueOf(cityId)) {
			city = JPA.em().find(City.class, Integer.valueOf(cityId));
			cart.setCity(city);
			cart.setTimeout(SESSION_TIMEOUT);
			JPA.em().persist(cart);
		}
		
		boolean wasZeroCount = false;
		List<CartItem> deleteList = new ArrayList<CartItem>();
		List<ProductItemModel> productItemDeleteList = new ArrayList<ProductItemModel>();
		
		Product productImbir = ProductService.getProductByType(ProductType.IMBIR);
		Product productSoy = ProductService.getProductByType(ProductType.SOY);
		Product productVasabi = ProductService.getProductByType(ProductType.VASABI);
		
		// + Отметить все что не касается имбиря и васаби
		// + посчитать сумму и наличие суш
		// вычисляем сколько реально добавили имбиря и так далее
		// добавляем
		
		int sushiSum = 0; // Сумма по сушам которая остается
		int oldSuhsiSum = 0; // Сумма по сушам то изменения
		
		for (ProductItemModel productItemModel : items) {
			for (CartItem cartItem : cart.getItems()) {
				if (cartItem.getProduct().getId() == productImbir.getId()) 
					continue;
				if (cartItem.getProduct().getId() == productSoy.getId()) 
					continue;
				if (cartItem.getProduct().getId() == productVasabi.getId()) 
					continue;
				
				if (cartItem.getProduct().getId() == productItemModel.getKey()) {
					if (cartItem.getProduct().getType() == ProductType.SUSHI)
						oldSuhsiSum += cartItem.getCount() * cartItem.getProduct().getCost();
					
					cartItem.setCount(productItemModel.getValue());
					JPA.em().persist(cartItem);
					if (cartItem.getCount() < 1) {
						wasZeroCount=true;
						deleteList.add(cartItem);
					} else
						if (cartItem.getProduct().getType() == ProductType.SUSHI)
							sushiSum += cartItem.getCount() * cartItem.getProduct().getCost();

					productItemDeleteList.add(productItemModel);
				}
			}
		}
		
		if (wasZeroCount) {
			for (CartItem ci : deleteList)
				JPA.em().remove(ci);
			cart.getItems().removeAll(deleteList);
		}
		deleteList.clear();
		items.removeAll(productItemDeleteList);
		
		//Logger.info("Sum: " + sushiSum);
		
		// Если есть суши то можно пересчитать бесплатные соусы
		if (sushiSum > 0) {
			int freeSauceCount = sushiSum / freeSaucePerOrderSum;
			int oldFreeSauceCount = oldSuhsiSum / freeSaucePerOrderSum;
			
			for (ProductItemModel productItemModel : items) {
				//Logger.info("Items: " + productItemModel.getKey() + " " + productItemModel.getValue());
				correctSauceItems(cart, productImbir, productItemModel, freeSauceCount, oldFreeSauceCount, deleteList);
				correctSauceItems(cart, productVasabi, productItemModel, freeSauceCount, oldFreeSauceCount, deleteList);
				correctSauceItems(cart, productSoy, productItemModel, freeSauceCount, oldFreeSauceCount, deleteList);
			}
			
			//Logger.info("Del Items: " + deleteList.size());
			// Удаляем лишние соусы
			for (CartItem ci : deleteList)
				JPA.em().remove(ci);
			cart.getItems().removeAll(deleteList);
			
		}
		
		return cart;
	}

	private static void correctSauceItems(Cart cart, Product product, ProductItemModel productItemModel, int freeSauceCount, int oldFreeSauceCount, List<CartItem> deleteList) {
		if (productItemModel.getKey() == product.getId()) {
			// Если нашли соус имбирь
			CartItem cartItemObj = null;
			
			for (CartItem cartItem : cart.getItems())
				if (cartItem.getProduct().getId() == productItemModel.getKey())
					cartItemObj = cartItem;
			
			if (cartItemObj != null) { // Если есть в корзине соус дополнительный
				if (productItemModel.getValue() > oldFreeSauceCount) { // Если соусов указано больше чем нужно
					if (freeSauceCount >= oldFreeSauceCount) {
						cartItemObj.setCount(productItemModel.getValue() - oldFreeSauceCount);
						JPA.em().persist(cartItemObj);
					}
				} else {
					deleteList.add(cartItemObj);
				}
			} else {
				// 2 left 5 was						// 2					//5							// 5
				if (productItemModel.getValue() > freeSauceCount && productItemModel.getValue() > oldFreeSauceCount) { 
					CartItem cartItem = new CartItem();
					cartItem.setCart(cart);
					cartItem.setCount(productItemModel.getValue() - freeSauceCount);
					cartItem.setProduct(product);
					cart.getItems().add(cartItem);
					JPA.em().persist(cartItem);
				} else {

				}
			}
			
		}
	}
	
	
	/**
	 * Изменить корзину
	 * @param cart - корзина
	 * @param id - ???
	 * @param cityId - город заказа
	 * @return
	 */
	public static int changeCart(Cart cart, int id, String cityId) {
		City city = cart.getCity();
		if (city.getId() != Integer.valueOf(cityId)) {
			city = JPA.em().find(City.class, Integer.valueOf(cityId));
			cart.setCity(city);
			cart.setTimeout(SESSION_TIMEOUT);
			JPA.em().persist(cart);
		}
		return city.getMinOrderSum();
	}

	/**
	 * Очищает корзину (например после совершения заказа)
	 */
	public static void clearCart() {
		Cart cart = getCurrentCart(false);
		JPA.em().createQuery("delete from CartItem where cart.session = :session")
				.setParameter("session", cart.getSession())
				.executeUpdate();
		JPA.em().remove(cart);
	}
		
	
}
