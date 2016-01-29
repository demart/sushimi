package kz.sushimi.admin.service.users;

import java.util.ArrayList;
import java.util.List;



import org.apache.commons.lang.StringUtils;

import kz.sushimi.admin.exceptions.PlatformException;
import kz.sushimi.admin.models.users.UserModel;
import kz.sushimi.admin.persistence.users.User;
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
		return (User) JPA.em().find(User.class, userId);
	}
	
	public static User authauthenticate (String login, String password) {
		List<User> users = JPA.em().createQuery("from User where login = :login and password = :password").
				setParameter("login", login).setParameter("password", password).getResultList();
		
		User model = new User();
		
		if (users.size() > 0) {
			for (User user: users) {
				model.setId(user.getId());
				model.setName(user.getName());
				model.setLogin(user.getLogin());
				model.setPassword(user.getPassword());
				model.setRole(user.getRole());				
			}
			return model;
		}
		
		return null;

	}
	
	
	
	
	public static User isConnected (String login) {
		List<User> users = JPA.em().createQuery("from User where login = :login").
				setParameter("login", login).getResultList();
		
		User model = new User();
		
		if (users.size() > 0) {
			for (User user: users) {
				model.setId(user.getId());
				model.setName(user.getName());
				model.setLogin(user.getLogin());
				model.setPassword(user.getPassword());
				model.setRole(user.getRole());
			}
			return model;
		}
		
		return null;
	}
	
	public static boolean checkTitleToUse (String login) throws PlatformException {
		try {
			List<User> users = JPA.em().createQuery("from User where login = :login and enabled = 'TRUE'").
					setParameter("login", login).getResultList();
			
			if (users.size() > 0)
				return true;
			
			else
				return false;
		}
		
		catch (Exception e) {
			throw new PlatformException (e.getMessage());
		}
	}
	
	public static List<User> getAllStaff () throws PlatformException {
		return JPA.em().createQuery("from User order by id asc").getResultList();
	}
	
	public static ArrayList<UserModel> listOfStaff (List<User> users) throws PlatformException {
		if (users == null)
			throw new PlatformException ("List users on listOfStaff is null. Why?");
		
		ArrayList<UserModel> models = new ArrayList<UserModel>();
		
		for (User user: users) {
			UserModel model = UserModel.buildModel(user);
			models.add(model);
		}
			
		return models;
	}

	public static void addNewStaff(UserModel[] models, String login) throws PlatformException {
		if (models == null)
			throw new PlatformException ("Information about new staffs is empty. Count = " + models.length);;
		for (UserModel model: models) {
			if (model == null)
				throw new PlatformException  ("Information about new staff is empty");
			
			try {
				User user = new User ();
				
				if (StringUtils.isNotEmpty(model.getName()))
					user.setName(model.getName());
				
				if (StringUtils.isNotEmpty(model.getlogin()))
					user.setLogin(model.getlogin());
				
				if (StringUtils.isNotEmpty(model.getPassword()))
					user.setPassword(model.getPassword());
				
				if (model.getRole() != null) {
					user.setRole(model.getRole());
				}
				
				if (StringUtils.isNotEmpty(model.getCode()))
					user.setCode(model.getCode());
				
				user.setEnabled(true);
				
				JPA.em().persist(user);
			}
			
			catch (Exception e) {
				JPA.em().getTransaction().rollback();
				throw new PlatformException (e.getMessage());
			}
		}
	}
	
	
	public static void updateCurrentStaff(UserModel[] models, String login) throws PlatformException {
		if (models == null)
			throw new PlatformException ("Update information about current staffs is empty. Count = " + models.length);
		for (UserModel model: models) {
			if (model == null)
				throw new PlatformException  ("Update information about current staff is empty");
			
			try {
				User user = UserService.getUserById(model.getId());
				
				if (StringUtils.isNotEmpty(model.getName()))
					user.setName(model.getName());
				
				if (StringUtils.isNotEmpty(model.getlogin()))
					user.setLogin(model.getlogin());
				
				if (StringUtils.isNotEmpty(model.getPassword()))
					user.setPassword(model.getPassword());
				
				if (model.getRole() != null) {
					user.setRole(model.getRole());
				}
				
				if (model.isEnabled() == true || model.isEnabled() == false)
					user.setEnabled(model.isEnabled());
				
				if (StringUtils.isNotEmpty(model.getCode()))
					user.setCode(model.getCode());
				
								
				JPA.em().persist(user);
			}
			
			catch (Exception e) {
				JPA.em().getTransaction().rollback();
				throw new PlatformException (e.getMessage());
			}
		}
	}
	
	public static void enabledStaffFalse (Long id) throws PlatformException {
		if (id == null)
			throw new PlatformException ("Id is null");
		
		try {
			User user = (User)JPA.em().find(User.class, id);
			
			user.setEnabled(false);
			
			JPA.em().persist(user);
		}
		
		catch (Exception e) {
			JPA.em().getTransaction().rollback();
			throw new PlatformException (e.getMessage());
		}
		
	}
	
}
