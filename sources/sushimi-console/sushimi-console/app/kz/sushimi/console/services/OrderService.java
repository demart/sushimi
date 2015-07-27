package kz.sushimi.console.services;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import javax.persistence.Query;

import kz.sushimi.console.exceptions.ValidationException;
import kz.sushimi.console.models.orders.CancelOrderModel;
import kz.sushimi.console.models.orders.CancelSiteOrderModel;
import kz.sushimi.console.models.orders.CreateOrderItemModel;
import kz.sushimi.console.models.orders.CreateOrderModel;
import kz.sushimi.console.models.orders.PreviewOrderItemModel;
import kz.sushimi.console.models.orders.PreviewOrderModel;
import kz.sushimi.console.models.orders.PreviewSiteOrderItemModel;
import kz.sushimi.console.models.orders.PreviewSiteOrderModel;
import kz.sushimi.console.persistence.clients.Client;
import kz.sushimi.console.persistence.clients.ClientAddress;
import kz.sushimi.console.persistence.dictionaries.Product;
import kz.sushimi.console.persistence.dictionaries.ProductCosting;
import kz.sushimi.console.persistence.dictionaries.ProductType;
import kz.sushimi.console.persistence.orders.Order;
import kz.sushimi.console.persistence.orders.OrderItem;
import kz.sushimi.console.persistence.orders.OrderState;
import kz.sushimi.console.persistence.orders.OrderType;
import kz.sushimi.console.persistence.orders.site.SiteOrder;
import kz.sushimi.console.persistence.orders.site.SiteOrderItem;
import kz.sushimi.console.persistence.orders.site.SiteOrderStatus;
import kz.sushimi.console.persistence.promotions.Promotion;
import kz.sushimi.console.persistence.users.User;
import kz.sushimi.console.persistence.warehouses.WarehouseOutcome;
import kz.sushimi.console.persistence.warehouses.WarehouseOutcomeType;
import kz.sushimi.console.services.dictionaries.ProductService;

import org.apache.commons.lang.StringUtils;

import play.db.jpa.JPA;

/**
 * Класс сервис для управления заказами
 * 
 * @author Demart
 *
 */
public class OrderService {

	/**
	 * Сумма порог получения бесплатного набора соусов
	 */
	private static final int FREE_SAUCE_PER_ORDER_SUM = 2000;

	public static List<Order> getOrders(OrderState state, int start, int limit) {
		Query query = null;
		if (state == OrderState.NONE) { 
			ArrayList<OrderState> stateList = new ArrayList<OrderState>();
			stateList.add(OrderState.DELIVERED);
			stateList.add(OrderState.RETURNED);
			stateList.add(OrderState.CANCELED);
			query = JPA.em().createQuery("from Order where orderState not in (:states) order by deliveryDate asc")
					.setParameter("states", stateList);
		} else {
			if (state == OrderState.DELIVERED || state == OrderState.RETURNED || state == OrderState.CANCELED) {
				query = JPA.em().createQuery("from Order where orderState=:orderState order by deliveryDate desc ")
						.setParameter("orderState", state);
			} else {
				query = JPA.em().createQuery("from Order where orderState=:orderState order by deliveryDate asc ")
						.setParameter("orderState", state);
			}
		}
		return query.setMaxResults(limit).setFirstResult(start).getResultList();
	}

	public static List<SiteOrder> getSiteOrders(SiteOrderStatus status, int start, int limit) {
		Query query = null;
		if (status == SiteOrderStatus.NONE) { 
			query = JPA.em().createQuery("from SiteOrder order by deliveryTime asc");
		} else {
			query = JPA.em().createQuery("from SiteOrder where status=:status order by deliveryTime asc ")
				.setParameter("status", status);
		}
		return query.setMaxResults(limit).setFirstResult(start).getResultList();
	}
	
	
	public static Long getOrderCountByState(OrderState state){
		Query query = null;
		if (state == OrderState.NONE) { 
			query = JPA.em().createQuery("select count(*) from Order");
		} else {
			query = JPA.em().createQuery("select count(*) from Order where orderState=:orderState")
					.setParameter("orderState", state);
		}
		return (Long)query.getSingleResult();
	}
	
