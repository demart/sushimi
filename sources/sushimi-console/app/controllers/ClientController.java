package controllers;

import java.util.ArrayList;
import java.util.List;

import kz.sushimi.console.exceptions.ValidationException;
import kz.sushimi.console.models.StoreWrapper;
import kz.sushimi.console.models.clients.ClientAddressModel;
import kz.sushimi.console.models.clients.ClientModel;
import kz.sushimi.console.models.dictionaries.CategoryModel;
import kz.sushimi.console.models.dictionaries.CityModel;
import kz.sushimi.console.persistence.clients.Client;
import kz.sushimi.console.persistence.clients.ClientAddress;
import kz.sushimi.console.persistence.clients.ClientDiscount;
import kz.sushimi.console.services.ClientDiscountService;
import kz.sushimi.console.services.ClientService;
import kz.sushimi.console.services.dictionaries.CategoryService;
import kz.sushimi.console.services.dictionaries.CityService;
import play.Logger;

import com.google.gson.Gson;

/**
 * Контроллер для управления категориями
 * 
 * @author Demart
 *
 */
public class ClientController extends SecuredController {
		
	public static void searchClient(int page, int start, int limit, Long clientId, String name, String phone) {
		String requestBody = params.current().get("body");
		Logger.info("Client.searchClient: " + requestBody);

		
		List<kz.sushimi.console.persistence.clients.Client> list = ClientService.searchClients(clientId, name, phone);
		
		ArrayList<ClientModel> models = new ArrayList<ClientModel>(); 
		for (kz.sushimi.console.persistence.clients.Client client : list) {
			ClientModel model = new ClientModel();
			
			model.setName(client.getName());
			if (client.getBirthdate() != null)
				model.setBirthdate(client.getBirthdate().getTime());
			model.setId(client.getId());
			model.setComment(client.getComment());
			model.setEmail(client.getEmail());
			model.setIin(client.getIin());
			model.setPhoneNumber(client.getPhoneNumber());
			model.setStatus(client.getStatus());
			model.setType(client.getType());
			
			ClientDiscount cd = ClientDiscountService.getCurrentDiscount(client.getTotalOrderSum());
			model.setCurrentTotalOrderSum(client.getTotalOrderSum());
			if (cd != null) {
				model.setCurrentDiscountPercent(cd.getPercent());
			}
			
			ClientDiscount ncd = ClientDiscountService.getNextDiscount(client.getTotalOrderSum());
			if (ncd != null) {
				model.setNextDiscountPercent(ncd.getPercent());
				model.setNextDiscountSum(ncd.getFromSum());
			}
			
			models.add(model);
		}

		StoreWrapper wrapper = new StoreWrapper();
		wrapper.success = true;
		wrapper.totalCount = list.size();
		wrapper.data = models.toArray();
		renderJSON(wrapper);
	}
	
	/**
	 * Добавить новую запись
	 * 
	 * @param model
	 * @throws ValidationException 
	 */
	public static void addClient() throws ValidationException {
		String requestBody = params.current().get("body");
		Logger.info("addClient: " + requestBody);
			
		Gson gson = new Gson();
		ClientModel model = gson.fromJson(requestBody, ClientModel.class);
		Client client = ClientService.addClient(model, Security.connected());
		
		renderJSON("{\"success\":true, \"clientId\": " + client.getId() + "}");
	}
	
	
	
