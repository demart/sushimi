package kz.sushimi.console.services;

import java.util.Calendar;

import java.nio.file.Files;
import java.io.File;

import javax.imageio.ImageIO;
import javax.xml.transform.TransformerException;

import org.apache.commons.lang.StringUtils;

import kz.sushimi.console.exceptions.ValidationException;
import kz.sushimi.console.persistence.orders.Order;
import kz.sushimi.console.persistence.orders.OrderItem;
import kz.sushimi.console.persistence.orders.OrderType;

import java.text.SimpleDateFormat;
import java.awt.image.BufferedImage;
import java.io.*;
import java.net.*;



public class PrintService {
	
	
	
	public static void print (Long orderId) throws ValidationException, TransformerException, IOException {
		System.out.println("Print check: " + orderId);
	
		
		
		Order order = Order.findById(orderId);
		SimpleDateFormat sdf = new SimpleDateFormat("dd.MM.yyyy'  'HH:mm:ss");
		
		Socket s = new Socket("192.168.1.87", 9100);
		DataOutputStream printer = new DataOutputStream (s.getOutputStream());
		
		/*
		InputStream fin = new FileInputStream("logo-mini.bmp");
		pipe(fin, printer);
*/
		
		/*
		File fnew=new File("logo-mini.png");
		BufferedImage originalImage=ImageIO.read(fnew);
		ByteArrayOutputStream baos=new ByteArrayOutputStream();
		ImageIO.write(originalImage, "png", baos );
		byte[] imageInByte=baos.toByteArray();
*/
		//инициализация принтера
		printer.write(0x1B);
		printer.write("@".getBytes());
		
		

		/*
		printer.write(SELECT_BIT_IMAGE_MODE);
		printer.write(imageInByte);
		printer.write(0x1B);
		*/
		//печать строки; getBytes ("Cp1251") обязательно! иначе будет абра-кадабра
		printer.write(("Заказ #" + order.getOrderNumber()).getBytes("Cp1251"));
		printer.write(0xA); // пробел
		printer.write(("Клиент: " + order.getClient().getName()).getBytes("Cp1251"));
		printer.write(0xA);
		printer.write(("Номер телефона: " + order.getClient().getPhoneNumber()).getBytes("Cp1251"));
		printer.write(0xA);
		printer.write(("Количество персон: " + order.getPersonCount()).getBytes("Cp1251"));
		printer.write(0xA);
		if (order.getType() == OrderType.DELIVERY) {
			printer.write(("Тип доставки: Доставка").getBytes("Cp1251"));
			printer.write(0xA);
		}
		
		else if (order.getType() == OrderType.DELIVERY_IN_TIME) {
			printer.write(("Тип доставки: Доставка ко времени").getBytes("Cp1251"));
			printer.write(0xA);
		}
		
		else {
			printer.write(("Тип доставки: Самовывоз").getBytes("Cp1251"));
			printer.write(0xA);
		}
		printer.write(("Время заказа: " + sdf.format(order.getCreatedDate().getTime())).getBytes("Cp1251"));
		printer.write(0xA);
		
		printer.write(("Дата доставки: " + sdf.format(order.getDeliveryDate().getTime())).getBytes("Cp1251"));
		printer.write(0xA);
		
		
		if (order.getType() != OrderType.SELF_SERVICE) {
			printer.write(("Адрес доставки: " + order.getClientAddress().getFullAddress()).getBytes("Cp1251"));
			printer.write(0xA);
		}
		
		
		
		if (StringUtils.isNotEmpty(order.getComment())) {
			printer.write(("Комментарий: " + order.getComment()).getBytes("Cp1251"));
			printer.write(0xA);
		}
		printer.write(0xA);
		
		Integer j = 0;
		Integer sumOrder = 0;

		
		for (OrderItem orderItem : order.getOrderItems()) {
			//	PreviewOrderItemModel item = new PreviewOrderItemModel();
				j++;
				if (orderItem.getProduct().getId() != 34301 && orderItem.getProduct().getId() != 34302 && 
					orderItem.getProduct().getId() != 34300 && orderItem.getProduct().getId() != 34303 && 
					orderItem.getProduct().getId() != 34304 && orderItem.getCount() != 0) {
					//printer.write((orderItem.getProduct().getName() + " x" + orderItem.getCount() + "  " + orderItem.getSum()).getBytes("Cp1251"));
					//размещение печати 
					printer.write(0x1B);
					printer.write("a".getBytes());
					printer.write(0); // 0 - лево, 1 - центр, 2 - право
					printer.write((j + " " + orderItem.getProduct().getName()).getBytes("Cp1251"));
					printer.write(0xA);
					printer.write(0x1B);
					printer.write("a".getBytes());
					printer.write(2);
					if (orderItem.getSum() >= 1000)
						printer.write(("   " + orderItem.getCount()+ "x" +
						orderItem.getProduct().getCost() + "................................." + orderItem.getSum()).getBytes("Cp1251"));
					else if (orderItem.getSum() < 1000 && orderItem.getSum() != 0)
						printer.write(("   " + orderItem.getCount()+ "x" + 
						orderItem.getProduct().getCost() + "..................................." + orderItem.getSum()).getBytes("Cp1251"));
					else
						printer.write(("   " + orderItem.getCount()+ "x" + 
						orderItem.getProduct().getCost() + "....................................." + orderItem.getSum()).getBytes("Cp1251"));
					sumOrder = sumOrder + orderItem.getSum();
					printer.write(0xA);
				}
			}
		
		printer.write(0xA);
		
		printer.write(0x1B);
		printer.write("a".getBytes());
		printer.write(0);
		
		printer.write(("Сумма заказа:                              " + sumOrder).getBytes("Cp1251"));
		printer.write(0xA);
		
		if (order.getType() == OrderType.SELF_SERVICE) {
			printer.write(("Скидка при самовывозе:                     " +  "10%").getBytes("Cp1251"));
			printer.write(0xA);
		}
		
	
		if (order.getPromotion() != null) {
			//System.out.println ("Zawel");
			if (order.getPromotion().getDiscount() != 0.0) {
			printer.write(("Скидка по акциям:                          " + order.getPromotion().getDiscount().intValue() + "%").getBytes("Cp1251"));
			printer.write(0xA);
		}
		}
		else {
			
		}
		
		
		if (order.getClientDiscountCurrentPercent() != null) {
			printer.write(("Скидка постоянного клиента:                " + order.getClientDiscountCurrentPercent() + "%").getBytes("Cp1251"));
			printer.write(0xA);
		}
		
		if (order.getSourceDiscount() != null || order.getSourceDiscount() != 0) {
			printer.write(("Дополнительная скидка:                     " + order.getSourceDiscount() + "%").getBytes("Cp1251"));
			printer.write(0xA);
		}
		

		if (order.getType() != OrderType.SELF_SERVICE) {
			printer.write(("Стоимость доставки:                        " + order.getDeliveryExtraCost()).getBytes("Cp1251"));
			printer.write(0xA);
		}
		
		printer.write(("Итоговая сумма:                            " + (order.getOrderSum())).getBytes("Cp1251"));
		printer.write(0xA);
		printer.write(0xA);
		
		printer.write(0x1B);
		printer.write("a".getBytes());
		printer.write(1);
		if (order.getClientCash() != 0)
			printer.write(("Сдача с " + order.getClientCash() + ". Всего: " + 
					(order.getClientCash()-order.getOrderSum())).getBytes("Cp1251"));
			printer.write(0xA);
			
		printer.write(0xA);
		printer.write(("Спасибо за покупку! Приятного аппетита!").getBytes("Cp1251"));
		
		//отступы перед обрезанием
		for (int i=0; i<5; i++)
			printer.write(0xA);
		
		//закрытие принтера
	    printer.write("d".getBytes());
	    printer.write(90);
		
		/* отступ, то есть пробел
		printer.write(0x1B);
		printer.write("3".getBytes());
		*/
	
		
	    //обрезание
	    printer.write(0x1D);
		printer.write("V".getBytes());
		printer.write(48);
		printer.write(0);
		
		printer.flush();
		s.close();
		
	}
	


}
