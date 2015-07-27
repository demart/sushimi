package controllers;

import java.util.ArrayList;
import java.util.List;

import kz.sushimi.console.exceptions.ValidationException;
import kz.sushimi.console.models.StoreWrapper;
import kz.sushimi.console.models.dictionaries.CategoryModel;
import kz.sushimi.console.persistence.dictionaries.CategoryType;
import kz.sushimi.console.services.dictionaries.CategoryService;
import play.Logger;

import com.google.gson.Gson;

/**
 * Контроллер для управления категориями
 * 
 * @author Demart
 *
 */
public class CategoryController extends SecuredController {
		
	public static void read(int page, int start, int limit) {
		String requestBody = params.current().get("body");
		Logger.info("Category.read: " + requestBody);

		List<kz.sushimi.console.persistence.dictionaries.Category> list = CategoryService.getCategories(start, limit);
		
		ArrayList<CategoryModel> models = new ArrayList<CategoryModel>(); 
		for (kz.sushimi.console.persistence.dictionaries.Category category : list) {
			CategoryModel model = new CategoryModel();
			
			model.setName(category.getName());
			model.setCode(category.getCode());
			model.setType(category.getType());
			
			if (category.getCategory() != null) {
				model.setParentCategoryId(category.getCategory().getId());
				model.setParentCategoryName(category.getCategory().getName());
			}
			
			model.setUser(category.getUser() == null ? "" : category.getUser().getName());
			if (category.getCreatedDate() != null)
				model.setCreatedDate(category.getCreatedDate().getTime());
			model.setId(category.getId());
			if (category.getModifiedDate() != null)
				model.setModifiedDate(category.getModifiedDate().getTime());
			
			models.add(model);
		}

		StoreWrapper wrapper = new StoreWrapper();
		wrapper.success = true;
		wrapper.totalCount = CategoryService.getCategoriesCount();
		wrapper.data = models.toArray();
		renderJSON(wrapper);
	}
	

	/**
	 * Добавить новую запись
	 * 
	 * @param model
	 * @throws ValidationException 
	 */
	public static void create() throws ValidationException {
		String requestBody = params.current().get("body");
		Logger.info("Create: " + requestBody);
		if (!requestBody.startsWith("["))
			requestBody = "[" + requestBody + "]";
			
		Gson gson = new Gson();
		CategoryModel[] models = gson.fromJson(requestBody, CategoryModel[].class);
		Logger.info("Model.lenght: " + models.length);
		CategoryService.addCategory(models, Security.connected());
		
		StoreWrapper wrapper = new StoreWrapper();
		wrapper.success = true;
		renderJSON(wrapper);
	}
	
	
	/**
	 * Обновить запись
	 * 
	 * @param model
	 * @throws ValidationException 
	 */
	public static void update() throws ValidationException {
		String requestBody = params.current().get("body");
		Logger.info("Update: " + requestBody);
		if (!requestBody.startsWith("["))
			requestBody = "[" + requestBody + "]";
		Gson gson = new Gson();
		Logger.info("Update: " + requestBody);
		CategoryModel[] models = gson.fromJson(requestBody, CategoryModel[].class);
		Logger.info("Model.lenght: " + models.length);
		CategoryService.updateCategory(models, Security.connected());
		
		StoreWrapper wrapper = new StoreWrapper();
		wrapper.success = true;
		renderJSON(wrapper);
	}	
	
	public static void destroy(long id) throws ValidationException {
		Logger.info("ID:" + id);
		CategoryService.deleteCategory(id, Security.connected());
		StoreWrapper wrapper = new StoreWrapper();
		wrapper.success = true;
		renderJSON(wrapper);
	}

}