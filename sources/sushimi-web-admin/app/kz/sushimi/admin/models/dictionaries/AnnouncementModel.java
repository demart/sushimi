package kz.sushimi.admin.models.dictionaries;

import java.util.Date;

import kz.sushimi.admin.exceptions.PlatformException;
import kz.sushimi.admin.persistence.dictionaries.Announcement;

public class AnnouncementModel {

	private Long id;
	
	private String title;
	
	private String description;
	
	private String content;
	
	private Date publishedDate;
	
	private Date endDate;
	
	private boolean published;
	
	private Integer year;
	
	public static AnnouncementModel buildModel (Announcement announcement) throws PlatformException {
		if (announcement == null)
			throw new PlatformException ("When we create a model, announcement is not found");
		
		AnnouncementModel model = new AnnouncementModel ();
		Integer tmp = null;
		
		model.id = announcement.getId();
		if (announcement.getTitle() != null)
			model.title = announcement.getTitle();
		if (announcement.getContent() != null)
			model.content = announcement.getContent();
		if (announcement.getDescription() != null)
			model.description = announcement.getDescription();
		if (announcement.getPublishDate() != null)
			model.publishedDate = announcement.getPublishDate().getTime();
		if (announcement.getEndDate() != null)
			model.endDate = announcement.getEndDate().getTime();

		model.year = announcement.getPublishYear();
		
		model.published = announcement.isPublished();
		
		return model;
	}
	
	public Long getId () {
		return id;
	}
	
	public String getTitle () {
		return title;
	}
	
	public String getContent() {
		return content;
	}
	
	public String getDescription() {
		return description;
	}
	
	public Date getPublishedDate() {
		return publishedDate;
	}
	
	public Date getEndDate () {
		return endDate;
	}
	
	public boolean isPublished () {
		return published;
	}
	
	public Integer getYear () {
		return year;
	}
	
}
