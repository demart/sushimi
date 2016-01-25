//
//  UpdateOrderStateModel.h
//  SushimiCourierApp
//
//  Created by Artem Demidovich on 10/11/15.
//  Copyright © 2015 Aphion Software. All rights reserved.
//

#import "SecuredRequestBaseModel.h"

@interface UpdateOrderStateModel : SecuredRequestBaseModel


/**
 * Номер заказа
 */
@property NSString *orderNumber;

/**
 * Причина, если был отказ от заказа
 */
@property NSString *reason;

/**
 * Способ оплаты
 */
@property NSString *payMethod;

/**
 * Номер кредитной карты если оплачивали ей
 */
@property NSString *creditCardNumber;


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



@end
