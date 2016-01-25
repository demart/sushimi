package kz.sushimi.persistence.broadcast.email;

import java.util.Calendar;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "brc_email_broadcast_templates")
public class EmailBroadcastTemplate {
	
	@Id
	@GeneratedValue(generator="brc_email_brc_tmp_seq")
	@SequenceGenerator(name="brc_email_brc_tmp_seq",sequenceName="brc_email_brc_tmp_seq", allocationSize=1)
	@Column(name="id")
	private long id;
	
	@Column(name="template")
	private String template;
	
	@OneToMany(mappedBy="template")
	private List<EmailBroadcast> broadcasts;
	
	@Column(name="is_active")
	private Boolean isActive;
	
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

	public String getTemplate() {
		return template;
	}

	public void setTemplate(String template) {
		this.template = template;
	}

	public List<EmailBroadcast> getBroadcasts() {
		return broadcasts;
	}

	public void setBroadcasts(List<EmailBroadcast> broadcasts) {
		this.broadcasts = broadcasts;
	}

	public Boolean getIsActive() {
		return isActive;
	}

	public void setIsActive(Boolean isActive) {
		this.isActive = isActive;
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
