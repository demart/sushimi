package kz.sushimi.models.vacancy;

import java.util.List;

public class Vacancy {

	public Integer Id;
	public String Name;
	public String Conditions;
	public String Requirements;
	public String Description;
	public List<Integer> Departments;
	public String Count;
	public String Created;
	public String Expired;
	public String ExpiredString;
	public List<String> Images;
	public boolean IsActive;
	public String VacancyType;
	public String VacancyTypeName;
	public Integer vacancytype_id;
	
}
