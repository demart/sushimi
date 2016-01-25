package kz.sushimi.restapi.v1.models.feedback;

import java.util.List;

public class FeedbackCityModel {
	
	public boolean selected;
	public String text;
	public Integer value;
	public List<FeedbackRestaurantModel> restaurants;
	
	public FeedbackCityModel(String text, Integer value) {
		this.selected = false;
		this.text = text;
		this.value = value;
	}
	
}
