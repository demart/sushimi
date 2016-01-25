package kz.sushimi.service;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Dictionary;
import java.util.Hashtable;
import java.util.List;

import javax.persistence.Query;

import kz.sushimi.persistence.dictionaries.Category;
import kz.sushimi.persistence.dictionaries.CategoryType;
import kz.sushimi.persistence.dictionaries.Product;
import kz.sushimi.persistence.dictionaries.ProductType;
import play.Logger;
import play.db.jpa.JPA;

public class ProductService {

	public static long cacheTime = 7200000; // 120 min
	
	public static Dictionary<String, Object> cache = new Hashtable<String, Object>();
	public static Dictionary<String, Long> cacheExpiraionTime = new Hashtable<String, Long>();
	
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
		}

		return cachedProducts;
	}
	
	public static List<Category> getRootCategories() {
		Long cacheExpTime = cacheExpiraionTime.get("ROOT_CATEGORIES");
		cacheExpTime = cacheExpTime == null ? 0 : cacheExpTime;
		if (Calendar.getInstance().getTimeInMillis() <=  cacheExpTime) {
			return (List<Category>)cache.get("ROOT_CATEGORIES");
		}
		
		Query rootCategoriesQuery = JPA.em().createQuery("from Category where category = null and isDeleted = false and isPublished = true order by orderNumber");
		List<Category> rootCategories = rootCategoriesQuery.getResultList();
		cache.put("ROOT_CATEGORIES", rootCategories);
		cacheExpiraionTime.put("ROOT_CATEGORIES", Calendar.getInstance().getTimeInMillis() + cacheTime);
		return (List<Category>)cache.get("ROOT_CATEGORIES");
	}
	
	public static List<Category> getChildCategories(Category parent) {
		Long cacheExpTime = cacheExpiraionTime.get("CAT_" + parent.getId() + "_CHILREND");
		cacheExpTime = cacheExpTime == null ? 0 : cacheExpTime;
		if (Calendar.getInstance().getTimeInMillis() <=  cacheExpTime) {
			return (List<Category>)cache.get("CAT_" + parent.getId() + "_CHILREND");
		}
		
		Query childCategoriesQuery = JPA.em().createQuery("from Category where category.id = :parentId and isDeleted = false and isPublished = true order by orderNumber ASC");
		childCategoriesQuery.setParameter("parentId", parent.getId());
		List<Category> categories = childCategoriesQuery.getResultList();
		cache.put("CAT_" + parent.getId() + "_CHILREND", categories);
		cacheExpiraionTime.put("CAT_" + parent.getId() + "_CHILREND", Calendar.getInstance().getTimeInMillis() + cacheTime);
		return (List<Category>)cache.get("CAT_" + parent.getId() + "_CHILREND");
	}
	
	public static List<Product> getProductByCategory(Category category) {
		Long cacheExpTime = cacheExpiraionTime.get("CAT_" + category.getId() + "_PRODUCTS");
		cacheExpTime = cacheExpTime == null ? 0 : cacheExpTime;
		if (Calendar.getInstance().getTimeInMillis() <=  cacheExpTime) {
			return (List<Product>)cache.get("CAT_" + category.getId() + "_PRODUCTS");
		}
		
		Query productsByCategoryQuery = JPA.em().createQuery("from Product where category.id = :categoryId and isDeleted = false and isPublished = true order by orderNumber ASC");
		productsByCategoryQuery.setParameter("categoryId", category.getId());
		List<Product> products = productsByCategoryQuery.getResultList();
		cache.put("CAT_" + category.getId() + "_PRODUCTS", products);
		cacheExpiraionTime.put("CAT_" + category.getId() + "_PRODUCTS", Calendar.getInstance().getTimeInMillis() + cacheTime);
		return (List<Product>)cache.get("CAT_" + category.getId() + "_PRODUCTS");
	}
	

	public static List<Category> getCategories(String category, String subcategory) {
		List<Category> result = ProductService.getRootCategories();
		if (category == null || "".equals(category) ) {
			// Перешли на пустую категорию
			// 1. Выделить первую категорию
			// 2. Выделить первую подкатегорию
			for (Category cat : result)
				cat.setSelected(false);
			
			if (result.size() > 0) {
				result.get(0).setSelected(true);
				
				List<Category> subCategories = getChildCategories(result.get(0));
				
				if (subCategories != null && subCategories.size() >0) {
					for (Category category2 : subCategories)
						category2.setSelected(false);
					subCategories.get(0).setSelected(true);
				}
			}
		} else {
			if (subcategory == null || "".equals(subcategory)) {
				// перешли просто в категорию
				// 1. Выделить категорию
				// 2. Выделить первую подкатегорию
				if (result.size() > 0) {
					for (Category cat : result) {
						cat.setSelected(false);
						
						if (cat.getUniqueName().equals(category)) {
							cat.setSelected(true);
							
							List<Category> subCategories = getChildCategories(cat);
							if (subCategories != null && subCategories.size() >0) {
								for (Category category2 : subCategories)
									category2.setSelected(false);
								subCategories.get(0).setSelected(true);
							}
						}
					}
				}
			} else {
				// перешли просто в подкатегорию категории
				// 1. Выделить категорию
				// 2. Выделить подкатегорию
				// 3. На вебе промотать (если получиться)
				if (result.size() > 0) {
					for (Category cat : result) {
						cat.setSelected(false);
						if (cat.getUniqueName().equals(category)) {
							cat.setSelected(true);
							List<Category> subCategories = getChildCategories(cat);
							for (Category subCat : subCategories) {
								subCat.setSelected(false);
								if (subCat.getUniqueName().equals(subcategory)) {
									subCat.setSelected(true);
								}
							}
							
						}
					}
				}
			}
		}
		return result;
	}
	
	/**
	 * Возвращает список главных категорий товаров
	 * 
	 * @return
	 */
	public static List<Category> getProductCategories(CategoryType type) {
		Query productsQuery = JPA.em().createQuery("from Category where category = null and isDeleted = false and isPublished = true and (type = :type or type = :both) order by orderNumber");
		productsQuery.setParameter("type", type);
		productsQuery.setParameter("both", CategoryType.BOTH);
		List<Category> mainCategories = productsQuery.getResultList();
		return mainCategories;
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
