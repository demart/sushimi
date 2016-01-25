package kz.sushimi.restapi.v1.service;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import javax.persistence.Query;

import kz.sushimi.persistence.Announcement;
import kz.sushimi.restapi.v1.models.AnnouncementModel;
import play.db.jpa.JPA;

public class AnnouncementService {

	
	public static List<AnnouncementModel> getAnnouncements(Integer type) {
		List<AnnouncementModel> models = new ArrayList<AnnouncementModel>();
		
		Query announcementQuery = null;
		if (type == null) {
			announcementQuery = JPA.em().createQuery("from Announcement where isDeleted = false and isPublished = true order by publishDate DESC");
		} else {
			announcementQuery = JPA.em().createQuery("from Announcement where isDeleted = false and isPublished = true and type = :type order by publishDate DESC");
			announcementQuery.setParameter("type", type);
		}
			
		List<Announcement> announcements = announcementQuery.getResultList();
		if (announcements != null && announcements.size() > 0) {
			
			for (Announcement announcement : announcements) {
				AnnouncementModel model = new AnnouncementModel();
				model.setId(announcement.getId());
				model.setTitle(announcement.getTitle());
				model.setContent(announcement.getContent());
				model.setDescription(announcement.getDescription());
				
				if (announcement.getPublishDate() != null)
					model.setPublishDate(announcement.getPublishDate().getTimeInMillis());
				if (announcement.getEndDate() != null) {
					model.setEndDate(announcement.getEndDate().getTimeInMillis());
					if (System.currentTimeMillis() < model.getEndDate()) 
						model.setActual(true);	
				} else {
					model.setActual(true);
				}
				
				model.setType(announcement.getType());
				// TODO add image link and last modified date
				model.setImageLink(announcement.getImageLink());
				
				model.setLastModifiedDate(Calendar.getInstance().getTimeInMillis());
				
				models.add(model);
			}
		}
		return models;
	}
	
	
	
	public static AnnouncementModel getAnnouncement(Long announcementId) {
		Announcement announcement = (Announcement)JPA.em().find(Announcement.class, announcementId);

		if (announcement != null) {
			AnnouncementModel model = new AnnouncementModel();
			model.setId(announcement.getId());
			model.setTitle(announcement.getTitle());
			model.setContent(announcement.getContent());
			model.setDescription(announcement.getDescription());
			model.setType(announcement.getType());
			
			if (announcement.getPublishDate() != null)
				model.setPublishDate(announcement.getPublishDate().getTimeInMillis());
			if (announcement.getEndDate() != null) {
				model.setEndDate(announcement.getEndDate().getTimeInMillis());
				if (System.currentTimeMillis() < model.getEndDate()) 
					model.setActual(true);
			} else {
				model.setActual(true);
			}
			
			// TODO add image link for mobile and last modified date
			model.setImageLink(announcement.getImageLink());
			model.setLastModifiedDate(Calendar.getInstance().getTimeInMillis());
			
			
			
			return model;
		}
		return null;
	}
	
	
	
}
