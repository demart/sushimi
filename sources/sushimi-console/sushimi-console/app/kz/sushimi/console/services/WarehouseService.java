package kz.sushimi.console.services;

import java.util.Calendar;
import java.util.List;

import javassist.NotFoundException;
import kz.sushimi.console.exceptions.ValidationException;
import kz.sushimi.console.models.warehouses.WarehouseIncomeModel;
import kz.sushimi.console.models.warehouses.WarehouseItemModel;
import kz.sushimi.console.models.warehouses.WarehouseOutcomeModel;
import kz.sushimi.console.persistence.dictionaries.Ingredient;
import kz.sushimi.console.persistence.dictionaries.Unit;
import kz.sushimi.console.persistence.users.User;
import kz.sushimi.console.persistence.warehouses.WarehouseIncome;
import kz.sushimi.console.persistence.warehouses.WarehouseIncomeType;
import kz.sushimi.console.persistence.warehouses.WarehouseItem;
import kz.sushimi.console.persistence.warehouses.WarehouseOutcome;
import kz.sushimi.console.persistence.warehouses.WarehouseOutcomeType;
import kz.sushimi.console.services.dictionaries.IngredientService;
import kz.sushimi.console.services.dictionaries.UnitService;

import org.apache.commons.lang.StringUtils;

import play.db.jpa.JPA;

/**
 * Класс сервисов для работы со Складом
 * 
 * @author Demart
 *
 */
public class WarehouseService {

	/**
	 * Возвращает список записей прихода товара
	 * @return
	 */
	public static long getWarehouseIncomesCount() {
		return WarehouseIncome.count();
	}
	
	/**
	 * Возвращает постранично список приходников. Сотирует их по дате поступления
	 */
	public static List<WarehouseIncome> getWarehouseIncomes(int start, int limit) {
		return JPA.em().createQuery("from WarehouseIncome order by incomeDate desc").setMaxResults(limit).setFirstResult(start).getResultList();
	}
	
