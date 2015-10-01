package controllers;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import javax.xml.transform.TransformerException;

import kz.sushimi.console.exceptions.ValidationException;
import kz.sushimi.console.models.StoreWrapper;
import kz.sushimi.console.models.orders.CancelOrderModel;
import kz.sushimi.console.models.orders.CancelSiteOrderModel;
import kz.sushimi.console.models.orders.CreateOrderModel;
import kz.sushimi.console.models.orders.OrderModel;
import kz.sushimi.console.models.orders.OrderTreeModel;
import kz.sushimi.console.models.orders.OrderTreeRootModel;
import kz.sushimi.console.models.orders.PreviewOrderModel;
import kz.sushimi.console.models.orders.PreviewSiteOrderModel;
import kz.sushimi.console.models.orders.SiteOrderModel;
import kz.sushimi.console.persistence.orders.Order;
import kz.sushimi.console.persistence.orders.OrderState;
import kz.sushimi.console.persistence.orders.OrderType;
import kz.sushimi.console.persistence.orders.site.SiteOrderStatus;
import kz.sushimi.console.services.OrderService;
import kz.sushimi.console.services.SiteOrderService;
import kz.sushimi.console.services.PrintService;
import kz.sushimi.console.services.dictionaries.ProductService;
import play.Logger;
import play.mvc.Controller;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

/**
 * Контроллер управления заказами
 * 
 * @author Demart
 *
 */
public class OrderController extends Controller {

	public static void getNewOrdersCount(Long lastCheck) {
		Long totalCount = SiteOrderService.getSiteOrderCountByStatus(SiteOrderStatus.RECEIVED);
		Long newCount = SiteOrderService.getSiteOrderCountByStatus(SiteOrderStatus.RECEIVED, lastCheck);
		lastCheck = Calendar.getInstance().getTimeInMillis();	
		
		renderJSON("{\"success\":true, \"count\": " + totalCount + ", \"newCount\":" +  newCount +  ", \"lastCheck\":" +  lastCheck + "}");
	}
	
