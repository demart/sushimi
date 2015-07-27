package kz.sushimi.console.persistence;

import java.util.Calendar;

import javax.persistence.Column;
import javax.persistence.ManyToOne;
import javax.persistence.MappedSuperclass;
import javax.persistence.PreUpdate;

import kz.sushimi.console.persistence.users.User;
import play.db.jpa.Model;

/**
 * Базовый класс для сущностей
 * 
 * @author Demart
 *
 */
@MappedSuperclass
public class PersistentObject extends Model {

	public PersistentObject() {
		this.createdDate = Calendar.getInstance();
		this.modifiedDate = Calendar.getInstance();
	}
	
	
	/**
	 * Дата создания записи
	 */
	@Column(name="created_date")
	private Calendar createdDate;
	
	/**
	 * Дата изменения записи
	 */
	@Column(name="modified_date")
	private Calendar modifiedDate;
	
	/**
	 * Пользователь создавщий запись
	 */
	@ManyToOne
	private User user;

	/**
	 * Вызывается перед изменением записи
	 */
	@PreUpdate 
	private void onPreUpdate() {
		this.modifiedDate = Calendar.getInstance();
	}
	
	
	public Calendar getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(Calendar createdDate) {
		this.createdDate = createdDate;
	}

	public Calendar getModifiedDate() {
		return modifiedDate;
	}

	public void setModifiedDate(Calendar modifiedDate) {
		this.modifiedDate = modifiedDate;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}
	
}
