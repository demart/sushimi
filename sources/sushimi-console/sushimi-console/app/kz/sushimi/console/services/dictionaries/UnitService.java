package kz.sushimi.console.services.dictionaries;

import java.util.List;

import kz.sushimi.console.exceptions.ValidationException;
import kz.sushimi.console.models.dictionaries.UnitModel;
import kz.sushimi.console.persistence.dictionaries.Unit;
import kz.sushimi.console.persistence.users.User;
import kz.sushimi.console.services.UserService;

import org.apache.commons.lang.StringUtils;

import play.db.jpa.JPA;

/**
 * Класс сервис для работы с единицами измерения
 * 
 * @author Demart
 *
 */
public class UnitService {

	/**
	 * Возвращает запись единицы измерения
	 * @param unitId - Идентификатор записи
	 * 
	 * @return
	 */
	public static Unit getUnitById(Long unitId) {
		return Unit.findById(unitId);
	}	

	/**
	 * Добавляет данные источников
	 * @param models
	 * @param connected
	 * @throws ValidationException 
	 */
	public static void addUnits(UnitModel[] models, String userLogin) throws ValidationException {
		// TODO Auto-generated method stub
		for (UnitModel unitModel : models) {
			if (unitModel == null)
				throw new NullPointerException("model is null");
			
			if (StringUtils.isEmpty(unitModel.getName()))
				throw new ValidationException("unit name is null or empty");
			if (StringUtils.isEmpty(unitModel.getShortName()))
				throw new ValidationException("unit short name is null or empty");
			
			User user = UserService.getUserByLogin(userLogin);
			
			Unit unit = new Unit();
			unit.setName(unitModel.getName());
			unit.setShortName(unitModel.getShortName());
			unit.setUser(user);
			unit.save();
		}
	}	
	
	/**
	 * Добавляет данные источников
	 * @param models
	 * @param connected
	 * @throws ValidationException 
	 */
	public static void updateUnits(UnitModel[] models, String userLogin) throws ValidationException {
		// TODO Auto-generated method stub
		for (UnitModel unitModel : models) {
			if (unitModel == null)
				throw new NullPointerException("model is null");
			
			Unit unit = Unit.findById(unitModel.getId());
			
			if (StringUtils.isNotEmpty(unitModel.getName()))
				unit.setName(unitModel.getName());
			
			if (StringUtils.isNotEmpty(unitModel.getShortName()))
				unit.setShortName(unitModel.getShortName());
			
			unit.save();
		}
	}	
	
	/**
	 * Удалить запись единицы измерения
	 * @param id
	 * @throws ValidationException 
	 */
	public static Long deleteUnit(Long id, String userLogin) throws ValidationException {
		if (id == null || id <= 0)
			throw new ValidationException("unit is id null or empty");
		Unit unit = Unit.findById(id);
		unit = unit.delete();
		return unit.getId();
	}
	
	/**
	 * Кол-во записей единиц измерения
	 * 
	 * @return
	 */
	public static long getUnitsCount() {
		return Unit.count();
	}
	
	/**
	 * Возвращает массив единиц измерений
	 * @param start начальная позиция
	 * @param limit сколько нужно взять записей
	 * @return
	 */
	public static List<Unit> getUnits(int start, int limit) {
		return JPA.em().createQuery("from Unit order by name").setFirstResult(start).setMaxResults(limit).getResultList();
	}
		
}
