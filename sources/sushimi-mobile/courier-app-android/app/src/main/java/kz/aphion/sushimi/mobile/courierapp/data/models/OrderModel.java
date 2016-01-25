package kz.aphion.sushimi.mobile.courierapp.data.models;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;


/**
 * Модель заказа для курьерского приложения
 *  
 * @author artem.demidovich
 *
 */
public class OrderModel {
	
	public Integer id;
	
	public String orderNumber;
	
	public String clientName;
	
	public String clientPhone;
	
	public String clientComment;

    public Integer clientCash;
	
	public Calendar orderTime;
	
	public Calendar deliveryTime;
	
	public DeliveryType deliveryType;
	
	public OrderSource source;
	
	public OrderState orderState;
	
	public PayMethod payMethod;
	
	public Integer orderSum;

	public String address;

	public static WrappedResponse<List<OrderModel>> parseJSONObject(String jsonString) throws JSONException {
		JSONObject jObject = new JSONObject(jsonString);

		WrappedResponse<List<OrderModel>> jsonResponse = new WrappedResponse<List<OrderModel>>();
		if (!jObject.isNull("status"))
			jsonResponse.status = ResponseStatus.valueOf(jObject.getString("status"));
		if (!jObject.isNull("errorCode"))
			jsonResponse.errorCode = jObject.getString("errorCode");
		if (!jObject.isNull("errorMessage"))
			jsonResponse.errorMessage = jObject.getString("errorMessage");

		if (!jObject.isNull("data")) {
			JSONArray dataObjects = jObject.getJSONArray("data");
			if (dataObjects != null) {
				jsonResponse.data = new ArrayList<OrderModel>();

				for (int i = 0; i < dataObjects.length(); i++) {
					JSONObject jsonObject = dataObjects.getJSONObject(i);
					if (jsonObject != null) {
						OrderModel model = new OrderModel();
						if (!jsonObject.isNull("clientName"))
							model.clientName = jsonObject.getString("clientName");
						if (!jsonObject.isNull("clientComment"))
							model.clientComment = jsonObject.getString("clientComment");
						if (!jsonObject.isNull("clientPhone"))
							model.clientPhone = jsonObject.getString("clientPhone");
                        if (!jsonObject.isNull("clientCash"))
                            model.clientCash = jsonObject.getInt("clientCash");
						if (!jsonObject.isNull("orderNumber"))
							model.orderNumber = jsonObject.getString("orderNumber");
						if (!jsonObject.isNull("deliveryTime"))
							model.deliveryTime = parseCalendarDate(jsonObject.getJSONObject("deliveryTime"));
						if (!jsonObject.isNull("orderTime"))
							model.orderTime = parseCalendarDate(jsonObject.getJSONObject("orderTime"));
						if (!jsonObject.isNull("deliveryType"))
							model.deliveryType = DeliveryType.valueOf(jsonObject.getString("deliveryType"));
						if (!jsonObject.isNull("id"))
							model.id = Integer.valueOf(jsonObject.getInt("id"));
						if (!jsonObject.isNull("orderState"))
							model.orderState = OrderState.valueOf(jsonObject.getString("orderState"));
						if (!jsonObject.isNull("orderSum"))
							model.orderSum = Integer.valueOf(jsonObject.getInt("orderSum"));
						// model.orderTime
						if (!jsonObject.isNull("payMethod"))
							model.payMethod = PayMethod.valueOf(jsonObject.getString("payMethod"));
						if (!jsonObject.isNull("source"))
							model.source = OrderSource.valueOf(jsonObject.getString("source"));
						if (!jsonObject.isNull("address"))
							model.address = jsonObject.getString("address");

						jsonResponse.data.add(model);
					}
				}

			}
		}
		return jsonResponse;
	}


	public static Calendar parseCalendarDate(JSONObject jsonDate) throws JSONException {
		Integer year = jsonDate.getInt("year");
		Integer month = jsonDate.getInt("month");
		Integer dayOfMonth = jsonDate.getInt("dayOfMonth");
		Integer hourOfDay = jsonDate.getInt("hourOfDay");
		Integer minute = jsonDate.getInt("minute");
		Integer second = jsonDate.getInt("second");
		Calendar parsedTime = Calendar.getInstance();
		parsedTime.set(year,month,dayOfMonth,hourOfDay,minute,second);
		return parsedTime;
	}


}
