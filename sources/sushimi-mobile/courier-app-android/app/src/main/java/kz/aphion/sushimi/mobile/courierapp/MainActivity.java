package kz.aphion.sushimi.mobile.courierapp;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.location.LocationManager;
import android.preference.PreferenceManager;
import android.support.v4.app.Fragment;
import android.support.v7.app.ActionBarActivity;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;

import android.support.v7.widget.Toolbar;

import kz.aphion.sushimi.mobile.courierapp.data.GeolocationAlarmManager;
import kz.aphion.sushimi.mobile.courierapp.data.GeolocationManager;
import kz.aphion.sushimi.mobile.courierapp.data.LocalStorage;
import kz.aphion.sushimi.mobile.courierapp.fragments.tabs.MainTabFragment;
import uk.co.chrisjenx.calligraphy.CalligraphyContextWrapper;


public class MainActivity extends ActionBarActivity {

    Toolbar toolbar;
    private LocationManager locationManager;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // TODO CHECK IF SESSION IS ALIVE
        // TODO IF NOT SEND TO LOGIN ACTIVITY

        setContentView(R.layout.activity_main);

        // Enable geolocaiton listeners
        LocationManager locationManager = (LocationManager) this.getSystemService(Context.LOCATION_SERVICE);
        GeolocationManager.getInstance().initGeolocation(locationManager);

        toolbar = (Toolbar) findViewById(R.id.tool_bar);
        setSupportActionBar(toolbar);
        setTitle("Здавствуйте, " + LocalStorage.getUsername());

        Fragment mainTab = new MainTabFragment();
        getSupportFragmentManager()
                .beginTransaction()
                .add(R.id.activityMainContent, mainTab, "MAIN_TAB")
                .commit();

        GeolocationManager.getInstance().startAlarmService(getApplicationContext());
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        System.out.println("MainActivity onDestroy invoked");
        GeolocationManager.getInstance().cancelAlarmService(getApplicationContext());
    }

    @Override
    public void onResume() {
        super.onResume();
        System.out.println("MainActivity onResume");
        SharedPreferences.Editor e = PreferenceManager.getDefaultSharedPreferences(this).edit();
        e.putString("last_activity", getClass().getSimpleName());
        e.commit();

    }

    @Override
    protected void onPause() {
        super.onPause();
        System.out.println("MainActivity onPause");
        SharedPreferences.Editor e = PreferenceManager.getDefaultSharedPreferences(this).edit();
        e.putString("last_activity", getClass().getSimpleName());
        e.commit();
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        getMenuInflater().inflate(R.menu.menu_main, menu);
        return true;
        //return false;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();

        /*
        if (id == R.id.action_refresh) {
            System.out.println("action_refresh");
            return true;
        }*/
/*
        if (id == R.id.action_settings) {
            System.out.println("action_settings");
            return true;
        }
*/
        if (id == R.id.action_logout) {
            System.out.println("action_logout");
            LocalStorage.setSsoToken(null);
            LocalStorage.setUsername(null);
            finish();
            startActivityForResult(new Intent(this, LoginActivity.class), 0);
            return true;
        }

        return super.onOptionsItemSelected(item);
    }


    @Override
    protected void attachBaseContext(Context newBase) {
        super.attachBaseContext(new CalligraphyContextWrapper(newBase));
    }
}
