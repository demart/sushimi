package kz.sushimi.restapi.v1.models;

public class RegisterPhoneModel {

	private PhoneType phoneType;
	
	private String appId;
	private String oldAppId;
	
	private String deviceToken;
	
	private String appVersion;
	
	public String getDeviceToken() {
		return deviceToken;
	}
	public void setDeviceToken(String deviceToken) {
		this.deviceToken = deviceToken;
	}
	public PhoneType getPhoneType() {
		return phoneType;
	}
	public void setPhoneType(PhoneType phoneType) {
		this.phoneType = phoneType;
	}
	public String getAppId() {
		return appId;
	}
	public void setAppId(String appId) {
		this.appId = appId;
	}
	public String getOldAppId() {
		return oldAppId;
	}
	public void setOldAppId(String oldAppId) {
		this.oldAppId = oldAppId;
	}
	public String getAppVersion() {
		return appVersion;
	}
	public void setAppVersion(String appVersion) {
		this.appVersion = appVersion;
	} 
	
	
}
