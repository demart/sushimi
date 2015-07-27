package kz.sushimi.console.services.dictionaries;

import java.util.List;

import javax.persistence.Query;

import kz.sushimi.console.exceptions.ValidationException;
import kz.sushimi.console.models.dictionaries.ProductCostingModel;
import kz.sushimi.console.models.dictionaries.ProductModel;
import kz.sushimi.console.persistence.dictionaries.Category;
import kz.sushimi.console.persistence.dictionaries.Product;
import kz.sushimi.console.persistence.dictionaries.ProductCosting;
import kz.sushimi.console.persistence.dictionaries.ProductType;
import kz.sushimi.console.persistence.users.User;
import kz.sushimi.console.persistence.warehouses.WarehouseItem;
import kz.sushimi.console.services.UserService;

import org.apache.commons.lang.StringUtils;

import play.Logger;
import play.db.jpa.JPA;

/**
 * Класс сервис для работы со справочником продуктов
 * 
 * @author Demart
 *
 */
public class ProductService {

	/**
	 * Возвращает запись по указанному ID
	 * @param id идентификатор записи
	 * @return
	 */
	public static Product getProductById(Long id) {
		return Product.findById(id);
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
	
	/**
	 * Возвращает продукт по коду
	 * @param type
	 * @return
	 */
	public static Product getProductByCode(String code) {
		Query productsQuery = JPA.em().createQuery("from Product where code = :code");
		productsQuery.setParameter("code", code);
		List<Product> items = productsQuery.getResultList();
		
		if (items.size() > 0) 
			return items.get(0);
		return null;
	}
		
	
	/**
	 * Возвращает список продуктов
	 * 
	 * @return
	 */
	public static Long getProductsCount() {
		return Product.count();
	}
	
	/**
	 * Возвращает постранично список продуктов. Сотирует их по имени
	 */
	public static List<Product> getProducts(int start, int limit) {
		return JPA.em().createQuery("from Product order by name desc").setMaxResults(limit).setFirstResult(start).getResultList();
	}

	
	
	/**
	 * Добавляет продукт
	 * @param model - данные 
	 * @param userLogin - логин текущего пользователя
	 * @return
	 * @throws ValidationException
	 */
	public static void addProduct(ProductModel[] models, String userLogin) throws ValidationException {
		for (ProductModel model : models) {
			if (model == null)
				throw new ValidationException("Model is null");
			
			if (StringUtils.isEmpty(model.getCode()))
				throw new ValidationException("code is null or empty");
			if (StringUtils.isEmpty(model.getName()))
				throw new ValidationException("name is null or empty");

			
			if (model.getBarCost() == null || model.getBarCost() < 0)
				throw new ValidationException("barcost is null or less than zero");
			if (model.getCost() == null || model.getCost() < 0)
				throw new ValidationException("cost is null or less than zero");
			if (model.getCostPrice() == null || model.getCostPrice() < 0)
				throw new ValidationException("costPrice is null or empty");
			if (model.getItemCount() == null || model.getItemCount() < 0)
				throw new ValidationException("itemCount is null or less than zero");
			
			if (model.getCategoryId() == null || model.getCategoryId() <= 0)
				throw new ValidationException("category.id is null or empty");
			Category category = Category.findById(model.getCategoryId());
			if (category == null)
				throw new ValidationException("category not found");
			
			User user = UserService.getUserByLogin(userLogin);
			
			Product product = new Product();
			
			if (category != null)
				product.setCategory(category);
			
			product.setBarCost(model.getBarCost());
			product.setCode(model.getCode());
			product.setCost(model.getCost());
			product.setCostPrice(model.getCostPrice());
			product.setDeleted(false);
			product.setDescription(model.getDescription());
			product.setIconImageLink(model.getIconImageLink());
			product.setImageLink(model.getImageLink());
			product.setItemCount(model.getItemCount());
			product.setName(model.getName());
			product.setOrderNumber(0);
			product.setOwner(model.getOwner());
			product.setPublished(true);
			product.setSmallImageLink(model.getSmallImageLink());
			product.setType(model.getType());
			product.setUser(user);
			product.save();
		}
	}
	
	
	/**
	 * Изменяет продукт
	 * @param model - данные 
	 * @param userLogin - логин текущего пользователя
	 * @return
	 * @throws ValidationException
	 */
	public static void updateProduct(ProductModel[] models, String userLogin) throws ValidationException {
		for (ProductModel model : models) {
			if (model == null)
				throw new ValidationException("Model is null");
			
			Category category = null;
			if (model.getCategoryId() != null && model.getCategoryId() > 0) {
				category = Category.findById(model.getCategoryId());
				if (category == null)
					throw new ValidationException("category not found");
			}
			
			if (model.getId() == null || model.getId() <= 0)
				throw new ValidationException("model id null or empty");
			Product product = Product.findById(model.getId());
			if (product == null)
				throw new ValidationException("product not found");
			
			
			if (model.getBarCost() != null && model.getBarCost() > 0)
				product.setBarCost(model.getBarCost());
			
			product.setCategory(category);
			

			if (StringUtils.isNotEmpty(model.getName()))
				product.setName(model.getName());
			
			if (StringUtils.isNotEmpty(model.getCode()))
				product.setCode(model.getCode());
			
			if (StringUtils.isNotEmpty(model.getDescription()))
				product.setDescription(model.getDescription());
			
			if (model.getCost() != null && model.getCost() > 0)
				product.setCost(model.getCost());
			
			if (model.getCostPrice() != null && model.getCostPrice() > 0)
				product.setCostPrice(model.getCostPrice());
			
			if (model.getItemCount() != null && model.getItemCount() > 0)
				product.setItemCount(model.getItemCount());

			if (model.getOwner() != null)
				product.setOwner(model.getOwner());
			
			if (model.getType() != null)
				product.setType(model.getType());
			
			product.save();
			
			/*			
			product.setIconImageLink(model.getIconImageLink());
			product.setImageLink(model.getImageLink());
			
			product.setSmallImageLink(model.getSmallImageLink());
		 	*/
		}
	}
	
	
	/**
	 * Удалить запись продукта
	 * @param id
	 * @throws ValidationException 
	 */
	public static Long deleteProduct(Long id, String userLogin) throws ValidationException {
		if (id == null || id <= 0)
			throw new ValidationException("product is id null or empty");
		Product product = Product.findById(id);
		product = product.delete();
		return product.getId();
	}
	
	
	// ==================================================
	// ==================================================
	
	
	/**
	 * Возвращает список продуктов
	 * 
	 * @return
	 */
	public static Long getProductCostingsCount(Long productId) {
		return ProductCosting.count("product.id", productId);
	}
	
	/**
	 * Возвращает постранично список продуктов. Сотирует их по имени
	 */
	public static List<ProductCosting> getProductCostings(Long productId, int start, int limit) {
		Logger.info("Product.Id: " + productId);
		return JPA.em().createQuery("from ProductCosting where product.id = :productId")
					.setParameter("productId", productId)
					.setMaxResults(limit)
					.setFirstResult(start)
					.getResultList();
	}
	
	
	/**
	 * Добавляет калькуляцию продукта
	 * @param model - данные 
	 * @param userLogin - логин текущего пользователя
	 * @return
	 * @throws ValidationException
	 */
	public static void addProductCosting(Long productId, ProductCostingModel[] models, String userLogin) throws ValidationException {
		for (ProductCostingModel model : models) {
			if (model == null)
				throw new ValidationException("Model is null");
			
			if (model.getWarehouseItemId() == null || model.getWarehouseItemId() <= 0)
				throw new ValidationException("warehouseItemId");
			WarehouseItem warehouseItem = WarehouseItem.findById(model.getWarehouseItemId());
			if (warehouseItem == null)
				throw new ValidationException("warehouseItem not found");
				
			if (model.getAmount() == null || model.getAmount() <= 0)
				throw new ValidationException("amount is null or less than zero");
			
			User user = UserService.getUserByLogin(userLogin);
			
			if (productId == null)
				throw new ValidationException("productId null or empty");
			Product product = Product.findById(productId);
			if (product == null)
				throw new ValidationException("product not found");
			
			ProductCosting productCosting = new ProductCosting();
			
			productCosting.setProduct(product);
			productCosting.setAmount(model.getAmount());
			productCosting.setWarehouseItem(warehouseItem);
			productCosting.setIngredient(warehouseItem.getIngredient());
			productCosting.setUnit(warehouseItem.getIngredient().getUnit());
			
			productCosting.setUser(user);
			productCosting.save();
		}
	}
	
	/**
	 * Изменяет калькуляцию продукта
	 * @param model - данные 
	 * @param userLogin - логин текущего пользователя
	 * @return
	 * @throws ValidationException
	 */
	public static void updateProductCosting(ProductCostingModel[] models, String userLogin) throws ValidationException {
		for (ProductCostingModel model : models) {
			if (model == null)
				throw new ValidationException("Model is null");
			
			if (model.getId() == null || model.getId() <= 0)
				throw new ValidationException("model id null or empty");
			ProductCosting productCosting = ProductCosting.findById(model.getId());
			if (productCosting == null)
				throw new ValidationException("productCosting not found");
			
			if (model.getAmount() != null && model.getAmount() > 0)
				productCosting.setAmount(model.getAmount());
			
			if (model.getWarehouseItemId() != null && model.getWarehouseItemId() > 0) {
				WarehouseItem item = WarehouseItem.findById(model.getWarehouseItemId());
				if (item == null)
					throw new ValidationException("warehouseItem not found");
				
				if (item.getId() != productCosting.getWarehouseItem().getId()) {
					productCosting.setWarehouseItem(item);
					productCosting.setIngredient(item.getIngredient());
					productCosting.setUnit(item.getIngredient().getUnit());
				}
			}
			
			productCosting.save();
		}
	}
	
	
	/**
	 * Удалить запись калькуляции продукта
	 * @param id
	 * @throws ValidationException 
	 */
	public static Long deleteProductCosting(Long id, String userLogin) throws ValidationException {
		if (id == null || id <= 0)
			throw new ValidationException("product is id null or empty");
		ProductCosting productCosting = ProductCosting.findById(id);
		productCosting = productCosting.delete();
		return productCosting.getId();
	}
	
}