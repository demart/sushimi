package kz.aphion.sushimi.mobile.courierapp.data;

import android.content.SharedPreferences;

/**
 * Created by artem.demidovich on 9/16/15.
 */
public class LocalStorage {

    private static String _hostname = "http://10.0.2.2:9002";

    public static String getHostname() {
        return _hostname;
    }

    public static void setHostname(String hostname){
        _hostname = hostname;
    }



    private static String _ssoToken = null;

    public static void setSsoToken(String ssoToken) {
        _ssoToken = ssoToken;
    }

    public static String getSsoToken() {
        return _ssoToken;
    }


    private static String _username = null;

    public static void setUsername(String username) {
        _username = username;
    }

    public static String getUsername() {
        return _username;
    }


}
