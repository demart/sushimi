package kz.sushimi.console.services;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import kz.sushimi.console.models.reports.IngredientPeriodModel;
import kz.sushimi.console.models.reports.OrderPeriodModel;
import kz.sushimi.console.models.reports.ProductPeriodModel;
import kz.sushimi.console.persistence.orders.OrderState;
import kz.sushimi.console.persistence.orders.OrderType;
import play.db.jpa.JPA;

public class ReportService {

	public static List<OrderPeriodModel> getOrderPeriodReport(Calendar from, Calendar to) {
		List<OrderPeriodModel> models = new ArrayList<OrderPeriodModel>();
		
		List<OrderType> orderTypes = new ArrayList<OrderType>();
		
		orderTypes.add(OrderType.DELIVERY);
		orderTypes.add(OrderType.DELIVERY_IN_TIME);
		orderTypes.add(OrderType.SELF_SERVICE);
		OrderPeriodModel totalDeliveryModel = getOrderPeriodReportTotalDelivery("Все доставки", orderTypes ,from, to);		
		
		orderTypes.clear();
		orderTypes.add(OrderType.DELIVERY);
		OrderPeriodModel deliveryModel = getOrderPeriodReportTotalDelivery("Доставки", orderTypes, from, to);
		
		orderTypes.clear();
		orderTypes.add(OrderType.DELIVERY_IN_TIME);
		OrderPeriodModel deliveryInTimeModel = getOrderPeriodReportTotalDelivery("Доставка ко времени", orderTypes, from, to);
		
		orderTypes.clear();
		orderTypes.add(OrderType.SELF_SERVICE);
		OrderPeriodModel selfServiceModel = getOrderPeriodReportTotalDelivery("Самовывоз", orderTypes, from, to);
		
		orderTypes.clear();
		orderTypes.add(OrderType.BAR);
		OrderPeriodModel barModel = getOrderPeriodReportTotalDelivery("Заказы на бар", orderTypes, from, to);
		
		orderTypes.clear();
		orderTypes.add(OrderType.DELIVERY);
		orderTypes.add(OrderType.DELIVERY_IN_TIME);
		orderTypes.add(OrderType.SELF_SERVICE);
		orderTypes.add(OrderType.BAR);
		OrderPeriodModel allOrdersModel = getOrderPeriodReportTotalDelivery("Всего", orderTypes, from, to);
		
		
		models.add(totalDeliveryModel);
		models.add(deliveryModel);
		models.add(deliveryInTimeModel);
		models.add(selfServiceModel);
		models.add(barModel);
		models.add(allOrdersModel);
		return models;
	}

