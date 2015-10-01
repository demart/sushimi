package kz.sushimi.console.persistence.orders;

import java.util.Calendar;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import kz.sushimi.console.persistence.PersistentObject;
import kz.sushimi.console.persistence.clients.Client;
import kz.sushimi.console.persistence.clients.ClientAddress;
import kz.sushimi.console.persistence.clients.ClientDiscount;
import kz.sushimi.console.persistence.dictionaries.DeliveryPrice;
import kz.sushimi.console.persistence.orders.site.SiteOrder;
import kz.sushimi.console.persistence.promotions.Promotion;
import kz.sushimi.console.persistence.users.User;


/**
 * 
 * Заказ
 * 
 * @author Demart
 *
 */
@Entity
@Table(name = "orders")
public class Order extends PersistentObject {
	
	@Column(name="order_number")	
	private String orderNumber;
	
	/**
	 * Клиент
	 */
	@ManyToOne
	private Client client;
	
	/**
	 * На какой адрес доставить заказ (Из нескольких возможных адресов клиента)
	 */
	@ManyToOne
	private ClientAddress clientAddress;
	
	/**
	 * Накопленная сумма на момент формирования текущего заказа
	 */
	@Column(name="client_discount_total_order_sum")
	private Integer clientDiscountTotalOrderSum;
	
	/**
	 * Накопленный процент скидки постоянному клиенту на момент формирования заказа  
	 */
	@Column(name="client_discount_current_percent")
	private Integer clientDiscountCurrentPercent;

	/**
	 * Проценд следующей скидки который который будет
	 */
	@Column(name="client_discount_next_percent")
	private Integer clientDiscountNextPercent;	
	
	/**
	 * Суму которую нужно накопить для следующей скидки
	 */
	@Column(name="client_discount_next_sum")
	private Integer clientDiscountNextSum;
	

	
	/**
	 * Позиции заказа
	 */
	@OneToMany(mappedBy="order", cascade = {CascadeType.PERSIST, CascadeType.MERGE }) 
	private List<OrderItem> OrderItems;
	
	/**
	 * Если заказ с сайта то связываем их
	 */
	@ManyToOne
	private SiteOrder siteOrder;
	
	/**
	 * Синхронизированный ID заказа на сайте
	 */
	@Column(name="site_order_number")
	private String siteOrderNumber;

	/**
	 * Признак того, что данный заказ синхронизировали с сайтом
	 */
	@Column(name="is_synchronized")
	private Boolean isSynchronized = false;
	
	/**
	 * Сумма заказа 
	 */
	@Column
	private Integer orderSum;
	

	/**
	 * Себестоимость продукта
	 */
	@Column(name="net_cost")
	private Integer netCost = 0;
	

	/**
	 * Общая цена доставки (Для статистики базовая цена доставки + дополнительная цена)
	 */
	@Column(name="delivery_cost")	
	private Integer deliveryCost = 0;
	
	/**
	 * Дополнительная цена для доставки в отдаленные районы
	 */
	@Column(name="delivery_extra_cost")
	private Integer deliveryExtraCost = 0;
	
	/**
	 * Каналы получения заказов
	 */
	@Enumerated(EnumType.STRING)
	@Column(name="source")
	private OrderSource source;	
	
	/**
	 * Скидка при получении заказа (Например на мобильники по умолчанию 5 процентов)
	 */
	@Column(name="source_discount")
	private Integer sourceDiscount;
	
	/**
	 * Ссылка на цену доставки
	 */	
	@ManyToOne
	private DeliveryPrice deliveryPrice;
	
	/**
	 * Кол-во человек
	 */
	@Column(name="person_count")
	private Integer personCount;
	
	/**
	 * С какой суммы дать сдачу
	 */
	@Column(name="client_cash")
	private Integer clientCash;
	
	/**
	 * Статус заказа
	 */
	@Enumerated(EnumType.STRING)
	@Column
	private OrderState orderState;
	
	/**
	 * Дата формирования заказа (Например с сайта будет раньше чем создание)
	 */
	@Column	
	private Calendar orderDate;
	
	/**
	 * Дата когда нужно доставить заказ
	 */
	@Column	
	private Calendar deliveryDate;
	
	/**
	 * Тип заказа
	 */
	@Enumerated(EnumType.STRING)
	@Column
	private OrderType type;
	
	/**
	 * Способ оплаты
	 */
	@Enumerated(EnumType.STRING)
	@Column
	private PayMethod payMethod;
	
	/**
	 * Какой акцией воспользовался клиент
	 */
	@ManyToOne
	private Promotion promotion;
	
	/**
	 * Какой скидкой воспользовался клиент
	 */
	@ManyToOne
	private ClientDiscount discont;
	
	@Column
	private String comment;
	
	/**
	 * Пользователь создавший заказ
	 */
	@ManyToOne
	private User operatorUser;
	
	/**
	 * Кто приготовил заказ
	 */
	@ManyToOne
	private User cookUser;

	/**
	 * Кто доставил заказ
	 */
	@ManyToOne
	private User deliveryUser;
	
	/**
	 * Причина отмены заказа
	 */
	@Column(length=500)
	private String reason;

	public PayMethod getPayMethod() {
		return payMethod;
	}


	public void setPayMethod(PayMethod payMethod) {
		this.payMethod = payMethod;
	}


	public String getSiteOrderNumber() {
		return siteOrderNumber;
	}