	/**
	 * Оформляет приход на склад 
	 * @param model - Модель данных прихода
	 * @throws NotFoundException 
	 */
	public static void addWarehouseIncome(WarehouseIncomeModel[] models, String userLogin) throws ValidationException {
		for (WarehouseIncomeModel model : models) {
			if (model == null)
				throw new ValidationException("Model is null");
			
			if (model.getGrossUnitId() <= 0)
				throw new ValidationException("GrossUnitId empty or null");
			if (model.getPurchaseUserId() <= 0)
				throw new ValidationException("PurchaseUserId empty or null");
			if (model.getWarehouseItemId() <= 0)
				throw new ValidationException("WarehouseItemId empty or null");
			
			Unit grossUnit = UnitService.getUnitById(model.getGrossUnitId());
			if (grossUnit == null)
				throw new ValidationException("GrossUnit not found");
			
			User purchaseUser = UserService.getUserById(model.getPurchaseUserId());
			if (purchaseUser == null)
				throw new ValidationException("PurchaseUser not found");
			
			WarehouseItem warehouseItem = WarehouseService.getWarehouseItemById(model.getWarehouseItemId());
			if (warehouseItem == null)
				throw new ValidationException("WarehouseItem not found");
			
			User user = UserService.getUserByLogin(userLogin);
			
			// Добавляем приход
			WarehouseIncome income = new WarehouseIncome();
			income.setCreatedDate(Calendar.getInstance());
			income.setGrossUnit(grossUnit);
			income.setGrossWeight(model.getGrossWeight());
			/*
			if (model.getIncomeDate() != null) {
				Calendar incomeDate = Calendar.getInstance();
				incomeDate.setTimeInMillis(model.getIncomeDate().getTime());
				income.setIncomeDate(incomeDate);
			}*/
			income.setIngredient(warehouseItem.getIngredient());
			income.setInvoiceNumber(model.getInvoiceNumber());
			income.setNetUnit(warehouseItem.getIngredient().getUnit());
			income.setNetWeight(model.getNetWeight());
			income.setPrice(model.getPrice());
			income.setPurchaseUser(purchaseUser);
			income.setType(WarehouseIncomeType.PURCHASE);
			income.setUser(user);
			income.setWarehouseItem(warehouseItem);
			income.save();
	
			// Пересчитываем приход на складе
			warehouseItem.setAmount(warehouseItem.getAmount() + model.getNetWeight());
			warehouseItem.save();
		}
	}

	
	/**
	 * Оформляет приход на склад 
	 * @param model - Модель данных прихода
	 * @throws NotFoundException 
	 */
	public static void updateWarehouseIncome(WarehouseIncomeModel[] models, String userLogin) throws ValidationException {
		for (WarehouseIncomeModel model : models) {
			if (model == null)
				throw new ValidationException("Model is null");
			
			if (model.getId() == null || model.getId() <= 0)
				throw new ValidationException("Model.Id is null");
			WarehouseIncome income = WarehouseIncome.findById(model.getId());
			if (income == null)
				throw new ValidationException("WarehouseIncome is null");
			
			if (model.getGrossUnitId() != null && model.getGrossUnitId() > 0) {
				Unit grossUnit = UnitService.getUnitById(model.getGrossUnitId());
				if (grossUnit == null)
					throw new ValidationException("GrossUnit not found");
				income.setGrossUnit(grossUnit);
			}
			
			if (model.getPurchaseUserId() != null && model.getPurchaseUserId() > 0) {
				User purchaseUser = UserService.getUserById(model.getPurchaseUserId());
				if (purchaseUser == null)
					throw new ValidationException("PurchaseUser not found");
				income.setPurchaseUser(purchaseUser);
			}
			
			if (model.getWarehouseItemId() != null && model.getWarehouseItemId() > 0) {
				WarehouseItem warehouseItem = WarehouseService.getWarehouseItemById(model.getWarehouseItemId());
				if (warehouseItem == null)
					throw new ValidationException("WarehouseItem not found");
				income.setWarehouseItem(warehouseItem);
			}
			
			if (model.getGrossWeight() != null && model.getGrossWeight() > 0)
				income.setGrossWeight(model.getGrossWeight());
			/*
			if (model.getIncomeDate() != null) {
				Calendar incomeDate = Calendar.getInstance();
				incomeDate.setTimeInMillis(model.getIncomeDate().getTime());
				income.setIncomeDate(incomeDate);
			}*/
			
			if (StringUtils.isNotEmpty(model.getInvoiceNumber()))
				income.setInvoiceNumber(model.getInvoiceNumber());
			
			income.setIngredient(income.getWarehouseItem().getIngredient());
			
			income.setNetUnit(income.getWarehouseItem().getIngredient().getUnit());
			
			Float was = 0f;
			if (model.getNetWeight() != null && model.getNetWeight() > 0) {
				was = income.getWarehouseItem().getAmount() - income.getNetWeight();
				income.setNetWeight(model.getNetWeight());
			}
			
			if (model.getPrice() != null && model.getPrice() > 0)
				income.setPrice(model.getPrice());
			
			if (model.getType() != null)
				income.setType(model.getType());
			
			income.save();
	
			// Пересчитываем приход на складе
			income.getWarehouseItem().setAmount(income.getNetWeight() + was);
			income.getWarehouseItem().save();
		}
	}	
	
	/**
	 * Удалить запись
	 * @param id
	 * @throws ValidationException 
	 */
	public static Long deleteWarehouseIncome(Long id, String userLogin) throws ValidationException {
		if (id == null || id <= 0)
			throw new ValidationException("warehouseIncome is id null or empty");
		WarehouseIncome item = WarehouseIncome.findById(id);
		item.getWarehouseItem().setAmount(item.getWarehouseItem().getAmount() - item.getNetWeight());
		item.getWarehouseItem().save();
		item = item.delete();
		return item.getId();
	}
	
