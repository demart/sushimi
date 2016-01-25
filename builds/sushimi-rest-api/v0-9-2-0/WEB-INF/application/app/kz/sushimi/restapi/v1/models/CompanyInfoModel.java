package kz.sushimi.restapi.v1.models;

import java.util.Calendar;

public class CompanyInfoModel {

	private String id;
	private String imageUrl;
	private String content;
	
	private String instagramUrl;
	private String vkUrl;
	

	public String getInstagramUrl() {
		return instagramUrl;
	}
	public void setInstagramUrl(String instagramUrl) {
		this.instagramUrl = instagramUrl;
	}
	public String getVkUrl() {
		return vkUrl;
	}
	public void setVkUrl(String vkUrl) {
		this.vkUrl = vkUrl;
	}
	private Long lastModifiedDate;
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getImageUrl() {
		return imageUrl;
	}
	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}
	public Long getLastModifiedDate() {
		return lastModifiedDate;
	}
	public void setLastModifiedDate(Long lastModifiedDate) {
		this.lastModifiedDate = lastModifiedDate;
	}
	
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	
}
