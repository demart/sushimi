package kz.sushimi.console.persistence.warehouses;

/**
 * Тип операций на складе
 * 
 * @author Demart
 *
 */
public enum WarehouseOutcomeType {

	NONE,
	
	/**
	 * Расход на продукцию
	 */
	OUTCOME,
	
	/**
	 * Списание продуктов (Испортились, срок годности)
	 */
	WRITEOFF
}
