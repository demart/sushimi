package kz.aphion.sushimi.mobile.courierapp;

import android.app.Application;
import android.content.Context;

import uk.co.chrisjenx.calligraphy.CalligraphyConfig;

/**
 * Created by artem.demidovich on 9/24/15.
 */
public class CourierApplication extends Application {

    private static Context context;

    @Override
    public void onCreate() {
        super.onCreate();
        System.out.println("Courier Application onCreate");
        CourierApplication.context = getApplicationContext();
        CalligraphyConfig.initDefault("fonts/GillSansC_0.ttf", R.attr.fontPath);
    }

    public static Context getAppContext() {
        return CourierApplication.context;
    }

}
