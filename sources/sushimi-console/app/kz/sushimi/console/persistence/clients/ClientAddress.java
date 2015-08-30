package kz.sushimi.console.persistence.clients;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import kz.sushimi.console.persistence.PersistentObject;
import kz.sushimi.console.persistence.dictionaries.City;

import org.apache.commons.lang.StringUtils;

/**
 * Адрес клинета
 * 
 * @author Demart
 *
 */
@Entity
@Table(name = "client_address")
public class ClientAddress extends PersistentObject {

	/**
	 * Связь с клиентом
	 */
	@ManyToOne
	private Client client;
	
	/**
	 * Тип адреса клинета (работа, дом, родители и т.д.)
	 */
	@Enumerated(EnumType.STRING)
	@Column
	private ClientAddressType addressType = ClientAddressType.NONE;
	
	/**
	 * Номер телефона офиса, дома
	 */
	@Column(length=50)
	private String phoneNumber;
	
	/**
	 * Город нахождения адреса клинета
	 */
	@ManyToOne
	private City city;
	
	/**
	 * Название города
	 */
	@Column(name="city_name", length=50)
	private String cityName;
	
	/**
	 * Улица
	 */
	@Column(name="street_name", length=256)
	private String streetName;
	
	/**
	 * Номер дома
	 */
	@Column(name="house", length=100)
	private String house;
	
	/**
	 * Корпус
	 */
	@Column(name="corpus", length=100)
	private String corpus;
	
	/**
	 * Здание
	 */
	@Column(name="building", length=100)
	private String building;
	
	/**
	 * Квартира
	 */
	@Column(name="flat", length=100)
	private String flat;
	
	/**
	 * Подъезд
	 */
	@Column(name="porch", length=100)
	private String porch;
	
	/**
	 * Код домофона
	 */
	@Column(name="door_code", length=100)
	private String doorCode;
	

	
	/**
	 * Этаж
	 */
	@Column(name="floor", length=100)
	private String floor;
	
	/**
	 * Номер комнаты или квартиры
	 */
	@Column(name="room", length=100)
	private String room;
	
	/**
	 * Номер офиса
	 */
	@Column(name="office", length=100)
	private String office;
	
	// ================================
	// ==== ПОЗИЦИЯ НА КАРТЕ ==========
	// ================================
	
	/**
	 * Широта
	 */
	@Column(name="geo_latitude", length=20)
	private String geoLatitude;
	
	/**
	 * Долгота
	 */
	@Column(name="geo_longitude", length=20)
	private String geoLongitude;	

	/**
	 * Комментарии, например проезд какой нить хитрожопый или еще что-то, 
	 * что может быть необходимо знать курьеру
	 */
	@Column(length=500)
	private String comment;
	
	
	public String getFullAddress() {
		String fullAddress = "";
		if (!StringUtils.isEmpty(cityName)) fullAddress += cityName;
		if (!StringUtils.isEmpty(streetName)) fullAddress += ", " + streetName;
		if (!StringUtils.isEmpty(house)) fullAddress += ", дом " + house;
		if (!StringUtils.isEmpty(corpus)) fullAddress += ", " + corpus;
		if (!StringUtils.isEmpty(building)) fullAddress += ", " + building;
		if (!StringUtils.isEmpty(flat)) fullAddress += ", кв " + flat;
		if (!StringUtils.isEmpty(porch)) fullAddress += ", " + porch;
		if (!StringUtils.isEmpty(doorCode)) fullAddress += ", код домофона " + doorCode;
		if (!StringUtils.isEmpty(floor)) fullAddress += ", этаж " + floor;
		if (!StringUtils.isEmpty(room)) fullAddress += ", комната " + room;
		if (!StringUtils.isEmpty(office)) fullAddress += ", офис " + office;

		if (fullAddress.startsWith(",") && fullAddress.length() > 1)
			fullAddress = fullAddress.substring(1);
		
		return fullAddress;
	}


	public Client getClient() {
		return client;
	}


	public void setClient(Client client) {
		this.client = client;
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


	public City getCity() {
		return city;
	}


	public void setCity(City city) {
		this.city = city;
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
