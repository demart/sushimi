package kz.sushimi.restapi.v1.models.order;

import java.util.ArrayList;
import java.util.List;

import kz.sushimi.persistence.dictionaries.Product;
import kz.sushimi.persistence.dictionaries.ProductType;
import kz.sushimi.persistence.orders.DeliveryType;
import kz.sushimi.persistence.orders.Order;
import kz.sushimi.persistence.orders.OrderItem;
import kz.sushimi.persistence.orders.OrderProcess;
import kz.sushimi.persistence.orders.PayMethod;
import kz.sushimi.restapi.v1.models.ProductModel;
import kz.sushimi.restapi.v1.service.ProductService;
import play.Logger;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

public class OrderModel {
	
	private int id;
	
	private String key; 
		
	private String orderNumber;
	
	private String orderSource;
	
	private Integer orderSourceDiscount;
	
	private int orderSum;
	
	private long orderTime;	
	
	private List<OrderItemModel> orderItems;	
	
	private OrderProcess orderStatus;
	
	// ====================
	// === PERSON INFO ====
	// ====================
	
	private String personPhone;
	
	private String personName;
	
	private Integer personCount;

	private String personComments;

	private String personEmail;	
	
	private Integer personCash;	
	
	// ====================
	// === DELIVERY =======
	// ====================
	private String departmentName;
	private String departmentAddress;
	
	private DeliveryType deliveryType;
	
	private Long deliveryTime;
	
	private PayMethod payMethod;

	// ====================
	// === ADDRESS ========
	// ====================

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
	private String geoLatitude;
	private String geoLongitude;	
		
	public OrderModel() {}

	public static int freeSaucePerOrderSum = 2000; // Бесплатно соусы при этой сумме	
	
	public void buildModel() {
		// Есть ли суши в заказе и на какую сумму
		int sum = 0;
		boolean isExistSushi = false;
		ProductModel sauceSoyProduct = null;
		ProductModel sauceVasabiProduct = null;
		ProductModel sauceImbirProduct = null;
		
		//Gson gson = new GsonBuilder().create();
		//Logger.info(gson.toJson(this));
		
		for (OrderItemModel item : this.getOrderItems()) {
			if (item.getProduct() != null) {
				if (item.getProduct().getType() == ProductType.SUSHI) {
					isExistSushi = true;
					sum += item.getCount() * item.getProduct().getCost();
				}
				
				if (item.getProduct().getType() == ProductType.IMBIR)
					sauceImbirProduct = item.getProduct(); 
				if (item.getProduct().getType() == ProductType.SOY)
					sauceSoyProduct = item.getProduct();
				if (item.getProduct().getType() == ProductType.VASABI)
					sauceVasabiProduct = item.getProduct();
			}
		}		
		
		
		// Кол-во бесплатных соусов
		int freeSauceCount = sum / freeSaucePerOrderSum;		
		this.setOrderSum(0);
		
		for (OrderItemModel orderItem : this.getOrderItems()) {
			if (isExistSushi) {
				if (sauceImbirProduct != null && sauceImbirProduct == orderItem.getProduct()) {
					orderItem.setCount(orderItem.getCount() + freeSauceCount);					
				}
				if (sauceVasabiProduct != null && sauceVasabiProduct == orderItem.getProduct()) {
					orderItem.setCount(orderItem.getCount() + freeSauceCount);
				}
				if (sauceSoyProduct != null && sauceSoyProduct == orderItem.getProduct()) {
					orderItem.setCount(orderItem.getCount() + freeSauceCount);
				}
			} else {
				
			}
			
			this.setOrderSum(this.getOrderSum() + (int)orderItem.getSum());
		}
		
		if (isExistSushi && freeSauceCount > 0) {
			addFreeSauce(sauceImbirProduct, ProductType.IMBIR, freeSauceCount);
			addFreeSauce(sauceVasabiProduct, ProductType.VASABI, freeSauceCount);
			addFreeSauce(sauceSoyProduct, ProductType.SOY, freeSauceCount);
		}
	
		// Recalculate sum for Source discount (like MOBILE)
		if (this.getOrderSourceDiscount() != null && this.getOrderSourceDiscount() > 0)
			this.orderSum = (int)Math.round(Math.floor(this.orderSum * (1 - this.getOrderSourceDiscount() * 0.01)));
	}
	
