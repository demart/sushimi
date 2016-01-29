package kz.sushimi.models;

import java.text.SimpleDateFormat;
import java.util.AbstractMap;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import java.util.Map.Entry;

import kz.sushimi.persistence.dictionaries.City;
import kz.sushimi.persistence.dictionaries.Department;
import kz.sushimi.service.DictionaryService;

public class CityModel {

	private int id;
	private String name;
	private boolean selected;
	
	private List<DepartmentModel> departments = new ArrayList<DepartmentModel>();
	
	/**
	 * Час откуда начать предлагать время
	 */
	private int startWorkHour;
	
	/**
	 * Час когда нужно закончить предлагать на сегодня
	 */
	private int endWorkHour;
	
	
	public CityModel(City city, boolean selected) {
		this.id = city.getId();
		this.name = city.getName();
		this.selected = selected;
		this.startWorkHour = city.getStartWorkHour();
		this.endWorkHour = city.getEndWorkHour();
		
		
		
		for (Department dep : DictionaryService.getCityDepartments(city)) {
			departments.add(new DepartmentModel(dep));
		}
	}
	
	public List<Entry<String, String>> getTime(int timeIntervalCount) {
		return ModelUtils.getTime(timeIntervalCount, startWorkHour, endWorkHour);
	}
	
	public List<DepartmentModel> getDepartments() {
		return departments;
	}

	public void setDepartments(List<DepartmentModel> departments) {
		this.departments = departments;
	}

	public int getStartWorkHour() {
		return startWorkHour;
	}

	public void setStartWorkHour(int startWorkHour) {
		this.startWorkHour = startWorkHour;
	}

	public int getEndWorkHour() {
		return endWorkHour;
	}

	public void setEndWorkHour(int endWorkHour) {
		this.endWorkHour = endWorkHour;
	}

	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public boolean isSelected() {
		return selected;
	}
	public void setSelected(boolean selected) {
		this.selected = selected;
	}
	
}