	/**
	 * Возвращает запись позиции склада по Id
	 * @param warehouseItemId
	 * @return
	 */
	public static WarehouseItem getWarehouseItemById(Long warehouseItemId) {
		return WarehouseItem.findById(warehouseItemId);
	}
	
	
	/**
	 * Возвращает список записей прихода товара
	 * @return
	 */
	public static long getWarehouseOutcomesCount() {
		return WarehouseOutcome.count();
	}
	
	/**
	 * Возвращает постранично список приходников. Сотирует их по дате поступления
	 */
	public static List<WarehouseOutcome> getWarehouseOutcomes(int start, int limit) {
		return JPA.em().createQuery("from WarehouseOutcome order by outcomeDate desc").setMaxResults(limit).setFirstResult(start).getResultList();
	}	
	
	/**
	 * Оформляет списание со склада 
	 * @param model - данные 
	 * @param userLogin - логин текущего пользователя
	 * @return
	 * @throws ValidationException
	 */
	public static void addWarehouseOutcome(WarehouseOutcomeModel[] models, String userLogin) throws ValidationException {
		for (WarehouseOutcomeModel model : models) {
			if (model == null)
				throw new ValidationException("Model is null");
			
			if (model.getAmount() <= 0)
				throw new ValidationException("Amount empty or null");
			
			if (model.getWarehouseItemId() == null || model.getWarehouseItemId() <= 0)
				throw new ValidationException("warehouseItem.Id empty or null");
			WarehouseItem warehouseItem = WarehouseService.getWarehouseItemById(model.getWarehouseItemId());
			if (warehouseItem == null)
				throw new ValidationException("WarehouseItem not found");
			
			User user = UserService.getUserByLogin(userLogin);
					
			WarehouseOutcome outcome = new WarehouseOutcome();
			outcome.setAmount(model.getAmount());
			outcome.setOutcomeDate(model.getOutcomeDate());
			outcome.setType(WarehouseOutcomeType.WRITEOFF);
			outcome.setOutcomeReason(model.getOutcomeReason());
			outcome.setWarehouseItem(warehouseItem);
			outcome.setIngredient(warehouseItem.getIngredient());
			outcome.setUnit(warehouseItem.getIngredient().getUnit());
			outcome.setUser(user);
			outcome.save();
	
			// Пересчитываем расход на складе
			warehouseItem.setAmount(warehouseItem.getAmount() - model.getAmount());
			warehouseItem.save();
		}
	}
	
	
	/**
	 * Оформляет списание со склада 
	 * @param model - данные 
	 * @param userLogin - логин текущего пользователя
	 * @return
	 * @throws ValidationException
	 */
	public static void updateWarehouseOutcome(WarehouseOutcomeModel[] models, String userLogin) throws ValidationException {
		for (WarehouseOutcomeModel model : models) {
			if (model == null)
				throw new ValidationException("Model is null");
			
			if (model.getId() == null || model.getId() <= 0)
				throw new ValidationException("Model.Id is null");
			WarehouseOutcome outcome = WarehouseOutcome.findById(model.getId());
			if (outcome == null)
				throw new ValidationException("WarehouseOutcome is null");
			
			if (model.getWarehouseItemId() != null && model.getWarehouseItemId() > 0) {
				WarehouseItem warehouseItem = WarehouseService.getWarehouseItemById(model.getWarehouseItemId());
				if (warehouseItem == null)
					throw new ValidationException("WarehouseItem not found");
				outcome.setWarehouseItem(warehouseItem);
			}
					
			Float was = 0f;
			if (model.getAmount() != null && model.getAmount() > 0) {
				was = outcome.getWarehouseItem().getAmount() + outcome.getAmount();
				outcome.setAmount(model.getAmount());
			}
			
			if (model.getOutcomeDate() != null)
				outcome.setOutcomeDate(model.getOutcomeDate());
			
			if (StringUtils.isNotEmpty(model.getOutcomeReason()))
				outcome.setOutcomeReason(model.getOutcomeReason());
			
			if (model.getType() != null)
				outcome.setType(WarehouseOutcomeType.WRITEOFF);
			
			outcome.setIngredient(outcome.getWarehouseItem().getIngredient());
			outcome.setUnit(outcome.getWarehouseItem().getIngredient().getUnit());
			
			outcome.save();
	
			// Пересчитываем расход на складе
			outcome.getWarehouseItem().setAmount(was - outcome.getAmount());
			outcome.getWarehouseItem().save();
		}
	}	
	
