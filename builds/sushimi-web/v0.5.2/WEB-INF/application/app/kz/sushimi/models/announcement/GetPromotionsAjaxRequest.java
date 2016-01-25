package kz.sushimi.models.announcement;

public class GetPromotionsAjaxRequest {

	Integer Page;
	Integer PageSize;
	String Type; 
	Boolean Year;
	Boolean Active;
	
	public Integer getPage() {
		return Page;
	}
	public void setPage(Integer page) {
		Page = page;
	}
	public Integer getPageSize() {
		return PageSize;
	}
	public void setPageSize(Integer pageSize) {
		PageSize = pageSize;
	}
	public Boolean isYear() {
		return Year;
	}
	public void setYear(Boolean year) {
		Year = year;
	}
	public String getType() {
		return Type;
	}
	public void setType(String type) {
		Type = type;
	}
	public Boolean isActive() {
		return Active;
	}
	public void setActive(Boolean active) {
		Active = active;
	}
	
	
	
}