	public static void readOrderTree(String node, String sort, String property, String direction) {
		String requestBody = params.current().get("body");
		Logger.info("OrderTree.read: " + requestBody);
		
		ArrayList<OrderTreeModel> models = new ArrayList<OrderTreeModel>(); 
		OrderTreeRootModel root = new OrderTreeRootModel();
		root.setChildren(models);
		
		OrderTreeModel order = new OrderTreeModel(1l, "Заказы", OrderService.getOrderCountByState(OrderState.NONE), "task-folder", OrderState.NONE, false, true);
		models.add(order);
		order.setChildren(new ArrayList<OrderTreeModel>());
		
		OrderTreeModel orderCurrent = new OrderTreeModel(2l, "Ожидающие", OrderService.getOrderCountByState(OrderState.REGISTERED), "task-folder", OrderState.REGISTERED, true, false);
		order.getChildren().add(orderCurrent);
		
		OrderTreeModel orderInProgress = new OrderTreeModel(3l, "В обработке", OrderService.getOrderCountByState(OrderState.IN_PROGRESS), "task-folder", OrderState.IN_PROGRESS, true, false);
		order.getChildren().add(orderInProgress);

		OrderTreeModel orderWaitingForDelivery = new OrderTreeModel(8l, "Ожидают доставки", OrderService.getOrderCountByState(OrderState.WAITING_FOR_DELIVERY), "task-folder", OrderState.WAITING_FOR_DELIVERY, true, false);
		order.getChildren().add(orderWaitingForDelivery);
		
		OrderTreeModel orderOnDelivery = new OrderTreeModel(4l, "На доставке", OrderService.getOrderCountByState(OrderState.ON_DELIVERY), "task-folder", OrderState.ON_DELIVERY, true, false);
		order.getChildren().add(orderOnDelivery);

		OrderTreeModel orderDone = new OrderTreeModel(5l, "Обработанные", OrderService.getOrderCountByState(OrderState.DELIVERED), "task-folder", OrderState.DELIVERED, true, false);
		order.getChildren().add(orderDone);		
		
		OrderTreeModel orderCanceled = new OrderTreeModel(6l, "Отмененные", OrderService.getOrderCountByState(OrderState.CANCELED), "task-folder", OrderState.CANCELED, true, false);
		order.getChildren().add(orderCanceled);
		
		OrderTreeModel orderReturned = new OrderTreeModel(7l, "Возврат", OrderService.getOrderCountByState(OrderState.RETURNED), "task-folder", OrderState.RETURNED, true, false);
		order.getChildren().add(orderReturned);
		
		OrderTreeModel orderSite = new OrderTreeModel(50l, "Заказы c сайта", SiteOrderService.getSiteOrderCountByStatus(SiteOrderStatus.NONE), "task-folder", SiteOrderStatus.NONE, false, true);
		models.add(orderSite);
		orderSite.setChildren(new ArrayList<OrderTreeModel>());
		
		OrderTreeModel orderSiteCurrent = new OrderTreeModel(51l, "Поступившие", SiteOrderService.getSiteOrderCountByStatus(SiteOrderStatus.RECEIVED), "task-folder", SiteOrderStatus.RECEIVED, true, false);
		orderSite.getChildren().add(orderSiteCurrent);
		
		OrderTreeModel orderSiteProcessed = new OrderTreeModel(52l, "Обработанные", SiteOrderService.getSiteOrderCountByStatus(SiteOrderStatus.REGISTERED), "task-folder", SiteOrderStatus.REGISTERED, true, false);
		orderSite.getChildren().add(orderSiteProcessed);
		
		OrderTreeModel orderSiteCanceled = new OrderTreeModel(53l, "Отмененные", SiteOrderService.getSiteOrderCountByStatus(SiteOrderStatus.CANCELED), "task-folder", SiteOrderStatus.CANCELED, true, false);
		orderSite.getChildren().add(orderSiteCanceled);
		
		renderJSON(root);
	}
	
	
	public static void readOrders(OrderState state, int page, int start, int limit) {
		String requestBody = params.current().get("body");
		Logger.info("Orders.read: " + requestBody);
	
		List<kz.sushimi.console.persistence.orders.Order> list = OrderService.getOrders(state, start, limit);
		
		ArrayList<OrderModel> models = new ArrayList<OrderModel>(); 
		for (kz.sushimi.console.persistence.orders.Order order : list) {
			OrderModel model = new OrderModel();
			
			model.setId(order.getId());
			
			model.setOrderNumber(order.getOrderNumber());
			
			if (order.getOrderDate() != null)
				model.setOrderDate(order.getOrderDate().getTime());
			if (order.getDeliveryDate() != null)
				model.setDeliveryDate(order.getDeliveryDate().getTime());
			
			model.setState(order.getOrderState());
			model.setType(order.getType());
			model.setSum(order.getOrderSum());
			model.setComment(order.getComment());
			
			if (order.getClientAddress() != null) {
				model.setClientAddress(order.getClientAddress().getFullAddress());
			} else {
				if (order.getType() == OrderType.BAR)
					model.setClientAddress("Адрес не указан, заказ на бар");
				if (order.getType() == OrderType.SELF_SERVICE)
					model.setClientAddress("Адрес не указан, самовывоз");
			}
			
			if (order.getClient() != null) {
				model.setClientName(order.getClient().getName());
				model.setClientPhone(order.getClient().getPhoneNumber());
			} else {
				model.setClientName("Заказ на бар, номер заказа: " + order.getId());
			}
			model.setReason(order.getReason());
			
			models.add(model);
		}
	
		StoreWrapper wrapper = new StoreWrapper();
		wrapper.success = true;
		wrapper.totalCount = ProductService.getProductsCount();
		wrapper.data = models.toArray();
		renderJSON(wrapper);
	}
	
	
	public static void readSiteOrders(SiteOrderStatus status, int page, int start, int limit) {
		String requestBody = params.current().get("body");
		Logger.info("SiteOrders.read: " + requestBody);
	
		List<kz.sushimi.console.persistence.orders.site.SiteOrder> list = SiteOrderService.getSiteOrders(status, start, limit);
		
		ArrayList<SiteOrderModel> models = new ArrayList<SiteOrderModel>(); 
		for (kz.sushimi.console.persistence.orders.site.SiteOrder order : list) {
			SiteOrderModel model = new SiteOrderModel();
			
			model.setId(order.getId());
			model.setOrderNumber(order.getOrderNumber());
			
			if (order.getOrderTime() != null)
				model.setOrderDate(order.getOrderTime().getTime());
			if (order.getDeliveryTime() != null)
				model.setDeliveryDate(order.getDeliveryTime().getTime());
			
			model.setStatus(order.getStatus());
			model.setType(order.getOrderType());
			model.setSum(order.getOrderSum());
			model.setClientName(order.getPersonName());
			model.setClientPhone(order.getPersonPhone());
			model.setClientAddress(order.getFullAddress());
			model.setReason(order.getReason());
			model.setPersonRemark(order.getPersonRemark());
			model.setSource(order.getSource());
			model.setSourceDiscount(order.getSourceDiscount());
			
			models.add(model);
		}
	
		StoreWrapper wrapper = new StoreWrapper();
		wrapper.success = true;
		wrapper.totalCount = ProductService.getProductsCount();
		wrapper.data = models.toArray();
		renderJSON(wrapper);
	}
	
