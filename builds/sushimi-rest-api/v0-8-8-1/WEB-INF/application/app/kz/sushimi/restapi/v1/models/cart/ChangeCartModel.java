package kz.sushimi.restapi.v1.models.cart;

public class ChangeCartModel {

	// Request {"id":9,"CityId":"1"}	
//	private int id;
	private String cityId;
	
/*
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	
*/
	
	public String getCityId() {
		return cityId;
	}
	public void setCityId(String cityId) {
		this.cityId = cityId;
	}
	
}
