package kz.sushimi.models.order;

public class ChangeCartResponseModel {
	
	// Response {"Success":true,"Heading":"","Message":null,"MessageType":"","Timeout":0,"Data":1000}
	
	private boolean Success;
	private String Heading;
	private String Message;
	private String MessageType;
	private long Timeout;
	private int Data;
	
	// ==================
	
	public boolean isSuccess() {
		return Success;
	}
	public void setSuccess(boolean success) {
		Success = success;
	}
	public String getHeading() {
		return Heading;
	}
	public void setHeading(String heading) {
		Heading = heading;
	}
	public String getMessage() {
		return Message;
	}
	public void setMessage(String message) {
		Message = message;
	}
	public String getMessageType() {
		return MessageType;
	}
	public void setMessageType(String messageType) {
		MessageType = messageType;
	}
	public long getTimeout() {
		return Timeout;
	}
	public void setTimeout(long timeout) {
		Timeout = timeout;
	}
	public int getData() {
		return Data;
	}
	public void setData(int data) {
		Data = data;
	}
	
}
