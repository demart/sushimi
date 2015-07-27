package kz.sushimi.console.models.clients;

import java.util.Date;

import kz.sushimi.console.persistence.clients.ClientStatus;
import kz.sushimi.console.persistence.clients.ClientType;

public class ClientModel {
	/**
	 * Идентификатор клиента
	 */
	private Long id;
	
	/**
	 * Имя
	 */
	private String name;
	
	/**
	 * Идентификатор
	 */
	private String iin;

	/**
	 * Дата рождения
	 */
	private Date birthdate; 
	
	/**
	 * Сотовый телефон (физика)
	 */
	private String phoneNumber;
	
	/**
	 * Почтовый адрес клиента
	 */
	private String email;	
	
	/**
	 * Коментарии к профилю пользователя (Жалобы, Пожелания, Предпочтения)
	 */
	private String comment;
	
	/**
	 * Статус клиента
	 */
	private ClientStatus status;
	
	/**
	 * Тип клиента (Физ, Юр)
	 */
	private ClientType type;

	
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

	public String getIin() {
		return iin;
	}

	public void setIin(String iin) {
		this.iin = iin;
	}

	public Date getBirthdate() {
		return birthdate;
	}

	public void setBirthdate(Date birthdate) {
		this.birthdate = birthdate;
	}

	public String getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}

	public ClientStatus getStatus() {
		return status;
	}

	public void setStatus(ClientStatus status) {
		this.status = status;
	}

	public ClientType getType() {
		return type;
	}

	public void setType(ClientType type) {
		this.type = type;
	}

}
