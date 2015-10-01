//
//  OrderModel.h
//  SushimiApp
//
//  Created by Artem Demidovich on 5/4/15.
//  Copyright (c) 2015 AphionSoftware. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface OrderModel : NSObject

@property NSInteger id;
@property NSString *key;
@property NSString *orderNumber;
@property NSInteger orderSum;
@property NSNumber *orderTime;
@property NSString *orderStatus;

@property NSMutableArray *orderItems;

@property NSString *personPhone;
@property NSString *personName;
@property NSInteger personCount;
@property NSString *personComments;
@property NSString *personEmail;
@property NSInteger personCash;

@property NSString *departmentName;
@property NSString *departmentAddress;
@property NSString *deliveryType;
@property NSNumber *deliveryTime;
@property NSString *payMethod;


@property NSString *addressCityName;
@property NSString *addressStreetName;
@property NSString *addressHouse;
@property NSString *addressCorpus;
@property NSString *addressBuilding;
@property NSString *addressFlat;
@property NSString *addressPorch;
@property NSString *addressDoorCode;
@property NSString *addressFloor;
@property NSString *addressRoom;
@property NSString *addressOffice;
@property NSString *geoLatitude;
@property NSString *geoLongitude;

/**
 * Доставка товара
 */
//DELIVERY,

/**
 * Доставка ко времени
 */
//DELIVERY_IN_TIME,

/**
 * Самовывоз товара из выбранного ресторана
 */
//SELF_SERVICE



/**
 * Наличными
 */
//CASH,

/**
 * Банковская карта (Курьеру)
 */
//CREDIT_CARD_ON_DELIVERY,

/**
 * Онлайн оплата кредиткой
 */
//CREDIT_CARD



/**
 * Не обработано, новый заказ
 */
//NOT_PROCESSED,

/**
 * Заказ обработан
 */
//PROCESSED,


/**
 * TEST FOR MOBILE
 */
//NOT_PROCESSED_MOBI,

/**
 * TEST FOR MOBILE
 */
//PROCESSED_MOBI,

/*
 
 private List<OrderItemModel> orderItems;
*/


@end
