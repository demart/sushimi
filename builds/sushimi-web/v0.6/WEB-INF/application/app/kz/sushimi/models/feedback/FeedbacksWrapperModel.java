package kz.sushimi.models.feedback;

import java.util.ArrayList;
import java.util.List;

public class FeedbacksWrapperModel {
	
	public List<String> FAQs = new ArrayList<String>();
	public List<FeedbackTypesWrapperModel> FeedbackTypes;
	public Integer Page;
	public Integer PageSize;
	public Integer PageCount;
}
