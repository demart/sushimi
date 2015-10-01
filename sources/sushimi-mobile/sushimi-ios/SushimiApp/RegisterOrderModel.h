//
//  RegisterOrderModel.h
//  SushimiApp
//
//  Created by Artem Demidovich on 5/5/15.
//  Copyright (c) 2015 AphionSoftware. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "CartModel.h"
#import "RegisterOrderAddressModel.h"

@interface RegisterOrderModel : NSObject

/**
 * Имя того кто заказывает
 */
@property NSString *fullname;

/**
 * Контактный телефон
 */
@property NSString *phone;

/**
 * Электронный ящик
 */
@property NSString *email;

/**
 * DELIVERY - Доставка
 * DELIVERY_IN_TIME - Доставка ко времени
 * SELF_SERVICE - Самовывоз
 */
@property NSString *delivery;

/**
 * Время доставки (если доставка ко времени) время указывается в миллисекундах
 */
@property NSNumber *deliveryTime;

/**
 * Кол-во персон в заказе
 */
@property NSInteger personCount;

/**
 * Место откуда совершить доставку
 */
@property NSInteger departmentId;

/**
 * Комментарий к заказу
 */
@property NSString *comment;

/**
 * Способ оплаты
 * CASH - оплата наличными курьеру
 * CREDIT_CARD_ON_DELIVERY - оплата кредиткой с курьером
 * CREDIT_CARD - оплата из мобильного приложения
 */
@property NSString *payMethod;

/**
 * С какой суммы подготовить сдачу
 */
@property NSInteger cash;

/**
 * Просто соглашение
 */
@property BOOL allowTerms;

/**
 * Структура адреса, на данный момент планируется только улицу с полным адресом и гео позиция опционально
 */
@property RegisterOrderAddressModel *address;

/**
 * Идентификатор корзины с товаром
 */
@property NSString *cartId;

/**
 * Корзина ?? нужна ваще или нет, возможно передавать только Id?
 */
@property CartModel *cart;


@end
