package kz.sushimi.service;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.Calendar;
import java.util.List;

import kz.sushimi.persistence.vacancies.Vacancy;
import kz.sushimi.persistence.vacancies.VacancyApplication;
import kz.sushimi.persistence.vacancies.VacancyGroup;

import play.db.jpa.JPA;



public class VacancyService {

	/**
	 * Список опубликованных групп вакансий
	 * 
	 * @return
	 */
	public static List<VacancyGroup> getVacancyGroups() {
		List<VacancyGroup> result = JPA.em().createQuery("from VacancyGroup where isPublished = true and isDeleted = false").getResultList();
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