	public static Long getSiteOrderCountByStatus(SiteOrderStatus status){
		Query query = null;
		if (status == SiteOrderStatus.NONE) { 
			query = JPA.em().createQuery("select count(*) from SiteOrder");
		} else {
			query = JPA.em().createQuery("select count(*) from SiteOrder where status=:status")
				.setParameter("status", status);
		}
		return (Long)query.getSingleResult();
	}

	
	public static Long getSiteOrderCountByStatus(SiteOrderStatus status, Long lastCheck){
		Query query = null;
		Calendar createdDate = Calendar.getInstance();
		createdDate.setTimeInMillis(lastCheck);
		if (status == SiteOrderStatus.NONE) { 
			query = JPA.em().createQuery("select count(*) from SiteOrder where createdDate > :lastCheck")
				.setParameter("lastCheck", createdDate);
		} else {
			query = JPA.em().createQuery("select count(*) from SiteOrder where status=:status and createdDate > :lastCheck")
				.setParameter("lastCheck", createdDate)
				.setParameter("status", status);
		}
		return (Long)query.getSingleResult();
	}	
	
	public static void cancelOrder(CancelOrderModel model, String connected) throws ValidationException {
		if (model == null)
			throw new ValidationException("Model is null");
		
		if (model.getOrderId() == null || model.getOrderId() < 1)
			throw new ValidationException("OrderId is null");
		
		if (StringUtils.isEmpty(model.getReason()))
			throw new ValidationException("Reason is null");
		
		if (model.getState() == null)
			throw new ValidationException("State is null");
			
		Order order = Order.findById(model.getOrderId());
		if (order == null)
			throw new ValidationException("Order not found");
		
		
		List<Long> ids = new ArrayList<Long>();
		// Возвращаем на склад продукцию так как не использовали
		if (order.getOrderState() == OrderState.REGISTERED) {
			for (OrderItem item : order.getOrderItems()) {
				for (WarehouseOutcome outcome : item.getWarehouseOutcomes()) {
					ids.add(outcome.getId());
				}
				item.getWarehouseOutcomes().clear();
			}
		}
		
		order.setOrderState(model.getState());
		order.setReason(model.getReason());
		order.save();
		
		for (Long outcomeId : ids) {
			WarehouseService.deleteWarehouseOutcome(outcomeId, connected);
		}
		
	}

	public static void cancelSiteOrder(CancelSiteOrderModel model, String connected) throws ValidationException {
		if (model == null)
			throw new ValidationException("Model is null");
		
		if (model.getSiteOrderId() == null || model.getSiteOrderId() < 1)
			throw new ValidationException("SiteOrderId is null");
		
		if (StringUtils.isEmpty(model.getReason()))
			throw new ValidationException("Reason is null");
		
		if (model.getState() == null)
			throw new ValidationException("State is null");
	
	
		
		SiteOrder order = SiteOrder.findById(model.getSiteOrderId());
		if (order == null)
			throw new ValidationException("SiteOrder not found");
		
		order.setStatus(model.getState());
		order.setReason(model.getReason());
		
		
		order.save();
	}


	public static void sendToWorkOrder(Long orderId, String connected) throws ValidationException {
		if (orderId == null || orderId < 1)
			throw new ValidationException("OrderId is null");
		
		Order order = Order.findById(orderId);
		if (order == null)
			throw new ValidationException("Order not found");
		
		order.setOrderState(OrderState.IN_PROGRESS);
		// TODO Вставить время
		order.save();
	}	


	public static void sendToDeliveryOrder(Long orderId, String connected) throws ValidationException {
		if (orderId == null || orderId < 1)
			throw new ValidationException("OrderId is null");
		
		Order order = Order.findById(orderId);
		if (order == null)
			throw new ValidationException("Order not found");
		
		order.setOrderState(OrderState.ON_DELIVERY);
		// TODO Вставить время
		order.save();
	}	
	
	public static void competeOrder(Long orderId, String connected) throws ValidationException {
		if (orderId == null || orderId < 1)
			throw new ValidationException("OrderId is null");
		
		Order order = Order.findById(orderId);
		if (order == null)
			throw new ValidationException("Order not found");
		
		order.setOrderState(OrderState.DELIVERED);
		// TODO Вставить время
		order.save();
	}

