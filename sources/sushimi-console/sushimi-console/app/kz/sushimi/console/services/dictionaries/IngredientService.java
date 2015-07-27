package kz.sushimi.console.services.dictionaries;

import java.util.List;

import kz.sushimi.console.exceptions.ValidationException;
import kz.sushimi.console.models.dictionaries.IngredientModel;
import kz.sushimi.console.persistence.dictionaries.Ingredient;
import kz.sushimi.console.persistence.dictionaries.Unit;
import kz.sushimi.console.persistence.users.User;
import kz.sushimi.console.services.UserService;

import org.apache.commons.lang.StringUtils;

import play.db.jpa.JPA;

/**
 * Класс сервиса для работы со справочником ингредиентов
 * 
 * @author Demart
 *
 */
public class IngredientService {

	/**
	 * Возвращает запись ингридиента по Id
	 * @param unitId - Идентификатор записи
	 * 
	 * @return
	 */
	public static Ingredient getIngredientById(Long intgredientId) {
		return Ingredient.findById(intgredientId);
	}
	
	/**
	 * Добавить новый ингредиент
	 * 
	 * @return
	 * @throws ValidationException 
	 */
	public static void addIngredients(IngredientModel[] models, String userLogin) throws ValidationException {
		for (IngredientModel model : models) {
			if (model == null)
				throw new NullPointerException("model is null");
			
			if (StringUtils.isEmpty(model.getName()))
				throw new ValidationException("ingredient name is null or empty");
			if (model.getUnitId() == null || model.getUnitId() <= 0)
				throw new ValidationException("ingredient unit id is null or empty");
			Unit unit = UnitService.getUnitById(model.getUnitId());
			if (unit == null)
				throw new ValidationException("ingredient unit not found");
			
			User user = UserService.getUserByLogin(userLogin);
			
			Ingredient ingredient = new Ingredient();
			ingredient.setName(model.getName());
			ingredient.setDescription(model.getDescription());
			ingredient.setUnit(unit);
			ingredient.setUser(user);
			ingredient.save();
		
		}
	}
	
	
	/**
	 * Измеить существующий ингредиент
	 * 
	 * @return
	 * @throws ValidationException 
	 */
	public static void updateIngredients(IngredientModel[] models, String userLogin) throws ValidationException {
		for (IngredientModel model : models) {
			if (model == null)
				throw new NullPointerException("model is null");

			if (model.getId() == null || model.getId() <= 0)
				throw new ValidationException("ingredient id is null or empty");
			
			Ingredient ingredient = Ingredient.findById(model.getId());
			if (ingredient == null)
				throw new ValidationException("ingredient not found");
			
			if (model.getUnitId() != null && model.getUnitId() > 0) {
				Unit unit = UnitService.getUnitById(model.getUnitId());
				if (unit == null)
					throw new ValidationException("ingredient unit not found");
				ingredient.setUnit(unit);
			}
			
			if (StringUtils.isNotEmpty(model.getName()))
					ingredient.setName(model.getName());
			
			if (StringUtils.isNotEmpty(model.getDescription()))
				ingredient.setDescription(model.getDescription());
			
			ingredient.save();	
		}
	}	
	
	
	/**
	 * Удалить запись ингредиента
	 * @param id
	 * @throws ValidationException 
	 */
	public static Long deleteIngredient(Long id, String userLogin) throws ValidationException {
		if (id == null || id <= 0)
			throw new ValidationException("ingredient is id null or empty");
		Ingredient ingredient = Ingredient.findById(id);
		ingredient = ingredient.delete();
		return ingredient.getId();
	}

	
	/**
	 * Кол-во записей ингрединетов
	 * 
	 * @return
	 */
	public static long getIngredientsCount() {
		return Ingredient.count();
	}
	
	/**
	 * Возвращает массив ингрединетов
	 * @param start начальная позиция
	 * @param limit сколько нужно взять записей
	 * @return
	 */
	public static List<Ingredient> getIngredients(int start, int limit) {
		return JPA.em().createQuery("from Ingredient order by name").setFirstResult(start).setMaxResults(limit).getResultList();
	}
	
	
}
