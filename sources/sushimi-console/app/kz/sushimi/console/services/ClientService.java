package kz.sushimi.console.services;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import play.Logger;

import kz.sushimi.console.exceptions.ValidationException;
import kz.sushimi.console.models.clients.ClientAddressModel;
import kz.sushimi.console.models.clients.ClientModel;
import kz.sushimi.console.models.clients.ManyClientModel;
import kz.sushimi.console.models.clients.ManyClientAddressModel;
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
			
			if (clientModel.getPhoneNumber().length() != 10)
				throw new ValidationException("Phone number is incorrect");
			
			if (StringUtils.isEmpty(clientModel.getName()))
				throw new ValidationException("client name is null or empty");
			
			if (!clientModel.getEmail().matches("[a-z0-9].*[@].*[a-z0-9].*[.].*[a-z]")) 
				throw new ValidationException("Email is incorrect");
			
			
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
	 * Обновление записи клиента в разделе Управление клиентами -> Информация о клиентах
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
			
			
		
		
			if (StringUtils.isNotEmpty(model.getPhoneNumber())) {
				if (model.getPhoneNumber().length() != 10) {
					throw new ValidationException("Phone number is incorrect");
				}
			
				client.setPhoneNumber(model.getPhoneNumber());
			}

			if (StringUtils.isNotEmpty(model.getName()))
				client.setName(model.getName());
			
			if (StringUtils.isNotEmpty(model.getEmail())) {
				if (!model.getEmail().matches("[a-z0-9].*[@].*[a-z0-9].*[.].*[a-z]"))
					throw new ValidationException("Email is incorrect");
			
				client.setEmail(model.getEmail());
			}

			
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
				
		Client client = ClientService.getClientById(clientId);
		if (client == null)
			throw new ValidationException("client not found");
		
		// City
		City city = CityService.getCityById(1l);
		if (city == null)
			throw new ValidationException("city not found");
		
		User currentUser = UserService.getUserByLogin(userLogin);
		
		ClientAddress address = new ClientAddress();
		address.setAddressType(ClientAddressType.HOME);
		address.setCity(city);
		address.setCityName(model.getCityName());
		address.setFlat(model.getFlat());
		address.setHouse(model.getHouse());
		address.setClient(client);
		address.setStreetName(model.getStreetName());
		
		if (StringUtils.isNotEmpty(model.getFloor()))
			address.setFloor(model.getFloor());
		
		if (StringUtils.isNotEmpty(model.getCorpus()))
			address.setCorpus(model.getCorpus());
		
		if (StringUtils.isNotEmpty(model.getBuilding()))
			address.setBuilding(model.getBuilding());
		
		if (StringUtils.isNotEmpty(model.getPorch()))
			address.setPorch(model.getPorch());
		
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
	
	/**
	 * Обновление адреса клиента в разделе Управление клиентами -> Информация о клиентах
	 * @param models
	 * @param userLogin
	 * @throws ValidationException
	 */
	public static void updateClientAddres(ClientAddressModel[] models, String userLogin) throws ValidationException {
		for (ClientAddressModel model : models) {
			if (model == null)
				throw new ValidationException("Model is null");
			
			if (model.getId() == null || model.getId() <= 0)
				throw new ValidationException("id is null or empty");
			ClientAddress address = ClientAddress.findById(model.getId());
			if (address == null)
				throw new ValidationException("Address not found");
			
			
			if (StringUtils.isNotEmpty(model.getCityName()))
				address.setCityName(model.getCityName());

			if (StringUtils.isNotEmpty(model.getStreetName()))
				address.setStreetName(model.getStreetName());
			
			if (StringUtils.isNotEmpty(model.getHouse()))
				address.setHouse(model.getHouse());
			
			if (StringUtils.isNotEmpty(model.getFlat()))
				address.setFlat(model.getFlat());
			
			if (StringUtils.isNotEmpty(model.getFloor()))
				address.setFloor(model.getFloor());
			
			if (StringUtils.isNotEmpty(model.getCorpus()))
				address.setCorpus(model.getCorpus());
			
			if (StringUtils.isNotEmpty(model.getBuilding()))
				address.setBuilding(model.getBuilding());
			
			if (StringUtils.isNotEmpty(model.getPorch()))
				address.setPorch(model.getPorch());
			
			address.save();
	
		}
	}
	
	
	/**
	 * Объединение клиентов.
	 * @param models
	 * @param userLogin
	 * @throws ValidationException
	 */

	public static void integrationClients(ClientModel[] models, String userLogin) throws ValidationException {
		for (ClientModel model : models) {
			if (model == null)
				throw new ValidationException("Model is null");
			
			//Разбираем модель по полочкам. orderSum - общая сумма заказов всех клиентов; mClientIds - ID клиентов на объединение
			//mainClient - id нашего главного клиента
			Long mainClient = null;
			int tmp = 0;
			
			ArrayList mClientIds = new ArrayList();
			Client mClient = new Client();
						
			for (ManyClientModel clients : model.getClients()) {
				if (clients.getMainClient() == false) {
						mClient = ClientService.getClientById(clients.getClientId());
						if (mClient == null)
							throw new ValidationException("Client not found");
						else {
						mClientIds.add(clients.getClientId());
						}
				}
				else {
					mainClient = clients.getClientId();
					tmp++;
				}
					
			}
			
			if (mainClient == null)
				throw new ValidationException("Main client is null");
			
			if (mClientIds.size() == 0)
				throw new ValidationException("Clients count is 0");
			
			if (tmp != 1)
				throw new ValidationException("Main Client count isn't 1");
			
			try {
				JPA.em().createQuery("update ClientAddress set client.id = :mainClient where client.id in (:mClientIds)").setParameter("mainClient", mainClient).setParameter("mClientIds", mClientIds).executeUpdate();
				mClientIds.add(mainClient);
				JPA.em().createQuery("update Client set totalOrderSum = (select sum(totalOrderSum) from Client where id in (:mClientIds)) where id = :mainClient").setParameter("mainClient", mainClient).setParameter("mClientIds", mClientIds).executeUpdate();
				mClientIds.remove(mainClient);
				JPA.em().createQuery("update Order set client.id = :mainClient where client.id in (:mClientIds)").setParameter("mainClient", mainClient).setParameter("mClientIds", mClientIds).executeUpdate();
				JPA.em().createQuery("delete Client where id in (:mClientIds)").setParameter("mClientIds", mClientIds).executeUpdate();
			}
			catch (Exception ex) {
			  System.out.println (ex);
			  JPA.em().getTransaction().rollback();
			}
					
			
		}
		}
	

	
