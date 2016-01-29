package kz.sushimi.admin.services.dictionaries;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import org.apache.commons.lang.StringUtils;

import kz.sushimi.admin.exceptions.PlatformException;
import kz.sushimi.admin.models.dictionaries.AnnouncementModel;
import kz.sushimi.admin.models.dictionaries.CategoryModel;
import kz.sushimi.admin.models.users.UserModel;
import kz.sushimi.admin.persistence.dictionaries.Announcement;
import kz.sushimi.admin.persistence.dictionaries.Category;
import kz.sushimi.admin.persistence.users.User;
import play.db.jpa.JPA;

public class AnnouncementService {

	public static List<Announcement> getAllAnnouncements() {
		return JPA.em().createQuery("from Announcement order by id asc").getResultList();
	}

	public static ArrayList<AnnouncementModel> listOfAnnouncements(List<Announcement> list) throws PlatformException {
		if (list == null)
			throw new PlatformException ("List announcements on listOfStaff is null. Why?");
		
		ArrayList<AnnouncementModel> models = new ArrayList<AnnouncementModel>();
		
		for (Announcement announcement: list) {
			AnnouncementModel model = AnnouncementModel.buildModel(announcement);
			models.add(model);
		}
			
		return models;
	}

	public static void updateCurrentAnnouncement(AnnouncementModel[] models, String connected) throws PlatformException {
		if (models == null)
			throw new PlatformException ("Update information about current announcements is empty. Count = " + models.length);
		
		for (AnnouncementModel model: models) {
			if (model == null)
				throw new PlatformException  ("Update information about current announcement is empty");
			
				Announcement announcement = (Announcement) JPA.em().find(Announcement.class, model.getId());
				
				if (StringUtils.isNotEmpty(model.getTitle()))
					announcement.setTitle(model.getTitle());
				
				if (StringUtils.isNotEmpty(model.getContent()))
					announcement.setContent(model.getContent());
			
				if (StringUtils.isNotEmpty(model.getDescription()))
					announcement.setDescription(model.getDescription());				

				
				if (model.getYear() != null)
					announcement.setPublishYear(model.getYear());
				
				if (model.isPublished() == true || model.isPublished() == false)
					announcement.setPublished(model.isPublished());
				
				
				if (model.getEndDate() != null) {
					Calendar toDate = Calendar.getInstance();
					toDate.setTimeInMillis(model.getEndDate().getTime());
					announcement.setEndDate(toDate);
				}
				
				if (model.getPublishedDate() != null) {
					Calendar fromDate = Calendar.getInstance();
					fromDate.setTimeInMillis(model.getPublishedDate().getTime());
					announcement.setPublishDate(fromDate);				}
				
				JPA.em().persist(announcement);
				
		}
		
	}

	
}
