package kz.sushimi.admin.models.dictionaries;

import kz.sushimi.admin.exceptions.PlatformException;
import kz.sushimi.admin.persistence.dictionaries.Category;
import kz.sushimi.admin.persistence.dictionaries.CategoryType;

public class CategoryModel {

	private Long id;
	
	private String name;
	
	private boolean published;
	
	private boolean deleted;
	
	private CategoryType type;
	
	private boolean topMenu;
	
	private String code;
	
	private Long parentId;
	
	private String parentName;
	
	private boolean parent;
	
	private Category category;
	
	public static CategoryModel buildCategory (Category category) throws PlatformException{
		if (category == null)
			throw new PlatformException ("Model of category is null");
		
		CategoryModel model = new CategoryModel();
		model.id = category.getId();
		model.name = category.getName();
		model.published = category.isPublished();
		model.deleted = category.isDeleted();
		model.type = category.getType();
		model.topMenu = category.isTopMenuAvailable();
		model.code = category.getCode();
		
		if (category.getCategories() != null)
			model.parent = true;
		else
			model.parent = false;
		
		if (category.getCategory() != null) {
			model.parentId = category.getCategory().getId();
			model.parentName = category.getCategory().getName();
		}
		
		else {
			model.parentId = (long) 0;
			model.parentName = "Отсутствует";
		}
			
			
		return model;
	}
	
	public static CategoryModel buildCategoryForCombo (Category category) throws PlatformException{
		if (category == null)
			throw new PlatformException ("Model of category is null");
		
		CategoryModel model = new CategoryModel();
		model.id = category.getId();
		model.name = category.getName();
		
			
		return model;
	}
	
	public Long getId() {
		return id;
	}
	
	public String getCode() {
		return code;
	}
	
	public String getName() {
		return name;
	}
	
	public String getParentName() {
		return parentName;
	}
	
	public Long getParentId() {
		return parentId;
	}
	
	public boolean getIsDeleted() {
		return deleted;
	}
	
	public boolean getIsPublished() {
		return published;
	}
	
	public CategoryType getType() {
		return type;
	}
	
	public boolean getIsTopMenu () {
		return topMenu;
	}
	
	public void setName (String name) {
		this.name = name;
	}
	
	public void setCode (String code) {
		this.code = code;
	}
	
	public void setPublished (boolean published) {
		this.published = published;
	}
	
	public void setTopMenu (boolean topMenu) {
		this.topMenu = topMenu;
	}
	
	public void setCategory (Category category) {
		this.category = category;
	}
	
	
}
