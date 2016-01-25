package kz.sushimi.restapi.v1.service;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.Query;

import kz.sushimi.persistence.dictionaries.Category;
import kz.sushimi.restapi.v1.models.CategoryModel;
import play.Logger;
import play.db.jpa.JPA;

public class CategoryService {

	public static List<CategoryModel> getCategories(Long parentId) {
		List<CategoryModel> models = new ArrayList<CategoryModel>();
		
		EntityManager em = JPA.em();
		Query categoryQuery = null;
		
		if (parentId == null) {
			categoryQuery = em.createQuery("from Category where isDeleted = false and isPublished = true and category = null order by orderNumber");
		} else {
			categoryQuery = em.createQuery("from Category where isDeleted = false and isPublished = true and category.id = :parentId order by orderNumber");
			categoryQuery.setParameter("parentId", parentId);
		}
		
		List<Category> categories = categoryQuery.getResultList();
		if (categories != null && categories.size() > 0) {
			//Logger.info("Categories found");
			
			for (Category category : categories) {
				CategoryModel model = new CategoryModel();
				model.setId(category.getId());
				model.setName(category.getName());
				
				// TODO Add category image url
				model.setImageUrl(category.getImageLink());
				
				// TODO Add category last modified date
				model.setLastModifiedDate(Calendar.getInstance().getTimeInMillis());
				
				if (category.getCategories() != null && category.getCategories().size() > 0) {
					model.setHasChildren(true);
					model.setChildrenCount(category.getCategories().size());
				} else {
					model.setHasChildren(false);
					model.setChildrenCount(0);
				}
				
				models.add(model);
			}
		}
		return models;
	}
	
	
}
