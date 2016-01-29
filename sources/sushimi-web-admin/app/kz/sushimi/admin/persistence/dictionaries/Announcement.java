package kz.sushimi.admin.persistence.dictionaries;

import java.util.Calendar;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "announcements")
public class Announcement {
	
	@Id
	@GeneratedValue()
	@Column(name="id")
	private long id;
	
	@Column(name="unique_name")
	private String uniqueName;	
	
	/**
	 * 0 - News
	 * 1 - Actions
	 */
	@Column(name="type")
	private int type;	
	
	@Column(name="title")
	private String title;

	@Column(name="description", length=500)
	private String description;

	@Column(name="content", length=4000)
	private String content;	
	
	@Column(name="image_link_original")
	private String imageLink;
	
	@Column(name="image_link_small")
	private String imageLink120x120;	
		
	@Column(name="image_link_middle")
	private String imageLink230x230;	
	
	@Column(name="image_link_slide")
	private String imageLinkSlide;

	
	@Column(name="slide")
	private boolean isSlide;

	@Column(name="published")
	private boolean isPublished;
	
	@Column(name="publish_date")
	private Calendar publishDate;
	
	@Column(name="publish_year")
	private int publishYear;
	
	/**
	 * If null it means periodless
	 */
	@Column(name="end_date")
	private Calendar endDate;
	
	@Column(name="deleted")
	private boolean isDeleted;

	
	// ====================================
	// ======= GET & SET ==================
	// ====================================
	
	
	public long getId() {
		return id;
	}

	public int getPublishYear() {
		return publishYear;
	}

	public void setPublishYear(int publishYear) {
		this.publishYear = publishYear;
	}

	public String getUniqueName() {
		return uniqueName;
	}

	public void setUniqueName(String uniqueName) {
		this.uniqueName = uniqueName;
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

	public String getImageLink120x120() {
		return imageLink120x120;
	}

	public void setImageLink120x120(String imageLink120x120) {
		this.imageLink120x120 = imageLink120x120;
	}

	public String getImageLink230x230() {
		return imageLink230x230;
	}

	public void setImageLink230x230(String imageLink230x230) {
		this.imageLink230x230 = imageLink230x230;
	}

	public String getImageLinkSlide() {
		return imageLinkSlide;
	}

	public void setImageLinkSlide(String imageLinkSlide) {
		this.imageLinkSlide = imageLinkSlide;
	}

	public boolean isSlide() {
		return isSlide;
	}

	public void setSlide(boolean isSlide) {
		this.isSlide = isSlide;
	}

	public boolean isPublished() {
		return isPublished;
	}

	public void setPublished(boolean isPublished) {
		this.isPublished = isPublished;
	}

	public Calendar getPublishDate() {
		return publishDate;
	}

	public void setPublishDate(Calendar publishDate) {
		this.publishDate = publishDate;
	}

	public Calendar getEndDate() {
		return endDate;
	}

	public void setEndDate(Calendar endDate) {
		this.endDate = endDate;
	}

	public boolean isDeleted() {
		return isDeleted;
	}

	public void setDeleted(boolean isDeleted) {
		this.isDeleted = isDeleted;
	}
}
