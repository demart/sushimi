package kz.sushimi.persistence.broadcast.email;

import java.util.Calendar;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "brc_emails")
public class Email {
	
	@Id
	@GeneratedValue(generator="brc_email_seq")
	@SequenceGenerator(name="brc_email_seq",sequenceName="brc_email_seq", allocationSize=1)
	@Column(name="id")
	private long id;

	@Column(name="unique_key")
	private String uniqueKey;
	
	@Column(name="email")
	private String email;
	
	@Column(name="name")
	private String name;
	
	@Column(name="is_subscribed")
	private Boolean isSubscribed;
	
	@Column(name="unsubscribed_date")
	private Calendar unsubscribeDate;
	
	@Column(name="created_date")
	private Calendar createdDate;
	
	@Column(name="modified_date")
	private Calendar modifiedDate;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getUniqueKey() {
		return uniqueKey;
	}

	public void setUniqueKey(String uniqueKey) {
		this.uniqueKey = uniqueKey;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Boolean getIsSubscribed() {
		return isSubscribed;
	}

	public void setIsSubscribed(Boolean isSubscribed) {
		this.isSubscribed = isSubscribed;
	}

	public Calendar getUnsubscribeDate() {
		return unsubscribeDate;
	}

	public void setUnsubscribeDate(Calendar unsubscribeDate) {
		this.unsubscribeDate = unsubscribeDate;
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
	
}
