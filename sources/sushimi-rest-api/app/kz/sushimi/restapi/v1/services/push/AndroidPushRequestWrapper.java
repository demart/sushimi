package kz.sushimi.restapi.v1.services.push;

public class AndroidPushRequestWrapper {
	
	public String to;
	
	public AndroidPushRequestDataObject data;
	
	public AndroidPushRequestWrapper(String to, String message) {
		this.to = to;
		this.data = new AndroidPushRequestDataObject();
		this.data.message = message;
	}
	
}
