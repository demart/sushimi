package kz.sushimi.console.services;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import kz.sushimi.console.exceptions.ValidationException;
import kz.sushimi.console.models.clients.ClientAddressModel;
import kz.sushimi.console.models.clients.ClientModel;
import kz.sushimi.console.models.dictionaries.CategoryModel;
import kz.sushimi.console.models.dictionaries.CityModel;
import kz.sushimi.console.persistence.clients.Client;
import kz.sushimi.console.persistence.clients.ClientAddress;
import kz.sushimi.console.persistence.clients.ClientAddressType;
import kz.sushimi.console.persistence.clients.ClientStatus;
import kz.sushimi.console.persistence.clients.ClientType;
import kz.sushimi.console.persistence.dictionaries.Category;
import kz.sushimi.console.persistence.dictionaries.City;
import kz.sushimi.console.persistence.users.User;
import kz.sushimi.console.services.dictionaries.CityService;

import org.apache.commons.lang.StringUtils;

import play.db.jpa.JPA;

/**
 * Сервис для управления клиентами
 * 
 * @author Demart
 *
 */
public class ClientService {
	
	/**
	 * Возвращает пользователя
	 * 
	 * @param id
	 * @return
	 */
	public static Client getClientById(Long id) {
		return Client.findById(id);
	}

	/**
	 * Кол-во записей
	 * @return
	 */
	public static Long getClientCount() {
		return Client.count();
	}
	
	
	/**
	 * Возвращает постранично список клиентов. Сотирует их по имени
	 */
	public static List<Client> getClients(int start, int limit) {
		return JPA.em().createQuery("from Client order by name").setMaxResults(limit).setFirstResult(start).getResultList();
	}
	
	
	public static List<Client> searchClients(Long clientId, String name, String phone) {
		if (clientId != null)
			return JPA.em().createQuery("from Client where id = :id").setParameter("id", clientId).getResultList();
			
		if (StringUtils.isNotEmpty(name) && StringUtils.isNotEmpty(phone)) 
			return JPA.em().createQuery("from Client where lower(name) like lower(:name) and lower(phoneNumber) like lower(:phone) order by name")
				.setParameter("name", "%" + name + "%")
				.setParameter("phone", "%" + phone + "%")
				.getResultList();
		if (StringUtils.isNotEmpty(name) && StringUtils.isEmpty(phone))
			return JPA.em().createQuery("from Client where lower(name) like lower(:name) order by name")
				.setParameter("name", "%" + name + "%")
				.getResultList();
		if (StringUtils.isEmpty(name) && StringUtils.isNotEmpty(phone))
			return JPA.em().createQuery("from Client where lower(phoneNumber) like lower(:phone) order by name")
				.setParameter("phone", "%" + phone + "%")
				.getResultList();
		return new ArrayList<Client>();
	}
	

	public static List<ClientAddress> searchClientAddress(Long clientId) {
		return JPA.em().createQuery("from ClientAddress where client.id = :clientId")
				.setParameter("clientId", clientId)
				.getResultList();
	}	
	
	/**
	 * Добавляет нового клиента
	 * @param model
	 * @param userLogin
	 * @return
	 * @throws ValidationException 
	 */
	public static Client addClient(ClientModel model, String userLogin) throws ValidationException {
		if (model == null)
			throw new ValidationException("Model is null");
		
		if (StringUtils.isEmpty(model.getName()))
			throw new ValidationException("name empty or null");
		
		if (StringUtils.isEmpty(model.getPhoneNumber()))
			throw new ValidationException("phone empty or null");
		
		User currentUser = UserService.getUserByLogin(userLogin);
		Client client = new Client();
		client.setName(model.getName());
		client.setPhoneNumber(model.getPhoneNumber());
		
		if (model.getBirthdate() != null) {
			long time = model.getBirthdate().getTime();
			Calendar birthdate = Calendar.getInstance();
			birthdate.setTimeInMillis(time);
			client.setBirthdate(birthdate);
		}
		
		if (StringUtils.isNotEmpty(model.getComment()))
			client.setComment(model.getComment());
		
		if (StringUtils.isNotEmpty(model.getEmail()))
			client.setEmail(model.getEmail());
		
		if (StringUtils.isNotEmpty(model.getIin()))
			client.setIin(model.getIin());
		
		if (model.getStatus() == null)
			model.setStatus(ClientStatus.ORDINAL);
		client.setStatus(model.getStatus());
		
		if (model.getType() == null)
			model.setType(ClientType.PHYSICAL);	
		client.setType(model.getType());
		
		client.setTotalOrderSum(0);
		client.setUser(currentUser);
		client.save();
		return client;
	}
	

