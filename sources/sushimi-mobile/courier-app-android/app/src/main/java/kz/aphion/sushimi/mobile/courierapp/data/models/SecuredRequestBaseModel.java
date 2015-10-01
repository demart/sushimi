package kz.aphion.sushimi.mobile.courierapp.data.models;

import org.json.JSONException;
import org.json.JSONObject;

/**
 * Базовый класс для запросов с мобильного приложения курьеров
 * 
 * @author artem.demidovich
 *
 */
public class SecuredRequestBaseModel {

	/**
	 * Токен для авторизации
	 */
	public String authToken;
	
	public String latitude;
	
	public String longitude;


	public JSONObject buildJSONObject() throws JSONException {
		JSONObject holder = new JSONObject();
		holder.put("authToken", authToken);
		holder.put("latitude", latitude);
		holder.put("longitude", longitude);
		return holder;
	}
}
