package kz.aphion.sushimi.mobile.courierapp.data.models;


import org.json.JSONException;
import org.json.JSONObject;

/**
 * Модель ответа на авторизацию пользвователя
 * 
 * @author artem.demidovich
 *
 */
public class UserAuthenticateResultModel {

	/**
	 * Токен для использоваения в авторизации
	 */
	public String authToken;

	/**
	 * Имя пользователя
	 */
	public String username;

	public UserAuthenticateResultModel() {
		super();
	}

	public UserAuthenticateResultModel(String authToken, String username) {
		super();
		this.authToken = authToken;
		this.username = username;
	}

	public static WrappedResponse<UserAuthenticateResultModel> parseJSONObject(String jsonString) throws JSONException {
		JSONObject jObject = new JSONObject(jsonString);

		WrappedResponse<UserAuthenticateResultModel> jsonResponse = new WrappedResponse<UserAuthenticateResultModel>();
		if (!jObject.isNull("status"))
			jsonResponse.status = ResponseStatus.valueOf(jObject.getString("status"));
		if (!jObject.isNull("errorCode"))
			jsonResponse.errorCode = jObject.getString("errorCode");
		if (!jObject.isNull("errorMessage"))
			jsonResponse.errorMessage = jObject.getString("errorMessage");

		if (jObject.isNull("data"))
			return jsonResponse;

		JSONObject dataObject = jObject.getJSONObject("data");
		if (dataObject != null) {
			jsonResponse.data = new UserAuthenticateResultModel();
			if (!dataObject.isNull("authToken"))
				jsonResponse.data.authToken =dataObject.getString("authToken");
			if (!dataObject.isNull("username"))
				jsonResponse.data.username =dataObject.getString("username");
		}
		return jsonResponse;
	}

}
