package kz.sushimi.persistence.vacancies;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;


/**
 * Группы вакансий (Например Сушисты)
 * 
 * @author Demart
 *
 */
@Entity
@Table(name = "vacancy_groups")
public class VacancyGroup {

	@Id
	@GeneratedValue()
	@Column(name="id")
	private Integer id;
	
	@Column(name="name")
	private String name;
	
	@Column(name="description")
	private String description;
	
	@OneToMany(mappedBy="vacancyGroup")
	private List<Vacancy> vacancies;

	@Column(name="deleted")
	private boolean isDeleted;
	
	@Column(name="published")
	private boolean isPublished;

	
	
	// =================================
	// ========== GET & SET ============
	// =================================	
	
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
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

	public List<Vacancy> getVacancies() {
		return vacancies;
	}

	public void setVacancies(List<Vacancy> vacancies) {
		this.vacancies = vacancies;
	}
	
}