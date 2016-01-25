package kz.sushimi.persistence.dictionaries;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

/**
 * Справочник городов присутствия
 * 
 * @author Demart
 *
 */
@Entity
@Table(name = "cities")
public class City {

	@Id
	@GeneratedValue
	@Column
	private int id;
	
	@Column
	private String name;
	
	@Column(name="min_order_sum")
	private int minOrderSum;
	
	@OneToMany(mappedBy="city")
	private List<Department> departments;

	@Column(name="start_work_hour")
	private int startWorkHour;
	
	@Column(name="end_work_hour")
	private int endWorkHour;	
	
	@Column(name="published")
	private boolean isPublished;
	
	@Column(name="deleted")
	private boolean isDeleted;
	
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
	
	public boolean isPublished() {
		return isPublished;
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

	public int getMinOrderSum() {
		return minOrderSum;
	}

	public void setMinOrderSum(int minOrderSum) {
		this.minOrderSum = minOrderSum;
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

	public List<Department> getDepartments() {
		return departments;
	}

	public void setDepartments(List<Department> departments) {
		this.departments = departments;
	}
	
}
