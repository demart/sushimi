package kz.sushimi.restapi.v1.service;

import java.util.Calendar;
import java.util.UUID;

import play.db.jpa.JPA;
import kz.sushimi.persistence.broadcast.push.Push;
import kz.sushimi.restapi.v1.exceptions.ErrorCode;
import kz.sushimi.restapi.v1.exceptions.SushimiValidationException;
import kz.sushimi.restapi.v1.models.device.DevicePushRequestModel;

public class DeviceService {

	/**
	 * Регистрирует или обновляет токен для отправки PUSH уведомлений
	 *  
	 * @param model
	 * @throws SushimiValidationException 
	 */
	public static void registerOrUpdatePushToken(DevicePushRequestModel model) throws SushimiValidationException {
		if (model == null)
			throw new SushimiValidationException(ErrorCode.VALIDATION_ERROR, "DevicePushRequestModel is null");
		
		Push push = null;
		if (model.oldPushKey != null)
			push = (Push) JPA.em().createQuery("from Push where pushKey = :pushKey").setParameter("pushKey", model.oldPushKey).getSingleResult();
		
		if (push == null)
			push = new Push();
		
		push.setPlatform(model.platform.toString());
		push.setPushKey(model.pushKey);
		
		if (push.getUniqueKey() == null)
			push.setUniqueKey(UUID.randomUUID().toString());
		push.setModifedDate(Calendar.getInstance());
		if (push.getCreatedDate() == null)
			push.setCreatedDate(Calendar.getInstance());
		
		if (push.getIsSubscribed() == null)
			push.setIsSubscribed(true);
		
		//push.setName("");
		//push.setApplicationVersion(applicationVersion);
		//push.setCreatedDate(createdDate);
		//push.setIsSubscribed(isSubscribed);
		//push.setPlatformVersion(platformVersion);
		
		JPA.em().persist(push);
		
	}
	
}
