package kz.sushimi.restapi.v1.models.feedback;

import kz.sushimi.persistence.FeedbackType;

public class FeedbackTypeModel {
	
	public String id;
	public FeedbackType type;
	public String name;
	
	public FeedbackTypeModel(FeedbackType type, String name) {
		this.id = type.toString();
		this.type = type;
		this.name = name;
	}
	
}
