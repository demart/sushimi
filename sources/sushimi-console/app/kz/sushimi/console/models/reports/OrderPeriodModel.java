package kz.sushimi.console.models.reports;

public class OrderPeriodModel {

	public String name;
	public long amount;
	public long revenue;
	public long deliveryCost;
	public long deliveryExtraCost;
	public long netCost;
	public long income;
	public float percent;
	
	public float getPercent() {
		return percent;
	}
	public void setPercent(float percent) {
		this.percent = percent;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public long getAmount() {
		return amount;
	}
	public void setAmount(long amount) {
		this.amount = amount;
	}
	public long getRevenue() {
		return revenue;
	}
	public void setRevenue(long revenue) {
		this.revenue = revenue;
	}
	public long getDeliveryCost() {
		return deliveryCost;
	}
	public void setDeliveryCost(long deliveryCost) {
		this.deliveryCost = deliveryCost;
	}
	public long getNetCost() {
		return netCost;
	}
	public void setNetCost(long netCost) {
		this.netCost = netCost;
	}
	public long getIncome() {
		return income;
	}
	public void setIncome(long income) {
		this.income = income;
	}
	public long getDeliveryExtraCost() {
		return deliveryExtraCost;
	}
	public void setDeliveryExtraCost(long deliveryExtraCost) {
		this.deliveryExtraCost = deliveryExtraCost;
	}
}
