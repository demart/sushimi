package kz.sushimi.console.services.dictionaries;

import java.util.List;

import org.apache.commons.lang.StringUtils;

import kz.sushimi.console.exceptions.ValidationException;
import kz.sushimi.console.models.dictionaries.DeliveryPriceModel;
import kz.sushimi.console.persistence.dictionaries.DeliveryPrice;
import kz.sushimi.console.persistence.users.User;
import kz.sushimi.console.services.UserService;
import play.db.jpa.JPA;

public class DeliveryPriceService {

	/**
	 * Возвращает запись по Id
	 * @param deliverPriceId - Идентификатор записи
	 * 
	 * @return
	 */
	public static DeliveryPrice getDeliveryPriceById(Long deliverPriceId) {
		return DeliveryPrice.findById(deliverPriceId);
	}
	
	/**
	 * Добавить новый районов доставки
	 * 
	 * @return
	 * @throws ValidationException 
	 */
	public static void addDeliveryPrices(DeliveryPriceModel[] models, String userLogin) throws ValidationException {
		for (DeliveryPriceModel deliveryPriceModel : models) {
			if (deliveryPriceModel == null)
				throw new NullPointerException("model is null");
			/*
			if (StringUtils.isEmpty(cityModel.getCode()))
				throw new ValidationException("city code is null or empty");
			*/
			if (StringUtils.isEmpty(deliveryPriceModel.getName()))
				throw new ValidationException("delivery name is null or empty");
			
			User user = UserService.getUserByLogin(userLogin);
			DeliveryPrice deliveryPrice = new DeliveryPrice();
			deliveryPrice.setName(deliveryPriceModel.getName());
			deliveryPrice.setPrice(deliveryPriceModel.getPrice());
			deliveryPrice.setDeleted(false);
			deliveryPrice.setUser(user);
			deliveryPrice.save();
		}
	}	
	
	/**
	 * редактировать район доставки
	 * 
	 * @return
	 * @throws ValidationException 
	 */
	public static void updateDeliveryPrices(DeliveryPriceModel[] models, String userLogin) throws ValidationException {
		for (DeliveryPriceModel deliveryPriceModel : models) {
			if (deliveryPriceModel == null)
				throw new NullPointerException("model is null");
			
			DeliveryPrice deliveryPrice = DeliveryPrice.findById(deliveryPriceModel.getId());
			if (deliveryPrice == null)
				throw new ValidationException("delivery not found");
			
			if (StringUtils.isNotEmpty(deliveryPriceModel.getName()))
				deliveryPrice.setName(deliveryPriceModel.getName());
			
			//if (StringUtils.isNotEmpty(cityModel.getCode()))
				deliveryPrice.setPrice(deliveryPriceModel.getPrice());
			
				deliveryPrice.save();
		}
	}		
	
	/**
	 * Удалить запись района
	 * @param id
	 * @throws ValidationException 
	 */
	public static Long deleteDeliveryPrice(Long id, String userLogin) throws ValidationException {
		if (id == null || id <= 0)
			throw new ValidationException("delivery is id null or empty");
		DeliveryPrice deliveryPrice = DeliveryPrice.findById(id);
		deliveryPrice.setDeleted(true);
		deliveryPrice.save();
		return deliveryPrice.getId();
	}	
	
	/**
	 * Кол-во записей районов
	 * 
	 * @return
	 */
	public static long getDeliveryPricesCount() {
		return DeliveryPrice.count();
	}

	
	public static List<DeliveryPrice> getDeliveryPrices(int start, int limit) {
		return DeliveryPrice.findAll();
	}
	
	public static List<DeliveryPrice> getDeliveryExtraPrices(int start, int limit) {
		return JPA.em().createQuery("from DeliveryPrice where deleted=false order by name").setFirstResult(start).setMaxResults(limit).getResultList();
	}
	
}
