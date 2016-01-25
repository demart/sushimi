package kz.sushimi.models.vacancy;

import java.util.ArrayList;
import java.util.List;

public class VacancyGroup {
	
	public Integer Id;
	public String Name;
	public String Description;
	public List<Vacancy> Vacancies;

	
	public VacancyGroup() {}
	
	public VacancyGroup(kz.sushimi.persistence.vacancies.VacancyGroup vacancyGroup) {
		this.Id = vacancyGroup.getId();
		this.Name = vacancyGroup.getName();
		this.Description = vacancyGroup.getDescription();
		this.Vacancies = new ArrayList<Vacancy>();
		
		for (kz.sushimi.persistence.vacancies.Vacancy vacancy : vacancyGroup.getVacancies()) {
			if (!vacancy.isPublished() || vacancy.isDeleted())
				continue;
			
			Vacancy vac = new Vacancy();
			vac.Id = vacancy.getId();
			vac.Name = vacancy.getName();
			vac.Conditions = vacancy.getConditions();
			vac.Requirements = vacancy.getRequirements();
			vac.Description = vacancy.getDescription();
			vac.Departments = new ArrayList<Integer>();
	    	vac.Images = new ArrayList<String>();
	    	
	    	if (vacancy.getPublishDate() != null)
	    		vac.Created = "/Date(" + vacancy.getPublishDate().getTimeInMillis() + ")/";
	    	
	    	vac.VacancyType = null;
			vac.vacancytype_id = this.Id;
			vac.VacancyTypeName = this.Name;
			
			Vacancies.add(vac);
		}
	}
	
}
