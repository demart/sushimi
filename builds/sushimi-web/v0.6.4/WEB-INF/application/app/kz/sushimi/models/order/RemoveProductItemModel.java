package kz.sushimi.models.order;

public class RemoveProductItemModel {
	
	private long Id;
	private String CityId;
	public CartType Cart;
	
	
	public long getId() {
		return Id;
	}
	public void setId(long id) {
		Id = id;
	}
	public String getCityId() {
		return CityId;
	}
	public void setCityId(String cityId) {
		CityId = cityId;
	}
	
	
}
