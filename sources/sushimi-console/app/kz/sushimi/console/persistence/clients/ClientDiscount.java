package kz.sushimi.console.persistence.clients;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import kz.sushimi.console.persistence.PersistentObject;

/**
 * Таблица скидок для клиентов
 * 
 * @author Demart
 *
 */
@Entity
@Table(name = "client_discount")
public class ClientDiscount extends PersistentObject {

	/**
	 * Наименование дисконта
	 */
	@Column
	private String name;
	
	/**
	 * Процент скидки
	 */
	@Column
	private Integer percent;
	
	/**
	 * Действует начианая от суммы
	 */
	@Column(name="from_sum")
	private int fromSum;

	/**
	 * Заканчивая суммой
	 */
	@Column(name="to_sum")
	private int toSum;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Integer getPercent() {
		return percent;
	}

	public void setPercent(Integer percent) {
		this.percent = percent;
	}

	public int getFromSum() {
		return fromSum;
	}

	public void setFromSum(int fromSum) {
		this.fromSum = fromSum;
	}

	public int getToSum() {
		return toSum;
	}

	public void setToSum(int toSum) {
		this.toSum = toSum;
	} 
	
}
