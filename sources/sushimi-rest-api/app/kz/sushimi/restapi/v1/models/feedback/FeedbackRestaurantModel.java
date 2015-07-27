package kz.sushimi.restapi.v1.models.feedback;

public class FeedbackRestaurantModel {
	
	public boolean Selected;
	public String Text;
	public String Value;
	
	public FeedbackRestaurantModel(String text, Integer value) {
		this.Selected = false;
		this.Text = text;
		this.Value = String.valueOf(value);
	}
	
}