	public static Order createOrder(CreateOrderModel model, String userLogin) throws ValidationException {
		if (model == null)
			throw new ValidationException("model is null");
		if (model.getType() == null)
			throw new ValidationException("model.type is null");
		if (model.getItems() == null || model.getItems().size() < 1)
			throw new ValidationException("model.productItems is null or empty");
		
		Promotion promo = null;
		if (model.getPromotionId() != null && model.getPromotionId() > 0)
			promo = promo.findById(model.getPromotionId());
		
		Client client = null;
		if (model.getClientId() != null && model.getClientId() > 0)
			client = Client.findById(model.getClientId());
		
		ClientAddress address = null;
		if (model.getClientAddressId() != null && model.getClientAddressId() > 0)
			address = ClientAddress.findById(model.getClientAddressId());
		
		User user = UserService.getUserByLogin(userLogin);

		Order order = new Order();
		order.setOrderState(OrderState.REGISTERED);
		order.setPromotion(promo);
		order.setUser(user);
		order.setOperatorUser(user);
		order.setType(model.getType());
		order.setPersonCount(model.getPersonCount());
		order.setClientCash(model.getPersonCash());
		order.setComment(model.getComment());
		
		// TODO если заказ с сайта то нужно брать из модели
		order.setOrderDate(Calendar.getInstance());
		
		if (model.getSiteId() != null && model.getSiteId() > 0) {
			SiteOrder siteOrder = SiteOrder.findById(model.getSiteId());
			order.setSiteOrder(siteOrder);
			if (model.getOrderTime() != null)
				order.getOrderDate().setTime(model.getOrderTime());
		}
		
		switch (order.getType()) {
		case BAR:
			Calendar barDeliveryTime = Calendar.getInstance();
			barDeliveryTime.add(Calendar.MINUTE, 30);
			order.setDeliveryDate(barDeliveryTime);
			break;
			
		case DELIVERY:
			if (client == null)
				throw new ValidationException("order delivery in time mode: client is null");
			
			if (address == null)
				throw new ValidationException("order delivery in time mode: address is null");
			
			Calendar currentDeliveryTime = Calendar.getInstance();
			currentDeliveryTime.add(Calendar.HOUR, 1);
			currentDeliveryTime.add(Calendar.MINUTE, 30);
			order.setDeliveryDate(currentDeliveryTime);
			
			order.setClient(client);
			order.setClientAddress(address);
			
			order.setDeliveryCost(600);
			break;
			
		case DELIVERY_IN_TIME:
			if (client == null)
				throw new ValidationException("order delivery in time mode: client is null");
			
			if (address == null)
				throw new ValidationException("order delivery in time mode: address is null");
			
			order.setClient(client);
			order.setClientAddress(address);
			
			if (model.getToTime() == null)
				throw new ValidationException("order delivery in time mode: delivery date is null");
			Calendar toDate = Calendar.getInstance();
			toDate.setTimeInMillis(model.getToTime().getTime());
			order.setDeliveryDate(toDate);
			
			order.setDeliveryCost(600);
			break;
			
		case SELF_SERVICE:
			if (client == null)
				throw new ValidationException("order selfservice mode: client is null");
			order.setClient(client);
			
			if (model.getToTime() == null)
				throw new ValidationException("order selfservice mode: delivery date is null");
			Calendar visitTime = Calendar.getInstance();
			visitTime.setTimeInMillis(model.getToTime().getTime());
			order.setDeliveryDate(visitTime);
			break;
		default:
			throw new ValidationException("Unknown order type on create order");
		}
		
		// ==========
		//  Продукты
		// ==========
		int orderSum = 0, orderSushiSum = 0;
		OrderItem sauceSoyProduct = null;
		OrderItem sauceVasabiProduct = null;
		OrderItem sauceImbirProduct = null;
		order.setOrderItems(new ArrayList<OrderItem>());
		for (CreateOrderItemModel item : model.getItems()) {
			if (item.getCount() == null || item.getCount() < 1)
				throw new ValidationException("order.productItem.count is null or empty");
			if (item.getProductId() == null || item.getProductId() < 1)
				throw new ValidationException("order.productItem.productId is null or empty");
			
			Product product = Product.findById(item.getProductId());
			if (product == null)
				throw new ValidationException("order.productItem.productId not found");
			
			OrderItem orderItem = new OrderItem();
			orderItem.setCount(item.getCount());
			orderItem.setFreeCount(0);
			orderItem.setProduct(product);
			orderItem.setUser(user);
			orderItem.setOrder(order);
			
			if (order.getType() == OrderType.BAR) {
				orderItem.setSum(orderItem.getCount() * product.getBarCost());
			} else {
				orderItem.setSum(orderItem.getCount() * product.getCost());
			}
			
			// Себестоимость
			orderItem.setNetCost(orderItem.getCount() * product.getCostPrice());
			order.setNetCost(order.getNetCost() + orderItem.getNetCost());
			
			
			orderSum += orderItem.getSum();
			if (product.getType() == ProductType.SUSHI)
				orderSushiSum += orderItem.getSum();
			
			if (product.getType() == ProductType.IMBIR)
				sauceImbirProduct = orderItem;
			if (product.getType() == ProductType.SOY)
				sauceSoyProduct = orderItem;
			if (product.getType() == ProductType.VASABI)
				sauceVasabiProduct = orderItem;
			
			order.getOrderItems().add(orderItem);
		}
		
		// Постичаем бесплатные наборы к суши
		if (orderSushiSum > 0) {
			int freeSauceCount = orderSushiSum / FREE_SAUCE_PER_ORDER_SUM;
			buildSauceOrderItem(order, sauceImbirProduct, ProductType.IMBIR, freeSauceCount, user);
			buildSauceOrderItem(order, sauceVasabiProduct, ProductType.VASABI, freeSauceCount, user);
			buildSauceOrderItem(order, sauceSoyProduct, ProductType.SOY, freeSauceCount, user);
		}
		
		
		int sumWithoutSushi = orderSum - orderSushiSum;
		
		// Дисконт при самовывозе
		if (order.getType() == OrderType.SELF_SERVICE) {
			sumWithoutSushi = (int)Math.round(sumWithoutSushi * 0.9);
		}
		
		// Если есть акции на суши
		if (orderSushiSum > 0 && order.getPromotion() != null) {
			float discount = order.getPromotion().getDiscount();
			if (order.getType() == OrderType.SELF_SERVICE) {
				orderSushiSum = Math.round(orderSushiSum * (1-((discount+10) / 100)));
			} else {
				orderSushiSum = Math.round(orderSushiSum * (1-(discount / 100)));
			}
		} else {
			if (order.getType() == OrderType.SELF_SERVICE) {
				orderSushiSum = (int)Math.round(orderSushiSum * 0.9);
			}
		}
		
		// Если есть акция и в рамках нее дают в подарок то добавляем с нулевой ценой
		if (promo != null && promo.getProduct() != null) {
			boolean isFound = false;
			Product giftProduct = promo.getProduct();
			for (OrderItem item : order.getOrderItems()) {
				if (item.getProduct().getId() == giftProduct.getId()) {
					isFound = true;
					item.setCount(item.getCount() + promo.getProductCount());
					item.setFreeCount(item.getFreeCount() + promo.getProductCount());
					
					// Себестоимость
					item.setNetCost(item.getCount() * item.getProduct().getCostPrice());
					order.setNetCost(order.getNetCost() + item.getProduct().getCostPrice() * promo.getProductCount());
					
					break;
				}
			}
			if (!isFound) {
				OrderItem orderItem = new OrderItem();
				orderItem.setCount(promo.getProductCount());
				orderItem.setFreeCount(promo.getProductCount());
				orderItem.setProduct(giftProduct);
				orderItem.setUser(user);
				orderItem.setOrder(order);
				orderItem.setSum(0);
				order.getOrderItems().add(orderItem);
				
				// Себестоимость
				orderItem.setNetCost(orderItem.getCount() * orderItem.getProduct().getCostPrice());
				order.setNetCost(order.getNetCost() + orderItem.getProduct().getCostPrice() * promo.getProductCount());
				
			}
		}
		
		// Итоговая сумма при условии скидок и самовывоза
		orderSum = sumWithoutSushi + orderSushiSum;
		order.setOrderSum(orderSum);
		
		// Вычитаем кол-во жевачек и палочек в зависимости от кол-ва персон
		if (order.getType() == OrderType.SELF_SERVICE || 
			order.getType() == OrderType.DELIVERY ||
			order.getType() == OrderType.DELIVERY_IN_TIME) {
			int personCount = order.getPersonCount();
			
			Product chewingGum = ProductService.getProductByType(ProductType.CHEWING_GUM);
			OrderItem chewingGumOrderItem = new OrderItem();
			chewingGumOrderItem.setCount(personCount);
			chewingGumOrderItem.setFreeCount(personCount);
			chewingGumOrderItem.setOrder(order);
			chewingGumOrderItem.setProduct(chewingGum);
			chewingGumOrderItem.setSum(0);
			chewingGumOrderItem.setUser(user);
			order.getOrderItems().add(chewingGumOrderItem);
			
			// Себестоимость
			chewingGumOrderItem.setNetCost(chewingGumOrderItem.getCount() * chewingGumOrderItem.getProduct().getCostPrice());
			order.setNetCost(order.getNetCost() + chewingGumOrderItem.getProduct().getCostPrice() * personCount);
			
			
			Product sticks = ProductService.getProductByType(ProductType.STICKS);
			OrderItem sticksOrderItem = new OrderItem();
			sticksOrderItem.setCount(personCount);
			sticksOrderItem.setFreeCount(personCount);
			sticksOrderItem.setOrder(order);
			sticksOrderItem.setProduct(sticks);
			sticksOrderItem.setSum(0);
			sticksOrderItem.setUser(user);
			order.getOrderItems().add(sticksOrderItem);
			
			// Себестоимость
			sticksOrderItem.setNetCost(sticksOrderItem.getCount() * sticksOrderItem.getProduct().getCostPrice());
			order.setNetCost(order.getNetCost() + sticksOrderItem.getProduct().getCostPrice() * personCount);
						
		}
		
		// =================================
		//  Добавляем контейнеры для соусов
		// =================================
		if (order.getType() == OrderType.SELF_SERVICE || 
				order.getType() == OrderType.DELIVERY ||
				order.getType() == OrderType.DELIVERY_IN_TIME) {
			
			int smallContainerCount = 0;
			int bigContainerCount = 0;
			int sushiCount = 0;
			
			for (OrderItem item : order.getOrderItems()) {
				if (item.getProduct().getType() == ProductType.VASABI || item.getProduct().getType() == ProductType.IMBIR)
					smallContainerCount += item.getCount();
				if (item.getProduct().getType() == ProductType.SOY)
					bigContainerCount += item.getCount();
				if (item.getProduct().getType() == ProductType.SUSHI)
					sushiCount+=item.getCount();
			}
			
			if (smallContainerCount > 0) {
				Product smallContainer = ProductService.getProductByType(ProductType.SMALL_SAUCE_CONTAINER);
				OrderItem smallContainerOrderItem = new OrderItem();
				smallContainerOrderItem.setCount(smallContainerCount);
				smallContainerOrderItem.setFreeCount(smallContainerCount);
				smallContainerOrderItem.setOrder(order);
				smallContainerOrderItem.setProduct(smallContainer);
				smallContainerOrderItem.setSum(0);
				smallContainerOrderItem.setUser(user);
				order.getOrderItems().add(smallContainerOrderItem);

				// Себестоимость
				smallContainerOrderItem.setNetCost(smallContainerOrderItem.getCount() * smallContainerOrderItem.getProduct().getCostPrice());
				order.setNetCost(order.getNetCost() + smallContainerOrderItem.getProduct().getCostPrice() * smallContainerCount);
				
			}
			
			if (bigContainerCount > 0) {
				Product bigContainer = ProductService.getProductByType(ProductType.BIG_SAUCE_CONTAINER);
				OrderItem bigContainerOrderItem = new OrderItem();
				bigContainerOrderItem.setCount(bigContainerCount);
				bigContainerOrderItem.setFreeCount(bigContainerCount);
				bigContainerOrderItem.setOrder(order);
				bigContainerOrderItem.setProduct(bigContainer);
				bigContainerOrderItem.setSum(0);
				bigContainerOrderItem.setUser(user);
				order.getOrderItems().add(bigContainerOrderItem);
				
				// Себестоимость
				bigContainerOrderItem.setNetCost(bigContainerOrderItem.getCount() * bigContainerOrderItem.getProduct().getCostPrice());
				order.setNetCost(order.getNetCost() + bigContainerOrderItem.getProduct().getCostPrice() * bigContainerCount);
			}
			
			
			// Добавляем коробки, из расчета 3 суши на одну коробку
			// Если будет сет, то в сет нужно добавить остальные коробки
			if (sushiCount > 0) {
				int packagingCount = new Double(Math.ceil((double)sushiCount / 3)).intValue();
				Product packaging = ProductService.getProductByType(ProductType.PACKAGING);
				OrderItem packagingOrderItem = new OrderItem();
				packagingOrderItem.setCount(packagingCount);
				packagingOrderItem.setFreeCount(packagingCount);
				packagingOrderItem.setOrder(order);
				packagingOrderItem.setProduct(packaging);
				packagingOrderItem.setSum(0);
				packagingOrderItem.setUser(user);
				order.getOrderItems().add(packagingOrderItem);

				// Себестоимость
				packagingOrderItem.setNetCost(packagingOrderItem.getCount() * packagingOrderItem.getProduct().getCostPrice());
				order.setNetCost(order.getNetCost() + packagingOrderItem.getProduct().getCostPrice() * packagingCount);
			}
			
		}
		
		// Здесь поидее еще нужно добавить вычитание со склада
		for (OrderItem item : order.getOrderItems()) {
			
			if (item.getWarehouseOutcomes() == null)
				item.setWarehouseOutcomes(new ArrayList<WarehouseOutcome>());
			
			if (item.getProduct().getCalculations() != null)
				for (ProductCosting costing : item.getProduct().getCalculations()) {
					WarehouseOutcome outcome = new WarehouseOutcome();
					outcome.setAmount((float)costing.getAmount());
					outcome.setWarehouseItem(costing.getWarehouseItem());
					outcome.setOutcomeDate(Calendar.getInstance());
					outcome.setOutcomeReason("На продукцию");
					outcome.setType(WarehouseOutcomeType.OUTCOME);
					outcome.setUser(user);
					outcome.setIngredient(costing.getWarehouseItem().getIngredient());
					outcome.setUnit(costing.getWarehouseItem().getIngredient().getUnit());
					item.getWarehouseOutcomes().add(outcome);
					costing.getWarehouseItem().setAmount(costing.getWarehouseItem().getAmount() - costing.getAmount());
				} 
		}
		
		order.save();
		
		// Следующей номер заказа
		Query q = JPA.em().createNativeQuery("select nextval('order_sequence')");
		order.setOrderNumber(((BigInteger)q.getSingleResult()).longValue());
		order.save();
		
		if (order.getSiteOrder() != null) {
			SiteOrder siteOrder = order.getSiteOrder();
			siteOrder.setStatus(SiteOrderStatus.REGISTERED);
			siteOrder.save();
		}
		
		return order;
	}
	