	/**
	 * Изменяет запись клиента
	 * @param model
	 * @param userLogin
	 * @return
	 * @throws ValidationException 
	 */
	public static Client editClient(ClientModel model, String userLogin) throws ValidationException {
		if (model == null)
			throw new ValidationException("Model is null");
		
		if (model.getId() == null || model.getId() <= 0)
			throw new ValidationException("user id empty or null");
		
		Client client = Client.findById(model.getId());
		if (client == null)
			throw new ValidationException("client not found");
		
		if (model.getBirthdate() != null) {
			long time = model.getBirthdate().getTime();
			Calendar birthdate = Calendar.getInstance();
			birthdate.setTimeInMillis(time);
			client.setBirthdate(birthdate);
		}
		
		if (StringUtils.isNotEmpty(model.getComment()))
			client.setComment(model.getComment());
		
		if (StringUtils.isNotEmpty(model.getEmail()))
			client.setEmail(model.getEmail());
		
		if (StringUtils.isNotEmpty(model.getIin()))
			client.setIin(model.getIin());
		
		if (model.getStatus() != null)
			client.setStatus(model.getStatus());
		
		if (model.getType() != null)
			client.setType(model.getType());
		
		client.save();
		return client;
	}
	
	
	// ============ CLIENT ADDRESS =======================
	
	/**
	 * Добавляет нового клиента
	 * @param model
	 * @param userLogin
	 * @return
	 * @throws ValidationException 
	 */
	public static ClientAddress addClientAddress(ClientAddressModel model, String userLogin) throws ValidationException {
		if (model == null)
			throw new ValidationException("Model is null");
		
		// Client
		if (model.getClientId() == null || model.getClientId() <= 0)
			throw new ValidationException("client id empty or null");
		Client client = ClientService.getClientById(model.getClientId());
		if (client == null)
			throw new ValidationException("client not found");
		
		// City
		//if (model.getCityId() == null || model.getCityId() <= 0)
		//	throw new ValidationException("city id empty or null");
		//City city = CityService.getCityById(model.getCityId());
		City city = CityService.getCityById(1l);
		if (city == null)
			throw new ValidationException("city not found");
		
		User currentUser = UserService.getUserByLogin(userLogin);
		
		ClientAddress address = new ClientAddress();
		// default type
		address.setAddressType(ClientAddressType.HOME);
		//
		address.setBuilding(model.getBuilding());
		address.setCity(city);
		address.setCityName(model.getCityName());
		address.setClient(client);
		address.setComment(model.getComment());
		address.setCorpus(model.getCorpus());
		address.setDoorCode(model.getDoorCode());
		address.setFlat(model.getFlat());
		address.setFloor(model.getFloor());
		address.setGeoLatitude(model.getGeoLatitude());
		address.setGeoLongitude(model.getGeoLongitude());
		address.setHouse(model.getHouse());
		address.setOffice(model.getOffice());
		address.setPhoneNumber(model.getPhoneNumber());
		address.setPorch(model.getPorch());
		address.setRoom(model.getRoom());
		address.setStreetName(model.getStreetName());
		address.setUser(currentUser);
		address.save();
		
		return address;
	}	
	
	
	/**
	 * Изменяет адрес клиента
	 * @param model
	 * @param userLogin
	 * @return
	 * @throws ValidationException 
	 */
	public static ClientAddress updateClientAddress(ClientAddressModel model, String userLogin) throws ValidationException {
		if (model == null)
			throw new ValidationException("Model is null");
		
		if (model.getId() == null || model.getId() <= 0)
			throw new ValidationException("id empty or null");
		ClientAddress address = ClientAddress.findById(model.getId());
		if (address == null)
			throw new ValidationException("clientAddress not found");
		
		// Client
		if (model.getClientId() == null || model.getClientId() <= 0)
			throw new ValidationException("client id empty or null");
		Client client = ClientService.getClientById(model.getClientId());
		if (client == null)
			throw new ValidationException("client not found");
		
		// City
		if (model.getCityId() == null || model.getCityId() <= 0)
			throw new ValidationException("city id empty or null");
		City city = CityService.getCityById(model.getCityId());
		if (city == null)
			throw new ValidationException("city not found");
		
		User currentUser = UserService.getUserByLogin(userLogin);
		
		address.setAddressType(model.getAddressType());
		address.setBuilding(model.getBuilding());
		address.setCity(city);
		address.setCityName(model.getCityName());
		address.setClient(client);
		address.setComment(model.getComment());
		address.setCorpus(model.getCorpus());
		address.setDoorCode(model.getDoorCode());
		address.setFlat(model.getFlat());
		address.setFloor(model.getFloor());
		address.setGeoLatitude(model.getGeoLatitude());
		address.setGeoLongitude(model.getGeoLongitude());
		address.setHouse(model.getHouse());
		address.setOffice(model.getOffice());
		address.setPhoneNumber(model.getPhoneNumber());
		address.setPorch(model.getPorch());
		address.setRoom(model.getRoom());
		address.setStreetName(model.getStreetName());
		address.setUser(currentUser);
		address.save();
		
		return address;
	}
	
	
	
