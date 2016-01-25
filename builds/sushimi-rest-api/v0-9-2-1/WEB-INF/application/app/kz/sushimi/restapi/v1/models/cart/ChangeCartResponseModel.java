package kz.sushimi.restapi.v1.models.cart;

public class ChangeCartResponseModel {
	
	// Response {"Success":true,"Heading":"","Message":null,"MessageType":"","Timeout":0,"Data":1000}
	
	private boolean success;
	private String heading;
	private String message;
	private String messageType;
	private long timeout;
	private int minOrderSum;
	
	// ==================
	
	public boolean isSuccess() {
		return success;
	}
	public void setSuccess(boolean success) {
		this.success = success;
	}
	public String getHeading() {
		return heading;
	}
	public void setHeading(String heading) {
		this.heading = heading;
	}
	public String getMessage() {
		return this.message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public String getMessageType() {
		return messageType;
	}
	public void setMessageType(String messageType) {
		this.messageType = messageType;
	}
	public long getTimeout() {
		return timeout;
	}
	public void setTimeout(long timeout) {
		this.timeout = timeout;
	}
	public int getMinOrderSum() {
		return minOrderSum;
	}
	public void setMinOrderSum(int minOrderSum) {
		this.minOrderSum = minOrderSum;
	}
	
}
