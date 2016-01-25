package kz.sushimi.models.integration.order;


/**
 * Модель описывает позицию заказа для синхронизации с сайтом
 * 
 * @author artem.demidovich
 *
 */
public class SushimiWebOrderItemModel {

	public String productCode;
	
	public Integer count;
	
	public Integer freeCount;
	
	public Integer sum;
	
}
