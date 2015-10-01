package kz.aphion.sushimi.mobile.courierapp.adapters;

import android.graphics.Color;
import android.support.v7.widget.CardView;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import kz.aphion.sushimi.mobile.courierapp.R;
import kz.aphion.sushimi.mobile.courierapp.data.models.OrderModel;
import kz.aphion.sushimi.mobile.courierapp.data.models.OrderState;

/**
 * Created by artem.demidovich on 9/17/15.
 */
public class OrdersRecycleViewAdapter extends RecyclerView.Adapter<OrdersRecycleViewAdapter.OrderViewHolder> {

    List<OrderModel> orderModelList;

    public List<OrderModel> getOrderModelList() {
        return orderModelList;
    }

    public OrdersRecycleViewAdapter(List<OrderModel> orderModelList){
        if (orderModelList != null)
            this.orderModelList = orderModelList;
        else {
            this.orderModelList = new ArrayList<OrderModel>();
        }
    }

    public void setData(List<OrderModel> data) {
        this.orderModelList = data;
    }


    @Override
    public int getItemCount() {
        if (orderModelList != null)
            return orderModelList.size();
        return 0;
    }

    @Override
    public OrderViewHolder onCreateViewHolder(ViewGroup viewGroup, int i) {
        View v = LayoutInflater.from(viewGroup.getContext()).inflate(R.layout.order_card_view, viewGroup, false);
        OrderViewHolder pvh = new OrderViewHolder(v);
        return pvh;
    }

    @Override
    public void onBindViewHolder(OrderViewHolder personViewHolder, int i) {
        personViewHolder.clientName.setText(orderModelList.get(i).clientName);
        personViewHolder.orderNumber.setText("#" + orderModelList.get(i).orderNumber);

        // Format phone number
        String phoneRawString = orderModelList.get(i).clientPhone;
        if (phoneRawString.startsWith("8"))
            phoneRawString = phoneRawString.substring(1);
        java.text.MessageFormat phoneMsgFmt=new java.text.MessageFormat("+7 ({0}) {1}-{2}-{3}");
        String[] phoneNumArr={phoneRawString.substring(0, 3),
                phoneRawString.substring(3, 6), phoneRawString.substring(6, 8), phoneRawString.substring(8)
        };
        personViewHolder.clientPhone.setText(phoneMsgFmt.format(phoneNumArr));

        if (orderModelList.get(i).orderState == OrderState.REGISTERED ||
                orderModelList.get(i).orderState == OrderState.IN_PROGRESS ||
                orderModelList.get(i).orderState == OrderState.WAITING_FOR_DELIVERY) {
            personViewHolder.deliveryTime.setText(getTimeToDelivery(orderModelList.get(i).deliveryTime));
            personViewHolder.deliveryTime.setTextColor(Color.parseColor("#808080"));
        }

        if (orderModelList.get(i).orderState == OrderState.ON_DELIVERY) {
            personViewHolder.deliveryTime.setText(getTimeToDelivery(orderModelList.get(i).deliveryTime));
            personViewHolder.deliveryTime.setTextColor(Color.parseColor("#228B22"));
        }

        if (orderModelList.get(i).orderState == OrderState.DELIVERED) {
            personViewHolder.deliveryTime.setText("доставлен");
            personViewHolder.deliveryTime.setTextColor(Color.parseColor("#808080"));
        }
        if (orderModelList.get(i).orderState == OrderState.CANCELED) {
            personViewHolder.deliveryTime.setText("отменен");
            personViewHolder.deliveryTime.setTextColor(Color.parseColor("#808080"));
        }
        if (orderModelList.get(i).orderState == OrderState.RETURNED) {
            personViewHolder.deliveryTime.setText("возврат");
            personViewHolder.deliveryTime.setTextColor(Color.parseColor("#808080"));
        }
    }

    private String getTimeToDelivery(Calendar deliveryTime) {
        Calendar currentTime = Calendar.getInstance();
        Long currentTimeLong = currentTime.getTimeInMillis();
        Long deliveryTimeLong = deliveryTime.getTimeInMillis();

        if (currentTimeLong > deliveryTimeLong) {
            Long timeToDelivery = currentTimeLong - deliveryTimeLong;
            Long diffSeconds = timeToDelivery / 1000 % 60;
            Long diffMinutes = timeToDelivery / (60 * 1000) % 60;
            Long diffHours = timeToDelivery / (60 * 60 * 1000);
            return "+ " +
                    (diffHours.toString().length() == 1 ? "0" + diffHours: diffHours) + ":" +
                    (diffMinutes.toString().length() == 1 ? "0" + diffMinutes: diffMinutes) + ":" +
                    (diffSeconds.toString().length() == 1 ? "0" + diffSeconds: diffSeconds);
        } else {
            Long timeToDelivery = deliveryTimeLong - currentTimeLong;
            Long diffSeconds = timeToDelivery / 1000 % 60;
            Long diffMinutes = timeToDelivery / (60 * 1000) % 60;
            Long diffHours = timeToDelivery / (60 * 60 * 1000);
            return "- " +
                    (diffHours.toString().length() == 1 ? "0" + diffHours: diffHours) + ":" +
                    (diffMinutes.toString().length() == 1 ? "0" + diffMinutes: diffMinutes) + ":" +
                    (diffSeconds.toString().length() == 1 ? "0" + diffSeconds: diffSeconds);
        }
    }


    @Override
    public void onAttachedToRecyclerView(RecyclerView recyclerView) {
        super.onAttachedToRecyclerView(recyclerView);
    }


    public static class OrderViewHolder extends RecyclerView.ViewHolder {
        CardView cv;

        TextView orderNumber;
        TextView clientName;
        TextView clientPhone;
        TextView deliveryTime;

        OrderViewHolder(View itemView) {
            super(itemView);
            cv = (CardView)itemView.findViewById(R.id.orderCardView);
            orderNumber = (TextView)itemView.findViewById(R.id.orderCardOrderNumber);
            clientName = (TextView)itemView.findViewById(R.id.orderCardClientName);
            clientPhone = (TextView)itemView.findViewById(R.id.orderCardClientPhone);
            clientPhone = (TextView)itemView.findViewById(R.id.orderCardClientPhone);
            deliveryTime = (TextView)itemView.findViewById(R.id.orderCardDeliveryTime);
        }
    }


}
