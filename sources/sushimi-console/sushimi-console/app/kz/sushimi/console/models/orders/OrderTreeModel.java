package kz.sushimi.console.models.orders;

import java.util.List;

import kz.sushimi.console.persistence.orders.OrderState;
import kz.sushimi.console.persistence.orders.site.SiteOrderStatus;


/**
 * Модель дерева заказов
 * 
 * @author Demart
 *
 */
public class OrderTreeModel {

	private Long id;
	
	private String name;
	
	private Long count;
	
	private OrderState state;
	
	private SiteOrderStatus status;
		
	private String iconCls;
	
	private boolean leaf;	
	
	private boolean expanded;
	
	private List<OrderTreeModel> children;

	
	public OrderTreeModel(Long id, String name, Long count, String iconCls, OrderState state, boolean leaf, boolean expanded) {
		this.id = id;
		this.name = name;
		this.count = count;
		this.state = state;
		this.iconCls = iconCls;
		this.leaf = leaf;
		this.expanded = expanded;
	}
	
	public OrderTreeModel(Long id, String name, Long count, String iconCls, SiteOrderStatus status, boolean leaf, boolean expanded) {
		this.id = id;
		this.name = name;
		this.count = count;
		this.status = status;
		this.iconCls = iconCls;
		this.leaf = leaf;
		this.expanded = expanded;
	}	
	
	public SiteOrderStatus getStatus() {
		return status;
	}

	public void setStatus(SiteOrderStatus status) {
		this.status = status;
	}

	public OrderState getState() {
		return state;
	}

	public void setState(OrderState state) {
		this.state = state;
	}

	public boolean isExpanded() {
		return expanded;
	}

	public void setExpanded(boolean expanded) {
		this.expanded = expanded;
	}

	public String getIconCls() {
		return iconCls;
	}

	public void setIconCls(String iconCls) {
		this.iconCls = iconCls;
	}

	public boolean isLeaf() {
		return leaf;
	}

	public void setLeaf(boolean leaf) {
		this.leaf = leaf;
	}

	public Long getCount() {
		return count;
	}

	public void setCount(Long count) {
		this.count = count;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public List<OrderTreeModel> getChildren() {
		return children;
	}

	public void setChildren(List<OrderTreeModel> children) {
		this.children = children;
	}
	
	
	
}
