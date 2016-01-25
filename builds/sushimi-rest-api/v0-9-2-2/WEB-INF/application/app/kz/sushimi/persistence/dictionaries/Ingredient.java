package kz.sushimi.persistence.dictionaries;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * Справочник игридиентов
 * 
 * @author Demart
 *
 */
@Entity
@Table(name = "ingredients")
public class Ingredient {
	
	@Id
	@GeneratedValue()
	@Column(name="id")
	private long id;
	
	@Column(name="name")
	private String name;
	
	@Column(name="image_link")
	private String imageLink;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getImageLink() {
		return imageLink;
	}

	public void setImageLink(String imageLink) {
		this.imageLink = imageLink;
	}
}
