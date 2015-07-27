package kz.sushimi.restapi.v1.models.feedback;

public class FeedbackCityModel {
	
	public boolean Selected;
	public String Text;
	public String Value;
	
	public FeedbackCityModel(String text, Integer value) {
		this.Selected = false;
		this.Text = text;
		this.Value = String.valueOf(value);
	}
	
}
