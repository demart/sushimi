package kz.sushimi.console.models.orders;

/**
 * Дополнительная цена за доставка в отдаленный район
 * 
 * @author artem.demidovich
 *
 */
public class DeliveryExtraPriceModel {
	
	public long id;
	public String name;
	public int price;
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public int getPrice() {
		return price;
	}
	public void setPrice(int price) {
		this.price = price;
	}
	
}
