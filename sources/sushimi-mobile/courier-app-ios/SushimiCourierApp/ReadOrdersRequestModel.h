//
//  ReadOrdersRequestModel.h
//  SushimiCourierApp
//
//  Created by Artem Demidovich on 10/11/15.
//  Copyright © 2015 Aphion Software. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "SecuredRequestBaseModel.h"

@interface ReadOrdersRequestModel : SecuredRequestBaseModel

@property NSString *orderState;
@property NSDate *filterStartDate;
@property NSDate *filterEndDate;


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
/////WAITING_FOR_PRODUCING,

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
