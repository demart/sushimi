package kz.sushimi.restapi.v1.service;

import java.util.List;
import java.util.Map.Entry;

import kz.sushimi.persistence.dictionaries.City;
import play.db.jpa.JPA;
import play.utils.Properties;

public class DictionaryService {

	public static List<City> getCities() {
		return (List<City>)JPA.em().createQuery("from City where isDeleted=false and isPublished=true order by id asc").getResultList();
	}
	
	public static City getDefaultCity() {
		List<City> cities = (List<City>)JPA.em().createQuery("from City where isDeleted=false and isPublished=true order by id asc").setMaxResults(1).getResultList();
		if (cities.size() > 0) 
			return cities.get(0);
		return null;
	}
	
	public static int getDefaultMinSum() {
		List<City> cities =JPA.em().createQuery("from City where isDeleted=false and isPublished=true order by id asc").setMaxResults(1).getResultList();
		if (cities.size() > 0) 
			return cities.get(0).getMinOrderSum();
		
		return 3000;
	}
	
}
