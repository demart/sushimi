package kz.sushimi.console.models.orders;

import kz.sushimi.console.persistence.orders.site.SiteOrderStatus;

/**
 * Модель отмены заказа
 * 
 * @author Demart
 *
 */
public class CancelSiteOrderModel {

	/**
	 * Id заказа
	 */
	private Long siteOrderId;
	
	/**
	 * Тип отказа
	 */
	private SiteOrderStatus state;
	
	/**
	 * Причина отказа
	 */
	private String reason;

	public Long getSiteOrderId() {
		return siteOrderId;
	}

	public void setSiteOrderId(Long siteOrderId) {
		this.siteOrderId = siteOrderId;
	}

	public SiteOrderStatus getState() {
		return state;
	}

	public void setState(SiteOrderStatus state) {
		this.state = state;
	}

	public String getReason() {
		return reason;
	}

	public void setReason(String reason) {
		this.reason = reason;
	}
}
