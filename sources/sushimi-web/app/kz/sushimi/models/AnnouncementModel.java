package kz.sushimi.models;

import java.util.Calendar;

import kz.sushimi.persistence.Announcement;

public class AnnouncementModel {

	private long id;
	private String uniqueName;
	
	/**
	 * 0 - Promotion
	 * 1 - News
	 */
	private int type;
	
	private String title;
	private String content;
	private String description;
	private Calendar date;
	private String imageLink;
	private String imageLinkForSlide;
	private String imageLinkForSmallSlide;
	
	
	public AnnouncementModel(Announcement ann) {
		this.id = ann.getId();
		this.title = ann.getTitle();
		this.description = ann.getDescription();
		this.content = ann.getContent();
		this.type = ann.getType();
		this.imageLink = ann.getImageLink();
		this.imageLinkForSlide = ann.getImageLinkSlide();
		this.imageLinkForSmallSlide = ann.getImageLink230x230();
		this.date = ann.getPublishDate();
		this.uniqueName = ann.getUniqueName();
	}	
	
	public String getPreparedImageLink() {
		return this.getImageLinkForSmallSlide();
	}
	
	public String getPreparedLinkToSource() {
		String prefix = this.type == 1 ? "/actions/" : "/news/"; 
		return prefix + this.getDate().get(Calendar.YEAR) + "/" 
		   + (this.getDate().get(Calendar.MONTH)+1) + "/" 
		   + this.getDate().get(Calendar.DATE) + "/"
		   + this.getUniqueName() + "/";
	}	
	
	
	public String getUniqueName() {
		return uniqueName;
	}

	public void setUniqueName(String uniqueName) {
		this.uniqueName = uniqueName;
	}

	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public int getType() {
		return type;
	}
	public void setType(int type) {
		this.type = type;
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
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public Calendar getDate() {
		return date;
	}
	public void setDate(Calendar date) {
		this.date = date;
	}
	public String getImageLink() {
		return imageLink;
	}
	public void setImageLink(String imageLink) {
		this.imageLink = imageLink;
	}
	public String getImageLinkForSlide() {
		return imageLinkForSlide;
	}
	public void setImageLinkForSlide(String imageLinkForSlide) {
		this.imageLinkForSlide = imageLinkForSlide;
	}
	public String getImageLinkForSmallSlide() {
		return imageLinkForSmallSlide;
	}
	public void setImageLinkForSmallSlide(String imageLinkForSmallSlide) {
		this.imageLinkForSmallSlide = imageLinkForSmallSlide;
	}
	
	
	
}
