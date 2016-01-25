package kz.sushimi.models;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import kz.sushimi.persistence.Page;

public class PageModel {
	
	public long id;
	/**
	 * Идентификатор страницы для поиска мета информации
	 */
	public String pageId;
	
	/**
	 * Заголовок для страницы
	 */
	public String title;
	
	/**
	 * Meta заголовок страницы
	 */
	public String metaTitle;
	
	/**
	 * Meta контента страницы
	 */
	public String metaContent;
	
	/**
	 * Meta описание страницы
	 */
	public String metaDescription;

	/**
	 * Meta ключевые слова
	 */
	public String metaKeywords;
	
	/**
	 * HTML текст для вставки вниз странцы
	 */	
	public String htmlFooter;
	
	public boolean isActive;

	public static PageModel buildFromPage(Page page) {
		PageModel model = new PageModel();
		model.id = page.getId();
		model.htmlFooter = page.getHtmlFooter();
		model.isActive = page.isActive();
		model.metaDescription = page.getMetaDescription();
		model.metaTitle = page.getMetaTitle();
		model.title	= page.getTitle();
		model.metaContent = page.getMetaContent();
		model.metaKeywords = page.getMetaKeywords();
		return model;
	}
	
}