	private static void buildSauceOrderItem(Order order, OrderItem sauceOrderItem, ProductType type, int freeSauceCount, User user) throws ValidationException {
		if (sauceOrderItem == null) {
			// добавить в заказ с нулевой ценой
			Product sauce = ProductService.getProductByType(type);
			if (sauce == null)
				throw new ValidationException("sauce " + type + " not found");
			
			sauceOrderItem = new OrderItem();
			sauceOrderItem.setCount(freeSauceCount);
			sauceOrderItem.setFreeCount(freeSauceCount);
			sauceOrderItem.setOrder(order);
			sauceOrderItem.setProduct(sauce);
			sauceOrderItem.setSum(0);
			sauceOrderItem.setUser(user);
			order.getOrderItems().add(sauceOrderItem);
		} else {
			sauceOrderItem.setFreeCount(freeSauceCount);
			sauceOrderItem.setCount(sauceOrderItem.getCount() + freeSauceCount);
		}
		
		// Себестоимость
		sauceOrderItem.setNetCost(sauceOrderItem.getCount() * sauceOrderItem.getProduct().getCostPrice());
		order.setNetCost(order.getNetCost() + sauceOrderItem.getFreeCount() * sauceOrderItem.getProduct().getCostPrice());
	}

	public static Order getOrder(Long orderId) {
		// TODO Auto-generated method stub
		return Order.findById(orderId);
	}

