package kz.sushimi.console.persistence.clients;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Table;

import kz.sushimi.console.persistence.PersistentObject;

@Entity
@Table(name = "client_phones_sync")
public class ClientPhoneSync extends PersistentObject {

	@Column
	public String phone;
	
	@Column
	public String name;
	
	@Enumerated(EnumType.STRING)
	@Column
	public ClientPhoneSyncStatus status;

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public ClientPhoneSyncStatus getStatus() {
		return status;
	}

	public void setStatus(ClientPhoneSyncStatus status) {
		this.status = status;
	}
	
	
}
