package kz.sushimi.restapi.v1.models;

import java.util.Calendar;

public class AnnouncementModel {
	
	private long id;
	
	/**
	 * 0 - News
	 * 1 - Actions
	 */
	private int type;	
	
	private String title;

	private String description;

	private String content;	
	
	private String imageLink;	
	
	private Long publishDate;
	
	private Long endDate;
	
	private Long lastModifiedDate;

	private boolean isActual;
	
	public boolean isActual() {
		return isActual;
	}

	public void setActual(boolean isActual) {
		this.isActual = isActual;
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

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public String getImageLink() {
		return imageLink;
	}

	public void setImageLink(String imageLink) {
		this.imageLink = imageLink;
	}

	public Long getPublishDate() {
		return publishDate;
	}

	public void setPublishDate(Long publishDate) {
		this.publishDate = publishDate;
	}

	public Long getEndDate() {
		return endDate;
	}

	public void setEndDate(Long endDate) {
		this.endDate = endDate;
	}

	public Long getLastModifiedDate() {
		return lastModifiedDate;
	}

	public void setLastModifiedDate(Long lastModifiedDate) {
		this.lastModifiedDate = lastModifiedDate;
	}

}
