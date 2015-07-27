package controllers;

import java.util.ArrayList;
import java.util.List;

import kz.sushimi.console.exceptions.ValidationException;
import kz.sushimi.console.models.StoreWrapper;
import kz.sushimi.console.models.clients.ClientAddressModel;
import kz.sushimi.console.models.clients.ClientModel;
import kz.sushimi.console.persistence.clients.Client;
import kz.sushimi.console.persistence.clients.ClientAddress;
import kz.sushimi.console.services.ClientService;
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
	
	
}