/**
 * Объединение адресов клиента
 * @param models
 * @param userLogin
 * @throws ValidationException
 */
	public static void integrationAddresses(ClientAddressModel[] models, String userLogin) throws ValidationException {
		for (ClientAddressModel model : models) {
			if (model == null) 
				throw new ValidationException("Model is null");
			
			
			Long mainAddressId = null;
			ArrayList mAddressesIds = new ArrayList();
			int tmp = 0;
			
			ClientAddress address = ClientAddress.findById(model.getId());
			
			for (ManyClientAddressModel clients : model.getAddresses()){
				if (clients.getMainAddress() == false) {
					address = ClientAddress.findById(clients.getAddressId());
						if (address == null)
							throw new ValidationException("Address not found");
						else
							mAddressesIds.add(clients.getAddressId());
				}
				else{
					mainAddressId = clients.getAddressId();
					tmp++;
				}
			}
					
			if (tmp != 1)
				throw new ValidationException("Main address count isn't 1");
						
			ClientAddress mainAddress = ClientAddress.findById(mainAddressId);
			if (mainAddress == null)
				throw new ValidationException("Main address not found");
			
			if (mAddressesIds.size() == 0)
				throw new ValidationException("Addresses count is 0");
						
				
			
			try {
				JPA.em().createQuery("update Order set clientAddress.id = :mainAddressId where clientAddress.id in (:mAddressesIds)").setParameter("mainAddressId", mainAddressId).setParameter("mAddressesIds", mAddressesIds).executeUpdate();
				JPA.em().createQuery("delete ClientAddress where id in (:mAddressesIds)").setParameter("mAddressesIds", mAddressesIds).executeUpdate();
				
			}
			catch (Exception ex) {
			  System.out.println (ex);
			  JPA.em().getTransaction().rollback();
			}
						
			}
	}	
		
	
}