package kz.sushimi.console.models.clients;

/**
 * адреса на объединение
 * 
 * @author Wepli
 *
 */

public class ManyClientAddressModel {
	private Long addressId;
	
	private Boolean mainAddress;
	
	
	public Long getAddressId() {
		return addressId;
	}
	
	public void setAddressId(Long addressId) {
		this.addressId = addressId;
	}


	public Boolean getMainAddress() {
		return mainAddress;
	}

	public void setMainAddress(Boolean mainAddress) {
		this.mainAddress = mainAddress;
	}
	

}
