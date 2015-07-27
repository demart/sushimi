package kz.sushimi.console.persistence.clients;

import java.util.Calendar;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import kz.sushimi.console.persistence.PersistentObject;

/**
 * Клиенты
 * @author Demart
 *
 */
@Entity
@Table(name = "client")
public class Client extends PersistentObject {

	/**
	 * Имя
	 */
	@Column(length=300)
	private String name;
	
	/**
	 * Идентификатор
	 */
	@Column(length=20)
	private String iin;

	/**
	 * Дата рождения
	 */
	@Column
	private Calendar birthdate; 
	
	/**
	 * Сотовый телефон (физика)
	 */
	@Column(length=50)
	private String phoneNumber;
	
	/**
	 * Почтовый адрес клиента
	 */
	@Column(name="email", length=256)
	private String email;	
	
	/**
	 * Коментарии к профилю пользователя (Жалобы, Пожелания, Предпочтения)
	 */
	@Column(length=500)
	private String comment;
	
	/**
	 * Статус клиента
	 */
	@Enumerated(EnumType.STRING)
	@Column
	private ClientStatus status = ClientStatus.ORDINAL;
	
	/**
	 * Тип клиента (Физ, Юр)
	 */
	@Enumerated(EnumType.STRING)
	@Column()
	private ClientType type = ClientType.PHYSICAL;
	
	/**
	 * Общая сумма заказов клинета
	 */
	@Column(name="total_order_sum")
	private Integer totalOrderSum = 0;
	
	/**
	 * Адреса пользователей
	 */
	@OneToMany(mappedBy="client")
	private List<ClientAddress> addresses;

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

	public Calendar getBirthdate() {
		return birthdate;
	}

	public void setBirthdate(Calendar birthdate) {
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

	public Integer getTotalOrderSum() {
		return totalOrderSum;
	}

	public void setTotalOrderSum(Integer totalOrderSum) {
		this.totalOrderSum = totalOrderSum;
	}

	public List<ClientAddress> getAddresses() {
		return addresses;
	}

	public void setAddresses(List<ClientAddress> addresses) {
		this.addresses = addresses;
	}
}
