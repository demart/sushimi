package kz.sushimi.persistence.broadcast.push;

import java.util.Calendar;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;


@Entity
@Table(name = "brc_pushes")
public class Push {
	
	@Id
	@GeneratedValue()
	@Column(name="id")
	private long id;

	@Column(name="unique_key")
	private String uniqueKey;
	
	@Column(name="push_key")
	private String pushKey;
	
	@Column(name="name")
	private String name;
	
	@Column(name="is_subscribe")
	private Boolean isSubscribed;
	
	@Column(name="unsubscribed_date")
	private Calendar unsubscribeDate;
	
	@Column(name="created_date")
	private Calendar createdDate;
	
	@Column(name="modified_date")
	private Calendar modifedDate;

	@Column(name="platform")
	private String platform;
	
	@Column(name="platform_version")
	private String platformVersion;
	
	@Column(name="application_version")
	private String applicationVersion;

	
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

	public String getPushKey() {
		return pushKey;
	}

	public void setPushKey(String pushKey) {
		this.pushKey = pushKey;
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

	public Calendar getModifedDate() {
		return modifedDate;
	}

	public void setModifedDate(Calendar modifedDate) {
		this.modifedDate = modifedDate;
	}

	public String getPlatform() {
		return platform;
	}

	public void setPlatform(String platform) {
		this.platform = platform;
	}

	public String getPlatformVersion() {
		return platformVersion;
	}

	public void setPlatformVersion(String platformVersion) {
		this.platformVersion = platformVersion;
	}

	public String getApplicationVersion() {
		return applicationVersion;
	}

	public void setApplicationVersion(String applicationVersion) {
		this.applicationVersion = applicationVersion;
	}

}
