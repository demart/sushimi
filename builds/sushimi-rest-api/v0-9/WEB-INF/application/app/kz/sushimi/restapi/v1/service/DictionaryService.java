package kz.sushimi.restapi.v1.service;

import java.util.Calendar;
import java.util.Dictionary;
import java.util.Hashtable;
import java.util.List;
import java.util.Map.Entry;

import javax.persistence.Query;

import kz.sushimi.persistence.dictionaries.Category;
import kz.sushimi.persistence.dictionaries.City;
import kz.sushimi.persistence.dictionaries.Department;
import play.db.jpa.JPA;
import play.utils.Properties;

public class DictionaryService {

	public static final String MinOrderSumKey = "sushimi.minOrderSum";
	public static List<City> cities;
	public static City defaultCity;
	
	public static long cacheTime = 7200000; // 120 min
	public static Dictionary<String, Object> cache = new Hashtable<String, Object>();
	public static Dictionary<String, Long> cacheExpiraionTime = new Hashtable<String, Long>();	
	
	
	public static City getCityById(int id){
		return (City)JPA.em().find(City.class, id);
	}
	
	public static Department getDepartmentById(int id){
		return (Department)JPA.em().find(Department.class, id);
	}	
	
	
	public static List<City> getCities() {
		if (cities == null) {
			cities = (List<City>)JPA.em().createQuery("from City where isDeleted=false and isPublished=true order by id asc").getResultList();
		}
		return cities;
	}
	
	public static City getDefaultCity() {
		if (defaultCity == null) {
			List<City> cities = getCities();
			if (cities.size() > 0) 
				defaultCity = (City)cities.get(0);
		}
		return defaultCity;
	}	
	
	
	public static int getDefaultMinSum() {
		return getDefaultCity().getMinOrderSum();
	}
	
	public static List<Department> getCityDepartments(City city) {
		Long cacheExpTime = cacheExpiraionTime.get("CITY_" + city.getId() + "_DEPARTMENTS");
		cacheExpTime = cacheExpTime == null ? 0 : cacheExpTime;
		if (Calendar.getInstance().getTimeInMillis() <=  cacheExpTime) {
			return (List<Department>)cache.get("CITY_" + city.getId() + "_DEPARTMENTS");
		}
		
		Query cityDepartmentsQuery = JPA.em().createQuery("from Department where city.id = :cityId and isDeleted = false and isPublished = true");
		cityDepartmentsQuery.setParameter("cityId", city.getId());
		List<Category> rootCategories = cityDepartmentsQuery.getResultList();
		cache.put("CITY_" + city.getId() + "_DEPARTMENTS", rootCategories);
		cacheExpiraionTime.put("CITY_" + city.getId() + "_DEPARTMENTS", Calendar.getInstance().getTimeInMillis() + cacheTime);
		return (List<Department>)cache.get("CITY_" + city.getId() + "_DEPARTMENTS");
	}
	
}
