package kz.sushimi.service;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import javax.persistence.Query;

import kz.sushimi.models.feedback.FeedbackModel;
import kz.sushimi.models.feedback.FeedbackRegisterModel;
import kz.sushimi.models.feedback.FeedbackTypesWrapperModel;
import kz.sushimi.models.feedback.FeedbacksWrapperModel;
import kz.sushimi.persistence.Feedback;
import kz.sushimi.persistence.FeedbackStatus;
import kz.sushimi.persistence.FeedbackType;
import kz.sushimi.persistence.dictionaries.City;
import kz.sushimi.persistence.dictionaries.Department;
import kz.sushimi.service.broadcast.PhoneService;
import play.db.jpa.JPA;

public class FeedbackService {
	
	public static final int pageSize = 20;
	
	public static FeedbacksWrapperModel getFeedbacks(Integer page, String type) {
		FeedbackType feedbackType = FeedbackType.ALL;
		if (type != null && !("".equals(type)))
			feedbackType = FeedbackType.valueOf(type);
		if (page == null || page < 0)
			page = 0;
		
		Query feedbacksQuery;
		Long totalCount = 0l;
		if (feedbackType == FeedbackType.ALL) {
			feedbacksQuery = JPA.em().createQuery("from Feedback where isPublished = true and status = 'ACCEPTED' order by createdDate Desc");
			totalCount = (Long)JPA.em().createQuery("select count(*) from Feedback where isPublished = true and status = 'ACCEPTED'").getSingleResult();
		} else {
			feedbacksQuery = JPA.em().createQuery("from Feedback where isPublished = true and status = 'ACCEPTED' and type = :type order by createdDate Desc");
			feedbacksQuery.setParameter("type", feedbackType);
			Query countQuery = JPA.em().createQuery("select count(*) from Feedback where isPublished = true and status = 'ACCEPTED'");
			countQuery.setParameter("type", feedbackType);
			totalCount = (Long)countQuery.getSingleResult();
		}
		feedbacksQuery.setFirstResult(pageSize * page);
		feedbacksQuery.setMaxResults(pageSize);
		List<Feedback> feedbacks = feedbacksQuery.getResultList();
		
		FeedbacksWrapperModel model = new FeedbacksWrapperModel();
			model.FAQs = new ArrayList<String>();
			model.Page = page;
			model.PageCount = (int) (totalCount / pageSize) + 1;
			model.PageSize = 20;
			model.FeedbackTypes = new ArrayList<FeedbackTypesWrapperModel>();
		FeedbackTypesWrapperModel feedbackTypesModel = new FeedbackTypesWrapperModel();
			feedbackTypesModel.Id = feedbackType.toString();
			feedbackTypesModel.Name = feedbackType.toString();
			feedbackTypesModel.NextPage = (totalCount / pageSize) > page ? page + 1 : 0;
			feedbackTypesModel.SocialLiked = false;
			feedbackTypesModel.Text = null;
			feedbackTypesModel.Feedbacks = new ArrayList<FeedbackModel>();
		model.FeedbackTypes.add(feedbackTypesModel);
		
		for (Feedback feedback : feedbacks) {
			FeedbackModel fbModel = new FeedbackModel();
			fbModel.Fio = feedback.getClientName();
			fbModel.Email = null;
			fbModel.Id = feedback.getId();
			fbModel.Phone = getMaskedPhoneNumber(feedback.getPhoneNumber());
			fbModel.Text = feedback.getText();
			fbModel.Uid = feedback.getId();
			fbModel.Visible = true;
			fbModel.FeedbackType = feedback.getType().toString();
			fbModel.Created = "//Date(" + feedback.getCreatedDate().getTimeInMillis() + ")//";
			feedbackTypesModel.Feedbacks.add(fbModel);
		}
		
		return model;
	}
	
	public static String getMaskedPhoneNumber(String phone) {
		if (phone == null || "".equals(phone)) return phone;
		if (phone.length() == 10) {
			String firstPart = phone.substring(0, 3);
			//String secondPart = phone.substring(5, 8);
			String lastPart = phone.substring(6, 10);
			return "+7" + firstPart + "***" + lastPart;
		} else {
			return null;
		}
			
	}

	public static boolean registerFeedback(FeedbackRegisterModel requestModel) {
		FeedbackType type = FeedbackType.FEEDBACK;
		if (requestModel.ThemeId != null || !"".equals(requestModel.ThemeId))
			type = FeedbackType.valueOf(requestModel.ThemeId);
		
		Feedback fb = new Feedback();
		
		if (requestModel.CityId != null && requestModel.CityId > 0) {
			City city =  DictionaryService.getCityById(requestModel.CityId);
			if (city != null)
				fb.setCityName(city.getName());
		}
		
		if (requestModel.PlaceId != null && requestModel.PlaceId > 0 && type == FeedbackType.RESTAURANT) {
			Department department =  DictionaryService.getDepartmentById(requestModel.PlaceId);
			if (department != null)
				fb.setRestaurantName(department.getName());
		}
		
		fb.setClientName(requestModel.FIO);
		fb.setCreatedDate(Calendar.getInstance());
		fb.setOrderNumber(requestModel.OrderNumber);
		fb.setPhoneNumber(requestModel.Phone);
		fb.setPublished(false);
		fb.setStatus(FeedbackStatus.NEW);
		fb.setText(requestModel.Text);
		fb.setType(type);
		
		JPA.em().persist(fb);
		
		PhoneService.addOrUpdatePhone(fb.getPhoneNumber(), fb.getClientName());
		
		return true;
	}

	public static FeedbackModel getFeedbackById(Long id) {
		if (id == null || id < 1) return null;
		
		Feedback feedback = JPA.em().find(Feedback.class, id);
		if (feedback == null) return null;
		
		FeedbackModel fbModel = new FeedbackModel();
		fbModel.Fio = feedback.getClientName();
		fbModel.Email = null;
		fbModel.Id = feedback.getId();
		fbModel.Phone = getMaskedPhoneNumber(feedback.getPhoneNumber());
		fbModel.Text = feedback.getText();
		fbModel.Uid = feedback.getId();
		fbModel.Visible = true;
		fbModel.FeedbackType = feedback.getType().toString();
		fbModel.Created = "//Date(" + feedback.getCreatedDate().getTimeInMillis() + ")//";
		return fbModel;
	}
	
	
}
