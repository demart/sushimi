package kz.sushimi.restapi.v1.service;

import java.util.Calendar;
import java.util.List;
import java.util.UUID;

import kz.sushimi.persistence.users.User;
import kz.sushimi.persistence.users.UserTracking;
import kz.sushimi.restapi.v1.exceptions.ErrorCode;
import kz.sushimi.restapi.v1.exceptions.SushimiException;
import kz.sushimi.restapi.v1.models.courier.UserUpdateGeolocationCoordinateModel;
import kz.sushimi.restapi.v1.models.courier.UserAuthenticateResultModel;
import kz.sushimi.restapi.v1.models.courier.UserLoginRequestModel;
import play.db.jpa.JPA;

/**
 * Сервис для работы с пользователями (курьерами)
 * 
 * @author artem.demidovich
 *
 */
public class UserService {
	
	/**
	 * Авторизация пользователя и полученте токена для доступа к API
	 * 
	 * @param model Модель авторизации в мобильном приложении
	 * @return SSO Token авторизации
	 * @throws SushimiException Ошибки при попытке авторизоваться
	 */
	public static UserAuthenticateResultModel authenticate(UserLoginRequestModel model) throws SushimiException {
		List<User> users = JPA.em().createQuery("From User where login = :userKey")
				.setParameter("userKey", model.userKey).getResultList();
		if (users.size() == 0)
			throw new SushimiException(ErrorCode.AUTH_ERROR, "User account not found");
		User user  = users.get(0);
		if (user == null)
			throw new SushimiException(ErrorCode.AUTH_ERROR, "User account not found");
		
		if (user.getEnabled() == false || user.getEnabled() == null)
			throw new SushimiException(ErrorCode.AUTH_ERROR, "User account is disabled");
		
		user.setLastGeolocationSyncTime(Calendar.getInstance());
		user.setLastLatitude(model.latitude);
		user.setLastLongitude(model.longitude);
		user.setMobileAppVersion(model.appVersion);
		user.setMobileOperationSystem(model.mobileOperationSystem);
		user.setMobileOperationSystemVersion(model.operationSystemVersion);
		user.setMobilePushKey(model.pushKey);
		
		// Generate new token for auth
		String ssoToken = UUID.randomUUID().toString();
		user.setMobileAuthToken(ssoToken);
		
		JPA.em().persist(user);
		
		return new UserAuthenticateResultModel(ssoToken, user.getName());
	}
	
	/**
	 * Проверяет авторизован ли пользователь или нет
	 * @param authToken Токен авторизации
	 * @return Пользователь
	 * @throws SushimiException Ошибки при приверке токена авторизации
	 */
	public static User getUserByAuthToken(String authToken) throws SushimiException {
		List<User> users = JPA.em().createQuery("From User where mobileAuthToken = :authToken")
				.setParameter("authToken", authToken).getResultList();
		if (users.size() == 0)
			throw new SushimiException(ErrorCode.AUTH_ERROR, "Authorization token unavailable");
		User user  = users.get(0);
		if (user == null)
			throw new SushimiException(ErrorCode.AUTH_ERROR, "Authorization token unavailable");
		if (user.getEnabled() == null || user.getEnabled() == false)
			throw new SushimiException(ErrorCode.AUTH_ERROR, "User account is disabled");
		
		return user;
	}
	
	public static void updateGeolocationCoordinate(User user, UserUpdateGeolocationCoordinateModel model) throws SushimiException {
		// TODO брать время из запроса?
		user.setLastGeolocationSyncTime(Calendar.getInstance());
		user.setLastLatitude(model.latitude);
		user.setLastLongitude(model.longitude);
		JPA.em().persist(user);	
		
		
		// TODO добавить запись точек в историю
		UserTracking tracking = new UserTracking();
		tracking.setDate(Calendar.getInstance());
		tracking.setLatitude(model.latitude);
		tracking.setLongitude(model.longitude);
		tracking.setUser(user);
		JPA.em().persist(tracking);
		
		// TODO получить кол-во записей в трэкинге и если больше 200 удалить их нафиг
		// ...
	}
	
	
}
