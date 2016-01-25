package kz.sushimi.restapi.v1.models.feedback;

import java.util.List;

public class FeedbackTypesWrapperModel {

	public String id;
	public String name;
	public Boolean socialLiked;
	public String text;
	public Integer nextPage;
	public List<FeedbackModel> feedbacks;
	
}
