package kz.sushimi.models.integration.order;

import java.util.Calendar;
import java.util.List;

import kz.sushimi.persistence.orders.DeliveryType;
import kz.sushimi.persistence.orders.OrderProcess;
import kz.sushimi.persistence.orders.OrderSource;
import kz.sushimi.persistence.orders.PayMethod;
import kz.sushimi.persistence.orders.PromotionValueType;

/**
 * Модель для синхронизации заказа из консоли на сайт
 * 
 * @author artem.demidovich
 *
 */
public class SushimiWebOrderModel {

	/**
	 * ID заказа тут будут либо новые из консоли либо те которые уже есть на сайте.
	 */
	public String orderNumber;
	
	/**
	 * Источник заказа: Канал поступления заказа
	 */
	public OrderSource source;
	
	/**
	 * Скидка за использование канала
	 */
	public Integer sourceDiscount;
	
	/**
	 * Тип заказа
	 */
	public DeliveryType type;
	
	/**
	 * Статус заказа
	 */
	public OrderProcess orderState;
	
	/**
	 * Дата формирования заказа (Например с сайта будет раньше чем создание)
	 */
	public Calendar orderDate;
	
	/**
	 * Дата когда нужно доставить заказ
	 */	
	public Calendar deliveryDate;

	/**
	 * Информация о клиенте (Только если это не клинеты бара)
	 */
	public SushimiWebOrderClientModel client;
	
	/**
	 * Информация об адресе доставки клиенту (Только для заказов на доставку)
	 */
	public SushimiWebOrderClientAddressModel clientAddress;

	/**
	 * Индивидуальная скидка клиента в этом заказе
	 */
	public Integer clientDiscount;	
	
	/**
	 * Кол-во человек в заказе
	 */
	public Integer clientCount;
	
	/**
	 * С какой суммы дать сдачу
	 */
	public Integer clientCash;
	
	/**
	 * Комментарий клиента
	 */
	public String clientComment;
	
	
	/**
	 *  Название акции которой возпользовались при заказе
	 */
	public String promotionName;
	
	/**
	 * Процент скидки в этом заказе
	 */
	public Integer promotionDiscount;
	
	/**
	 * Тип акции (подарок, скидка и т.д.)
	 */
	public PromotionValueType promotionValueType;
	
	/**
	 * Код продукта в акции
	 */
	public String promotionProductCode;
	
	
	
	/**
	 * Дополнительная цена доставки
	 */
	public Integer deliveryExtraPrice;
	
	
	/**
	 * Позиции в заказе
	 */
	public List<SushimiWebOrderItemModel> items;
	
	/**
	 * Сумма заказа
	 */
	public Integer orderSum;
	
	/**
	 * Способ оплаты заказа
	 */
	public PayMethod payMethod;
	
	/**
	 * Причина отмены заказа, возможно показывать пользователю не нужно, а вот нам на сайте может и интересно посмотреть.
	 */
	public String reason;
	
	/**
	 * Код города, куда поступил заказ
	 */
	public String cityCode;
	
	/**
	 * Отделение суши доставки(ресторана) откуда поступил заказ
	 */
	public String branchCode;
	
	/**
	 * Оператор принявший заказ
	 */
	public String operatorCode;
	
	/**
	 * Повар принявший заказ на кухне
	 */
	public String cookCode;
	
	/**
	 * Курьер доставляющих заказ
	 */
	public String courierCode;
	
}
