package kz.sushimi.restapi.v1.models.feedback;

import java.util.ArrayList;
import java.util.List;

public class FeedbacksWrapperModel {
	
	public List<String> FAQs = new ArrayList<String>();
	public List<FeedbackTypesWrapperModel> feedbackTypes;
	public Integer page;
	public Integer pageSize;
	public Integer pageCount;
}
