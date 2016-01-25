package kz.sushimi.service;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import javax.persistence.Query;

import kz.sushimi.persistence.dictionaries.Category;
import kz.sushimi.persistence.dictionaries.CategoryType;
import kz.sushimi.persistence.dictionaries.Product;
import kz.sushimi.persistence.dictionaries.ProductType;
import play.Logger;
import play.db.jpa.JPA;

public class ProductService {

	public static long cacheTime = 0; // 10 min
	public static List<Category> cachedCategories;
	public static long categoriesExpiredAfter;
	
	
	public static List<Product> cachedProducts;
	public static long productsExpiredAfter;
	
	
	/**
	 * Возвращает список товаров для главной страницы
	 * 
	 * @return
	 */
	public static List<Product> getProductsForMainPage() {
		if (Calendar.getInstance().getTimeInMillis() <= productsExpiredAfter) {
			return cachedProducts;
		} else {
			Query productsQuery = JPA.em().createQuery("from Product where (isPopular = true or isRecomended = true) and isDeleted = false and isPublished = true");
			List<Product> products = productsQuery.getResultList();
			
			List<Product> outProducts = new ArrayList<Product>();
			for (Product product : products) {
				Category parentCategory = product.getCategory();
				if (parentCategory != null && !parentCategory.isDeleted() && parentCategory.isPublished()) {
					Category rootCategory = parentCategory.getCategory();
					if (rootCategory != null) {
						if (!rootCategory.isDeleted() && rootCategory.isPublished()) {
							outProducts.add(product);
						}
					} else {
						outProducts.add(product);
					}
				}
			}
			
			cachedProducts = outProducts;
			productsExpiredAfter = Calendar.getInstance().getTimeInMillis() + cacheTime;
			Logger.debug("getProductsForMainPage.Products.size = " + cachedProducts.size());
		}

		return cachedProducts;
	}
	
	/**
	 * Возвращает список главных категорий товаров
	 * 
	 * @return
	 */
	public static List<Category> getProductCategories(CategoryType type) {
		Logger.debug("ProductService.getProductCategories");
		
		if (Calendar.getInstance().getTimeInMillis() <= categoriesExpiredAfter) {
			return cachedCategories;
		} else {
			Query productsQuery = JPA.em().createQuery("from Category where category = null and isDeleted = false and isPublished = true and (type = :type or type = :both) order by orderNumber");
			productsQuery.setParameter("type", type);
			productsQuery.setParameter("both", CategoryType.BOTH);
			List<Category> mainCategories = productsQuery.getResultList();
			
			cachedCategories = mainCategories;
			categoriesExpiredAfter = Calendar.getInstance().getTimeInMillis() + cacheTime;
			Logger.debug("ProductService.getProductCategories.MainCategories.size: " + cachedCategories.size());
		}
		
		return cachedCategories;
	}
	
	/**
	 * Возвращает товар по указанному идентификатору
	 * 
	 * @param productId
	 * @return
	 */
	public static Product getProduct(Long productId) {
		return JPA.em().find(Product.class, productId);
	}
	
	
	/**
	 * Возвращает продукт по типу
	 * @param type
	 * @return
	 */
	public static Product getProductByType(ProductType type) {
		Query productsQuery = JPA.em().createQuery("from Product where type = :type");
		productsQuery.setParameter("type", type);
		List<Product> items = productsQuery.getResultList();
		
		if (items.size() > 0) 
			return items.get(0);
		return null;
	}
	
	
}
