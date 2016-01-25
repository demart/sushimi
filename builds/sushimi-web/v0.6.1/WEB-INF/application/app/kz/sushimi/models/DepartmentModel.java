package kz.sushimi.models;

import java.text.SimpleDateFormat;
import java.util.AbstractMap;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import kz.sushimi.persistence.dictionaries.Department;

public class DepartmentModel {
	
	/**
	 * Идентификатор ресторана
	 */
	private int id;
	
	/**
	 * Название ресторана
	 */
	private String name;
	
	/**
	 * Связь с городом
	 */
	private int cityId;

	/**
	 * Час откуда начать предлагать время
	 */
	private int startWorkHour;
	
	/**
	 * Час когда нужно закончить предлагать на сегодня
	 */
	private int endWorkHour;
		
	
	public DepartmentModel(Department dep) {
		this.setCityId(dep.getCity().getId());
		this.setId(dep.getId());
		this.setName(dep.getName());
		this.setStartWorkHour(dep.getStartWorkHour());
		this.setEndWorkHour(dep.getEndWorkHour());
	}
	
	
	public List<Entry<String, String>> getTime(int timeIntervalCount) {
		return ModelUtils.getTime(timeIntervalCount, startWorkHour, endWorkHour);
	}
	
	
	// ==============================
	// ==============================
	


	public int getId() {
		return id;
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


	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getCityId() {
		return cityId;
	}

	public void setCityId(int cityId) {
		this.cityId = cityId;
	}
	
}
