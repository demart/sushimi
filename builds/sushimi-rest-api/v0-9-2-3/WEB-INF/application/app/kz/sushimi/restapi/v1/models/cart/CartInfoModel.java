package kz.sushimi.restapi.v1.models.cart;

import java.util.ArrayList;
import java.util.List;

import kz.sushimi.restapi.v1.models.ProductModel;


public class CartInfoModel {

	/**
	 * Минимальная сумма бесплатной доставки
	 */
	public Integer freeDeliverySum;	
	
	/**
	 * Сумма раз в которую пологаются бесплатные наборы
	 */
	public Integer freeSauceSum;
	
	public List<ProductModel> freeSushiSauces = new ArrayList<ProductModel>();

	public Integer mobileDiscount;
	
	public String mobileDiscountDescription;
	
	
	public String getMobileDiscountDescription() {
		return mobileDiscountDescription;
	}

	public void setMobileDiscountDescription(String mobileDiscountDescription) {
		this.mobileDiscountDescription = mobileDiscountDescription;
	}

	public Integer getMobileDiscount() {
		return mobileDiscount;
	}

	public void setMobileDiscount(Integer mobileDiscount) {
		this.mobileDiscount = mobileDiscount;
	}

	public Integer getFreeDeliverySum() {
		return freeDeliverySum;
	}

	public void setFreeDeliverySum(Integer freeDeliverySum) {
		this.freeDeliverySum = freeDeliverySum;
	}

	public Integer getFreeSauceSum() {
		return freeSauceSum;
	}

	public void setFreeSauceSum(Integer freeSauceSum) {
		this.freeSauceSum = freeSauceSum;
	}

	public List<ProductModel> getFreeSushiSauces() {
		return freeSushiSauces;
	}

	public void setFreeSushiSauces(List<ProductModel> freeSushiSauces) {
		this.freeSushiSauces = freeSushiSauces;
	}
		
}
