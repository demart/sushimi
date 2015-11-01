package kz.sushimi.console.services;

import java.util.Calendar;
import java.util.GregorianCalendar;
import java.util.List;

import org.apache.commons.lang.StringUtils;

import kz.sushimi.console.exceptions.ValidationException;
import kz.sushimi.console.models.orders.PromotionModel;
import kz.sushimi.console.persistence.dictionaries.Product;
import kz.sushimi.console.persistence.promotions.Promotion;
import kz.sushimi.console.persistence.users.User;
import play.Logger;
import play.db.jpa.JPA;

public class PromotionService {

	public static List<Promotion> getPromotions(int start, int limit) {
		return JPA.em().createQuery("from Promotion where isPublished= true and isDeleted = false")
				.setMaxResults(limit).setFirstResult(start).getResultList();
	}
	
	//для вывода в админ панель
	public static List<Promotion> getAdminPromotions(int start, int limit) {
		return JPA.em().createQuery("from Promotion where isDeleted = false")
				.setMaxResults(limit).setFirstResult(start).getResultList();
	}

	/**
	 * Добавить новую акцию
	 * 
	 * @return
	 * @throws ValidationException 
	 */
	public static void addPromotions(PromotionModel[] models, String userLogin) throws ValidationException {
		for (PromotionModel promotionModel : models) {
			if (promotionModel == null)
				throw new NullPointerException("model is null");
			

			
			User user = UserService.getUserByLogin(userLogin);
			Promotion promotion = new Promotion();
			promotion.setName(promotionModel.getName());
			promotion.setDiscount(promotionModel.getDiscount());
			promotion.setOrderSum(promotionModel.getOrderSum());
			promotion.setDeleted(false);
			
			//Вывод название продукта в подарок

			Product product = null;
			if (promotionModel.getProductId() != null && promotionModel.getProductId() > 0 ) {
			product = product.findById(promotionModel.getProductId());
						}


			promotion.setProductCount(promotionModel.getProductCount());
			/*
			//Начало акции
			if (promotion.getFromTime() == null)
			    throw new ValidationException("fromTime = null");
				*/
			/*
			GregorianCalendar calendar = new GregorianCalendar();
			promotion.setFromTime (calendar);
			*/
				Calendar toDate = Calendar.getInstance();
				toDate.setTimeInMillis(promotionModel.getFromTime().getTime());
				promotion.setFromTime(toDate);
				
				Calendar toToDate = Calendar.getInstance();
				toToDate.setTimeInMillis(promotionModel.getToTime().getTime());
				promotion.setToTime(toToDate);
			
			
			promotion.setPublished(promotionModel.getIsPublished());
			promotion.setType(promotionModel.getType());
			promotion.setValueType(promotionModel.getValueType());
			promotion.setProduct(product);
			promotion.setUser(user);
			promotion.save();
		}
	}	

	/**
	 * Добавить новую акцию
	 * 
	 * @return
	 * @throws ValidationException 
	 */
	public static void updatePromotions(PromotionModel[] models, String userLogin) throws ValidationException {
		for (PromotionModel promotionModel : models) {
			if (promotionModel == null)
				throw new NullPointerException("model is null");
			
			Promotion promotion = Promotion.findById(promotionModel.getId());
			if (promotion == null)
				throw new ValidationException("promotion not found");
			
			if (StringUtils.isNotEmpty(promotionModel.getName()))
				promotion.setName(promotionModel.getName());
			
			//promotion.setDiscount(promotionModel.getDiscount());
			
			if (promotionModel.getOrderSum() != null)
				promotion.setOrderSum(promotionModel.getOrderSum());
			
			if (promotionModel.getDiscount() != null)
				promotion.setDiscount(promotionModel.getDiscount());
			
			promotion.setDeleted(false);
			
			if (promotionModel.getIsPublished() != null)
				promotion.setPublished(promotionModel.getIsPublished());
			
			if (promotionModel.getType() != null)
				promotion.setType(promotionModel.getType());
			
			if (promotionModel.getValueType() != null)
				promotion.setValueType(promotionModel.getValueType());
			
			if (promotion.getProductCount() != null) 
				promotion.setProductCount(promotionModel.getProductCount());
			
 

				Calendar toDate = Calendar.getInstance();
				toDate.setTimeInMillis(promotionModel.getFromTime().getTime());
				if (toDate != null)
					promotion.setFromTime(toDate);

			
				Calendar toToDate = Calendar.getInstance();
				toToDate.setTimeInMillis(promotionModel.getToTime().getTime());
				if (toToDate != null)
					promotion.setToTime(toToDate);

			
			if (promotionModel.getProductId() != null) {
			Product product = null;
			product = product.findById(promotionModel.getProductId());
			promotion.setProduct(product);
			}
			
			promotion.save();
		}
	}	
	
	public static Long deletePromotion(Long id, String userLogin) throws ValidationException {
		if (id == null || id <= 0)
			throw new ValidationException("promotion is id null or empty");
		Promotion promotion = Promotion.findById(id);
		promotion.setDeleted(true);
		promotion.setPublished(false);
		promotion.save();
		return promotion.getId();
	}	
}
