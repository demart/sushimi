package kz.aphion.sushimi.mobile.courierapp.data;

import android.app.AlarmManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.location.Location;
import android.location.LocationListener;
import android.location.LocationManager;
import android.os.Bundle;

/**
 * Created by artem.demidovich on 9/17/15.
 */
public class GeolocationManager {

    private static GeolocationManager _instance;
    private LocationManager locationManager;
    private Location lastLocation;

    private GeolocationAlarmManager alarmManager;


    public GeolocationManager() {
    }

    public static GeolocationManager getInstance() {
        if (_instance == null) {
            _instance = new GeolocationManager();
        }
        return _instance;
    }

    public Location getLastLocation() {
        return this.lastLocation;
    }

    public void initGeolocation(LocationManager locationManager) {
        this.locationManager = locationManager;

        LocationListener locationListener = new LocationListener() {
            public void onLocationChanged(Location location) {
                makeUseOfNewLocation(location);
            }
            public void onStatusChanged(String provider, int status, Bundle extras) {
                System.out.println("GEO");
            }
            public void onProviderEnabled(String provider) {
                System.out.println("GEO");
            }
            public void onProviderDisabled(String provider) {
                System.out.println("GEO");
            }
        };

        //this.locationManager.requestLocationUpdates(LocationManager.NETWORK_PROVIDER, 0, 0, locationListener);
        this.locationManager.requestLocationUpdates(LocationManager.GPS_PROVIDER, 0, 0, locationListener);
    }

    private void makeUseOfNewLocation(Location location) {
        System.out.println("New geolocation: " + location);
        this.lastLocation = location;
    }

    public void startAlarmService(Context context) {
        if (alarmManager == null)
            alarmManager = new GeolocationAlarmManager();
        alarmManager.startAlarmService(context);
    }

    public void cancelAlarmService(Context context) {
        alarmManager.cancelAlarmService(context);
    }

}
