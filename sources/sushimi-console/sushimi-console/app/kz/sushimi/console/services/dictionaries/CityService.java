package kz.sushimi.console.services.dictionaries;

import java.util.List;

import kz.sushimi.console.exceptions.ValidationException;
import kz.sushimi.console.models.dictionaries.CityModel;
import kz.sushimi.console.persistence.dictionaries.City;
import kz.sushimi.console.persistence.users.User;
import kz.sushimi.console.services.UserService;

import org.apache.commons.lang.StringUtils;

import play.db.jpa.JPA;


public class CityService {

	/**
	 * Возвращает запись города по Id
	 * @param cityId
	 * @return
	 */
	public static City getCityById(Long cityId) {
		return City.findById(cityId);
	}
	
	/**
	 * Добавить новый город
	 * 
	 * @return
	 * @throws ValidationException 
	 */
	public static void addCities(CityModel[] models, String userLogin) throws ValidationException {
		for (CityModel cityModel : models) {
			if (cityModel == null)
				throw new NullPointerException("model is null");
			
			if (StringUtils.isEmpty(cityModel.getCode()))
				throw new ValidationException("city code is null or empty");
			
			if (StringUtils.isEmpty(cityModel.getName()))
				throw new ValidationException("city name is null or empty");
			
			User user = UserService.getUserByLogin(userLogin);
			City city = new City();
			city.setName(cityModel.getName());
			city.setCode(cityModel.getCode());
			city.setUser(user);
			city.save();
		}
	}	
	
	
	/**
	 * Добавить новый город
	 * 
	 * @return
	 * @throws ValidationException 
	 */
	public static void updateCities(CityModel[] models, String userLogin) throws ValidationException {
		for (CityModel cityModel : models) {
			if (cityModel == null)
				throw new NullPointerException("model is null");
			
			City city = City.findById(cityModel.getId());
			if (city == null)
				throw new ValidationException("city not found");
			
			if (StringUtils.isNotEmpty(cityModel.getName()))
				city.setName(cityModel.getName());
			
			if (StringUtils.isNotEmpty(cityModel.getCode()))
				city.setCode(cityModel.getCode());
			
			city.save();
		}
	}		
	
	/**
	 * Удалить запись города
	 * @param id
	 * @throws ValidationException 
	 */
	public static Long deleteCity(Long id, String userLogin) throws ValidationException {
		if (id == null || id <= 0)
			throw new ValidationException("city is id null or empty");
		City city = City.findById(id);
		city = city.delete();
		return city.getId();
	}	
	
	
	/**
	 * Кол-во записей городов
	 * 
	 * @return
	 */
	public static long getCitiesCount() {
		return City.count();
	}

	/**
	 * Возвращает массив городов
	 * @param start начальная позиция
	 * @param limit сколько нужно взять записей
	 * @return
	 */
	public static List<City> getCities(int start, int limit) {
		return JPA.em().createQuery("from City order by name").setFirstResult(start).setMaxResults(limit).getResultList();
	}

}
