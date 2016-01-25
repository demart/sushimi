package kz.sushimi.models.integration;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import kz.sushimi.persistence.orders.Order;
import kz.sushimi.persistence.orders.OrderItem;

/**
 * Модель передачи данных в систему управления заказами
 * 
 * @author Demart
 *
 */
public class OrderModel {
	
	public OrderModel(Order order) {
		buildModel(order);
	}
	
	
	private void buildModel(Order order) {
		this.id = order.getId();
		this.key = order.getKey();
		this.orderSum = order.getOrderSum();
		this.orderTime = order.getOrderTime();
		
		this.orderItems = new ArrayList<OrderItemModel>();
		for (OrderItem item : order.getOrderItems()) {
			orderItems.add(new OrderItemModel(item));
		}
		
		this.personCash = order.getPersonCash();
		this.personCount = order.getPersonCount();
		this.personEmail = order.getPersonEmail();
		this.personName = order.getPersonName();
		this.personPhone = order.getPersonPhone();
		this.personRemark = order.getPersonRemark();
		
		this.departmentCode = String.valueOf(order.getDepartment().getId());
		this.deliveryTime = order.getDeliveryTime();
		this.deliveryType = order.getDeliveryType().toString();
		this.payMethod = order.getPayMethod().toString();
		
		this.cityCode = String.valueOf(order.getCity().getId());
		this.addressBuilding = order.getAddressBuilding();
		this.addressCityName = order.getAddressCityName();
		this.addressCorpus = order.getAddressCorpus();
		this.addressDoorCode = order.getAddressDoorCode();
		this.addressFlat = order.getAddressFlat();
		this.addressFloor = order.getAddressFloor();
		this.addressHouse = order.getAddressHouse();
		this.addressOffice = order.getAddressOffice();
		this.addressPorch = order.getAddressPorch();
		this.addressRoom = order.getAddressRoom();
		this.addressStreetName = order.getAddressStreetName();
		this.GeoLatitude = order.getGeoLatitude();
		this.GeoLongitude = order.getGeoLongitude();
		
	}
	
	
	private int id;
	
	private String key; 
	
	private int orderSum;
	
	private Calendar orderTime;	
	
	private List<OrderItemModel> orderItems;	
	
	private String personPhone;
	
	private String personName;
	
	private int personCount;

	private String personRemark;

	private String personEmail;	
	
	private int personCash;	
	
	// Delivery Detail
	
	private String departmentCode;
	
	private String deliveryType;
	
	private Calendar deliveryTime;
	
	private String payMethod;

	// ====================
	// === ADDRESS ========
	// ====================
	
	private String cityCode;
	
	private String addressCityName;
	
	private String addressStreetName;
	
	private String addressHouse;
	
	private String addressCorpus;
	
	private String addressBuilding;
	
	private String addressFlat;
	
	private String addressPorch;
	
	private String addressDoorCode;
	
	private String addressFloor;
	
	private String addressRoom;
	
	private String addressOffice;
	
	private String GeoLatitude;
	
	private String GeoLongitude;
	
}
