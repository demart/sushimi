package kz.aphion.sushimi.mobile.courierapp.fragments.tabs;

import android.animation.Animator;
import android.animation.AnimatorListenerAdapter;
import android.annotation.TargetApi;
import android.app.Activity;
import android.content.Intent;
import android.net.Uri;
import android.os.AsyncTask;
import android.os.Build;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentManager;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.ProgressBar;

import org.json.JSONException;

import java.io.IOException;
import java.util.List;

import kz.aphion.sushimi.mobile.courierapp.LoginActivity;
import kz.aphion.sushimi.mobile.courierapp.R;
import kz.aphion.sushimi.mobile.courierapp.adapters.OrdersRecycleViewAdapter;
import kz.aphion.sushimi.mobile.courierapp.adapters.RecycleViewItemClickListener;
import kz.aphion.sushimi.mobile.courierapp.data.DataService;
import kz.aphion.sushimi.mobile.courierapp.data.LocalStorage;
import kz.aphion.sushimi.mobile.courierapp.data.models.OrderModel;
import kz.aphion.sushimi.mobile.courierapp.data.models.OrderState;
import kz.aphion.sushimi.mobile.courierapp.data.models.WrappedResponse;
import kz.aphion.sushimi.mobile.courierapp.fragments.OrderDetailFragment;


public class OrdersTabFragment extends Fragment {

    private OnFragmentInteractionListener mListener;

    private OrdersTabFragment fragment;
    private RecyclerView ordersRecycleView;
    private OrdersRecycleViewAdapter ordersRecycleViewAdapter;
    private ReadOrdersTask readOrdersTask;
    private OrderState orderState;
    private Button refreshOrdersButton;

    private ProgressBar progressBar;

    public OrdersTabFragment() {
    }

    public OrdersTabFragment(OrderState orderState) {
        this.orderState = orderState;
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        if (getArguments() != null) {}
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_orders_tab, container, false);
        fragment = this;
        progressBar = (ProgressBar)view.findViewById(R.id.orders_loading_progress);
        ordersRecycleView = (RecyclerView)view.findViewById(R.id.ordersTabRecycleView);
        ordersRecycleView.setHasFixedSize(true);
        LinearLayoutManager llm = new LinearLayoutManager(view.getContext());
        llm.setOrientation(LinearLayoutManager.VERTICAL);
        ordersRecycleView.setLayoutManager(llm);
        ordersRecycleViewAdapter = new OrdersRecycleViewAdapter(null);
        ordersRecycleView.setAdapter(ordersRecycleViewAdapter);

        ordersRecycleView.addOnItemTouchListener(
                new RecycleViewItemClickListener(view.getContext(), new RecycleViewItemClickListener.OnItemClickListener() {
                    @Override
                    public void onItemClick(View view, int position) {
                        OrderModel model = ordersRecycleViewAdapter.getOrderModelList().get(position);
                        OrderDetailFragment inpOrderDetail = new OrderDetailFragment(model);
                        FragmentManager fM = getActivity().getSupportFragmentManager();
                        fM.beginTransaction()
                                .addToBackStack("Detail")
                                .replace(R.id.activityMainContent, inpOrderDetail)
                                .commit();
                    }
                })
        );

        refreshOrdersButton = (Button)view.findViewById(R.id.ordersTabRefreshButton);
        refreshOrdersButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                showProgress(true);
                readOrdersTask = new ReadOrdersTask(ordersRecycleView, ordersRecycleViewAdapter, orderState);
                readOrdersTask.execute((Void) null);
            }
        });

        showProgress(true);
        readOrdersTask = new ReadOrdersTask(ordersRecycleView, ordersRecycleViewAdapter, orderState);
        readOrdersTask.execute((Void) null);

        return view;
    }

    @Override
    public void setUserVisibleHint(boolean isVisibleToUser) {
        super.setUserVisibleHint(isVisibleToUser);
        if (isVisibleToUser) {
            System.out.println("Tab is visible for user");
        } else {
        }
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

    /**
     * Shows the progress UI and hides the login form.
     */
    @TargetApi(Build.VERSION_CODES.HONEYCOMB_MR2)
    public void showProgress(final boolean show) {
        // On Honeycomb MR2 we have the ViewPropertyAnimator APIs, which allow
        // for very easy animations. If available, use these APIs to fade-in
        // the progress spinner.
        refreshOrdersButton.setEnabled(!show);
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.HONEYCOMB_MR2) {
            int shortAnimTime = getResources().getInteger(android.R.integer.config_shortAnimTime);

            ordersRecycleView.setVisibility(show ? View.GONE : View.VISIBLE);
            ordersRecycleView.animate().setDuration(shortAnimTime).alpha(
                    show ? 0 : 1).setListener(new AnimatorListenerAdapter() {
                @Override
                public void onAnimationEnd(Animator animation) {
                    ordersRecycleView.setVisibility(show ? View.GONE : View.VISIBLE);
                }
            });

            progressBar.setVisibility(show ? View.VISIBLE : View.GONE);
            progressBar.animate().setDuration(shortAnimTime).alpha(
                    show ? 1 : 0).setListener(new AnimatorListenerAdapter() {
                @Override
                public void onAnimationEnd(Animator animation) {
                    progressBar.setVisibility(show ? View.VISIBLE : View.GONE);
                }
            });
        } else {
            // The ViewPropertyAnimator APIs are not available, so simply show
            // and hide the relevant UI components.
            progressBar.setVisibility(show ? View.VISIBLE : View.GONE);
            ordersRecycleView.setVisibility(show ? View.GONE : View.VISIBLE);
        }
    }


    /**
     * Represents an asynchronous login/registration task used to authenticate
     * the user.
     */
    public class ReadOrdersTask extends AsyncTask<Void, Void, Boolean> {

        RecyclerView ordersRecyclerView;
        OrdersRecycleViewAdapter ordersRecycleViewAdapter;
        OrderState orderState;
        WrappedResponse<List<OrderModel>> response;

        ReadOrdersTask(RecyclerView ordersRecyclerView, OrdersRecycleViewAdapter ordersRecycleViewAdapter, OrderState orderState) {
            this.ordersRecyclerView = ordersRecyclerView;
            this.ordersRecycleViewAdapter = ordersRecycleViewAdapter;
            this.orderState = orderState;
        }

        @Override
        protected Boolean doInBackground(Void... params) {
            try {
                response = DataService.readOrdersByState(orderState);
                ordersRecycleViewAdapter.setData(response.data);

                return true;
            } catch (JSONException e) {
                e.printStackTrace();
                return false;
            } catch (IOException e) {
                e.printStackTrace();
                return false;
            }
        }

        @Override
        protected void onPostExecute(final Boolean success) {
            showProgress(false);
            if (success) {
                if ("004".equals(response.errorCode)) {
                    // NEED LOGIN
                    LocalStorage.setSsoToken(null);
                    LocalStorage.setUsername(null);
                    startActivityForResult(new Intent(ordersRecyclerView.getRootView().getContext(), LoginActivity.class), 0);
                } else {
                    ordersRecycleViewAdapter.notifyDataSetChanged();
                }
            } else {
                System.out.println("FAILED");
            }
        }

        @Override
        protected void onCancelled() {
            showProgress(false);
        }
    }

}
