package kz.sushimi.console.models.users;

import java.util.Date;

import kz.sushimi.console.persistence.users.UserRole;

/**
 * Модель данных пользователя
 * 
 * @author Demart
 *
 */
public class UserModel {

	/**
	 * Идентификатор записи
	 */
	private Long id;
	
	/**
	 * Имя пользователя
	 */
	private String name;

	/**
	 * Логин пользователя
	 */
	private String login;
	
	/**
	 * Пароль пользователя
	 */
	private String password;
	
	/**
	 * Взятые заказы курьером
	 */
	private String ordersOnDelivery;
	
	/**
	 * Роль пользователя
	 */
	private UserRole role;


	public String user;
	public Date createdDate;
	public Date modifiedDate;

	private String addressesOnDelivery;
	
	public void setAddressesOnDelivery(String addressesOnDelivery) {
		this.addressesOnDelivery = addressesOnDelivery;
	}
	
	public String getAddressesOnDelivery () {
		return addressesOnDelivery;
	}
	
	
	public void setOrdersOnDelivery(String ordersOnDelivery) {
		this.ordersOnDelivery = ordersOnDelivery;
	}
	
	public String getOrdersOnDelivery () {
		return ordersOnDelivery;
	}
	
	public String getUser() {
		return user;
	}

	public void setUser(String user) {
		this.user = user;
	}

	public Date getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}

	public Date getModifiedDate() {
		return modifiedDate;
	}

	public void setModifiedDate(Date modifiedDate) {
		this.modifiedDate = modifiedDate;
	}

	
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getLogin() {
		return login;
	}

	public void setLogin(String login) {
		this.login = login;
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
