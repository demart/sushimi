package kz.aphion.sushimi.mobile.courierapp;


import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentManager;
import android.support.v4.app.FragmentStatePagerAdapter;


import kz.aphion.sushimi.mobile.courierapp.data.models.OrderState;
import kz.aphion.sushimi.mobile.courierapp.fragments.tabs.OrdersTabFragment;

/**
 * Created by Edwin on 15/02/2015.
 */
public class ViewPagerAdapter extends FragmentStatePagerAdapter {

    CharSequence Titles[];
    int NumbOfTabs;

    public ViewPagerAdapter(FragmentManager fm,CharSequence mTitles[], int mNumbOfTabsumb) {
        super(fm);
        this.Titles = mTitles;
        this.NumbOfTabs = mNumbOfTabsumb;
    }

    @Override
    public Fragment getItem(int position) {
        if(position == 0) {
            OrdersTabFragment onDeliveryOrdersTabFragment = new OrdersTabFragment(OrderState.ON_DELIVERY);
            return onDeliveryOrdersTabFragment;
        }
        if(position == 1) {
            OrdersTabFragment inProgressOrdersFragment = new OrdersTabFragment(OrderState.IN_PROGRESS);
            return inProgressOrdersFragment;
        }
        if(position == 2) {
            OrdersTabFragment completedOrdersFragment = new OrdersTabFragment(OrderState.DELIVERED);
            return completedOrdersFragment;
        }
        return null;
    }

    @Override
    public CharSequence getPageTitle(int position) {
        return Titles[position];
    }

    @Override
    public int getCount() {
        return NumbOfTabs;
    }
}
