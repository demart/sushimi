package kz.sushimi.persistence.broadcast.phone;

import java.util.Calendar;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import kz.sushimi.persistence.broadcast.BroadcastStatus;

@Entity
@Table(name = "brc_phone_broadcast")
public class PhoneBroadcast {
	
	@Id
	@GeneratedValue(generator="brc_phone_brc_seq")
	@SequenceGenerator(name="brc_phone_brc_seq",sequenceName="brc_phone_brc_seq", allocationSize=1)
	@Column(name="id")
	private long id;
	
	@Column(name="title")
	private String title;
	
	@Column(name="content")
	private String content;
	
	@OneToMany(mappedBy="broadcast")
	private List<PhoneBroadcastAddressee> addressees;
	
	@Enumerated(EnumType.STRING)
	@Column(name="status")
	private BroadcastStatus status;
	
	@Column(name="content_provider_group_key")
	private String contentProviderGroupKey;
	
	@Column(name="start_date")
	private Calendar startDate;
	
	@Column(name="created_date")
	private Calendar createdDate;
	
	@Column(name="modified_date")
	private Calendar modifiedDate;
	
	@Column(name="started_date")
	private Calendar startedDate;

	@Column(name="finished_date")
	private Calendar finishedDate;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public List<PhoneBroadcastAddressee> getAddressees() {
		return addressees;
	}

	public void setAddressees(List<PhoneBroadcastAddressee> addressees) {
		this.addressees = addressees;
	}

	public BroadcastStatus getStatus() {
		return status;
	}

	public void setStatus(BroadcastStatus status) {
		this.status = status;
	}

	public String getContentProviderGroupKey() {
		return contentProviderGroupKey;
	}

	public void setContentProviderGroupKey(String contentProviderGroupKey) {
		this.contentProviderGroupKey = contentProviderGroupKey;
	}

	public Calendar getStartDate() {
		return startDate;
	}

	public void setStartDate(Calendar startDate) {
		this.startDate = startDate;
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

	public Calendar getStartedDate() {
		return startedDate;
	}

	public void setStartedDate(Calendar startedDate) {
		this.startedDate = startedDate;
	}

	public Calendar getFinishedDate() {
		return finishedDate;
	}

	public void setFinishedDate(Calendar finishedDate) {
		this.finishedDate = finishedDate;
	}
	
}
