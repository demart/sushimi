package kz.aphion.sushimi.mobile.courierapp;

import android.app.Application;

import uk.co.chrisjenx.calligraphy.CalligraphyConfig;

/**
 * Created by artem.demidovich on 9/24/15.
 */
public class CourierApplication extends Application {

    @Override
    public void onCreate() {
        super.onCreate();
        System.out.println("Courier Application onCreate");
        CalligraphyConfig.initDefault("fonts/GillSansC_0.ttf", R.attr.fontPath);
    }

}