	/**
	 * Удалить запись адреса клиента
	 * @param id
	 * @throws ValidationException 
	 */
	public static Long deleteClientAddress(Long id, String userLogin) throws ValidationException {
		if (id == null || id <= 0)
			throw new ValidationException("client address id null or empty");
		ClientAddress address = ClientAddress.findById(id);
		address = address.delete();
		return address.getId();
	}

	
	/**
	 * Добавление нового клиента в информации о клиентах
	 * 
	 * @return
	 * @throws ValidationException 
	 */
	public static void addClients(ClientModel[] models, String userLogin) throws ValidationException {
		for (ClientModel clientModel : models) {
			if (clientModel == null)
				throw new NullPointerException("model is null");
			
			if (StringUtils.isEmpty(clientModel.getPhoneNumber()))
				throw new ValidationException("client phone number is null or empty");
			
			if (StringUtils.isEmpty(clientModel.getName()))
				throw new ValidationException("client name is null or empty");
			
			
			User user = UserService.getUserByLogin(userLogin);
			Client client = new Client();
			client.setName(clientModel.getName());
			client.setPhoneNumber(clientModel.getPhoneNumber());
			
			if (StringUtils.isNotEmpty(clientModel.getEmail()) )
				client.setEmail(clientModel.getEmail());
			
			client.setUser(user);
			client.save();
		}
	}	

	
	/**
	 * Удалить запись клиента
	 * @param id
	 * @throws ValidationException 
	 */
	public static Long deleteClient(Long id, String userLogin) throws ValidationException {
		if (id == null || id <= 0)
			throw new ValidationException("client is id null or empty");
		Client client = Client.findById(id);
		client = client.delete();
		return client.getId();
	}	
	
	/**
	 * Обновить запись клиента в информации о клиентах
	 * @param id
	 * @throws ValidationException 
	 */
	
	public static void updateClient(ClientModel[] models, String userLogin) throws ValidationException {
		for (ClientModel model : models) {
			if (model == null)
				throw new ValidationException("Model is null");
			
			if (model.getId() == null || model.getId() <= 0)
				throw new ValidationException("id is null or empty");
			Client client = Client.findById(model.getId());
			if (client == null)
				throw new ValidationException("client not found");
			
			
			if (StringUtils.isNotEmpty(model.getPhoneNumber()))
				client.setPhoneNumber(model.getPhoneNumber());

			if (StringUtils.isNotEmpty(model.getName()))
				client.setName(model.getName());
			
			if (StringUtils.isNotEmpty(model.getEmail()))
				client.setEmail(model.getEmail());
			

			
			client.save();
	
		}
		
	}

	/**
	 * Добавляет адрес клиента в информации о клиентах (пришлось ее, так как дефолтная функция не работает от получаемого параметра clientID)
	 * @param model
	 * @param userLogin
	 * @return
	 * @throws ValidationException 
	 */
	public static ClientAddress addClientAddres(Long clientId, ClientAddressModel model, String userLogin) throws ValidationException {
		if (model == null)
			throw new ValidationException("Model is null");

		// Client
		if (clientId == null)
			throw new ValidationException("client id empty or null");
		//Client client = ClientService.getClientById(model.getClientId());
		//if (client == null)
		//	throw new ValidationException("client not found");
		
		
		Client client = ClientService.getClientById(clientId);
		if (client == null)
			throw new ValidationException("client not found");
		
		// City
		//if (model.getCityId() == null || model.getCityId() <= 0)
		//	throw new ValidationException("city id empty or null");
		//City city = CityService.getCityById(model.getCityId());
		City city = CityService.getCityById(1l);
		if (city == null)
			throw new ValidationException("city not found");
		
		User currentUser = UserService.getUserByLogin(userLogin);
		
		ClientAddress address = new ClientAddress();
		// default type
		address.setAddressType(ClientAddressType.HOME);
		//

		address.setCityName(model.getCityName());
		address.setFlat(model.getFlat());
		address.setHouse(model.getHouse());
		address.setClient(client);
		address.setStreetName(model.getStreetName());
		address.setUser(currentUser);
		address.save();
		
		return address;
	}	

	/**
	 * Получаем весь список клиентов
	 */
	public static List<Client> getClientsList(int start, int limit) {
		return JPA.em().createQuery("from Client").setFirstResult(start).getResultList();
	}
	
	//Обновление адреса клиента
	public static void updateClientAddres(ClientAddressModel[] models, String userLogin) throws ValidationException {
		for (ClientAddressModel model : models) {
			if (model == null)
				throw new ValidationException("Model is null");
			
			if (model.getId() == null || model.getId() <= 0)
				throw new ValidationException("id is null or empty");
			ClientAddress client = ClientAddress.findById(model.getId());
			if (client == null)
				throw new ValidationException("client not found");
			
			
			if (StringUtils.isNotEmpty(model.getCityName()))
				client.setCityName(model.getCityName());

			if (StringUtils.isNotEmpty(model.getStreetName()))
				client.setStreetName(model.getStreetName());
			
			if (StringUtils.isNotEmpty(model.getHouse()))
				client.setHouse(model.getHouse());
			
			if (StringUtils.isNotEmpty(model.getFlat()))
				client.setFlat(model.getFlat());

			
			client.save();
	
		}
	}
}