	public void setSiteOrderNumber(String siteOrderNumber) {
		this.siteOrderNumber = siteOrderNumber;
	}


	public Boolean getIsSynchronized() {
		return isSynchronized;
	}


	public void setIsSynchronized(Boolean isSynchronized) {
		this.isSynchronized = isSynchronized;
	}


	public User getDeliveryUser() {
		return deliveryUser;
	}


	public void setDeliveryUser(User deliveryUser) {
		this.deliveryUser = deliveryUser;
	}


	public OrderSource getSource() {
		return source;
	}


	public void setSource(OrderSource source) {
		this.source = source;
	}


	public Integer getSourceDiscount() {
		return sourceDiscount;
	}


	public void setSourceDiscount(Integer sourceDiscount) {
		this.sourceDiscount = sourceDiscount;
	}


	public DeliveryPrice getDeliveryPrice() {
		return deliveryPrice;
	}


	public void setDeliveryPrice(DeliveryPrice deliveryPrice) {
		this.deliveryPrice = deliveryPrice;
	}


	public Integer getDeliveryCost() {
		return deliveryCost;
	}


	public void setDeliveryCost(Integer deliveryCost) {
		this.deliveryCost = deliveryCost;
	}


	public Integer getNetCost() {
		return netCost;
	}


	public void setNetCost(Integer netCost) {
		this.netCost = netCost;
	}
	
	public String getComment() {
		return comment;
	}


	public void setComment(String comment) {
		this.comment = comment;
	}


	public SiteOrder getSiteOrder() {
		return siteOrder;
	}


	public void setSiteOrder(SiteOrder siteOrder) {
		this.siteOrder = siteOrder;
	}


	public Integer getPersonCount() {
		return personCount;
	}


	public void setPersonCount(Integer personCount) {
		this.personCount = personCount;
	}


	public Integer getClientCash() {
		return clientCash;
	}


	public void setClientCash(Integer clientCash) {
		this.clientCash = clientCash;
	}


	public String getReason() {
		return reason;
	}


	public void setReason(String reason) {
		this.reason = reason;
	}


	public void setOrderState(OrderState orderState) {
		this.orderState = orderState;
	}


	public OrderType getType() {
		return type;
	}


	public void setType(OrderType type) {
		this.type = type;
	}


	public String getOrderNumber() {
		return orderNumber;
	}


	public void setOrderNumber(String orderNumber) {
		this.orderNumber = orderNumber;
	}


	public Client getClient() {
		return client;
	}


	public void setClient(Client client) {
		this.client = client;
	}


	public ClientAddress getClientAddress() {
		return clientAddress;
	}


	public void setClientAddress(ClientAddress clientAddress) {
		this.clientAddress = clientAddress;
	}


	public List<OrderItem> getOrderItems() {
		return OrderItems;
	}


	public void setOrderItems(List<OrderItem> orderItems) {
		OrderItems = orderItems;
	}


	public Integer getOrderSum() {
		return orderSum;
	}


	public void setOrderSum(Integer orderSum) {
		this.orderSum = orderSum;
	}


	public OrderState getOrderState() {
		return orderState;
	}


	public Calendar getOrderDate() {
		return orderDate;
	}


	public void setOrderDate(Calendar orderDate) {
		this.orderDate = orderDate;
	}


	public Calendar getDeliveryDate() {
		return deliveryDate;
	}


	public void setDeliveryDate(Calendar deliveryDate) {
		this.deliveryDate = deliveryDate;
	}


	public Promotion getPromotion() {
		return promotion;
	}


	public void setPromotion(Promotion promotion) {
		this.promotion = promotion;
	}


	public ClientDiscount getDiscont() {
		return discont;
	}


	public void setDiscont(ClientDiscount discont) {
		this.discont = discont;
	}


	public User getOperatorUser() {
		return operatorUser;
	}


	public void setOperatorUser(User operatorUser) {
		this.operatorUser = operatorUser;
	}


	public User getCookUser() {
		return cookUser;
	}


	public void setCookUser(User cookUser) {
		this.cookUser = cookUser;
	}


	public Integer getDeliveryExtraCost() {
		return deliveryExtraCost;
	}


	public void setDeliveryExtraCost(Integer deliveryExtraCost) {
		this.deliveryExtraCost = deliveryExtraCost;
	}


	public Integer getClientDiscountTotalOrderSum() {
		return clientDiscountTotalOrderSum;
	}


	public void setClientDiscountTotalOrderSum(Integer clientDiscountTotalOrderSum) {
		this.clientDiscountTotalOrderSum = clientDiscountTotalOrderSum;
	}


	public Integer getClientDiscountCurrentPercent() {
		return clientDiscountCurrentPercent;
	}


	public void setClientDiscountCurrentPercent(Integer clientDiscountCurrentPercent) {
		this.clientDiscountCurrentPercent = clientDiscountCurrentPercent;
	}


	public Integer getClientDiscountNextPercent() {
		return clientDiscountNextPercent;
	}


	public void setClientDiscountNextPercent(Integer clientDiscountNextPercent) {
		this.clientDiscountNextPercent = clientDiscountNextPercent;
	}


	public Integer getClientDiscountNextSum() {
		return clientDiscountNextSum;
	}


	public void setClientDiscountNextSum(Integer clientDiscountNextSum) {
		this.clientDiscountNextSum = clientDiscountNextSum;
	}
	
}
