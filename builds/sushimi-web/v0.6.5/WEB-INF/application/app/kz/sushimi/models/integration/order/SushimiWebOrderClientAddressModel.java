package kz.sushimi.models.integration.order;


public class SushimiWebOrderClientAddressModel {
	/**
	 * Номер телефона офиса, дома
	 */
	public String phoneNumber;
	
	/**
	 * Название города
	 */
	public String cityName;
	
	/**
	 * Улица
	 */
	public String streetName;
	
	/**
	 * Номер дома
	 */
	public String house;
	
	/**
	 * Корпус
	 */
	public String corpus;
	
	/**
	 * Здание
	 */
	public String building;
	
	/**
	 * Квартира
	 */
	public String flat;
	
	/**
	 * Подъезд
	 */
	public String porch;
	
	/**
	 * Код домофона
	 */
	public String doorCode;
	
	/**
	 * Этаж
	 */
	public String floor;
	
	/**
	 * Номер комнаты или квартиры
	 */
	public String room;
	
	/**
	 * Номер офиса
	 */
	public String office;
	
	// ================================
	// ==== ПОЗИЦИЯ НА КАРТЕ ==========
	// ================================
	
	/**
	 * Широта
	 */
	public String geoLatitude;
	
	/**
	 * Долгота
	 */
	public String geoLongitude;	

	/**
	 * Комментарии, например проезд какой нить хитрожопый или еще что-то, 
	 * что может быть необходимо знать курьеру
	 */
	public String comment;
	
}
