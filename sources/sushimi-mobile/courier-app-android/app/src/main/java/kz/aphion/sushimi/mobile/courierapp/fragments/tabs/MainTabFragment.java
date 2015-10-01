package kz.aphion.sushimi.mobile.courierapp.fragments.tabs;

import android.animation.Animator;
import android.animation.AnimatorListenerAdapter;
import android.annotation.TargetApi;
import android.app.Activity;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.support.v4.view.ViewPager;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import kz.aphion.sushimi.mobile.courierapp.MainActivity;
import kz.aphion.sushimi.mobile.courierapp.R;
import kz.aphion.sushimi.mobile.courierapp.ViewPagerAdapter;
import kz.aphion.sushimi.mobile.courierapp.widget.SlidingTabLayout;

/**
 * A simple {@link Fragment} subclass.
 * Activities that contain this fragment must implement the
 * {@link MainTabFragment.OnFragmentInteractionListener} interface
 * to handle interaction events.
 */
public class MainTabFragment extends Fragment {

    ViewPager pager;
    ViewPagerAdapter adapter;
    SlidingTabLayout tabs;
    CharSequence titles[]={"Мои доставки","Готовятся", "Доставленные"};
    int numberOfTabs =3;

    private OnFragmentInteractionListener mListener;

    public MainTabFragment() {}

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        View v = inflater.inflate(R.layout.fragment_main_tab, container, false);

        adapter =  new ViewPagerAdapter(getChildFragmentManager(),titles, numberOfTabs);
        pager = (ViewPager) v.findViewById(R.id.pager);
        pager.setAdapter(adapter);
        tabs = (SlidingTabLayout) v.findViewById(R.id.tabs);
        tabs.setDistributeEvenly(true);
        //tabs.setSelectedIndicatorColors(R.color.ColorOrange);
        tabs.setCustomTabColorizer(new SlidingTabLayout.TabColorizer() {
            @Override
            public int getIndicatorColor(int position) {
                return getResources().getColor(R.color.ColorSelectedTabScrollColor);
            }
        });

        tabs.setViewPager(pager);

        return v;
    }

    @Override
    public void onResume() {
        super.onResume();

        System.out.println("MainTabs onResume...");
        adapter =  new ViewPagerAdapter(getChildFragmentManager(),titles, numberOfTabs);
        pager = (ViewPager) this.getView().findViewById(R.id.pager);
        pager.setAdapter(adapter);
        tabs = (SlidingTabLayout) this.getView().findViewById(R.id.tabs);
        tabs.setDistributeEvenly(true);
        tabs.setSelectedIndicatorColors(R.color.ColorOrange);
        tabs.setCustomTabColorizer(new SlidingTabLayout.TabColorizer() {
            @Override
            public int getIndicatorColor(int position) {
                return getResources().getColor(R.color.ColorSelectedTabScrollColor);
            }
        });
        tabs.setViewPager(pager);
    }

    public void onButtonPressed(Uri uri) {
        if (mListener != null) {
            mListener.onFragmentInteraction(uri);
        }
    }

    @Override
    public void onAttach(Activity activity) {
        super.onAttach(activity);
    }

    @Override
    public void onDetach() {
        super.onDetach();
        mListener = null;
    }

    public interface OnFragmentInteractionListener {
        public void onFragmentInteraction(Uri uri);
    }
}
