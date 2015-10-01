package kz.aphion.sushimi.mobile.courierapp.data.models;


/**
 * Модель для авторизации курьера в системе
 * 
 * @author artem.demidovich
 *
 */
public class UserLoginRequestModel {

	/**
	 * Ключ авторизации введеный пользователем
	 */
	public String userKey;
	
	/**
	 * Версия курьерского приложения
	 */
	public String appVersion;
	
	/**
	 * Версия операционной системы
	 */
	public String operationSystemVersion;
	
	/**
	 * Мобильная операционная система
	 */
	public UserMobileOperationSystem mobileOperationSystem;
	
	/**
	 * Идентификатор для отправки PUSH в приложение курьеров
	 */
	public String pushKey;
	
	/**
	 * Позиции пользователя
	 */
	public String latitude;
	
	/**
	 * Позиции пользователя
	 */
	public String longitude;
	
}