	private static OrderPeriodModel getOrderPeriodReportTotalDelivery(String text, List<OrderType> orderTypes, Calendar from, Calendar to) {
		OrderPeriodModel deliveryModel = new OrderPeriodModel();
		deliveryModel.setName(text);

		List<OrderState> orderStates = new ArrayList<OrderState>();
		orderStates.add(OrderState.NONE);
		orderStates.add(OrderState.REGISTERED);
		orderStates.add(OrderState.IN_PROGRESS);
		orderStates.add(OrderState.ON_DELIVERY);
		orderStates.add(OrderState.CANCELED);
		orderStates.add(OrderState.RETURNED);
		
		long deliveryAmount = (long)JPA.em().createQuery("select count(id) from Order where orderDate between :from and :to and orderState not in (:states) and type in (:types)")
			.setParameter("states", orderStates).setParameter("types", orderTypes).setParameter("from", from).setParameter("to", to).getResultList().get(0);
		deliveryModel.setAmount(deliveryAmount);
		
		System.out.println(text);
		List deliveryRevenueList = JPA.em().createQuery("select sum(orderSum) from Order where orderDate between :from and :to and orderState not in (:states) and type in (:types)")
				.setParameter("states", orderStates).setParameter("types", orderTypes).setParameter("from", from).setParameter("to", to).getResultList();
		if ((Long)deliveryRevenueList.get(0) != null)
			deliveryModel.setRevenue((Long)deliveryRevenueList.get(0));
		
		List deliveryCostList = JPA.em().createQuery("select sum(deliveryCost) from Order where orderDate between :from and :to and orderState not in (:states) and type in (:types)")
				.setParameter("states", orderStates).setParameter("types", orderTypes).setParameter("from", from).setParameter("to", to).getResultList();
		if ((Long)deliveryCostList.get(0) != null)
			deliveryModel.setDeliveryCost((Long)deliveryCostList.get(0));	
		
		List deliveryExtraCostList = JPA.em().createQuery("select sum(deliveryExtraCost) from Order where orderDate between :from and :to and orderState not in (:states) and type in (:types)")
				.setParameter("states", orderStates).setParameter("types", orderTypes).setParameter("from", from).setParameter("to", to).getResultList();
		if ((Long)deliveryCostList.get(0) != null)
			deliveryModel.setDeliveryExtraCost((Long)deliveryExtraCostList.get(0));
		
		deliveryModel.setDeliveryCost(deliveryModel.getDeliveryCost() + deliveryModel.getDeliveryExtraCost());
		
		List  netCostList = JPA.em().createQuery("select sum(netCost) from Order where orderDate between :from and :to and orderState not in (:states) and type in (:types)")
				.setParameter("states", orderStates).setParameter("types", orderTypes).setParameter("from", from).setParameter("to", to).getResultList();
		if ((Long)netCostList.get(0) != null)
			deliveryModel.setNetCost((Long)netCostList.get(0));		
		
		deliveryModel.setIncome(deliveryModel.getRevenue() - deliveryModel.getNetCost() - deliveryModel.getDeliveryCost());
		if (deliveryModel.getRevenue() != 0)
			deliveryModel.setPercent(deliveryModel.getIncome() * 100 / deliveryModel.getRevenue());
		
		return deliveryModel; 
	}
		
	
	public static List<ProductPeriodModel> getProductPeriodReport(Calendar from, Calendar to) {
		List<ProductPeriodModel> models = new ArrayList<ProductPeriodModel>();
		
		List result = JPA.em().createNativeQuery(
				"select p.name, sum(oi.count) as count, sum(oi.net_cost) as net_cost, sum(oi.freecount) as free, sum(oi.net_cost) / sum(oi.count) * sum(oi.freecount) as free_net_cost  from orders_items oi " +
				"left join orders o on o.id = oi.order_id " +
				"left join dic_products p on p.id = oi.product_id " +
				"where oi.created_date between :from and :to " +
				"and o.orderstate not in ('CANCELED') " +
				"group by oi.product_id, p.id, p.name " +
				"order by p.name asc,  sum(oi.count) desc")
				.setParameter("from", from)
				.setParameter("to", to) 
				.getResultList();
		
		for (Object object : result) {
			if (object == null)
				continue;
			if (object instanceof Object[]) {
				Object[] rowObj = (Object[])object;
				
				ProductPeriodModel model = new ProductPeriodModel();
				if (rowObj[0] != null)
					model.setName((String)rowObj[0]);
				if (rowObj[1] != null)
					model.setAmount(((BigInteger)rowObj[1]).longValue());
				if (rowObj[2] != null)
					model.setNetCost(((BigInteger)rowObj[2]).longValue());
				if (rowObj[3] != null)
				model.setFreeCount(((BigInteger)rowObj[3]).longValue());
				if (rowObj[4] != null)
					model.setFreeNetCost(((BigInteger)rowObj[4]).longValue());
				models.add(model);
			} 
		}
		
		return models;
	}
	
	public static List<IngredientPeriodModel> getIngredientPeriodReport(Calendar from, Calendar to) {
		List<IngredientPeriodModel> models = new ArrayList<IngredientPeriodModel>();
		
		List result = JPA.em().createNativeQuery(
				"select ing.name as name, unit.name as unitname, sum(out.amount) as amount from warehouse_outcomes out " +  
						"left join dic_units  unit on unit.id = out.unit_id " +
						"left join dic_ingredients ing on ing.id = out.ingredient_id " +
				"where out.created_Date between :from and :to " +
				"group by ing.name, unit.name " +
				"order by ing.name ")
				.setParameter("from", from)
				.setParameter("to", to) 
				.getResultList();
		
		for (Object object : result) {
			if (object == null)
				continue;
			if (object instanceof Object[]) {
				Object[] rowObj = (Object[])object;
				
				IngredientPeriodModel model = new IngredientPeriodModel();
				if (rowObj[0] != null)
					model.setName((String)rowObj[0]);
				if (rowObj[1] != null)
					model.setUnit((String)rowObj[1]);
				if (rowObj[2] != null)
					model.setAmount((float)rowObj[2]);
				models.add(model);
			} 
		}
		
		return models;
	}	
}



