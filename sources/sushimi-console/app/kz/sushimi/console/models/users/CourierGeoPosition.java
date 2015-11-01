package kz.sushimi.console.models.users;

public class CourierGeoPosition {
	
	public String geoLatitude;
	
	public String geoLongitude;
	
	public void setGeoLatitude(String geoLatitude) {
		this.geoLatitude = geoLatitude;
	}
	
	public void setGeoLongitude(String geoLongitude) {
		this.geoLongitude = geoLongitude;
	}
	
	public String getGeoLat (){
		return geoLatitude;
	}
	
	public String getGeolon () {
		return geoLongitude;
	}

}
