package kz.sushimi.restapi.v1.models.device;

import kz.sushimi.persistence.users.UserMobileOperationSystem;

/**
 * Модель для регистрации или обновления информации для отправки PUSH уведомлений
 * @author artem.demidovich
 *
 */
public class DevicePushRequestModel {
	
	/**
	 * Мобильная платформа
	 */
	public UserMobileOperationSystem platform;
	
	/**
	 * Новый идентификатор для отправки push уведомлений
	 */
	public String pushKey;
	
	/**
	 * Если не null то означает замену старого на новый
	 */
	public String oldPushKey;

}
