package kz.sushimi.console.models.orders;

import java.util.Calendar;
import java.util.Date;

import kz.sushimi.console.persistence.orders.OrderSource;
import kz.sushimi.console.persistence.orders.OrderState;
import kz.sushimi.console.persistence.orders.OrderType;
import kz.sushimi.console.persistence.orders.site.SiteOrderSource;
import kz.sushimi.console.persistence.orders.site.SiteOrderStatus;

public class OperatorOrdersModel {
	
	private Long id;
	
	private String orderNumber;
	
	private OrderState state;
	
	private String clientName;
	
	private String clientPhone;
	
	private String clientAddress;
	
	private Integer status; //выводить ли заказы с датой более чем три часа
	
	private OrderType type;
	
	private String timer;
	
	private Date deliveryDate;
	
	private Date orderDate;
	
	private String typeGrouping;
	
	private OrderSource source;
	
	private String comment;
	
	private String courierName;
	
	private Long courierId;
	
	public void setStatus (Integer status) {
		this.status = status;
	}
	
	public void setCourierName (String courierName) {
		this.courierName = courierName;
	}
	
	public void setCourierId (Long courierId) {
		this.courierId = courierId;
	}
	
	public void setTimer (String timer) {
		this.timer = timer;
	}
	
	public void setOrderNumber(String orderNumber) {
		this.orderNumber = orderNumber;
	}
	
	public void setId(Long id) {
		this.id = id;
	}
	
	public void setClientName(String clientName) {
		this.clientName = clientName;
	}
	
	public void setClientAddress(String clientAddress) {
		this.clientAddress = clientAddress;
	}
	
	public void setState(OrderState state) {
		this.state = state;
	}
	
	public void setDeliveryDate(Date deliveryDate) {
		this.deliveryDate = deliveryDate;
	}
	
	public void setOrderDate (Date orderDate) {
		this.orderDate = orderDate;
	}
	
	public void setType(OrderType type) {
		this.type = type;
	}
	
	public void setClientPhone(String clientPhone) {
		this.clientPhone = clientPhone;
	}
	
	public void setSource (OrderSource source) {
		this.source = source;
	}
	
	public void setTypeGrouping (String typeGrouping) {
		this.typeGrouping = typeGrouping;
	}

	public void setComment(String comment) {
		this.comment = comment;
		// TODO Auto-generated method stub
		
	}

}