	public static void createOrder() throws ValidationException {
		String requestBody = params.current().get("body");
		Logger.info("Create Order: " + requestBody);
		Gson gson = new GsonBuilder().setDateFormat("yyyy-MM-dd'T'HH:mm:ss").create();
		CreateOrderModel model = gson.fromJson(requestBody, CreateOrderModel.class);
		Order order = OrderService.createOrder(model, Security.connected());
		renderJSON("{\"success\":true, \"orderId\": " + order.getId() + ", \"orderNumber\": \"" + order.getOrderNumber() + "\"}");
	}
	
	
	public static void previewOrder(Long orderId) throws ValidationException {
		String requestBody = params.current().get("body");
		Logger.info("Preview Order: " + requestBody);
		PreviewOrderModel model = OrderService.previewOrder(orderId, Security.connected());
		renderJSON(model);
	}
	
	
	public static void printOrder(Long orderId) throws ValidationException {
		Logger.info("Order print taks, id: " + orderId);
		Order order = OrderService.getOrder(orderId);
		if (order == null)
			throw new ValidationException("Order not found");
		
		renderTemplate("Order/printOrder.html", order);
	}
	
	public static void sendToWorkOrder(Long id) throws ValidationException {
		String requestBody = params.current().get("body");
		Logger.info("Send to work Order: " + requestBody);
		OrderService.sendToWorkOrder(id, Security.connected());
		
		StoreWrapper wrapper = new StoreWrapper();
		wrapper.success = true;
		renderJSON(wrapper);
	}
		
	public static void sendToWaitingForDeliveryOrder(Long id) throws ValidationException {
		String requestBody = params.current().get("body");
		Logger.info("Send to waiting for delivery Order: " + requestBody);
		OrderService.sendToWaitingForDeliveryOrder(id, Security.connected());
		
		StoreWrapper wrapper = new StoreWrapper();
		wrapper.success = true;
		renderJSON(wrapper);
	}	
	

	public static void sendToDeliveryOrder(Long id) throws ValidationException {
		String requestBody = params.current().get("body");
		Logger.info("Send to delivery Order: " + requestBody);
		OrderService.sendToDeliveryOrder(id, Security.connected());
		
		StoreWrapper wrapper = new StoreWrapper();
		wrapper.success = true;
		renderJSON(wrapper);
	}
	
	public static void completeOrder(Long id) throws ValidationException {
		String requestBody = params.current().get("body");
		Logger.info("Compete Order: " + requestBody);
		OrderService.competeOrder(id, Security.connected());
		
		StoreWrapper wrapper = new StoreWrapper();
		wrapper.success = true;
		renderJSON(wrapper);
	}
	
	
	public static void cancelOrder() throws ValidationException {
		String requestBody = params.current().get("body");
		Logger.info("Cancel Order: " + requestBody);
		Gson gson = new Gson();
		CancelOrderModel model = gson.fromJson(requestBody, CancelOrderModel.class);
		OrderService.cancelOrder(model, Security.connected());
		
		StoreWrapper wrapper = new StoreWrapper();
		wrapper.success = true;
		renderJSON(wrapper);
	}
	
	
	public static void cancelSiteOrder() throws ValidationException {
		String requestBody = params.current().get("body");
		Logger.info("Cancel Order: " + requestBody);
		Gson gson = new Gson();
		CancelSiteOrderModel model = gson.fromJson(requestBody, CancelSiteOrderModel.class);
		SiteOrderService.cancelSiteOrder(model, Security.connected());
		
		StoreWrapper wrapper = new StoreWrapper();
		wrapper.success = true;
		renderJSON(wrapper);
	}	
	
	public static void previewSiteOrder(Long orderId) throws ValidationException {
		String requestBody = params.current().get("body");
		Logger.info("Preview Site Order: " + requestBody);
		PreviewSiteOrderModel model = SiteOrderService.previewSiteOrder(orderId, Security.connected());
		renderJSON(model);
	}
	
	/**
	 * Печать чека на POS принтере
	 */
	
	public static void printOrderPosPrinter (Long orderId) throws ValidationException, TransformerException, IOException {
		System.out.println("Print check: " + orderId);
		PrintService.print(orderId);
		
	}
	
}
