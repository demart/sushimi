package kz.sushimi.persistence.dictionaries;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

/**
 * Рестораны и отделения
 * 
 * @author Demart
 *
 */
@Entity
@Table(name = "departments")
public class Department {

	@Id
	@GeneratedValue
	@Column
	private int id;
	
	@Column
	private String name;
	
	@ManyToOne
	private City city;
	
	@Column
	private String address;
	
	@Column(name="start_work_hour")
	private int startWorkHour;
	
	@Column(name="end_work_hour")
	private int endWorkHour;
	
	@Column(name="published")
	private boolean isPublished;
	
	@Column(name="deleted")
	private boolean isDeleted;	
	
	// ==============
	// ==============	
	
	public boolean isPublished() {
		return isPublished;
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
	public void setPublished(boolean isPublished) {
		this.isPublished = isPublished;
	}
	public boolean isDeleted() {
		return isDeleted;
	}
	public void setDeleted(boolean isDeleted) {
		this.isDeleted = isDeleted;
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
	public City getCity() {
		return city;
	}
	public void setCity(City city) {
		this.city = city;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	
}
