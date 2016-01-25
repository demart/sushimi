package kz.sushimi.restapi.v1.models.order;

import kz.sushimi.restapi.v1.models.cart.CartModel;

public class RegisterOrderModel {

	/**
	 * Имя того кто заказывает
	 */
	public String fullname;	
	
	/**
	 * Контактный телефон
	 */
	public String phone;
	
	/**
	 * Электронный ящик
	 */
	public String email;
	
	/**
	 * DELIVERY - Доставка
	 * DELIVERY_IN_TIME - Доставка ко времени
	 * SELF_SERVICE - Самовывоз
	 */ 
	public String delivery;
	
	/**
	 * Время доставки (если доставка ко времени) время указывается в миллисекундах
	 */
	public Long deliveryTime;
	
	/**
	 * Кол-во персон в заказе
	 */
	public Integer personCount;
	
	/**
	 * Место откуда совершить доставку
	 */
	public Integer departmentId;

	/**
	 * Комментарий к заказу
	 */
	public String comment;
	
	/**
	 * Способ оплаты
	 * CASH - оплата наличными курьеру
	 * CREDIT_CARD_ON_DELIVERY - оплата кредиткой с курьером
	 * CREDIT_CARD - оплата из мобильного приложения
	 */
	public String payMethod;
	
	/** 
	 * С какой суммы подготовить сдачу
	 */
	public Integer cash;
	
	/**
	 * Просто соглашение
	 */
	public boolean allowTerms;
	
	/**
	 * Структура адреса, на данный момент планируется только улицу с полным адресом и гео позиция опционально
	 */
	public RegisterOrderAddressModel address;
	
	/**
	 * Идентификатор корзины с товаром
	 */
	public String cartId;
	
	/**
	 * Корзина ?? нужна ваще или нет, возможно передавать только Id?
	 */
	public CartModel cart;	
}
