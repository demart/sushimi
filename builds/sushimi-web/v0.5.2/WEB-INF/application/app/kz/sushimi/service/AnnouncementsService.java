package kz.sushimi.service;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.Query;

import play.Logger;
import play.db.jpa.JPA;

import kz.sushimi.models.AnnouncementModel;
import kz.sushimi.persistence.Announcement;
import kz.sushimi.persistence.dictionaries.Category;

public class AnnouncementsService {


	public static long cacheTime = 600000; // 10 min
	public static List<AnnouncementModel> cachedAnnouncementModels;
	public static long announcementsExpiredAfter;
	public static List<AnnouncementModel> cachedSlideModels;
	public static long slidesExpiredAfter;
	
	
	public static List<AnnouncementModel> getAnnouncementsForMainPage() {
		if (Calendar.getInstance().getTimeInMillis() <= announcementsExpiredAfter) {
			return cachedAnnouncementModels;
		} else {
			Query annQuery = JPA.em().createQuery("from Announcement where isDeleted = false and isPublished = true");
			List<Announcement> announcements = annQuery.getResultList();
	
			Logger.info("AnnouncementService.announcements.size: " + announcements.size());
			List<AnnouncementModel> events = new ArrayList<>(announcements.size());
			for (Announcement ann : announcements)
				events.add(new AnnouncementModel(ann));
			
			cachedAnnouncementModels = events;
			announcementsExpiredAfter = Calendar.getInstance().getTimeInMillis() + cacheTime;
			Logger.debug("getAnnouncementsForMainPage.Events.size = " + events.size());
			return events;
		}
	}

	public static List<AnnouncementModel> getAnnouncementSlidesForMainPage() {
		if (Calendar.getInstance().getTimeInMillis() <= announcementsExpiredAfter) {
			return cachedSlideModels;
		} else {
			Query popularQuery = JPA.em().createQuery("from Announcement where isDeleted = false and isPublished = true and isSlide = true order by ID DESC");
			List<Announcement> announcements = popularQuery.getResultList();
			Logger.info("AnnouncementService.announcements.size: " + announcements.size());
			
			List<AnnouncementModel> annModelList = new ArrayList<AnnouncementModel>();
			for (Announcement announcement : announcements) {
				annModelList.add(new AnnouncementModel(announcement));
			}

			cachedSlideModels = annModelList;
			slidesExpiredAfter = Calendar.getInstance().getTimeInMillis() + cacheTime;
			Logger.debug("getAnnouncementSlidesForMainPage.Announcement.size = " + annModelList.size());
			
			return annModelList;
		}
		
	}

	/**
	 * Возвращает объявление
	 * @param uniqueName
	 * @param startDate
	 * @param endDate
	 * @return
	 */
	public static Announcement getAnnouncement(String uniqueName, Calendar startDate, Calendar endDate){
		List<Announcement> result =  JPA.em().createQuery("from Announcement where (publishDate between :startDate and :endDate) and uniqueName = :name")
	    		.setParameter("name", uniqueName)
	    		.setParameter("startDate", startDate)
	    		.setParameter("endDate", endDate)
	    		.setMaxResults(1)
	    		.getResultList();
		return result.size() > 0 ? result.get(0) : null;
	}
	
	public static List<Announcement> getActionsAnnouncements(Calendar curTime, boolean isActive) {
		EntityManager em = JPA.em();
		Query query = null;
		if (isActive) {
			query = em.createQuery("from Announcement where isPublished = true and isDeleted = false and endDate > :date and type = 1 order by id desc");
		} else {
			query = em.createQuery("from Announcement where isPublished = true and isDeleted = false and endDate <= :date and type = 1 order by id desc");
		}
		query.setParameter("date", curTime);
        return query.getResultList();
	}
	
	public static List<Announcement> getNewsAnnouncements(Calendar startDate, Calendar endDate) {
		Query query = JPA.em().createQuery("from Announcement where isPublished = true and isDeleted = false and (publishDate between :startDate and :endDate) and type = 0 order by id desc")
				.setParameter("startDate", startDate)
				.setParameter("endDate", endDate);
		 return query.getResultList();
	}
	
	
	public static Announcement getNextAnnouncement(Announcement current, int type) {
		List<Announcement> nextList = JPA.em().createQuery("from Announcement where publishDate > :fromDate and isPublished = true and isDeleted = false and type = :type order by publishDate asc")
    			.setParameter("type", type)
				.setParameter("fromDate", current.getPublishDate())
    			.setMaxResults(1)
    			.getResultList();
		return nextList.size() > 0 ? nextList.get(0) : null; 
	}
	
	public static Announcement getPrevAnnouncement(Announcement current, int type) {
		List<Announcement> nextList = JPA.em().createQuery("from Announcement where publishDate < :fromDate and isPublished = true and isDeleted = false and type = :type order by publishDate desc")
    			.setParameter("type", type)
				.setParameter("fromDate", current.getPublishDate())
    			.setMaxResults(1)
    			.getResultList();
		return nextList.size() > 0 ? nextList.get(0) : null; 
	}

}
