package kz.sushimi.service;

import java.util.Calendar;
import java.util.Dictionary;
import java.util.Hashtable;
import java.util.List;

import javax.persistence.Query;

import play.db.jpa.JPA;
import kz.sushimi.models.PageModel;
import kz.sushimi.persistence.Page;
import kz.sushimi.persistence.dictionaries.Category;
import kz.sushimi.persistence.dictionaries.Product;

public class PageService {

	public static long cacheTime = 14400000; // 240 min - 4 Hour
	public static Dictionary<String, Object> cache = new Hashtable<String, Object>();
	public static Dictionary<String, Long> cacheExpiraionTime = new Hashtable<String, Long>();
	
	public static void resetPageCache() {
		if (cache != null)
			cache =  new Hashtable<String, Object>();
		if (cacheExpiraionTime != null)
			cacheExpiraionTime =  new Hashtable<String, Long>();
	}
	
	public static PageModel getPage(String pageId) {
		Long cacheExpTime = cacheExpiraionTime.get(pageId);
		cacheExpTime = cacheExpTime == null ? 0 : cacheExpTime;
		if (Calendar.getInstance().getTimeInMillis() <=  cacheExpTime) {
			return (PageModel)cache.get(pageId);
		}
		
		Query pageQuery = JPA.em().createQuery("from Page where pageId = :pageId and isActive = true");
		pageQuery.setParameter("pageId", pageId);
		List<Page> pages = pageQuery.getResultList();
		Page pageEntity = null;
		if (pages.size() > 0)
			pageEntity = pages.get(0);
		
		if (pageEntity != null) {
			PageModel model = PageModel.buildFromPage(pageEntity);
		
			cache.put(pageId, model);
			cacheExpiraionTime.put(pageId, Calendar.getInstance().getTimeInMillis() + cacheTime);
			return model;
		} else {
			return null;
		}
		
	}
	
	
	public static List<Page> getPagesByCategory(Category category) {
		Long cacheExpTime = cacheExpiraionTime.get("CAT_" + category.getId() + "_PAGES");
		cacheExpTime = cacheExpTime == null ? 0 : cacheExpTime;
		if (Calendar.getInstance().getTimeInMillis() <=  cacheExpTime) {
			return (List<Page>)cache.get("CAT_" + category.getId() + "_PAGES");
		}
		
		Query productsByCategoryQuery = JPA.em().createQuery("from Page where category.id = :categoryId and isActive = true");
		productsByCategoryQuery.setParameter("categoryId", category.getId());
		List<Product> products = productsByCategoryQuery.getResultList();
		cache.put("CAT_" + category.getId() + "_PAGES", products);
		cacheExpiraionTime.put("CAT_" + category.getId() + "_PAGES", Calendar.getInstance().getTimeInMillis() + cacheTime);
		return (List<Page>)cache.get("CAT_" + category.getId() + "_PAGES");
	}
	
}
