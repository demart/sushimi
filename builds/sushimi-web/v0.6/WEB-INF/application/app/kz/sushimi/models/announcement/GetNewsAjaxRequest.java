package kz.sushimi.models.announcement;

public class GetNewsAjaxRequest {

	Integer Page;
	Integer PageSize;
	Integer Year;
	String Type; 
	Integer Active;
	
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
	public Integer getYear() {
		return Year;
	}
	public void setYear(Integer year) {
		Year = year;
	}
	public String getType() {
		return Type;
	}
	public void setType(String type) {
		Type = type;
	}
	public Integer getActive() {
		return Active;
	}
	public void setActive(Integer active) {
		Active = active;
	}
	
	
	
}
