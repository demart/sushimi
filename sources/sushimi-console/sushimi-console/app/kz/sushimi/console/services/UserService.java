package kz.sushimi.console.services;

import java.util.List;

import kz.sushimi.console.exceptions.ValidationException;
import kz.sushimi.console.models.users.UserModel;
import kz.sushimi.console.persistence.users.User;

import org.apache.commons.lang.StringUtils;

import play.db.jpa.JPA;

/**
 * Класс сервис для работы с пользователями
 * 
 * @author Demart
 *
 */
public class UserService {

	/**
	 * Возвращает пользователя по указанному Id
	 * @param userId
	 * @return
	 */
	public static User getUserById(Long userId) {
		return User.findById(userId);
	}
	
	/**
	 * Возращает текущего пользователя системы
	 * @return
	 * @throws ValidationException 
	 */
	public static User getUserByLogin(String login) throws ValidationException {
		if (StringUtils.isEmpty(login))
			throw new ValidationException("user is null or empty");
		User user = User.find("login", login).first();
		if (user == null)
			throw new ValidationException("user not found");
		return user;
	}
	
	/**
	 * Добавляет пользователя в систему
	 * @param model
	 * @param userLogin
	 * @return
	 * @throws ValidationException 
	 */
	public static void addUser(UserModel[] models, String userLogin) throws ValidationException {
		for (UserModel model : models) {
			if (model == null)
				throw new ValidationException("Model is null");
			
			if (StringUtils.isEmpty(model.getLogin()))
				throw new ValidationException("login empty or null");
			if (StringUtils.isEmpty(model.getName()))
				throw new ValidationException("name empty or null");
			if (StringUtils.isEmpty(model.getPassword()))
				throw new ValidationException("password empty or null");
			
			User currentUser = UserService.getUserByLogin(userLogin);
			
			User user = new User();
			user.setLogin(model.getLogin());
			user.setName(model.getName());
			user.setPassword(model.getPassword());
			user.setRole(model.getRole());
			user.setUser(currentUser);
			user.save();
		}
	}
	
	/**
	 * Изменяет запись пользователя
	 * @param model
	 * @param userLogin
	 * @return
	 * @throws ValidationException 
	 */
	public static void updateUser(UserModel[] models, String userLogin) throws ValidationException {
		for (UserModel model : models) {
			
			if (model == null)
				throw new ValidationException("Model is null");
			
			if (StringUtils.isEmpty(model.getLogin()))
				throw new ValidationException("login empty or null");
			if (StringUtils.isEmpty(model.getName()))
				throw new ValidationException("name empty or null");
			if (StringUtils.isEmpty(model.getPassword()))
				throw new ValidationException("password empty or null");
			
			if (model.getId() == null || model.getId() <= 0)
				throw new ValidationException("user id empty or null");
			
			User currentUser = UserService.getUserByLogin(userLogin);
			
			User user = getUserById(model.getId());
			if (user == null)
				throw new ValidationException("user not found");
			
			user.setLogin(model.getLogin());
			user.setName(model.getName());
			user.setPassword(model.getPassword());
			user.setRole(model.getRole());
			user.setUser(currentUser);
			user.save();
		}
	}
	
	/**
	 * Кол-во пользователей в системе
	 * @return
	 */
	public static Long getUsersCount() {
		return User.count();
	}
	
	/**
	 * Возвращает список пользователей
	 * @param start
	 * @param limit
	 * @return
	 */
	public static List<User> getUsers(int start, int limit) {
		return JPA.em().createQuery("from User order by name").setMaxResults(limit).setFirstResult(start).getResultList();
	}

	/**
	 * Удалить запись города
	 * @param id
	 * @throws ValidationException 
	 */
	public static Long deleteUser(Long id, String userLogin) throws ValidationException {
		if (id == null || id <= 0)
			throw new ValidationException("user is id null or empty");
		User user = User.findById(id);
		user = user.delete();
		return user.getId();
	}	
	
}
