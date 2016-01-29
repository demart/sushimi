package kz.sushimi.admin.services.dictionaries;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang.StringUtils;

import kz.sushimi.admin.exceptions.PlatformException;
import kz.sushimi.admin.models.dictionaries.CategoryModel;
import kz.sushimi.admin.persistence.dictionaries.Category;
import kz.sushimi.admin.persistence.dictionaries.Category;
import play.db.jpa.JPA;

public class CategoryService {
	
	public static List<Category> getCategories () {
		return JPA.em().createQuery("from Category where deleted = 'FALSE' order by id asc").getResultList();
	}
	
	public static ArrayList<CategoryModel> listOfCategories (List<Category> list) throws PlatformException {
		ArrayList<CategoryModel> models = new ArrayList<CategoryModel>();
		for (Category category : list) {
			CategoryModel model = CategoryModel.buildCategory(category);
			models.add(model);
		}
		
		return models;
	}
	
	public static ArrayList<CategoryModel> comboListOfCategories (List<Category> list) throws PlatformException {
		ArrayList<CategoryModel> models = new ArrayList<CategoryModel>();
		for (Category category : list) {
			CategoryModel model = CategoryModel.buildCategoryForCombo(category);
			models.add(model);
		}
		
		return models;
	}

	public static void updateCurrentCategory(CategoryModel[] models, String connected) throws PlatformException {
		if (models == null)
			throw new PlatformException ("Update information about current categories is empty. Count = " + models.length);
		
		Category cat1 = new Category();
		
		for (CategoryModel model: models) {
			if (model == null)
				throw new PlatformException  ("Update information about current category is empty");
			
				Category category = (Category) JPA.em().find(Category.class, model.getId());
				
				if (StringUtils.isNotEmpty(model.getName()))
					category.setName(model.getName());
				
				if (StringUtils.isNotEmpty(model.getCode()))
					category.setCode(model.getCode());
				
				System.out.println (model.getParentId());
				
				Long tmp = null;
				
				if (model.getParentId() == tmp || model.getParentId() == 0) {
					category.setCategory(category.getCategory());
				}

				else {
					cat1 = (Category) JPA.em().createQuery("from Category where id = :id").setParameter("id", model.getParentId()).getSingleResult();
					category.setCategory(cat1);
				}
				
				if (model.getIsPublished() == true || model.getIsPublished() == false)
					category.setPublished(model.getIsPublished());
				
				if (model.getIsTopMenu() == true || model.getIsTopMenu() == false)
					category.setTopMenuAvailable(model.getIsTopMenu());
				
				if (model.getType() != null)
					category.setType(model.getType());
				
				JPA.em().persist(category);
				
		}
		
	}

}
