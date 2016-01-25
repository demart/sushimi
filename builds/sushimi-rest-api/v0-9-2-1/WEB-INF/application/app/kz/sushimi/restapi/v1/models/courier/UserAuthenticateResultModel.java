package kz.sushimi.restapi.v1.models.courier;


/**
 * Модель ответа на авторизацию пользвователя
 * 
 * @author artem.demidovich
 *
 */
public class UserAuthenticateResultModel {

	/**
	 * Токен для использоваения в авторизации
	 */
	public String authToken;

	/**
	 * Имя пользователя
	 */
	public String username;
	
	public UserAuthenticateResultModel(String authToken, String username) {
		this.authToken = authToken;
		this.username = username;
	}
	
}