	/**
	 * Добавляет бесплатный продукт
	 * @param cart - Корзина
	 * @param type - Тип добавляемого продукта
	 * @param freeSauceCount - кол-во бесплантных штук
	 * @param isExistInCart - существует ли товар в корзине
	 */
	private void addFreeSauce(ProductModel sauce, ProductType type, int freeSauceCount) {
		if (sauce == null) {
			Product product = ProductService.getProductByType(type);
			sauce = ProductModel.buildFromProduct(product);
			OrderItemModel orderItemModel = new OrderItemModel();
			orderItemModel.setPrice(sauce.getCost());
			orderItemModel.setCount(freeSauceCount);
			orderItemModel.setProduct(sauce);
			orderItemModel.setSum(0);
			this.getOrderItems().add(orderItemModel);
		}
	}	
	
	
	public static OrderModel buildOrderModel(Order order) {
		OrderModel om = ConvertOrderToModel(order);
		om.buildModel();
		return om;
	}
	
	public static OrderModel ConvertOrderToModel(Order o) {
		OrderModel om = new OrderModel();
		
		// common info
		om.key = o.getKey(); 
		om.orderNumber = o.getOrderNumber();
		
		om.orderSum = o.getOrderSum();
		//if (o.getSourceDiscount() != null && o.getSourceDiscount() > 0)
		//	om.orderSum = (int)Math.round(Math.floor(om.orderSum * (1 - o.getSourceDiscount() * 0.01)));
		
		om.orderStatus = o.getProcessed(); 
	
		om.setOrderSource(o.getSource().toString());
		om.setOrderSourceDiscount(o.getSourceDiscount());
		
		if (o.getOrderTime() != null)
			om.orderTime = o.getOrderTime().getTimeInMillis();

		if (o.getOrderItems() != null) {
			om.setOrderItems(new ArrayList<OrderItemModel>());
			for (OrderItem orderItem : o.getOrderItems()) {
				if (orderItem == null) 
					continue;
				OrderItemModel oim = OrderItemModel.buildFromOrderItem(orderItem);
				om.getOrderItems().add(oim);
			}
		}
		
		// person info
		om.personPhone = o.getPersonPhone();
		om.personName = o.getPersonName();
		om.personCount = o.getPersonCount();
		om.personComments = o.getPersonRemark();
		om.personEmail = o.getPersonEmail();
		om.personCash = o.getPersonCash();			
		
		// delivery info
		if (o.getDepartment() != null) {
			om.departmentName = o.getDepartment().getName(); 
			om.departmentAddress =  o.getDepartment().getAddress();
		}
		om.payMethod = o.getPayMethod();		
		om.deliveryType = o.getDeliveryType();
		
		if (o.getDeliveryTime() != null)
			om.deliveryTime = o.getDeliveryTime().getTimeInMillis();
		
		// address info
		om.addressCityName = o.getAddressCityName();
		om.addressStreetName = o.getAddressStreetName();
		om.addressHouse = o.getAddressHouse();
		om.addressCorpus = o.getAddressCorpus();
		om.addressBuilding = o.getAddressBuilding();
		om.addressFlat = o.getAddressFlat();
		om.addressPorch = o.getAddressPorch();
		om.addressDoorCode = o.getAddressDoorCode();
		om.addressFloor = o.getAddressFloor();
		om.addressRoom = o.getAddressRoom();
		om.addressOffice = o.getAddressOffice();
		om.geoLatitude = o.getGeoLatitude();
		om.geoLongitude = o.getGeoLongitude();		
		
		return om;
	}
	
	
	
	public String getOrderSource() {
		return orderSource;
	}

	public void setOrderSource(String orderSource) {
		this.orderSource = orderSource;
	}

	public Integer getOrderSourceDiscount() {
		return orderSourceDiscount;
	}

	public void setOrderSourceDiscount(Integer orderSourceDiscount) {
		this.orderSourceDiscount = orderSourceDiscount;
	}

	public static int getFreeSaucePerOrderSum() {
		return freeSaucePerOrderSum;
	}

	public static void setFreeSaucePerOrderSum(int freeSaucePerOrderSum) {
		OrderModel.freeSaucePerOrderSum = freeSaucePerOrderSum;
	}

	public void setPersonCount(Integer personCount) {
		this.personCount = personCount;
	}

	public void setPersonCash(Integer personCash) {
		this.personCash = personCash;
	}

	public void setDeliveryTime(Long deliveryTime) {
		this.deliveryTime = deliveryTime;
	}

	public OrderProcess getOrderStatus() {
		return orderStatus;
	}

	public void setOrderStatus(OrderProcess orderStatus) {
		this.orderStatus = orderStatus;
	}

	public String getDepartmentAddress() {
		return departmentAddress;
	}

