package kz.sushimi.console.persistence.orders;

import java.util.Calendar;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import kz.sushimi.console.persistence.PersistentObject;
import kz.sushimi.console.persistence.users.User;
import play.db.jpa.Model;

/**
 * История изменения заказа
 * 
 * @author Demart
 *
 */
@Entity
@Table(name = "orders_history")
public class OrderHistory extends PersistentObject {

	/**
	 * Статус заказа
	 */
	@Enumerated(EnumType.STRING)
	@Column
	private OrderState orderState;
	
	/**
	 * Дата изменения заказа
	 */
	@Column
	private Calendar date;
	
}
