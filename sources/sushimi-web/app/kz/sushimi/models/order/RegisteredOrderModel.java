package kz.sushimi.models.order;

import play.Logger;
import kz.sushimi.persistence.CartItem;
import kz.sushimi.persistence.dictionaries.Product;
import kz.sushimi.persistence.dictionaries.ProductType;
import kz.sushimi.persistence.orders.Order;
import kz.sushimi.persistence.orders.OrderItem;
import kz.sushimi.service.ProductService;

public class RegisteredOrderModel {

	private Order order;
	
	public RegisteredOrderModel(Order order) {
		this.order = order;
		buildModel(order);
	}

	public static int freeSaucePerOrderSum = 2000; // Бесплатно соусы при этой сумме
	
	
	private void buildModel(Order order) {
		
		// Есть ли суши в заказе и на какую сумму
		int sum = 0;
		boolean isExistSushi = false;
		Product sauceSoyProduct = null;
		Product sauceVasabiProduct = null;
		Product sauceImbirProduct = null;
		for (OrderItem item : order.getOrderItems()) {
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
		order.setOrderSum(0);
		
		for (OrderItem orderItem : order.getOrderItems()) {
			if (isExistSushi) {
				if (sauceImbirProduct != null && sauceImbirProduct == orderItem.getProduct()) {
					Logger.info("Imbir");
					orderItem.setCount(orderItem.getCount() + freeSauceCount);					
				}
				if (sauceVasabiProduct != null && sauceVasabiProduct == orderItem.getProduct()) {
					Logger.info("Vasabi");
					orderItem.setCount(orderItem.getCount() + freeSauceCount);
				}
				if (sauceSoyProduct != null && sauceSoyProduct == orderItem.getProduct()) {
					Logger.info("Soy");
					orderItem.setCount(orderItem.getCount() + freeSauceCount);
				}
			} else {
				
			}
			
			order.setOrderSum(order.getOrderSum() + (int)orderItem.getSum());
		}
		
		Logger.info("Sum: " + order.getOrderSum());
		
		if (isExistSushi && freeSauceCount > 0) {
			addFreeSauce(sauceImbirProduct, ProductType.IMBIR, freeSauceCount);
			addFreeSauce(sauceVasabiProduct, ProductType.VASABI, freeSauceCount);
			addFreeSauce(sauceSoyProduct, ProductType.SOY, freeSauceCount);
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
			OrderItem orderItem = new OrderItem();
			orderItem.setPrice(sauce.getCost());
			orderItem.setCount(freeSauceCount);
			orderItem.setProduct(sauce);
			orderItem.setSum(0);
			order.getOrderItems().add(orderItem);
		}
	}
	
}
