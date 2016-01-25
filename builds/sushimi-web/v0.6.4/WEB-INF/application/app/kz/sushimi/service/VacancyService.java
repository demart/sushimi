package kz.sushimi.service;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.Calendar;
import java.util.Dictionary;
import java.util.Hashtable;
import java.util.List;

import javax.persistence.Query;

import kz.sushimi.models.PageModel;
import kz.sushimi.persistence.vacancies.Vacancy;
import kz.sushimi.persistence.vacancies.VacancyApplication;
import kz.sushimi.persistence.vacancies.VacancyGroup;
import play.db.jpa.JPA;



public class VacancyService {

	public static long cacheTime = 7200000; // 120 min - 2 Hour
	public static Dictionary<String, Object> cache = new Hashtable<String, Object>();
	public static Dictionary<String, Long> cacheExpiraionTime = new Hashtable<String, Long>();

	/**
	 * Список опубликованных групп вакансий
	 * 
	 * @return
	 */
	public static List<VacancyGroup> getVacancyGroups() {
		Long cacheExpTime = cacheExpiraionTime.get("VACANCY_GROUPS");
		cacheExpTime = cacheExpTime == null ? 0 : cacheExpTime;
		if (Calendar.getInstance().getTimeInMillis() <=  cacheExpTime) {
			return (List<VacancyGroup>)cache.get("VACANCY_GROUPS");
		}
		
		List<VacancyGroup> result = JPA.em().createQuery("from VacancyGroup where isPublished = true and isDeleted = false").getResultList();
		cache.put("VACANCY_GROUPS", result);
		cacheExpiraionTime.put("VACANCY_GROUPS", Calendar.getInstance().getTimeInMillis() + cacheTime);		
		
		return result;
	}

	public static List<Vacancy> getVacanciesByGroup(VacancyGroup group) {
		Long cacheExpTime = cacheExpiraionTime.get("VACANCIES_GROUP_" + group.getId());
		cacheExpTime = cacheExpTime == null ? 0 : cacheExpTime;
		if (Calendar.getInstance().getTimeInMillis() <=  cacheExpTime) {
			return (List<Vacancy>)cache.get("VACANCIES_GROUP_" + group.getId());
		}
		
		Query query = JPA.em().createQuery("from Vacancy where vacancyGroup.id = :groupId and isPublished = true and isDeleted = false");
		query.setParameter("groupId", group.getId());
		List<Vacancy> result = query.getResultList();
		
		cache.put("VACANCIES_GROUP_" + group.getId(), result);
		cacheExpiraionTime.put("VACANCIES_GROUP_" + group.getId(), Calendar.getInstance().getTimeInMillis() + cacheTime);		
		
		return result;
	}
	
	
	/**
	 * Сохраняем заявку на определенную вакансию
	 * 
	 * @param vacancyId - идентификатор заявки
	 * @param name - ФИО чувака
	 * @param birth - Дата рождения
	 * @param phone - Телефон
	 * @param email - Почта
	 * @param fileUpload - Файл резюме
	 * 
	 * @return сохранили или нет
	 */
	public static boolean saveVacancyApplication(Integer vacancyId, String name, String birth, String phone, String email, File fileUpload) {
		Vacancy vacancy = JPA.em().find(Vacancy.class, vacancyId);
		if (vacancy == null) return false;
		
		VacancyApplication application = new VacancyApplication();
		application.setApplicationDate(Calendar.getInstance());
		application.setBirhday(birth);
		application.setEmail(email);
		application.setName(name);
		application.setPhone(phone);
		application.setVacancy(vacancy);
		
		// file saving to disk
		System.out.println("FileUpload.FullPath: " + fileUpload.getAbsolutePath());
		try {
			FileInputStream fis = new FileInputStream(fileUpload);
			byte[] fileContent = new byte[(int)fileUpload.length()];
			try {
				fis.read(fileContent, 0, (int)fileUpload.length());
				application.setUploadedFile(fileContent);
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} finally {
				if (fis != null)
					try {
					fis.close();
					} catch (Exception e2) {
						e2.printStackTrace();
						return false;
					}
			}
		} catch (FileNotFoundException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
			return false;
		}
		
		
		// save
		try {
			JPA.em().persist(application);
		} catch (Throwable e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}
	
}