	public static void searchClientAddress(int page, int start, int limit, Long clientId) {
		String requestBody = params.current().get("body");
		Logger.info("Client.searchAddressClient: " + requestBody);
	
		List<kz.sushimi.console.persistence.clients.ClientAddress> list = ClientService.searchClientAddress(clientId);
		
		ArrayList<ClientAddressModel> models = new ArrayList<ClientAddressModel>(); 
		for (kz.sushimi.console.persistence.clients.ClientAddress clientAddress : list) {
			ClientAddressModel model = new ClientAddressModel();
			
			model.setId(clientAddress.getId());
			model.setClientId(clientId);
			
			model.setCityId(clientAddress.getCity().getId());
			model.setCityName(clientAddress.getCityName());
			model.setStreetName(clientAddress.getStreetName());
			model.setComment(clientAddress.getComment());
			model.setCorpus(clientAddress.getCorpus());
			model.setDoorCode(clientAddress.getDoorCode());
			model.setFlat(clientAddress.getFlat());
			model.setFloor(clientAddress.getFloor());
			model.setGeoLatitude(clientAddress.getGeoLatitude());
			model.setGeoLongitude(clientAddress.getGeoLongitude());
			model.setHouse(clientAddress.getHouse());
			model.setOffice(clientAddress.getOffice());
			model.setPhoneNumber(clientAddress.getPhoneNumber());
			model.setPorch(clientAddress.getPorch());
			model.setRoom(clientAddress.getRoom());
			model.setBuilding(clientAddress.getBuilding());
			model.setAddressType(clientAddress.getAddressType());
			model.setAddress(clientAddress.getFullAddress());
			models.add(model);
		}
	
		StoreWrapper wrapper = new StoreWrapper();
		wrapper.success = true;
		wrapper.totalCount = list.size();
		wrapper.data = models.toArray();
		renderJSON(wrapper);
	}
		
	/**
	 * Добавить новую запись
	 * 
	 * @param model
	 * @throws ValidationException 
	 */
	public static void addClientAddress() throws ValidationException {
		String requestBody = params.current().get("body");
		Logger.info("addClientAddress: " + requestBody);
			
		Gson gson = new Gson();
		ClientAddressModel model = gson.fromJson(requestBody, ClientAddressModel.class);
		ClientAddress clientAddress = ClientService.addClientAddress(model, Security.connected());
		
		renderJSON("{\"success\":true, \"clientAddressId\": " + clientAddress.getId() + ",\"clientId\": " + clientAddress.getClient().getId() + "}");
	}

	
	public static void chooseAddressOnMap() {
		renderTemplate("/Client/chooseAddressOnMap.html");
	}

	/**
	 * Чтение записей о клиентах для информации о клиентах
	 * 
	 * @param model
	 * @throws ValidationException 
	 */
	
	public static void read(int page, int start, int limit) {
		String requestBody = params.current().get("body");
		Logger.info("Client.read: " + requestBody);

		List<kz.sushimi.console.persistence.clients.Client> list = ClientService.getClientsList(start, limit);
		
		ArrayList<ClientModel> models = new ArrayList<ClientModel>(); 
		for (kz.sushimi.console.persistence.clients.Client client : list) {
			ClientModel model = new ClientModel();
			model.setId(client.getId());
			model.setName(client.getName());
			model.setPhoneNumber(client.getPhoneNumber());
			model.setEmail(client.getEmail());
			model.setCurrentTotalOrderSum(client.getTotalOrderSum());
			model.setType(client.getType());
			model.setStatus(client.getStatus());
					
			models.add(model);
		}

		StoreWrapper wrapper = new StoreWrapper();
		wrapper.success = true;
		wrapper.totalCount = ClientService.getClientCount();
		wrapper.data = models.toArray();
		renderJSON(wrapper);
	}
	
	/**
	 * Добавить новую запись в информации о клиентах
	 * 
	 * @param model
	 * @throws ValidationException 
	 */
	public static void create() throws ValidationException {
		String requestBody = params.current().get("body");
		Logger.info("Create: " + requestBody);
		if (!requestBody.startsWith("["))
			requestBody = "[" + requestBody + "]";
			
		Gson gson = new Gson();
		ClientModel[] models = gson.fromJson(requestBody, ClientModel[].class);
		Logger.info("Model.lenght: " + models.length);
		ClientService.addClients(models, Security.connected());
		
		StoreWrapper wrapper = new StoreWrapper();
		wrapper.success = true;
		renderJSON(wrapper);
	}
	
