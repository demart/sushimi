package kz.aphion.sushimi.mobile.courierapp.data;

import android.app.Application;
import android.content.Context;
import android.content.SharedPreferences;
import android.preference.PreferenceManager;

import kz.aphion.sushimi.mobile.courierapp.CourierApplication;

/**
 * Created by artem.demidovich on 9/16/15.
 */
public class LocalStorage {

    //private static String _hostname = "http://10.0.2.2:9002";
    private static String _hostname = "http://api.sushimi.kz/rest-api";

    public static String getHostname() {
        return _hostname;
    }

    public static void setHostname(String hostname){
        _hostname = hostname;
    }

    public static void setSsoToken(String ssoToken) {
        SharedPreferences sharedPreferences = PreferenceManager.getDefaultSharedPreferences(CourierApplication.getAppContext());
        sharedPreferences.edit().putString("CourierAppSsoToken", ssoToken).apply();
    }

    public static String getSsoToken() {
        SharedPreferences sharedPreferences = PreferenceManager.getDefaultSharedPreferences(CourierApplication.getAppContext());
        return sharedPreferences.getString("CourierAppSsoToken", null);
    }

    public static void setLoginKey(String loginKey) {
        SharedPreferences sharedPreferences = PreferenceManager.getDefaultSharedPreferences(CourierApplication.getAppContext());
        sharedPreferences.edit().putString("CourierAppLoginKey", loginKey).apply();
    }

    public static String getLoginKey() {
        SharedPreferences sharedPreferences = PreferenceManager.getDefaultSharedPreferences(CourierApplication.getAppContext());
        return sharedPreferences.getString("CourierAppLoginKey", null);
    }

    public static void setUsername(String username) {
        SharedPreferences sharedPreferences = PreferenceManager.getDefaultSharedPreferences(CourierApplication.getAppContext());
        sharedPreferences.edit().putString("CourierAppUserName", username).apply();
    }

    public static String getUsername() {
        SharedPreferences sharedPreferences = PreferenceManager.getDefaultSharedPreferences(CourierApplication.getAppContext());
        return sharedPreferences.getString("CourierAppUserName", null);
    }


    public static void storePushToken(Context context, String pushToken) {
        SharedPreferences sharedPreferences = PreferenceManager.getDefaultSharedPreferences(context);
        sharedPreferences.edit().putString("CourierAppPushToken", pushToken).apply();
    }

    public static String getPushToken(Context context) {
        SharedPreferences sharedPreferences = PreferenceManager.getDefaultSharedPreferences(context);
        return sharedPreferences.getString("CourierAppPushToken", null);
    }

}
