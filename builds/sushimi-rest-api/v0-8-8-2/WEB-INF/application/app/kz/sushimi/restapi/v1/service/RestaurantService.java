package kz.sushimi.restapi.v1.service;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Query;

import kz.sushimi.persistence.dictionaries.Restaurant;
import kz.sushimi.persistence.dictionaries.RestaurantPhoto;
import kz.sushimi.restapi.v1.exceptions.ErrorCode;
import kz.sushimi.restapi.v1.exceptions.SushimiException;
import kz.sushimi.restapi.v1.models.RestaurantModel;
import kz.sushimi.restapi.v1.models.RestaurantPhotoModel;
import play.db.jpa.JPA;

public class RestaurantService {
	
	public static List<RestaurantModel> getRestaurants() {
		List<RestaurantModel> models = new ArrayList<RestaurantModel>();
		
		Query restaurantModelQuery = JPA.em().createQuery("from Restaurant where isDeleted = false and isPublished = true order by orderNumber");			
		List<Restaurant> restaurants = restaurantModelQuery.getResultList();
		if (restaurants != null && restaurants.size() > 0) {
			
			for (Restaurant restaurant : restaurants) {
				RestaurantModel model = new RestaurantModel();
				model.setId(restaurant.getId());
				model.setTitle(restaurant.getTitle());
				model.setDescription(restaurant.getDescription());
				model.setWorkhours(restaurant.getWorkhours());
				model.setAddress(restaurant.getAddress());
				model.setImageUrl(restaurant.getImageUrl());
				model.setLatitude(restaurant.getLatitude());
				model.setLongitude(restaurant.getLongitude());
				model.setModifiedDate(restaurant.getModifiedDate());
				model.setPhoneNumber(restaurant.getPhoneNumber());
				
				// TODO add photos
				if (restaurant.getPhotos() != null && restaurant.getPhotos().size() > 0) {
					model.setPhotos(new ArrayList<RestaurantPhotoModel>());
					for (RestaurantPhoto photo : restaurant.getPhotos()) {
						RestaurantPhotoModel pModel = new RestaurantPhotoModel();
						pModel.setDescription(photo.getDescription());
						pModel.setId(photo.getId());
						pModel.setImageUrl(photo.getImageUrl());
						pModel.setLastModifiedDate(photo.getModifiedDate().getTimeInMillis());
						pModel.setSmallImageUrl(photo.getSmallImageUrl());
						model.getPhotos().add(pModel);
					}
				}
				
				// TODO add promo photos
				// ...
				
				models.add(model);
			}
		}
		
		return models;
	}
	
	
	
	public static RestaurantModel getRestaurant(Long restaurantId) throws SushimiException {
		
		Restaurant restaurant = (Restaurant)JPA.em().find(Restaurant.class, restaurantId);

		if (restaurant != null) {
			RestaurantModel model = new RestaurantModel();
			model.setId(restaurant.getId());
			model.setTitle(restaurant.getTitle());
			model.setDescription(restaurant.getDescription());
			model.setWorkhours(restaurant.getWorkhours());
			model.setAddress(restaurant.getAddress());
			model.setImageUrl(restaurant.getImageUrl());
			model.setLatitude(restaurant.getLatitude());
			model.setLongitude(restaurant.getLongitude());
			model.setModifiedDate(restaurant.getModifiedDate());
			model.setPhoneNumber(restaurant.getPhoneNumber());
			
			// TODO add photos
			if (restaurant.getPhotos() != null && restaurant.getPhotos().size() > 0) {
				model.setPhotos(new ArrayList<RestaurantPhotoModel>());
				for (RestaurantPhoto photo : restaurant.getPhotos()) {
					RestaurantPhotoModel pModel = new RestaurantPhotoModel();
					pModel.setDescription(photo.getDescription());
					pModel.setId(photo.getId());
					pModel.setImageUrl(pModel.getImageUrl());
					
					if (photo.getModifiedDate() != null)
						pModel.setLastModifiedDate(photo.getModifiedDate().getTimeInMillis());
					
					pModel.setSmallImageUrl(pModel.getSmallImageUrl());
					model.getPhotos().add(pModel);
				}
			}
			
			// TODO add promo photos
			// ...
			
			return model;
		} else
			return null;
	}
	
}
