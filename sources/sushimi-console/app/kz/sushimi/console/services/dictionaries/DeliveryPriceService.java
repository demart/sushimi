package kz.sushimi.console.services.dictionaries;

import java.util.List;

import kz.sushimi.console.persistence.dictionaries.DeliveryPrice;

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
	
	public static List<DeliveryPrice> getDeliveryExtraPrices(int start, int limit) {
		return DeliveryPrice.findAll();
	}
	
}
