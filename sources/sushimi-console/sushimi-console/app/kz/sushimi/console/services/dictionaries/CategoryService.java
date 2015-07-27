package kz.sushimi.console.services.dictionaries;

import java.util.List;

import kz.sushimi.console.exceptions.ValidationException;
import kz.sushimi.console.models.dictionaries.CategoryModel;
import kz.sushimi.console.persistence.dictionaries.Category;
import kz.sushimi.console.persistence.users.User;
import kz.sushimi.console.services.UserService;

import org.apache.commons.lang.StringUtils;

import play.db.jpa.JPA;

/**
 * Сервис для работы с категориями товаров
 * 
 * @author Demart
 *
 */
public class CategoryService {

	/**
	 * Возвращает запись по указанному ID
	 * @param id идентификатор записи
	 * @return
	 */
	public static Category getCategoryById(Long id) {
		return Category.findById(id);
	}
	
	/**
	 * Возвращает список категорий
	 * 
	 * @return
	 */
	public static Long getCategoriesCount() {
		return Category.count();
	}
	
	/**
	 * Возвращает постранично список категорий. Сотирует их по имени
	 */
	public static List<Category> getCategories(int start, int limit) {
		return JPA.em().createQuery("from Category order by name desc").setMaxResults(limit).setFirstResult(start).getResultList();
	}
	
	/**
	 * Добавляет категорию
	 * @param model - данные 
	 * @param userLogin - логин текущего пользователя
	 * @return
	 * @throws ValidationException
	 */
	public static void addCategory(CategoryModel[] models, String userLogin) throws ValidationException {
		for (CategoryModel model : models) {
			if (model == null)
				throw new ValidationException("Model is null");
			
			if (StringUtils.isEmpty(model.getCode()))
				throw new ValidationException("code is null or empty");
			
			if (StringUtils.isEmpty(model.getName()))
				throw new ValidationException("name is null or empty");
			
			Category parentCategory = null;
			if (model.getParentCategoryId() != null && model.getParentCategoryId() > 0) {
				parentCategory = parentCategory.findById(model.getParentCategoryId());
				if (parentCategory == null)
					throw new ValidationException("parent category selected but not found");
			}
			
			User user = UserService.getUserByLogin(userLogin);
			
			Category category = new Category();
			category.setCode(model.getCode());
			category.setDeleted(false);
			category.setOrderNumber(0);
			category.setName(model.getName());
			category.setPublished(model.isPublished());
			category.setType(model.getType());
			category.setCategory(parentCategory);
			category.setUser(user);
			category.save();
			
		}
	}
	
	/**
	 * Добавляет категорию
	 * @param model - данные 
	 * @param userLogin - логин текущего пользователя
	 * @return
	 * @throws ValidationException
	 */
	public static void updateCategory(CategoryModel[] models, String userLogin) throws ValidationException {
		for (CategoryModel model : models) {
			if (model == null)
				throw new ValidationException("Model is null");
			
			if (model.getId() == null || model.getId() <= 0)
				throw new ValidationException("id is null or empty");
			Category category = Category.findById(model.getId());
			if (category == null)
				throw new ValidationException("category not found");
			
			Category parentCategory = null;
			if (model.getParentCategoryId() != null && model.getParentCategoryId() > 0) {
				parentCategory = parentCategory.findById(model.getParentCategoryId());
				if (parentCategory == null)
					throw new ValidationException("parent category selected but not found");
			}
			
			category.setCategory(parentCategory);
			
			if (StringUtils.isNotEmpty(model.getCode()))
				category.setCode(model.getCode());

			if (StringUtils.isNotEmpty(model.getName()))
				category.setName(model.getName());
			
			if (model.getType() != null)
				category.setType(model.getType());
			
			category.setDeleted(false);
			category.setOrderNumber(0);
			category.setPublished(model.isPublished());			
			
			category.save();
	
		}
		
	}
	
	
	/**
	 * Удалить запись категории
	 * @param id
	 * @throws ValidationException 
	 */
	public static Long deleteCategory(Long id, String userLogin) throws ValidationException {
		if (id == null || id <= 0)
			throw new ValidationException("category is id null or empty");
		Category сategory = Category.findById(id);
		сategory = сategory.delete();
		return сategory.getId();
	}		
	
}
