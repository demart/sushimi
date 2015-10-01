package kz.aphion.sushimi.mobile.courierapp.data.models;


import org.json.JSONException;
import org.json.JSONObject;

/**
 * Модель для произведения действия над заказом
 * 
 * @author artem.demidovich
 *
 */
public class UpdateOrderStateModel extends SecuredRequestBaseModel {
	
	/**
	 * Номер заказа
	 */
	public String orderNumber;
	
	/**
	 * Причина, если был отказ от заказа
	 */
	public String reason;
	
	/**
	 * Способ оплаты
	 */
	public PayMethod payMethod;
	
	/**
	 * Номер кредитной карты если оплачивали ей
	 */
	public String creditCardNumber;


	public JSONObject buildJSONObject() throws JSONException {
		JSONObject holder = new JSONObject();

		holder.put("authToken", authToken);
		holder.put("latitude", latitude);
		holder.put("longitude", longitude);

		holder.put("orderNumber", orderNumber);

		if (reason != null && !reason.isEmpty())
			holder.put("reason", reason);

		if (payMethod != null)
			holder.put("payMethod", payMethod);

		if (creditCardNumber != null && !creditCardNumber.isEmpty())
			holder.put("creditCardNumber", creditCardNumber);

		return holder;
	}

}
