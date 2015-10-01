package kz.sushimi.console.persistence.users;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import kz.sushimi.console.persistence.PersistentObject;


/**
 * Пользователи системы
 * 
 * @author Demart
 *
 */
@Entity
@Table(name = "users")
public class User extends PersistentObject {
	
	@Column(name="code", nullable=false)
	private String code;
	
	@Column(name="name")
	private String name;

	@Column(name="login", length=20)
	private String login;
	
	@Column(name="password", length=20)
	private String password;
	
	@Enumerated(EnumType.STRING)
	@Column(name="role")
	private UserRole role = UserRole.OPERATOR;

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getLogin() {
		return login;
	}

	public void setLogin(String login) {
		this.login = login;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public UserRole getRole() {
		return role;
	}

	public void setRole(UserRole role) {
		this.role = role;
	}

}
