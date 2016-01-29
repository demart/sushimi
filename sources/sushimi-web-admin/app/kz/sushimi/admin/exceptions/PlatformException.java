package kz.sushimi.admin.exceptions;

/**
 * Ошибки платформы
 * @author Wepli
 *
 */

public class PlatformException extends Exception {
	
	public PlatformException(String message) {
		this(message, null);
	}

	public PlatformException(String message, Throwable ex) {
		super(message, ex);
	}
}
