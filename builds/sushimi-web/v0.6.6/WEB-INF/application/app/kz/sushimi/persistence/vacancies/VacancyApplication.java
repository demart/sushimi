package kz.sushimi.persistence.vacancies;

import java.util.Calendar;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.Table;


/**
 * Отклики на вакансию
 * 
 * @author Demart
 *
 */
@Entity
@Table(name = "vacancy_app")
public class VacancyApplication {

	@Id
	@GeneratedValue()
	@Column(name="id")
	private int id;
	
	@ManyToOne
	private Vacancy vacancy;
	
	@Column(name="name")
	private String name;
	
	@Column(name="email")
	private String email;
	
	@Column(name="birthday")
	private String birhday;
	
	@Column(name="phone")
	private String phone;
	
	@Column(name="application_date")
	private Calendar applicationDate;
	
	@Lob
	@Column(name="uploaded_file")
	private byte[] uploadedFile;
	
	//=======================
	//======= GET & SET =====
	//=======================	
	
	public int getId() {
		return id;
	}
	public byte[] getUploadedFile() {
		return uploadedFile;
	}
	public void setUploadedFile(byte[] uploadedFile) {
		this.uploadedFile = uploadedFile;
	}
	public Calendar getApplicationDate() {
		return applicationDate;
	}
	public void setApplicationDate(Calendar applicationDate) {
		this.applicationDate = applicationDate;
	}
	public void setId(int id) {
		this.id = id;
	}
	public Vacancy getVacancy() {
		return vacancy;
	}
	public void setVacancy(Vacancy vacancy) {
		this.vacancy = vacancy;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getBirhday() {
		return birhday;
	}
	public void setBirhday(String birhday) {
		this.birhday = birhday;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	
}
