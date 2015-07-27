package kz.sushimi.console.models.clients;

import kz.sushimi.console.persistence.clients.ClientAddressType;

public class ClientAddressModel {

	/**
	 * Идентификатор записи
	 */
	private Long id;
	
	/**
	 * Связь с клиентом
	 */
	private Long clientId;
	
	/**
	 * Тип адреса клинета (работа, дом, родители и т.д.)
	 */
	private ClientAddressType addressType;
	
	/**
	 * Номер телефона офиса, дома
	 */
	private String phoneNumber;
	
	
	private String address;
	
	/**
	 * Город нахождения адреса клинета
	 */
	private Long cityId;
	
	/**
	 * Название города
	 */
	private String cityName;
	
	/**
	 * Улица
	 */
	private String streetName;
	
	/**
	 * Номер дома
	 */
	private String house;
	
	/**
	 * Корпус
	 */
	private String corpus;
	
	/**
	 * Здание
	 */
	private String building;
	
	/**
	 * Квартира
	 */
	private String flat;
	
	/**
	 * Подъезд
	 */
	private String porch;
	
	/**
	 * Код домофона
	 */
	private String doorCode;
	
	/**
	 * Этаж
	 */
	private String floor;
	
	/**
	 * Номер комнаты или квартиры
	 */
	private String room;
	
	/**
	 * Номер офиса
	 */
	private String office;
	
	// ================================
	// ==== ПОЗИЦИЯ НА КАРТЕ ==========
	// ================================
	
	/**
	 * Широта
	 */
	private String geoLatitude;
	
	/**
	 * Долгота
	 */
	private String geoLongitude;	

	/**
	 * Комментарии, например проезд какой нить хитрожопый или еще что-то, 
	 * что может быть необходимо знать курьеру
	 */
	private String comment;

	
	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getClientId() {
		return clientId;
	}

	public void setClientId(Long clientId) {
		this.clientId = clientId;
	}

	public ClientAddressType getAddressType() {
		return addressType;
	}

	public void setAddressType(ClientAddressType addressType) {
		this.addressType = addressType;
	}

	public String getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

	public Long getCityId() {
		return cityId;
	}

	public void setCityId(Long cityId) {
		this.cityId = cityId;
	}

	public String getCityName() {
		return cityName;
	}

	public void setCityName(String cityName) {
		this.cityName = cityName;
	}

	public String getStreetName() {
		return streetName;
	}

	public void setStreetName(String streetName) {
		this.streetName = streetName;
	}

	public String getHouse() {
		return house;
	}

	public void setHouse(String house) {
		this.house = house;
	}

	public String getCorpus() {
		return corpus;
	}

	public void setCorpus(String corpus) {
		this.corpus = corpus;
	}

	public String getBuilding() {
		return building;
	}

	public void setBuilding(String building) {
		this.building = building;
	}

	public String getFlat() {
		return flat;
	}

	public void setFlat(String flat) {
		this.flat = flat;
	}

	public String getPorch() {
		return porch;
	}

	public void setPorch(String porch) {
		this.porch = porch;
	}

	public String getDoorCode() {
		return doorCode;
	}

	public void setDoorCode(String doorCode) {
		this.doorCode = doorCode;
	}

	public String getFloor() {
		return floor;
	}

	public void setFloor(String floor) {
		this.floor = floor;
	}

	public String getRoom() {
		return room;
	}

	public void setRoom(String room) {
		this.room = room;
	}

	public String getOffice() {
		return office;
	}

	public void setOffice(String office) {
		this.office = office;
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

	public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}
	
}
