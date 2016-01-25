package kz.sushimi.models;

import java.util.List;

import kz.sushimi.persistence.dictionaries.Product;

public class MainPageModel {

	private List<Product> products;
	private List<AnnouncementModel> slides;
	private List<AnnouncementModel> events;
	
	public MainPageModel(List<Product> products, List<AnnouncementModel> slides, List<AnnouncementModel> events) {
		this.products = products;
		this.slides = slides;
		this.events = events;
	}

	public List<Product> getProducts() {
		return products;
	}

	public void setProducts(List<Product> products) {
		this.products = products;
	}

	public List<AnnouncementModel> getSlides() {
		return slides;
	}

	public void setSlides(List<AnnouncementModel> slides) {
		this.slides = slides;
	}

	public List<AnnouncementModel> getEvents() {
		return events;
	}

	public void setEvents(List<AnnouncementModel> events) {
		this.events = events;
	}
	
}
