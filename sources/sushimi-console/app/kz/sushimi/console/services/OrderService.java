package kz.sushimi.console.services;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import javax.persistence.Query;

import kz.sushimi.console.exceptions.ValidationException;
import kz.sushimi.console.models.orders.CancelOrderModel;
import kz.sushimi.console.models.orders.CreateOrderItemModel;
import kz.sushimi.console.models.orders.CreateOrderModel;
import kz.sushimi.console.models.orders.PreviewOrderItemModel;
import kz.sushimi.console.models.orders.PreviewOrderModel;
import kz.sushimi.console.persistence.clients.Client;
import kz.sushimi.console.persistence.clients.ClientAddress;
import kz.sushimi.console.persistence.clients.ClientDiscount;
import kz.sushimi.console.persistence.dictionaries.DeliveryPrice;
import kz.sushimi.console.persistence.dictionaries.Product;
import kz.sushimi.console.persistence.dictionaries.ProductCosting;
import kz.sushimi.console.persistence.dictionaries.ProductType;
import kz.sushimi.console.persistence.orders.Order;
import kz.sushimi.console.persistence.orders.OrderHistory;
import kz.sushimi.console.persistence.orders.OrderItem;
import kz.sushimi.console.persistence.orders.OrderSource;
import kz.sushimi.console.persistence.orders.OrderState;
import kz.sushimi.console.persistence.orders.OrderType;
import kz.sushimi.console.persistence.orders.PayMethod;
import kz.sushimi.console.persistence.orders.site.SiteOrder;
import kz.sushimi.console.persistence.orders.site.SiteOrderStatus;
import kz.sushimi.console.persistence.promotions.Promotion;
import kz.sushimi.console.persistence.promotions.PromotionValueType;
import kz.sushimi.console.persistence.users.User;
import kz.sushimi.console.persistence.warehouses.WarehouseOutcome;
import kz.sushimi.console.persistence.warehouses.WarehouseOutcomeType;
import kz.sushimi.console.services.dictionaries.DeliveryPriceService;
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

	public static Order getOrderByNumber(String orderNumber) {
		List<Order> orders = JPA.em().createQuery("from Order where orderNumber = :orderNumber")
				.setParameter("orderNumber", orderNumber)
				.getResultList();
		if (orders.size() > 0)
			return orders.get(0);
		return null;
	}
	
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
		
		// Add history record
		User user = UserService.getUserByLogin(connected);
		addOrderHistoryRecord(order, user);
		
	}


	public static void sendToWorkOrder(Long orderId, String connected) throws ValidationException {
		if (orderId == null || orderId < 1)
			throw new ValidationException("OrderId is null");
		
		Order order = Order.findById(orderId);
		if (order == null)
			throw new ValidationException("Order not found");
		
		order.setOrderState(OrderState.IN_PROGRESS);
		// TODO Вставить время
		
		// Add history record
		User user = UserService.getUserByLogin(connected);
		addOrderHistoryRecord(order, user);
		
		order.save();
	}	

	public static void sendToWaitingForDeliveryOrder(Long orderId, String connected) throws ValidationException {
		if (orderId == null || orderId < 1)
			throw new ValidationException("OrderId is null");
		Order order = Order.findById(orderId);
		if (order == null)
			throw new ValidationException("Order not found");
		order.setOrderState(OrderState.WAITING_FOR_DELIVERY);
		// TODO Вставить время
		// Add history record
		User user = UserService.getUserByLogin(connected);
		addOrderHistoryRecord(order, user);
		order.save();
	}		
	
	public static void sendToDeliveryOrder(Long orderId, String connected) throws ValidationException {
		if (orderId == null || orderId < 1)
			throw new ValidationException("OrderId is null");
		
		Order order = Order.findById(orderId);
		if (order == null)
			throw new ValidationException("Order not found");
		
		order.setOrderState(OrderState.ON_DELIVERY);
		
		// Add history record
		User user = UserService.getUserByLogin(connected);
		addOrderHistoryRecord(order, user);
		
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
		
		// Вставить добавление к общей ссумме заказа клинета
		Client client = order.getClient();
		if (client != null) {
			Integer totalOrderSum = client.getTotalOrderSum();
			if (totalOrderSum == null)
				totalOrderSum = 0;
			totalOrderSum = totalOrderSum + order.getOrderSum();
			client.setTotalOrderSum(totalOrderSum);
			client.save();
		}
		
		// Add history record
		User user = UserService.getUserByLogin(connected);
		addOrderHistoryRecord(order, user);
		
		order.save();
	}

	
	public static Integer BASIC_DELIVERY_COST = 700;
	
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
		
		// TODO добравить при оформлении заказа + брать то что выбрал человек на сайте
		order.setPayMethod(PayMethod.CASH);
		
		// TODO если заказ с сайта то нужно брать из модели
		order.setOrderDate(Calendar.getInstance());
		
		OrderSource source = OrderSource.CALL_CENTER;
		Integer sourceDiscount = 0;
		
		if (model.getSiteId() != null && model.getSiteId() > 0) {
			SiteOrder siteOrder = SiteOrder.findById(model.getSiteId());
			order.setSiteOrder(siteOrder);
			// Устанавлием значение для синхронизации
			order.setSiteOrderNumber(siteOrder.getOrderNumber());
			
			if (model.getOrderTime() != null)
				order.getOrderDate().setTime(model.getOrderTime());
			if (siteOrder.getSource() != null)
				source = OrderSource.valueOf(siteOrder.getSource().toString());
			sourceDiscount = siteOrder.getSourceDiscount();
		}
		
		if (sourceDiscount == null) 
			sourceDiscount = 0;
		order.setSource(source);
		order.setSourceDiscount(sourceDiscount);
		
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
			
			order.setDeliveryCost(BASIC_DELIVERY_COST);
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
			
			order.setDeliveryCost(BASIC_DELIVERY_COST);
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
		
		// =============================
		// Индивидуальная скидка клиента
		// =============================
		ClientDiscount ncd = ClientDiscountService.getNextDiscount(client.getTotalOrderSum());
		if (ncd != null) { 
			order.setClientDiscountNextPercent(ncd.getPercent());
			order.setClientDiscountNextSum(ncd.getFromSum());
		} else {
			order.setClientDiscountNextPercent(null);
			order.setClientDiscountNextSum(null);
		}
		
		ClientDiscount cd = ClientDiscountService.getCurrentDiscount(client.getTotalOrderSum());
		Integer clientDiscountPercent = 0;
		if (cd != null) {
			clientDiscountPercent = cd.getPercent();
			if (clientDiscountPercent == null)
				clientDiscountPercent = 0;
			order.setClientDiscountCurrentPercent(cd.getPercent());
		} else {
			order.setClientDiscountCurrentPercent(0);
		}
		order.setClientDiscountTotalOrderSum(client.getTotalOrderSum());
		
		
		// Дисконт при самовывозе
		if (order.getType() == OrderType.SELF_SERVICE) {
			if (order.getPromotion() != null) {
				if (order.getPromotion().getValueType() == PromotionValueType.DISCOUNT_ALL || 
					order.getPromotion().getValueType() == PromotionValueType.DPA) {
					float discount = order.getPromotion().getDiscount();
					sumWithoutSushi = (int)Math.round(sumWithoutSushi * (1-((discount+10+clientDiscountPercent+sourceDiscount) * 0.01)));
				} else {
					System.out.println("SEFL + PROMO GOODS + clientDiscountPercent:" + clientDiscountPercent);
					System.out.println("Sum w/o before:" + sumWithoutSushi);
					sumWithoutSushi = (int)Math.round(sumWithoutSushi * (1-((10+clientDiscountPercent+sourceDiscount) * 0.01)));
					System.out.println("Sum w/o after:" + sumWithoutSushi);
				}
			} else {
				System.out.println("SEFL + NO PROMO");
				System.out.println("ClientDiscount: " + clientDiscountPercent);
				System.out.println("sumWithoutSushi before: " + sumWithoutSushi);
				
				sumWithoutSushi = (int)Math.round(sumWithoutSushi * (1-(10+clientDiscountPercent+sourceDiscount) * 0.01));
				
				System.out.println("sumWithoutSushi after: " + sumWithoutSushi);
			}
		} else {
			if (order.getPromotion() != null) {
				if (order.getPromotion().getValueType() == PromotionValueType.DISCOUNT_ALL || 
				order.getPromotion().getValueType() == PromotionValueType.DPA) {
					float discount = order.getPromotion().getDiscount();
					sumWithoutSushi = (int)Math.round(sumWithoutSushi * (1-((discount+clientDiscountPercent+sourceDiscount) * 0.01)));
				} else {
					sumWithoutSushi = (int)Math.round(sumWithoutSushi * (1-((clientDiscountPercent+sourceDiscount) * 0.01)));
				}
			} else {
				System.out.println("sumWithoutSushi: " + sumWithoutSushi);
				System.out.println("clientDiscountPercent: " + clientDiscountPercent);
				System.out.println("sourceDiscount: " + sourceDiscount);
				sumWithoutSushi = (int)Math.round(sumWithoutSushi * (1-((clientDiscountPercent + sourceDiscount) * 0.01)));
			}
		}
		
		// Если есть акции на суши
		if (orderSushiSum > 0) {
			if (order.getPromotion() != null) {
				if (order.getPromotion().getValueType() == PromotionValueType.DISCOUNT_ALL || 
					order.getPromotion().getValueType() == PromotionValueType.DPA || 
					order.getPromotion().getValueType() == PromotionValueType.DISCOUNT ||
					order.getPromotion().getValueType() == PromotionValueType.DP) {
					float discount = order.getPromotion().getDiscount();
					if (order.getType() == OrderType.SELF_SERVICE) {
						orderSushiSum = (int)Math.round(orderSushiSum * (1-((discount+10+clientDiscountPercent+sourceDiscount) * 0.01)));
					} else {
						orderSushiSum = (int)Math.round(orderSushiSum * (1-((discount+clientDiscountPercent+sourceDiscount) * 0.01)));
					}
				} else {
					System.out.println("SEFL + PROMO GOODS + clientDiscountPercent:" + clientDiscountPercent);
					System.out.println("Sum with before:" + orderSushiSum);
					if (order.getType() == OrderType.SELF_SERVICE) {
						orderSushiSum = (int)Math.round(orderSushiSum * (1-((10+clientDiscountPercent+sourceDiscount) * 0.01)));
					} else {
						orderSushiSum = (int)Math.round(orderSushiSum * (1-((clientDiscountPercent+sourceDiscount) * 0.01)));
					}
					System.out.println("Sum with before:" + orderSushiSum);
				}
			} else {
				if (order.getType() == OrderType.SELF_SERVICE) {
					orderSushiSum = (int)Math.round(orderSushiSum * (1-((10+clientDiscountPercent + sourceDiscount) * 0.01)));
				} else {
					orderSushiSum = (int)Math.round(orderSushiSum * (1-((clientDiscountPercent + sourceDiscount) * 0.01)));
				}
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
					outcome.setAmount((float)costing.getAmount()*item.getCount());
					outcome.setWarehouseItem(costing.getWarehouseItem());
					outcome.setOutcomeDate(Calendar.getInstance());
					outcome.setOutcomeReason("На продукцию");
					outcome.setType(WarehouseOutcomeType.OUTCOME);
					outcome.setUser(user);
					outcome.setIngredient(costing.getWarehouseItem().getIngredient());
					outcome.setUnit(costing.getWarehouseItem().getIngredient().getUnit());
					item.getWarehouseOutcomes().add(outcome);
					costing.getWarehouseItem().setAmount(costing.getWarehouseItem().getAmount() - costing.getAmount()*item.getCount());
				} 
		}
		
		// Добавляем стоимость доставки если нужно куда-то вести в отдаленное место
		if (model.getDeliveryPriceId() != null) {
			// Load price
			DeliveryPrice dp = DeliveryPriceService.getDeliveryPriceById(model.getDeliveryPriceId());
			if (dp != null) {
				order.setDeliveryPrice(dp);
				order.setDeliveryExtraCost(dp.getPrice());
				order.setOrderSum(order.getOrderSum() + dp.getPrice());
			}
		}
		
		// Отнять расходы на доставку по умолчанию если заказ меньше 2500 тысяч
		if (order.getType() == OrderType.DELIVERY || order.getType() == OrderType.DELIVERY_IN_TIME) {
			if (order.getDeliveryExtraCost() > 0) {
				if (order.getOrderSum() - order.getDeliveryExtraCost() < 2500)
					order.setDeliveryCost(0);
			}
		}
		
		order.save();
		
		// Следующей номер заказа
		//Query q = JPA.em().createNativeQuery("select nextval('order_sequence')");
		//order.setOrderNumber(((BigInteger)q.getSingleResult()).longValue());
		if (order.getSiteOrder() != null) {
			order.setOrderNumber(order.getSiteOrderNumber());
		} else {
			order.setOrderNumber(generateOrderNumber());
		}
		order.save();
		
		if (order.getSiteOrder() != null) {
			SiteOrder siteOrder = order.getSiteOrder();
			siteOrder.setStatus(SiteOrderStatus.REGISTERED);
			siteOrder.save();
		}
		
		// Add phone to sync queue
		if (order.getClient() != null)
			ClientService.addClientPhoneToSyncQueue(order.getClient().getPhoneNumber(), order.getClient().getName());
		
		// Add record to history of current order
		addOrderHistoryRecord(order, user);
		
		return order;
	}
	
	/**
	 * Метод добавляет запись в историю изменения заказа.
	 * @param order Заказ
	 * @param user Пользователь совершивших действие
	 */
	private static void addOrderHistoryRecord(Order order, User user) {
		Calendar ohCT = Calendar.getInstance();
		OrderHistory orderHistory = new OrderHistory();
		orderHistory.setOrder(order);
		orderHistory.setDate(ohCT);
		orderHistory.setIsSynchronized(false);
		orderHistory.setOrderState(order.getOrderState());
		orderHistory.setUser(user);
		orderHistory.setCreatedDate(ohCT);
		orderHistory.setModifiedDate(ohCT);
		
		// TODO Вставить геопозицию текущего заведения где обрабатывается заказ 
		//orderHistory.setGeoLatitude(geoLatitude);
		//orderHistory.setGeoLongitude(geoLongitude);
		
		orderHistory.save();
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

	public static final String ORDER_NUMBER_PREFIX = "01";
	public static final Integer ORDER_NUMBER_LENGTH = 6;
	
	private static String generateOrderNumber() {
		Query q = JPA.em().createNativeQuery("select nextval('order_sequence')");
		Long orderNumber = ((BigInteger)q.getSingleResult()).longValue();
		String orderNumberString = orderNumber.toString();
		String generatedNumber = ORDER_NUMBER_PREFIX;
		for (int i=0; i < ORDER_NUMBER_LENGTH - orderNumberString.length(); i++)
			generatedNumber += "0";
		generatedNumber += orderNumberString;
		return generatedNumber;
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
		
		model.setSource(order.getSource());
		model.setSourceDiscount(order.getSourceDiscount());
		
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
	
		
		// Дополнительная цена доставки в отдаленные районы
		model.setDeliveryExtraCost(order.getDeliveryExtraCost());
		if (order.getDeliveryPrice() != null) {
			model.setDeliveryPrice(order.getDeliveryCost());
			model.setDevieryPriceName(order.getDeliveryPrice().getName());
		}
		
			return model;
	}
	
	public static List<Order> getNotSychronizedOrdersWithWeb() {
		List<Order> orders = JPA.em().createQuery("from Order where isSynchronized = false order by id")
					.getResultList();
		return orders;
	}
	
	public static List<OrderHistory> getNotSychronizedOrdersHistoryWithWeb() {
		List<OrderHistory> ordersHistory = JPA.em().createQuery("from OrderHistory where isSynchronized = false and order.isSynchronized = true order by id")
				.getResultList();
		return ordersHistory; 
	}

	public static OrderHistory geOrderHistoryBySiteRecordId(Long id) {
		List<OrderHistory> ordersHistory = JPA.em().createQuery("from OrderHistory where siteRecordId = :siteRecordId")
				.setParameter("siteRecordId", id)
				.getResultList();
		if (ordersHistory.size() > 0)
			return ordersHistory.get(0);
		return null; 
	}
	
}
