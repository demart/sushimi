//
//  OrderModel.h
//  SushimiCourierApp
//
//  Created by Artem Demidovich on 10/11/15.
//  Copyright © 2015 Aphion Software. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "CalendarTypeModel.h"

@interface OrderModel : NSObject

@property NSNumber *id;
@property NSString *orderNumber;
@property NSString *clientName;
@property NSString *clientPhone;
@property NSString *clientComment;
@property NSNumber *clientCash;
@property CalendarTypeModel *orderTime;
@property CalendarTypeModel *deliveryTime;
@property NSString *deliveryType;
@property NSString *source;
@property NSString *orderState;
@property NSString *payMethod;
@property NSNumber *orderSum;
@property NSString *address;

-(NSString*) getOrderNumber;

-(NSString*) getOrderTime;

-(NSString*) getDeliveryTime;

// Возвращает человеский статус заказа
-(NSString*) getStatusName;

-(NSString*) getDeliveryTypeName;

-(NSString*) getFormattedPhoneNumber;

-(NSString*) getFormattedPhoneNumberForCall;

-(NSString*) getSourceName;

-(NSString*) getPayMethodName;

-(NSString*) getOrderSum;

/*
{
    dayOfMonth = 14;
    hourOfDay = 15;
    minute = 24;
    month = 8;
    second = 41;
    year = 2015;
 }
 */

// ====================
//   PAY METHOD
// ====================

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


// ====================
//   SOURCE
// ====================

/**
 * Заказы с сайта
 */
//WEB,

/**
 * Заказы с мобильного
 */
//MOBILE,

/**
 * Заказы от оператора
 */
//CALL_CENTER,

/**
 * Заказ поступил со смарт тв
 */
//SMART_TV,



// ====================
//   DELIVERY TYPE
// ====================

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



// ====================
//   ORDER STATE
// ====================

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

/**
 * Заказ зарегистрирован и обработан оператором
 */
//REGISTERED,

/**
 * Производство взяло заказ на обработку
 */
//IN_PROGRESS,

/**
 * Заказ ожидает в очереди на производтсво
 */
////WAITING_FOR_PRODUCING,

/**
 * Заказ подготовлен, собран и готов для того чтобы доставить заказ клиенту
 */
//WAITING_FOR_DELIVERY,

/**
 * Заказ находится на доставке. Курьер его взял и отправился в путь.
 */
//ON_DELIVERY,

/**
 * Заказ завершен, в данном случае доставлен клиенту. Включая самовывоз.
 */
//DELIVERED,

/**
 * Заказ отменен (Обычно до того как попал на кухню и производство) В реальности посмотрим
 */
//CANCELED,

/**
 * Заказ отзван, означает что произвели продукцию, либо уже подготовили к доставке
 * или отправили на доставку но клиент отказался
 */
//RETURNED



@end
