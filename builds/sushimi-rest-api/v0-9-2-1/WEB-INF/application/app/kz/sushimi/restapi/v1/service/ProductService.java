package kz.sushimi.restapi.v1.service;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.Query;

import kz.sushimi.persistence.dictionaries.Product;
import kz.sushimi.persistence.dictionaries.ProductType;
import kz.sushimi.restapi.v1.exceptions.ErrorCode;
import kz.sushimi.restapi.v1.exceptions.SushimiException;
import kz.sushimi.restapi.v1.models.CategoryModel;
import kz.sushimi.restapi.v1.models.ProductModel;
import play.db.jpa.JPA;

public class ProductService {

	public static List<ProductModel> getProducts(Long categoryId) {
		List<ProductModel> models = new ArrayList<ProductModel>();
		
		EntityManager em = JPA.em();
		Query productsQuery = null;
		
		if (categoryId == null) {
			productsQuery = em.createQuery("from Product where isDeleted = false and isPublished = true and category = null order by orderNumber");
		} else {
			productsQuery = em.createQuery("from Product where isDeleted = false and isPublished = true and category.id = :categoryId order by orderNumber");
			productsQuery.setParameter("categoryId", categoryId);
		}
		
		List<Product> products = productsQuery.getResultList();
		if (products != null && products.size() > 0) {
			
			for (Product product : products) {
				ProductModel model = ProductModel.buildFromProduct(product);
				models.add(model);
			}
		}
		return models;
	}
	
	
	public static ProductModel getProduct(Long productId) throws SushimiException {
		Product product = (Product)JPA.em().find(Product.class, productId);

		if (product != null) {
			ProductModel model = ProductModel.buildFromProduct(product);
			return model;
		} else
			return null;
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
