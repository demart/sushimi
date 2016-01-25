package kz.sushimi.restapi.v1.models.feedback;

public class FeedbackRestaurantModel {
	
	public boolean selected;
	public String text;
	public Integer value;
	
	public FeedbackRestaurantModel(String text, Integer value) {
		this.selected = false;
		this.text = text;
		this.value = value;
	}
	
}
