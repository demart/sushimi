package kz.sushimi.restapi.v1.models.wrapper;

import kz.sushimi.restapi.v1.exceptions.ErrorCode;
import kz.sushimi.restapi.v1.exceptions.SushimiException;

public class Wrapper {

	private ResponseStatus status;
	private Object data;
	
	/**
	 * Код ошибки
	 */
	private String errorCode;
	
	/**
	 * Описание ошибки 
	 */
	private String errorMessage;
	
	public Wrapper() {}
	
	public Wrapper(ResponseStatus status, Object data) {
		this(status, data, null);	
	}
	
	public Wrapper(ResponseStatus status, Object data, SushimiException sEx) {
		this.status = status;
		this.data = data;
		
		if (sEx != null) {
			errorCode = sEx.getCode();
			errorMessage = sEx.getMessage();
		}
			
	}
	
	
	
	public static Wrapper getSuccess(Object data) {
		return new Wrapper(ResponseStatus.SUCCESS, data);
	}
	
	public static Wrapper getNoContent() {
		return new Wrapper(ResponseStatus.NO_CONTENT, null);
	}

	public static Wrapper getBadRequest(SushimiException sEx) {
		return new Wrapper(ResponseStatus.BAD_REQUEST, null, sEx);
	}
	
	public static Wrapper getServerError(SushimiException sEx) {
		return new Wrapper(ResponseStatus.SERVER_ERROR, null, sEx);
	}
	
	public static Wrapper getServerError(String errorCode, Throwable ex) {
		return new Wrapper(ResponseStatus.SERVER_ERROR, null, new SushimiException(errorCode, ex.getMessage(), ex));
	}	
	
	
	public ResponseStatus getStatus() {
		return status;
	}
	public void setStatus(ResponseStatus status) {
		this.status = status;
	}
	public Object getData() {
		return data;
	}
	public void setData(Object data) {
		this.data = data;
	}
	
	public String getErrorCode() {
		return errorCode;
	}

	public void setErrorCode(String errorCode) {
		this.errorCode = errorCode;
	}

	public String getErrorMessage() {
		return errorMessage;
	}

	public void setErrorMessage(String errorMessage) {
		this.errorMessage = errorMessage;
	}
}