	public static PreviewOrderModel previewOrder(Long orderId, String connected) throws ValidationException {
		Order order = Order.findById(orderId);
		if (order == null)
			throw new ValidationException("Order not found");
		
		PreviewOrderModel model = new PreviewOrderModel();
		model.setId(order.getId());
		model.setOrderNumber(order.getOrderNumber());
		
		if (order.getClient() != null) {
			model.setClientName(order.getClient().getName());
			model.setClientPhone(order.getClient().getPhoneNumber());
		}
		
		if (order.getClientAddress() != null) {
			model.setClientAddress(order.getClientAddress().getFullAddress());
		}
		
		model.setComment(order.getComment());
		model.setClientCash(order.getClientCash());
		model.setClientCount(order.getPersonCount());
		
		if (order.getOrderDate() != null) {
			model.setOrderDate(order.getOrderDate().getTime());
			model.setOrderDateLong(order.getOrderDate().getTimeInMillis());
		}
		
		if (order.getDeliveryDate() != null) {
			model.setDeliveryDate(order.getDeliveryDate().getTime());
			model.setDeliveryDateLong(order.getDeliveryDate().getTimeInMillis());
		}
		
		model.setReason(order.getReason());
		model.setSum(order.getOrderSum());
		model.setType(order.getType());
		model.setState(order.getOrderState());
		
		if (order.getPromotion() != null) {
			model.setPromotionName(order.getPromotion().getName());
			model.setPromotionDiscount(order.getPromotion().getDiscount());
		}
		
		model.setItems(new ArrayList<PreviewOrderItemModel>());
		for (OrderItem orderItem : order.getOrderItems()) {
			PreviewOrderItemModel item = new PreviewOrderItemModel();
			item.setCategory(orderItem.getProduct().getCategory().getName());
			item.setCount(orderItem.getCount());
			item.setId(orderItem.getId());
			item.setSum(orderItem.getSum());
			item.setName(orderItem.getProduct().getName());
			item.setType(orderItem.getProduct().getType());
			
			if (order.getType() == OrderType.BAR)
				item.setCost(orderItem.getProduct().getBarCost());
			else 
				item.setCost(orderItem.getProduct().getCost());
			
			model.getItems().add(item);
		}
		
		return model;
	}

