package kz.sushimi.console.models.orders;

import java.util.List;

/**
 * Модель главной ноды дерева
 * 
 * @author Demart
 *
 */
public class OrderTreeRootModel {

	private String text = ".";
	
	private List<OrderTreeModel> children;

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	public List<OrderTreeModel> getChildren() {
		return children;
	}

	public void setChildren(List<OrderTreeModel> children) {
		this.children = children;
	}
	
}