	public void setDepartmentAddress(String departmentAddress) {
		this.departmentAddress = departmentAddress;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getKey() {
		return key;
	}
	
	public void setKey(String key) {
		this.key = key;
	}

	public String getOrderNumber() {
		return orderNumber;
	}

	public void setOrderNumber(String orderNumber) {
		this.orderNumber = orderNumber;
	}

	public int getOrderSum() {
		return orderSum;
	}

	public void setOrderSum(int orderSum) {
		this.orderSum = orderSum;
	}

	public long getOrderTime() {
		return orderTime;
	}

	public void setOrderTime(long orderTime) {
		this.orderTime = orderTime;
	}

	public List<OrderItemModel> getOrderItems() {
		return orderItems;
	}

	public void setOrderItems(List<OrderItemModel> orderItems) {
		this.orderItems = orderItems;
	}

	public String getPersonPhone() {
		return personPhone;
	}

	public void setPersonPhone(String personPhone) {
		this.personPhone = personPhone;
	}

	public String getPersonName() {
		return personName;
	}
	
	public void setPersonName(String personName) {
		this.personName = personName;
	}

	public int getPersonCount() {
		return personCount;
	}

	public void setPersonCount(int personCount) {
		this.personCount = personCount;
	}

	public String getPersonComments() {
		return personComments;
	}

	public void setPersonComments(String personComments) {
		this.personComments = personComments;
	}

	public String getPersonEmail() {
		return personEmail;
	}

	public void setPersonEmail(String personEmail) {
		this.personEmail = personEmail;
	}

	public int getPersonCash() {
		return personCash;
	}

	public void setPersonCash(int personCash) {
		this.personCash = personCash;
	}

	public String getDepartmentName() {
		return departmentName;
	}

	public void setDepartmentName(String departmentName) {
		this.departmentName = departmentName;
	}

	public DeliveryType getDeliveryType() {
		return deliveryType;
	}
	
	public void setDeliveryType(DeliveryType deliveryType) {
		this.deliveryType = deliveryType;
	}

	public long getDeliveryTime() {
		return deliveryTime;
	}

	public void setDeliveryTime(long deliveryTime) {
		this.deliveryTime = deliveryTime;
	}

	public PayMethod getPayMethod() {
		return payMethod;
	}

	public void setPayMethod(PayMethod payMethod) {
		this.payMethod = payMethod;
	}

	public String getAddressCityName() {
		return addressCityName;
	}

	public void setAddressCityName(String addressCityName) {
		this.addressCityName = addressCityName;
	}

	public String getAddressStreetName() {
		return addressStreetName;
	}

	public void setAddressStreetName(String addressStreetName) {
		this.addressStreetName = addressStreetName;
	}

	public String getAddressHouse() {
		return addressHouse;
	}

	public void setAddressHouse(String addressHouse) {
		this.addressHouse = addressHouse;
	}

	public String getAddressCorpus() {
		return addressCorpus;
	}

	public void setAddressCorpus(String addressCorpus) {
		this.addressCorpus = addressCorpus;
	}

	public String getAddressBuilding() {
		return addressBuilding;
	}

	public void setAddressBuilding(String addressBuilding) {
		this.addressBuilding = addressBuilding;
	}

	public String getAddressFlat() {
		return addressFlat;
	}

	public void setAddressFlat(String addressFlat) {
		this.addressFlat = addressFlat;
	}

	public String getAddressPorch() {
		return addressPorch;
	}

	public void setAddressPorch(String addressPorch) {
		this.addressPorch = addressPorch;
	}

	public String getAddressDoorCode() {
		return addressDoorCode;
	}

	public void setAddressDoorCode(String addressDoorCode) {
		this.addressDoorCode = addressDoorCode;
	}

	public String getAddressFloor() {
		return addressFloor;
	}

	public void setAddressFloor(String addressFloor) {
		this.addressFloor = addressFloor;
	}

	public String getAddressRoom() {
		return addressRoom;
	}

	public void setAddressRoom(String addressRoom) {
		this.addressRoom = addressRoom;
	}

	public String getAddressOffice() {
		return addressOffice;
	}

	public void setAddressOffice(String addressOffice) {
		this.addressOffice = addressOffice;
	}

	public String getGeoLatitude() {
		return geoLatitude;
	}

	public void setGeoLatitude(String geoLatitude) {
		this.geoLatitude = geoLatitude;
	}

	public String getGeoLongitude() {
		return geoLongitude;
	}

	public void setGeoLongitude(String geoLongitude) {
		this.geoLongitude = geoLongitude;
	}
	
}
