package kz.sushimi.admin.models.users;

import org.apache.commons.lang.StringUtils;

import kz.sushimi.admin.exceptions.PlatformException;
import kz.sushimi.admin.persistence.users.User;
import kz.sushimi.admin.persistence.users.UserRole;

/**
 * Модель данных для персонала службы доставки
 * @author Wepli
 *
 */

public class UserModel {

		/**
		 * ID работника
		 */
		private Long id;
		
		/**
		 * Имя работника
		 */
		private String name;
		
		/**
		 * Логин работника
		 */
		private String login;
		
		/**
		 * Пароль работника 
		 */
		private String password;
		
		/**
		 * Код работника
		 */
		private String code;
		
		/**
		 * Должность работника
		 */
		private UserRole role;
		
		/**
		 * Активирован ли?		 
		 */
		private boolean enabled;
		
		public static UserModel buildModel(User user) throws PlatformException {
			if (user == null)
				throw new PlatformException ("When we create a model, user is not found");
			
			UserModel model = new UserModel();
			model.id = user.getId();
			if (StringUtils.isNotEmpty(user.getName()))
				model.name = user.getName();
			if (StringUtils.isNotEmpty(user.getPassword()))
				model.password = user.getPassword();
			if (StringUtils.isNotEmpty(user.getLogin()))
				model.login = user.getLogin();
			if (StringUtils.isNotEmpty(user.getCode()))
				model.code = user.getCode();
			if (user.getRole() != null)
				model.role = user.getRole();
			if (user.getEnabled() != null)
				model.enabled = user.getEnabled();
						
			return model;
		}
		
		public Long getId(){
			return id;
		}
		
		public String getName() {
			return name;
		}
		
		public String getCode() {
			return code;
		}
		
		public String getPassword() {
			return password;
		}
		
		public String getlogin() {
			return login;
		}
		
		public UserRole getRole() {
			return role;
		}
		
		public boolean isEnabled () {
			return enabled;
		}
		
}
