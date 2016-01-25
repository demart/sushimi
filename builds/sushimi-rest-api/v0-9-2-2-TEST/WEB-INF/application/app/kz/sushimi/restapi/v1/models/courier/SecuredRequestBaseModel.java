package kz.sushimi.restapi.v1.models.courier;

/**
 * Базовый класс для запросов с мобильного приложения курьеров
 * 
 * @author artem.demidovich
 *
 */
public class SecuredRequestBaseModel {

	/**
	 * Токен для авторизации
	 */
	public String authToken;
	
	public String latitude;
	
	public String longitude;
	
}
