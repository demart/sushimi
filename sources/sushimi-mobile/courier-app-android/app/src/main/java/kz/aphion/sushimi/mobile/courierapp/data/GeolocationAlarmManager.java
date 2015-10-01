package kz.aphion.sushimi.mobile.courierapp.data;

import android.app.AlarmManager;
import android.app.PendingIntent;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.location.Location;
import android.os.AsyncTask;

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

import kz.aphion.sushimi.mobile.courierapp.MainActivity;
import kz.aphion.sushimi.mobile.courierapp.data.models.ResponseStatus;
import kz.aphion.sushimi.mobile.courierapp.data.models.UpdateGeolocationCoordinateModel;
import kz.aphion.sushimi.mobile.courierapp.data.models.UserAuthenticateResultModel;
import kz.aphion.sushimi.mobile.courierapp.data.models.WrappedResponse;

/**
 * Created by artem.demidovich on 9/23/15.
 */
public class GeolocationAlarmManager extends BroadcastReceiver {

    public static Location lastSynchronizedLocation;

    @Override
    public void onReceive(Context context, Intent intent) {
        System.out.println("GeolocationAlarmManager onReceive");

        Location location = GeolocationManager.getInstance().getLastLocation();
        if (location == null) {
            System.out.println("Location is null, update geolocation will be skipped");
            return;
        }

        if (lastSynchronizedLocation != null)
            if (lastSynchronizedLocation.getLatitude() == location.getLatitude()
                    && lastSynchronizedLocation.getLongitude() == location.getLongitude()) {
                System.out.println("Coordinate the same, skip updating");
                return;
            }

        UpdateGeolocationCoordinateModel model = new UpdateGeolocationCoordinateModel();
        model.authToken = LocalStorage.getSsoToken();
        model.latitude = String.valueOf(location.getLatitude());
        model.longitude = String.valueOf(location.getLongitude());

        UpdateGeolocationTask task = new UpdateGeolocationTask(model, location);
        task.execute((Void) null);
    }

    public static PendingIntent pi;

    public void startAlarmService(Context context) {
        AlarmManager am =( AlarmManager)context.getSystemService(Context.ALARM_SERVICE);
        Intent i = new Intent(context, GeolocationAlarmManager.class);
        pi = PendingIntent.getBroadcast(context, 0, i, 0);
        am.setInexactRepeating(AlarmManager.RTC_WAKEUP, System.currentTimeMillis(), 1000 * 10, pi); // Millisec * Second * Minute
    }

    public void cancelAlarmService(Context context) {
        Intent intent = new Intent(context, GeolocationAlarmManager.class);
        AlarmManager alarmManager = (AlarmManager) context.getSystemService(Context.ALARM_SERVICE);
        alarmManager.cancel(pi);
        pi.cancel();
        pi = null;
    }



    public class UpdateGeolocationTask extends AsyncTask<Void, Void, Boolean> {

        private final UpdateGeolocationCoordinateModel _model;
        private Location location;

        public UpdateGeolocationTask(UpdateGeolocationCoordinateModel model, Location location) {
            _model = model;
            this.location = location;
        }

        @Override
        protected Boolean doInBackground(Void... params) {
            try {
                WrappedResponse<Object> response = DataService.updateGeolocationCoordinate(_model);
                if (response.status == ResponseStatus.SUCCESS) {
                    System.out.println("Geolocaiton successfully updated");
                    lastSynchronizedLocation = location;
                }
            } catch (JSONException e) {
                e.printStackTrace();
            } catch (IOException e) {
                e.printStackTrace();
            }
            return true;
        }

        @Override
        protected void onPostExecute(final Boolean success) {
            if (success) {

            } else {
            }
        }

        @Override
        protected void onCancelled() {
        }
    }

}
