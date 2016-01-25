package kz.sushimi.persistence;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OrderBy;
import javax.persistence.Table;

import kz.sushimi.persistence.dictionaries.Category;
import kz.sushimi.persistence.dictionaries.Product;

@Entity
@Table(name = "pages")
public class Page {

	@Id
	@GeneratedValue()
	@Column(name="id")
	private long id;
	/**
	 * Идентификатор страницы для поиска мета информации
	 */
	@Column(name="page_id")
	private String pageId;
	
	/**
	 * Заголовок для страницы
	 */
	@Column(name="title", length=500)
	private String title;
	
	/**
	 * Meta заголовок страницы
	 */
	@Column(name="meta_title", length=500)
	private String metaTitle;
	
	/**
	 * Meta контента страницы
	 */
	@Column(name="meta_content", length=500)
	private String metaContent;
	
	/**
	 * Meta описание страницы
	 */
	@Column(name="meta_description", length=500)
	private String metaDescription;

	/**
	 * Meta ключевые слова страницы
	 */
	@Column(name="meta_keywords", length=500)
	private String metaKeywords;
	
	/**
	 * HTML текст для вставки вниз странцы
	 */	
	@Column(name="html_footer", length=1000)
	private String htmlFooter;
	
	@Column(name="is_active")
	private boolean isActive;
	
	/**
	 * Ссылка категорию
	 */
	@ManyToOne
	private Category category;
	
	public Category getCategory() {
		return category;
	}

	public void setCategory(Category category) {
		this.category = category;
	}

	public String getMetaKeywords() {
		return metaKeywords;
	}

	public void setMetaKeywords(String metaKeywords) {
		this.metaKeywords = metaKeywords;
	}

	public String getMetaContent() {
		return metaContent;
	}

	public void setMetaContent(String metaContent) {
		this.metaContent = metaContent;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getPageId() {
		return pageId;
	}

	public void setPageId(String pageId) {
		this.pageId = pageId;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getMetaTitle() {
		return metaTitle;
	}

	public void setMetaTitle(String metaTitle) {
		this.metaTitle = metaTitle;
	}

	public String getMetaDescription() {
		return metaDescription;
	}

	public void setMetaDescription(String metaDescription) {
		this.metaDescription = metaDescription;
	}

	public String getHtmlFooter() {
		return htmlFooter;
	}

	public void setHtmlFooter(String htmlFooter) {
		this.htmlFooter = htmlFooter;
	}

	public boolean isActive() {
		return isActive;
	}

	public void setActive(boolean isActive) {
		this.isActive = isActive;
	}
	
}
