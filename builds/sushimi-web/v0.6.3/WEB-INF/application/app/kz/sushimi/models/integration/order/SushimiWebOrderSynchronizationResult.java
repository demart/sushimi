package kz.sushimi.models.integration.order;

public class SushimiWebOrderSynchronizationResult {

	/**
	 * Выполнилась операция успешно
	 */
	public Boolean success;
	
	/**
	 * Если была какая-то ошибка
	 */
	public String message;
	
	/**
	 * Идентификатор записи на сайте (Сделано для общих случаев когда нужно передавать ID записей для последующей синхронизации)
	 */
	public String siteRecordId;
}