	public static void destroy(long id) throws ValidationException {
		Logger.info("ID:" + id);
		ClientService.deleteClient(id, Security.connected());
		StoreWrapper wrapper = new StoreWrapper();
		wrapper.success = true;
		renderJSON(wrapper);
	}
	
	/**
	 * Обновление записи о клиенте
	 * 
	 * @param model
	 * @throws ValidationException 
	 */
	public static void update() throws ValidationException {
		String requestBody = params.current().get("body");
		Logger.info("Update: " + requestBody);
		if (!requestBody.startsWith("["))
			requestBody = "[" + requestBody + "]";
		Gson gson = new Gson();
		Logger.info("Update: " + requestBody);
		ClientModel[] models = gson.fromJson(requestBody, ClientModel[].class);
		Logger.info("Model.lenght: " + models.length);
		ClientService.updateClient(models, Security.connected());
		
		StoreWrapper wrapper = new StoreWrapper();
		wrapper.success = true;
		renderJSON(wrapper);
	}
	
	//Функция для чтения всех адресов клиента
	//Функция выше не подходила из-за того, что не получала никакой POST (а именно clientId)
	//Переделывать ту функцию, могли б быть последствия
	public static void readAddres(Long clientId, int page, int start, int limit) {
		String requestBody = params.current().get("body");
		Logger.info("ClientAddres.read: " + requestBody);

		List<kz.sushimi.console.persistence.clients.ClientAddress> list = ClientService.searchClientAddress(clientId);
		
		ArrayList<ClientAddressModel> models = new ArrayList<ClientAddressModel>(); 
		for (kz.sushimi.console.persistence.clients.ClientAddress client : list) {
			ClientAddressModel model = new ClientAddressModel();
			model.setId(client.getId());
			model.setCityName(client.getCityName());
			model.setStreetName(client.getStreetName());
			model.setHouse(client.getHouse());
			model.setFlat(client.getFlat());
					
			models.add(model);
		}

		StoreWrapper wrapper = new StoreWrapper();
		wrapper.success = true;
		wrapper.totalCount = ClientService.getClientCount();
		wrapper.data = models.toArray();
		renderJSON(wrapper);
	}

	//Добаляет адрес клиента в информации о клиентах 
	//Функция выше не устраивала тем, что не получает никакой POST (clientId)
	public static void addClientAddres(Long clientId) throws ValidationException {
		String requestBody = params.current().get("body");
		Logger.info("addClientAddress: " + requestBody);
			
		Gson gson = new Gson();
		ClientAddressModel model = gson.fromJson(requestBody, ClientAddressModel.class);
		ClientAddress clientAddress = ClientService.addClientAddres(clientId, model, Security.connected());
		
		renderJSON("{\"success\":true, \"clientAddressId\": " + clientAddress.getId() + ",\"clientId\": " + clientAddress.getClient().getId() + "}");
	}

	public static void destroyClientAddres(long id, Long clientId) throws ValidationException {
		Logger.info("ID:" + id);
		ClientService.deleteClientAddress(id, Security.connected());
		StoreWrapper wrapper = new StoreWrapper();
		wrapper.success = true;
		renderJSON(wrapper);
	}
	
	//Функция для обновление адреса клиента.
	public static void updateAddres(Long clientId) throws ValidationException {
		String requestBody = params.current().get("body");
		Logger.info("Update: " + requestBody);
		if (!requestBody.startsWith("["))
			requestBody = "[" + requestBody + "]";
		Gson gson = new Gson();
		Logger.info("Update: " + requestBody);
		ClientAddressModel[] models = gson.fromJson(requestBody, ClientAddressModel[].class);
		//Logger.info("Model.lenght: " + models.length);
		ClientService.updateClientAddres(models, Security.connected());
		
		StoreWrapper wrapper = new StoreWrapper();
		wrapper.success = true;
		renderJSON(wrapper);
	}
	
}