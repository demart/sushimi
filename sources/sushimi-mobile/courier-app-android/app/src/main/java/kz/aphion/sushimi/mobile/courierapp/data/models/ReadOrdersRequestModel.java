package kz.aphion.sushimi.mobile.courierapp.data.models;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.Calendar;


/**
 *  Модель для отправки запроса на получение списка заказов
 */
public class ReadOrdersRequestModel extends SecuredRequestBaseModel {

	public OrderState orderState;
	
	public Calendar filterStartDate;
	
	public Calendar filterEndDate;


	public JSONObject buildJSONObject() throws JSONException {
		JSONObject jsonObject = new JSONObject();
		jsonObject.put("authToken", authToken);
		jsonObject.put("orderState", orderState);
		if (filterStartDate != null)
			jsonObject.put("filterStardDate", filterStartDate);
		if (filterEndDate != null)
		jsonObject.put("filterEndDate", filterEndDate);
		return jsonObject;
	}


}
