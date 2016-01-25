package kz.sushimi.models;

import kz.sushimi.models.order.CartModel;

public class RegisterOrderModel {

	public String Phone;
	public String FIO;
	public String PersonCount;
	public String Email;
	public String Delivery;
	public String Department;
	public String TimeString;
	public String addresses;
	public String Remark;
	public String PayMethod;
	public String Cash;
	public boolean AllowTerms;
	
	public RegisterOrderAddressModel Address;
	public CartModel LastCart;

}
