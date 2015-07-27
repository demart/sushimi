package kz.sushimi.console.models.reports;

public class ProductPeriodModel {

	public String name;
	
	public long amount;
	
	public long netCost;

	public long freeCount;
	
	public long freeNetCost;
	
	public long getFreeCount() {
		return freeCount;
	}

	public void setFreeCount(long freeCount) {
		this.freeCount = freeCount;
	}

	public long getFreeNetCost() {
		return freeNetCost;
	}

	public void setFreeNetCost(long freeNetCost) {
		this.freeNetCost = freeNetCost;
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

	public long getNetCost() {
		return netCost;
	}

	public void setNetCost(long netCost) {
		this.netCost = netCost;
	}
	
	
	
}
