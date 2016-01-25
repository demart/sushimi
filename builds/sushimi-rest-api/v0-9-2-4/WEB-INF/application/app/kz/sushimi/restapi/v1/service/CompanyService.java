package kz.sushimi.restapi.v1.service;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import play.db.jpa.JPA;
import kz.sushimi.persistence.dictionaries.City;
import kz.sushimi.persistence.dictionaries.DeliveryServicePoint;
import kz.sushimi.restapi.v1.models.CompanyInfoModel;
import kz.sushimi.restapi.v1.models.DeliveryServicePointModel;

public class CompanyService {
	
	public static CompanyInfoModel getCompanyInfo(){
		// TODO Реализовать хранение информации о компании
		CompanyInfoModel model = new CompanyInfoModel();
		model.setId("1");
		model.setImageUrl("http://sushimi.kz/public/company/mobilelogo.png");
		model.setContent("<b>Сушими</b> — компания с яркой, жизнеутверждающей концепцией и брендом.Особенность Сушими — оригинальное, двойное меню — суши и антисуши. В первой половине меню можно выбрать популярные блюда адаптированной японской кухни, во второй — блюда европейской, русской и других кухонь разных стран мира.");
		model.setInstagramUrl("https://instagram.com/sushimi.kz/");
		model.setVkUrl("http://vk.com/club73751458");
		model.setLastModifiedDate(Calendar.getInstance().getTimeInMillis());
		return model;
	}
	
	
	public static List<DeliveryServicePointModel> getDeliveryPoints() {
		List<DeliveryServicePointModel> models = new ArrayList<DeliveryServicePointModel>();
		
		/*
		DeliveryServicePointModel model = new DeliveryServicePointModel();
		model.setAddress("проспект Бухар-Жирау д 45");
		model.setAddressGeoLatitude((float) 51);
		model.setAddressGeoLongitude((float) 51);
		model.setDeliveryArea("от проспекта Бухар Жираю до Аэропорта");
		model.setDeliveryAreaImageUrl("http://sushimi.kz/public/image/delivery_area_astana.png");
		model.setDeliveryAreaRemarks("В остальные регионы доставка от 700 тенге и выше");
		model.setId(1);
		model.setMinOrderSum("Минимальный заказ 2500 тыс + бесплатная доставка");
		model.setPhoneNumber("77012528252");
		model.setTitle("Доставка в Астане");
		model.setWorkhours("с 11:00 по 24:00");
		models.add(model);
		
		DeliveryServicePointModel model1 = new DeliveryServicePointModel();
		model1.setAddress("ул Абая дом 8");
		model1.setAddressGeoLatitude((float) 50);
		model1.setAddressGeoLongitude((float) 50);
		model1.setDeliveryArea("от улицы Аль-Фараби до Богембая");
		model1.setDeliveryAreaImageUrl("http://sushimi.kz/public/image/delivery_area_karagandy.png");
		model1.setDeliveryAreaRemarks("В остальные регионы доставка от 700 тенге и выше");
		model1.setId(1);
		model1.setMinOrderSum("Минимальный заказ 2500 тыс + бесплатная доставка");
		model1.setPhoneNumber("77012528252");
		model1.setTitle("Доставка в Караганде");
		model1.setWorkhours("с 11:00 по 24:00");
		models.add(model1);
		*/
		
		List<DeliveryServicePoint> points = JPA.em().createQuery("from DeliveryServicePoint where isDeleted=false and isPublished=true order by orderNumber asc").getResultList();
		if (points != null)
			for (DeliveryServicePoint deliveryServicePoint : points) {
				DeliveryServicePointModel deliveryModel = DeliveryServicePointModel.buildFromDeliveryServicePoint(deliveryServicePoint);
				models.add(deliveryModel);
			}
		
		return models;
	}
	
}
