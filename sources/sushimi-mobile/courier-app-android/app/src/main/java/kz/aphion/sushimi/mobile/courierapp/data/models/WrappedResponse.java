package kz.aphion.sushimi.mobile.courierapp.data.models;

import org.json.JSONException;
import org.json.JSONObject;

/**
 * Created by artem.demidovich on 9/18/15.
 */
public class WrappedResponse<T> {


    public ResponseStatus status;

    /**
     * Код ошибки
     */
    public String errorCode;

    /**
     * Описание ошибки
     */
    public String errorMessage;


    public T data;


    public static WrappedResponse parseJSONObject(String jsonString) throws JSONException {
        JSONObject jObject = new JSONObject(jsonString);

        WrappedResponse jsonResponse = new WrappedResponse();
        if (!jObject.isNull("status"))
            jsonResponse.status = ResponseStatus.valueOf(jObject.getString("status"));
        if (!jObject.isNull("errorCode"))
            jsonResponse.errorCode = jObject.getString("errorCode");
        if (!jObject.isNull("errorMessage"))
            jsonResponse.errorMessage = jObject.getString("errorMessage");

        return jsonResponse;
    }

}
