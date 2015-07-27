package kz.sushimi.console.models.orders;

/**
 * Позиции товаров в заказе
 * 
 * @author Demart
 *
 */
public class CreateOrderItemModel {

	private Long productId;
	
	private Integer count;

	public Long getProductId() {
		return productId;
	}

	public void setProductId(Long productId) {
		this.productId = productId;
	}

	public Integer getCount() {
		return count;
	}

	public void setCount(Integer count) {
		this.count = count;
	}
	
}