	public static PreviewSiteOrderModel previewSiteOrder(Long orderId, String connected) throws ValidationException {
		SiteOrder order = SiteOrder.findById(orderId);
		if (order == null)
			throw new ValidationException("SiteOrder not found");
		
		PreviewSiteOrderModel model = new PreviewSiteOrderModel();
		model.setId(order.getId());
		
		model.setStatus(order.getStatus());
		model.setSiteId(order.getSiteId());
		
		if (order.getDeliveryTime() != null) {
			model.setDeliveryTime(order.getDeliveryTime().getTime());
			model.setDeliveryTimeLong(order.getDeliveryTime().getTimeInMillis());
		}
		
		if (order.getOrderTime() != null) {
			model.setOrderTime(order.getOrderTime().getTime());
			model.setOrderTimeLong(order.getOrderTime().getTimeInMillis());
		}
		
		model.setOrderSum(order.getOrderSum());
		model.setOrderType(order.getOrderType());
		model.setPayMethod(order.getPayMethod());
		model.setPersonCash(order.getPersonCash());
		model.setPersonCount(order.getPersonCount());
		model.setPersonEmail(order.getPersonEmail());
		model.setPersonName(order.getPersonName());
		model.setPersonPhone(order.getPersonPhone());
		model.setPersonRemark(order.getPersonRemark());
		
		model.setAddressBuilding(order.getAddressBuilding());
		model.setAddressCityName(order.getAddressCityName());
		model.setAddressCorpus(order.getAddressCorpus());
		model.setAddressDoorCode(order.getAddressDoorCode());
		model.setAddressFlat(order.getAddressFlat());
		model.setAddressFloor(order.getAddressFloor());
		model.setAddressHouse(order.getAddressHouse());
		model.setAddressOffice(order.getAddressOffice());
		model.setAddressPorch(order.getAddressPorch());
		model.setAddressRoom(order.getAddressRoom());
		model.setAddressStreetName(order.getAddressStreetName());
		model.setAddress(order.getFullAddress());

		model.setGeoLatitude(order.getGeoLatitude());
		model.setGeoLongitude(order.getGeoLongitude());
		
		model.setReason(order.getReason());
		
		model.setItems(new ArrayList<PreviewSiteOrderItemModel>());
		for (SiteOrderItem orderItem : order.getOrderItems()) {
			PreviewSiteOrderItemModel item = new PreviewSiteOrderItemModel();
			
			Product product = ProductService.getProductByCode(orderItem.getProductCode());
			if (product == null)
				throw new ValidationException("Product by code not found, Code: " + orderItem.getProductCode());
			
			item.setCategory(product.getCategory().getName());
			item.setProductId(product.getId());
			item.setCode(product.getCode());
			item.setCost(product.getCost());
			item.setCount(orderItem.getCount());
			item.setName(product.getName());
			item.setSiteId(orderItem.getSiteId());
			item.setSum(orderItem.getSum());
			item.setType(product.getType());
			
			model.getItems().add(item);
		}
		
		return model;
	}
	
}
