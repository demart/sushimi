package kz.sushimi.restapi.v1.exceptions;

public class SushimiException extends Exception {

	private String code;
	
	
	public SushimiException(String code, String message) {
		this(code, message, null);
	}
	
	public SushimiException(String code, String message, Throwable ex) {
		super(message, ex);
		this.code = code;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}
	
}
