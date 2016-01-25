package kz.aphion.sushimi.mobile.courierapp.fragments;

import android.app.Activity;
import android.content.Intent;
import android.net.Uri;
import android.os.AsyncTask;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.TextView;

import java.text.SimpleDateFormat;

import kz.aphion.sushimi.mobile.courierapp.R;
import kz.aphion.sushimi.mobile.courierapp.data.DataService;
import kz.aphion.sushimi.mobile.courierapp.data.GeolocationManager;
import kz.aphion.sushimi.mobile.courierapp.data.LocalStorage;
import kz.aphion.sushimi.mobile.courierapp.data.models.DeliveryType;
import kz.aphion.sushimi.mobile.courierapp.data.models.OrderModel;
import kz.aphion.sushimi.mobile.courierapp.data.models.OrderState;
import kz.aphion.sushimi.mobile.courierapp.data.models.PayMethod;
import kz.aphion.sushimi.mobile.courierapp.data.models.ResponseStatus;
import kz.aphion.sushimi.mobile.courierapp.data.models.UpdateOrderStateModel;
import kz.aphion.sushimi.mobile.courierapp.data.models.WrappedResponse;


/**
 * A simple {@link Fragment} subclass.
 * Activities that contain this fragment must implement the
 * {@link OrderDetailFragment.OnFragmentInteractionListener} interface
 * to handle interaction events.
 */
public class OrderDetailFragment extends Fragment {

    private OnFragmentInteractionListener mListener;
    private OrderModel orderModel;

    public OrderDetailFragment(OrderModel model) {
        this.orderModel = model;
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        if (getArguments() != null) {}
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_order_detail, container, false);


        loadOrderModel(view);

