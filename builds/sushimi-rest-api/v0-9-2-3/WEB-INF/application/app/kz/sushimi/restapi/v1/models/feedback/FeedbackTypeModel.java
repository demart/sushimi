package kz.sushimi.restapi.v1.models.feedback;

import kz.sushimi.persistence.FeedbackType;

public class FeedbackTypeModel {
	
	public String name;
	public FeedbackType value;
	
	public FeedbackTypeModel(FeedbackType type, String name) {
		this.value = type;
		this.name = name;
	}
	
}
