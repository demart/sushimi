package kz.sushimi.models.order;

public class ChangeCartModel {

	// Request {"id":9,"CityId":"1"}	
	private int id;
	private String CityId;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getCityId() {
		return CityId;
	}
	public void setCityId(String cityId) {
		CityId = cityId;
	}
	
}
