package kz.sushimi.models.integration.order;

public class SushimiWebOrderClientModel {

	/**
	 * Имя клиента
	 */
	public String name;
	
	/**
	 * Телефон клиента
	 */
	public String phone;
	
	/**
	 * Почтовый ящик клиента (тут скорее всего будет информация только если пришло с сайта, ну или если в будущем будет CRM
	 * , хотя я сильно сомневаюсь)
	 */
	public String email;
	
}