	/**
	 * Удалить запись
	 * @param id
	 * @throws ValidationException 
	 */
	public static Long deleteWarehouseOutcome(Long id, String userLogin) throws ValidationException {
		if (id == null || id <= 0)
			throw new ValidationException("warehouseOutcome is id null or empty");
		WarehouseOutcome item = WarehouseOutcome.findById(id);
		item.getWarehouseItem().setAmount(item.getWarehouseItem().getAmount() + item.getAmount());
		item.getWarehouseItem().save();
		item = item.delete();
		return item.getId();
	}	
	
	
	// =================================
	// =================================
	
	/**
	 * Возвращает постранично список позиций на скаде
	 */
	public static List<WarehouseItem> getWarehouseItems(int start, int limit) {
		return JPA.em().createQuery("from WarehouseItem order by ingredient.name").setMaxResults(limit).setFirstResult(start).getResultList();
	}
	
	
	/**
	 * Возвращает список записей позиций на складе
	 * @return
	 */
	public static long getWarehouseItemsCount() {
		return WarehouseOutcome.count();
	}	
	
	/**
	 * добавляет позицию на скаде
	 * @param model - Модель данных прихода
	 * @throws NotFoundException 
	 */
	public static void addWarehouseItem(WarehouseItemModel[] models, String userLogin) throws ValidationException {
		for (WarehouseItemModel model : models) {
			if (model == null)
				throw new ValidationException("Model is null");
			
			if (model.getAmount() == null || model.getAmount() < 0)
				throw new ValidationException("amount empty or null");
			
			
			if (model.getIngredientId() == null || model.getIngredientId() <= 0)
				throw new ValidationException("ingredient empty or null");
			Ingredient ingredient = IngredientService.getIngredientById(model.getIngredientId());
			if (ingredient == null)
				throw new ValidationException("igredient not found");
			
			User user = UserService.getUserByLogin(userLogin);
			
			// Добавляем приход
			WarehouseItem item = new WarehouseItem();
			item.setAmount(model.getAmount());
			item.setIngredient(ingredient);
			item.setUser(user);
			item.save();
			
		}
	}
	
	
	/**
	 * добавляет позицию на скаде
	 * @param model - Модель данных прихода
	 * @throws NotFoundException 
	 */
	public static void updateWarehouseItem(WarehouseItemModel[] models, String userLogin) throws ValidationException {
		for (WarehouseItemModel model : models) {
			if (model == null)
				throw new ValidationException("Model is null");
			
			if (model.getId() == null || model.getId() <= 0)
				throw new ValidationException("id empty or null");
			
			WarehouseItem item = WarehouseItem.findById(model.getId());
			if (item == null)
				throw new ValidationException("warehouseItem not found");
			
			if (model.getAmount() != null && model.getAmount() >= 0)
				item.setAmount(model.getAmount());
			
			if (model.getIngredientId() != null && model.getIngredientId() > 0) {
				Ingredient ingredient = IngredientService.getIngredientById(model.getIngredientId());
				if (ingredient == null)
					throw new ValidationException("igredient not found");

				item.setIngredient(ingredient);
			}
			
			item.save();
		}
	}
	
	
	/**
	 * Удалить запись единицы измерения
	 * @param id
	 * @throws ValidationException 
	 */
	public static Long deleteWarehouseItem(Long id, String userLogin) throws ValidationException {
		if (id == null || id <= 0)
			throw new ValidationException("warehouseItem is id null or empty");
		WarehouseItem item = WarehouseItem.findById(id);
		item = item.delete();
		return item.getId();
	}
		
}