        if (orderModel.orderState == OrderState.ON_DELIVERY) {
            View buttonsView = view.findViewById(R.id.orderDetailButtons);
            buttonsView.setVisibility(View.VISIBLE);

            Button deliveredButton = (Button) view.findViewById(R.id.orderDetailDeliveredButton);
            deliveredButton.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                System.out.println("Delivered order clicked orderNumber:" + orderModel.orderNumber);
                UpdateOrderStateModel model = new UpdateOrderStateModel();
                model.orderNumber = orderModel.orderNumber;
                model.authToken = LocalStorage.getSsoToken();
                if (GeolocationManager.getInstance().getLastLocation() != null) {
                    model.longitude = String.valueOf(GeolocationManager.getInstance().getLastLocation().getLongitude());
                    model.latitude = String.valueOf(GeolocationManager.getInstance().getLastLocation().getLatitude());
                }
                DeliveryOrderTask deliveryOrderTask = new DeliveryOrderTask(model);
                deliveryOrderTask.execute((Void) null);
                }
            });

            Button returnedButton = (Button) view.findViewById(R.id.orderDetailReturnedButton);
            returnedButton.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                System.out.println("Returned order clicked orderNumber:" + orderModel.orderNumber);
                UpdateOrderStateModel model = new UpdateOrderStateModel();
                model.orderNumber = orderModel.orderNumber;
                model.reason = "Клиент отказался от заказа";
                model.authToken = LocalStorage.getSsoToken();
                if (GeolocationManager.getInstance().getLastLocation() != null) {
                    model.longitude = String.valueOf(GeolocationManager.getInstance().getLastLocation().getLongitude());
                    model.latitude = String.valueOf(GeolocationManager.getInstance().getLastLocation().getLatitude());
                }
                ReturnOrderTask returnOrderTask = new ReturnOrderTask(model);
                returnOrderTask.execute((Void) null);
                }
            });

        }

        Button callButton = (Button) view.findViewById(R.id.inpCallButton);
        callButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                System.out.print("Phone call clicked");
                Intent callIntent = new Intent(Intent.ACTION_CALL);

                String phoneNumber = orderModel.clientPhone;
                if (phoneNumber.startsWith("8"))
                    phoneNumber = phoneNumber.substring(1);
                callIntent.setData(Uri.parse("tel:+7" + phoneNumber));
                startActivity(callIntent);
            }

        });

        return view;
    }


    public void loadOrderModel(View view) {
        TextView orderNumberView = (TextView) view.findViewById(R.id.inpOrderNumber);
        orderNumberView.setText(orderModel.orderNumber);

        TextView clientNameView = (TextView) view.findViewById(R.id.inpClientName);
        clientNameView.setText(orderModel.clientName);

        // Format phone number
        TextView clientPhoneView = (TextView) view.findViewById(R.id.inpClientPhone);
        String phoneRawString = orderModel.clientPhone;
        if (phoneRawString.startsWith("8"))
            phoneRawString = phoneRawString.substring(1);
        java.text.MessageFormat phoneMsgFmt=new java.text.MessageFormat("+7 ({0}) {1}-{2}-{3}");
        String[] phoneNumArr={phoneRawString.substring(0, 3),
                phoneRawString.substring(3, 6), phoneRawString.substring(6, 8), phoneRawString.substring(8)};
        clientPhoneView.setText(phoneMsgFmt.format(phoneNumArr));

        TextView deliveryTypeView = (TextView) view.findViewById(R.id.inpDeliveryType);
        if (orderModel.deliveryType == DeliveryType.DELIVERY)
            deliveryTypeView.setText("Доставка");
        if (orderModel.deliveryType == DeliveryType.DELIVERY_IN_TIME)
            deliveryTypeView.setText("Доставка ко времени");
        if (orderModel.deliveryType == DeliveryType.SELF_SERVICE)
            deliveryTypeView.setText("Самовывоз");

        TextView orderStateView = (TextView) view.findViewById(R.id.inpOrderState);
        if (orderModel.orderState == OrderState.REGISTERED)
            orderStateView.setText("Заказ зарегистрирован");
        if (orderModel.orderState == OrderState.IN_PROGRESS)
            orderStateView.setText("Заках готовиться");
        if (orderModel.orderState == OrderState.WAITING_FOR_DELIVERY)
            orderStateView.setText("Заказ готов");
        if (orderModel.orderState == OrderState.ON_DELIVERY)
            orderStateView.setText("Заказ отправлен на доставку");
        if (orderModel.orderState == OrderState.DELIVERED)
            orderStateView.setText("Заказ доставлен");
        if (orderModel.orderState == OrderState.CANCELED)
            orderStateView.setText("Заказ отменен");
        if (orderModel.orderState == OrderState.RETURNED)
            orderStateView.setText("Заказ вернули");

        TextView payMethodView = (TextView) view.findViewById(R.id.inpPayMethod);
        if (orderModel.payMethod == PayMethod.CASH)
            payMethodView.setText("Наличными");
        if (orderModel.payMethod == PayMethod.CREDIT_CARD)
            payMethodView.setText("Оплата картой");
        if (orderModel.payMethod == PayMethod.CREDIT_CARD_ON_DELIVERY)
            payMethodView.setText("Оплата картой курьеру");

        SimpleDateFormat format = new SimpleDateFormat("dd.MM.yyyy hh:mm");
        TextView orderTimeView = (TextView) view.findViewById(R.id.inpOderTime);
        if (orderModel.orderTime != null) {
            orderTimeView.setText(format.format(orderModel.orderTime.getTime()));
        } else {
            orderTimeView.setText("Ошибка!");
        }

        TextView deliveryTimeView = (TextView) view.findViewById(R.id.inpDeliveryTime);
        if (orderModel.deliveryTime != null) {
            deliveryTimeView.setText(format.format(orderModel.deliveryTime.getTime()));
        } else {
            deliveryTimeView.setText("Ошибка!");
        }

        TextView addressView = (TextView) view.findViewById(R.id.inpClientAddress);
        addressView.setText(orderModel.address);

        TextView clientCommentView = (TextView) view.findViewById(R.id.inpClientComment);
        clientCommentView.setText(orderModel.clientComment);

        TextView orderSumView = (TextView) view.findViewById(R.id.inpOrderSum);
        orderSumView.setText(String.valueOf(orderModel.orderSum) + " тнг.");

        TextView orderClientCashView = (TextView) view.findViewById(R.id.inpOrderClientCash);
        if (orderModel.clientCash != null && orderModel.clientCash > 0) {
            orderClientCashView.setText(orderModel.clientCash - orderModel.orderSum + " тнг. (" + orderModel.clientCash + " тнг.)");
        } else {
            orderClientCashView.setText("");
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

    public class DeliveryOrderTask extends AsyncTask<Void, Void, Boolean> {

        private final UpdateOrderStateModel _model;

        public DeliveryOrderTask(UpdateOrderStateModel model) {_model = model;}

        @Override
        protected Boolean doInBackground(Void... params) {
            try {
                WrappedResponse response = DataService.deliveryOrder(_model);
                if (response.status == ResponseStatus.SUCCESS) {
                    // TODO SUCCESS
                    return true;
                } else {
                    // TODO FAILED
                    return false;
                }
            } catch (Throwable ex) {
                // TODO SHOW ERROR
                ex.printStackTrace();
                return false;
            }
        }

        @Override
        protected void onPostExecute(final Boolean success) {
            if (success) {
                getActivity().getSupportFragmentManager().popBackStack();
            } else {
                // TODO Show alert
            }
        }
        @Override
        protected void onCancelled() {}
    }

    public class ReturnOrderTask extends AsyncTask<Void, Void, Boolean> {

        private final UpdateOrderStateModel _model;

        public ReturnOrderTask(UpdateOrderStateModel model) {_model = model;}

        @Override
        protected Boolean doInBackground(Void... params) {
            try {
                WrappedResponse response = DataService.returnOrder(_model);
                if (response.status == ResponseStatus.SUCCESS) {
                    // TODO SUCCESS
                    return true;
                } else {
                    // TODO FAILED
                    return false;
                }
            } catch (Throwable ex) {
                // TODO SHOW ERROR
                ex.printStackTrace();
                return false;
            }
        }

        @Override
        protected void onPostExecute(final Boolean success) {
            if (success) {
                getActivity().getSupportFragmentManager().popBackStack();
            } else {
                // TODO Show alert
            }
        }
        @Override
        protected void onCancelled() {}
    }
}
