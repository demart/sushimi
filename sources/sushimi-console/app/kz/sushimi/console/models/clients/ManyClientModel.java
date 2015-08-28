package kz.sushimi.console.models.clients;

/**
 * Клиенты на объединение
 * 
 * @author Wepli
 *
 */
public class ManyClientModel {

	private Long clientId;
	
	private Boolean mainClient;
	
	private Integer orderSum;

	public Long getClientId() {
		return clientId;
	}
	
	public void setClientId(Long clientId) {
		this.clientId = clientId;
	}


	public Boolean getMainClient() {
		return mainClient;
	}

	public void setMainClient(Boolean mainClient) {
		this.mainClient = mainClient;
	}
	
	public Integer getOrderSum() {
		return orderSum;
	}
	
	public void setOrderSum(Integer orderSum) {
		this.orderSum = orderSum;
	}
	
}
