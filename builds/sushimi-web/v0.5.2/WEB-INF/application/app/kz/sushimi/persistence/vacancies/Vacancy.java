package kz.sushimi.persistence.vacancies;

import java.util.Calendar;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

/**
 * Вакансии
 * 
 * @author Demart
 *
 */
@Entity
@Table(name = "vacancy")
public class Vacancy {

	@Id
	@GeneratedValue()
	@Column(name="id")
	private int id;
	
	@ManyToOne
	private VacancyGroup vacancyGroup;
	
	@Column(name="name")
	private String name;
	
	@Column(name="description", length=4000)
	private String description;
	
	@Column(name="conditions", length=4000)
	private String conditions;
	
	@Column(name="requirements", length=4000)
	private String requirements;
	
	@Column(name="count")
	private int count;

	@Column(name="deleted")
	private boolean isDeleted;
	
	@Column(name="published")
	private boolean isPublished;

	@Column(name="publish_date")
	private Calendar publishDate;

	
	// =================================
	// ========== GET & SET ============
	// =================================	
	
	public int getId() {
		return id;
	}

	public VacancyGroup getVacancyGroup() {
		return vacancyGroup;
	}

	public void setVacancyGroup(VacancyGroup vacancyGroup) {
		this.vacancyGroup = vacancyGroup;
	}

	public boolean isDeleted() {
		return isDeleted;
	}

	public void setDeleted(boolean isDeleted) {
		this.isDeleted = isDeleted;
	}

	public boolean isPublished() {
		return isPublished;
	}

	public void setPublished(boolean isPublished) {
		this.isPublished = isPublished;
	}

	public Calendar getPublishDate() {
		return publishDate;
	}

	public void setPublishDate(Calendar publishDate) {
		this.publishDate = publishDate;
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

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getConditions() {
		return conditions;
	}

	public void setConditions(String conditions) {
		this.conditions = conditions;
	}

	public String getRequirements() {
		return requirements;
	}

	public void setRequirements(String requirements) {
		this.requirements = requirements;
	}

	public int getCount() {
		return count;
	}

	public void setCount(int count) {
		this.count = count;
	}

}
