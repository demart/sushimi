package kz.sushimi.restapi.v1.service;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import javax.persistence.Query;

import play.db.jpa.JPA;
import kz.sushimi.persistence.Feedback;
import kz.sushimi.persistence.FeedbackStatus;
import kz.sushimi.persistence.FeedbackType;
import kz.sushimi.persistence.dictionaries.City;
import kz.sushimi.persistence.dictionaries.Department;
import kz.sushimi.restapi.v1.models.feedback.FeedbackModel;
import kz.sushimi.restapi.v1.models.feedback.FeedbackRegisterModel;
import kz.sushimi.restapi.v1.models.feedback.FeedbackRegisterResponseModel;
import kz.sushimi.restapi.v1.models.feedback.FeedbacksWrapperModel;

public class FeedbackService {
	
	//public static final int pageSize = 10;
	
	public static FeedbacksWrapperModel getFeedbacks(Integer page, Integer pageSize, String type) {
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
		model.page = page;
		model.pageCount = (int) (totalCount / pageSize);
		model.pageSize = pageSize;
		model.feedbacks = new ArrayList<FeedbackModel>();
		
		for (Feedback feedback : feedbacks) {
			FeedbackModel fbModel = new FeedbackModel();
			fbModel.name = feedback.getClientName();
			fbModel.email = null;
			fbModel.id = feedback.getId();
			fbModel.phone = getMaskedPhoneNumber(feedback.getPhoneNumber());
			fbModel.text = feedback.getText();
			fbModel.feedbackType = feedback.getType().toString();
			fbModel.created = feedback.getCreatedDate().getTimeInMillis();
			model.feedbacks.add(fbModel);
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
		if (requestModel.type != null || !"".equals(requestModel.type))
			type = FeedbackType.valueOf(requestModel.type);
		
		Feedback fb = new Feedback();
		
		if (requestModel.cityId != null && requestModel.cityId > 0) {
			City city =  DictionaryService.getCityById(requestModel.cityId);
			if (city != null)
				fb.setCityName(city.getName());
		}
		
		if (requestModel.placeId != null && requestModel.placeId > 0 && type == FeedbackType.RESTAURANT) {
			Department department =  DictionaryService.getDepartmentById(requestModel.placeId);
			if (department != null)
				fb.setRestaurantName(department.getName());
		}
		
		fb.setClientName(requestModel.name);
		fb.setCreatedDate(Calendar.getInstance());
		fb.setOrderNumber(requestModel.orderNumber);
		fb.setPhoneNumber(requestModel.phone);
		fb.setPublished(false);
		fb.setStatus(FeedbackStatus.NEW);
		fb.setText(requestModel.text);
		fb.setType(type);
		
		JPA.em().persist(fb);
		
		return true;
	}
	
}
