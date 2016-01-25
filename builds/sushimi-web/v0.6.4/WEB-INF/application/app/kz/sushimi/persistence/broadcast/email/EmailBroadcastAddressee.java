package kz.sushimi.persistence.broadcast.email;

import java.util.Calendar;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import kz.sushimi.persistence.broadcast.BroadcastAddresseeStatus;

@Entity
@Table(name = "brc_email_broadcast_addressees")
public class EmailBroadcastAddressee {
	
	@Id
	@GeneratedValue(generator="brc_email_brc_addr_seq")
	@SequenceGenerator(name="brc_email_brc_addr_seq",sequenceName="brc_email_brc_addr_seq", allocationSize=1)
	@Column(name="id")
	private long id;
	
	@ManyToOne
	private EmailBroadcast broadcast;
	
	@ManyToOne
	private Email addressee;
	
	@Enumerated(EnumType.STRING)
	@Column(name="status")
	private BroadcastAddresseeStatus status;
	
	@Column(name="reason")
	private String reason;
	
	@Column(name="created_date")
	private Calendar createdDate;
	
	@Column(name="sent_date")
	private Calendar sentDate;
	
	@Column(name="error_date")
	private Calendar errorDate;
	
	@Column(name="opened_date")
	private Calendar openedDate;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public EmailBroadcast getBroadcast() {
		return broadcast;
	}

	public void setBroadcast(EmailBroadcast broadcast) {
		this.broadcast = broadcast;
	}

	public Email getAddressee() {
		return addressee;
	}

	public void setAddressee(Email addressee) {
		this.addressee = addressee;
	}

	public BroadcastAddresseeStatus getStatus() {
		return status;
	}

	public void setStatus(BroadcastAddresseeStatus status) {
		this.status = status;
	}

	public String getReason() {
		return reason;
	}

	public void setReason(String reason) {
		this.reason = reason;
	}

	public Calendar getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(Calendar createdDate) {
		this.createdDate = createdDate;
	}

	public Calendar getSentDate() {
		return sentDate;
	}

	public void setSentDate(Calendar sentDate) {
		this.sentDate = sentDate;
	}

	public Calendar getErrorDate() {
		return errorDate;
	}

	public void setErrorDate(Calendar errorDate) {
		this.errorDate = errorDate;
	}

	public Calendar getOpenedDate() {
		return openedDate;
	}

	public void setOpenedDate(Calendar openedDate) {
		this.openedDate = openedDate;
	}
	
}
