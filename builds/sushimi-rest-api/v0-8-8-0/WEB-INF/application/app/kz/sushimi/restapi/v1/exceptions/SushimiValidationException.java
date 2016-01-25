package kz.sushimi.restapi.v1.exceptions;

public class SushimiValidationException extends SushimiException {

	public SushimiValidationException(String code, String message) {
		super(code, message);
		// TODO Auto-generated constructor stub
	}

	public SushimiValidationException(String code, String message, Throwable ex) {
		super(code, message, ex);
		// TODO Auto-generated constructor stub
	}

}
