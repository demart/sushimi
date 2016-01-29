package kz.sushimi.admin.services.dictionaries;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang.StringUtils;

import kz.sushimi.admin.exceptions.PlatformException;
import kz.sushimi.admin.models.dictionaries.CategoryModel;
import kz.sushimi.admin.models.dictionaries.ProductModel;
import kz.sushimi.admin.persistence.dictionaries.Category;
import kz.sushimi.admin.persistence.dictionaries.Product;
import play.db.jpa.JPA;

public class ProductService {

	public static List<Product> getProducts () {
		return JPA.em().createQuery("from Product where deleted = 'FALSE' order by id asc").getResultList();
	}

	public static ArrayList<ProductModel> listOfProducts(List<Product> list) throws PlatformException {
		ArrayList<ProductModel> models = new ArrayList<ProductModel>();
		for (Product product : list) {
			ProductModel model = ProductModel.buildProduct(product);
			models.add(model);
		}
		return models;
	}
	
	public static void updateCurrentProduct(ProductModel[] models, String connected) throws PlatformException {
		if (models == null)
			throw new PlatformException ("Update information about current products is empty. Count = " + models.length);
		
		Category prod1 = new Category();
		
		for (ProductModel model: models) {
			if (model == null)
				throw new PlatformException  ("Update information about current product is empty");
			try {
				Product product = (Product) JPA.em().find(Product.class, model.getId());
				
				if (StringUtils.isNotEmpty(model.getName()))
					product.setName(model.getName());
				
				if (StringUtils.isNotEmpty(model.getCode()))
					product.setCode(model.getCode());
				
				if (model.getCost() != null)
					product.setCost(model.getCost());
				
				if (StringUtils.isNotEmpty(model.getDescription()))
					product.setDescription(model.getDescription());
				
				Long tmp = null;
				
				if (model.getCategoryId() == tmp || model.getCategoryId()  == 0) {
					product.setCategory(product.getCategory());
				}

				else {
					prod1 = (Category) JPA.em().createQuery("from Category where id = :id").setParameter("id", model.getCategoryId()).getSingleResult();
					product.setCategory(prod1);
				}
				
				if (model.isPublished() == true || model.isPublished() == false)
					product.setPublished(model.isPublished());
				
				
				if (model.getType() != null)
					product.setType(model.getType());
				
				JPA.em().persist(product);
			}
			catch (Exception e) {
				JPA.em().getTransaction().rollback();
				throw new PlatformException ("Error. Don't save category");
			}
		}
		
	}

	public static List<Product> searchProducts(String text) {
		return JPA.em().createQuery("from Product where lower(name) like lower(:text) order by id asc")
				.setParameter("text", "%" + text + "%")
				.getResultList();
	}
	
}
