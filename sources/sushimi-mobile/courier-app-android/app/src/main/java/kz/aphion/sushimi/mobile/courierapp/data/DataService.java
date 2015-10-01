package kz.aphion.sushimi.mobile.courierapp.data;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.protocol.BasicHttpContext;
import org.apache.http.protocol.HttpContext;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.util.List;

import kz.aphion.sushimi.mobile.courierapp.data.models.OrderModel;
import kz.aphion.sushimi.mobile.courierapp.data.models.OrderState;
import kz.aphion.sushimi.mobile.courierapp.data.models.ReadOrdersRequestModel;
import kz.aphion.sushimi.mobile.courierapp.data.models.ResponseStatus;
import kz.aphion.sushimi.mobile.courierapp.data.models.UpdateGeolocationCoordinateModel;
import kz.aphion.sushimi.mobile.courierapp.data.models.UpdateOrderStateModel;
import kz.aphion.sushimi.mobile.courierapp.data.models.UserAuthenticateResultModel;
import kz.aphion.sushimi.mobile.courierapp.data.models.WrappedResponse;

/**
 * Created by artem.demidovich on 9/18/15.
 */
public class DataService {

    /**
     * Возвращает список заказов по состоянию.
     *
     * @param orderState
     * @return
     */
    public static WrappedResponse<List<OrderModel>> readOrdersByState(OrderState orderState) throws JSONException, IOException {
        ReadOrdersRequestModel model = new ReadOrdersRequestModel();
        model.orderState = orderState;
        model.authToken = LocalStorage.getSsoToken();
        JSONObject jsonModel = model.buildJSONObject();

        System.out.println("Request JSON: " + jsonModel.toString());
        String result = doSendRequest(AppConstants.URL_READ_ORDERS_CONTEXT, jsonModel);
        System.out.println("Response JSON: " + result);
        WrappedResponse<List<OrderModel>> responseModel = OrderModel.parseJSONObject(result);
        return responseModel;
    }


    public static WrappedResponse<Object> updateGeolocationCoordinate(UpdateGeolocationCoordinateModel model) throws JSONException, IOException {
        JSONObject jsonModel = model.buildJSONObject();
        System.out.println("Request JSON: " + jsonModel.toString());
        String result = doSendRequest(AppConstants.URL_UPDATE_GEOLOCATION_CONTEXT, jsonModel);
        System.out.println("Response JSON: " + result);
        WrappedResponse<Object> responseModel = WrappedResponse.parseJSONObject(result);
        return responseModel;
    }


    public static WrappedResponse<Object> deliveryOrder(UpdateOrderStateModel model) throws IOException, JSONException {
        JSONObject jsonModel = model.buildJSONObject();
        System.out.println("Request JSON: " + jsonModel.toString());
        String result = doSendRequest(AppConstants.URL_DELIVERY_ORDER_CONTEXT, jsonModel);
        System.out.println("Response JSON: " + result);
        WrappedResponse<Object> responseModel = WrappedResponse.parseJSONObject(result);
        return responseModel;
    }


    public static WrappedResponse<Object> returnOrder(UpdateOrderStateModel model) throws IOException, JSONException {
        JSONObject jsonModel = model.buildJSONObject();
        System.out.println("Request JSON: " + jsonModel.toString());
        String result = doSendRequest(AppConstants.URL_RETURNED_ORDER_CONTEXT, jsonModel);
        System.out.println("Response JSON: " + result);
        WrappedResponse<Object> responseModel = WrappedResponse.parseJSONObject(result);
        return responseModel;
    }


    /**
     * Отправляет запрос н сервер
     * @param jsonObject
     * @return
     * @throws IOException
     */
    public static String doSendRequest(String urlContext,JSONObject jsonObject) throws IOException {
        HttpClient httpClient = new DefaultHttpClient();
        HttpContext localContext = new BasicHttpContext();
        String url = LocalStorage.getHostname() + urlContext;
        HttpPost httpPost = new HttpPost(url);
        httpPost.setHeader("Content-type", "application/json");

        StringEntity se = new StringEntity(jsonObject.toString());
        httpPost.setEntity(se);
        InputStream inputStream = null;
        String result = null;
        try {
            HttpResponse response = httpClient.execute(httpPost, localContext);
            HttpEntity entity = response.getEntity();
            inputStream = entity.getContent();
            BufferedReader reader = new BufferedReader(new InputStreamReader(inputStream, "UTF-8"), 8);
            StringBuilder sb = new StringBuilder();
            String line = null;
            while ((line = reader.readLine()) != null)
                sb.append(line + "\n");
            result = sb.toString();
        } finally {
            try{
                if(inputStream != null)inputStream.close();
            }catch(Exception squish){
                squish.printStackTrace();
            }
        }
        return result;
    }

}
