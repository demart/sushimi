package kz.sushimi.console.persistence.dictionaries;

import javax.persistence.Entity;
import javax.persistence.Table;

import kz.sushimi.console.persistence.PersistentObject;


@Entity
@Table(name = "dic_delivery_price")
public class DeliveryPrice extends PersistentObject {

	private String name;
	private int price;
	
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
