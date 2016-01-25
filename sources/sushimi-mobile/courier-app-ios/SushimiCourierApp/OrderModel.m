//
//  OrderModel.m
//  SushimiCourierApp
//
//  Created by Artem Demidovich on 10/11/15.
//  Copyright © 2015 Aphion Software. All rights reserved.
//

#import "OrderModel.h"
#import "PhoneNumberFormatter.h"

@implementation OrderModel

//**
//* Не обработано, новый заказ
//
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

-(NSString*) getOrderNumber {
    return [[NSString alloc] initWithFormat:@"№ %@", self.orderNumber];
}

-(NSString*) getOrderTime {
    NSDateFormatter *dateFormatter = [[NSDateFormatter alloc] init];
    [dateFormatter setDateFormat:@"dd.MM.yyyy HH:mm"];
    NSString *formattedDateString = [dateFormatter stringFromDate:self.orderTime.date];
    return formattedDateString;
}

-(NSString*) getDeliveryTime {
    NSDateFormatter *dateFormatter = [[NSDateFormatter alloc] init];
    [dateFormatter setDateFormat:@"dd.MM.yyyy HH:mm"];
    NSString *formattedDateString = [dateFormatter stringFromDate:self.deliveryTime.date];
    return formattedDateString;
}

-(NSString*) getStatusName {
    if ([self.orderState isEqualToString:@"NOT_PROCESSED"]) return @"Заказ не обработан";
    if ([self.orderState isEqualToString:@"NOT_PROCESSED_MOBI"]) return @"Заказ не обработан";
    if ([self.orderState isEqualToString:@"PROCESSED"]) return @"Заказ поступил оператору";
    if ([self.orderState isEqualToString:@"REGISTERED"]) return @"Заказ зарегистрирован";
    if ([self.orderState isEqualToString:@"IN_PROGRESS"]) return @"Заказ готовиться";
    if ([self.orderState isEqualToString:@"WAITING_FOR_DELIVERY"]) return @"Заказ ожидает курьера";
    if ([self.orderState isEqualToString:@"ON_DELIVERY"]) return @"Заказ на доставке";
    if ([self.orderState isEqualToString:@"DELIVERED"]) return @"Заказ доставлен";
    if ([self.orderState isEqualToString:@"CANCELED"]) return @"Заказ отменен";
    if ([self.orderState isEqualToString:@"RETURNED"]) return @"Заказ возвращен";
    return @"Неизвестно";
}

-(NSString*) getDeliveryTypeName {
    if ([self.deliveryType isEqualToString:@"DELIVERY"]) return @"Доставка";
    if ([self.deliveryType isEqualToString:@"DELIVERY_IN_TIME"]) return @"Доставка ко времени";
    if ([self.deliveryType isEqualToString:@"SELF_SERVICE"]) return @"Самовывоз";
    return @"Неизвестно";
}

-(NSString*) getFormattedPhoneNumber {
    PhoneNumberFormatter* phoneNumberFormatter = [[PhoneNumberFormatter alloc] init];
    if ([[self.clientPhone substringToIndex:1] isEqualToString:@"8"]) {
        NSString *phoneNumberWithout8 = [self.clientPhone substringFromIndex:1];
        NSString *unformattedPhone = [[NSString alloc] initWithFormat:@"+7%@", phoneNumberWithout8];
        return [phoneNumberFormatter format:unformattedPhone withLocale:@"kz"];
    } else {
        NSString *unformattedPhone = [[NSString alloc] initWithFormat:@"+7%@", self.clientPhone];
        return [phoneNumberFormatter format:unformattedPhone withLocale:@"kz"];
    }
}

-(NSString*) getFormattedPhoneNumberForCall {
    if ([[self.clientPhone substringToIndex:1] isEqualToString:@"8"])
        return self.clientPhone;
    return [[NSString alloc] initWithFormat:@"8%@", self.clientPhone];
}

-(NSString*) getSourceName {
    if ([self.source isEqualToString:@"WEB"]) return @"Заказ с сайта";
    if ([self.source isEqualToString:@"MOBILE"]) return @"Заказ с мобильного";
    if ([self.source isEqualToString:@"CALL_CENTER"]) return @"Заказ по телефону";
    if ([self.source isEqualToString:@"SMART_TV"]) return @"Заказ по SMART-TV";
    return @"Неизвестно";
}

-(NSString*) getPayMethodName {
    if ([self.payMethod isEqualToString:@"CASH"]) return @"Оплата наличными";
    if ([self.payMethod isEqualToString:@"CREDIT_CARD_ON_DELIVERY"]) return @"Оплата картой курьеру";
    if ([self.payMethod isEqualToString:@"CREDIT_CARD"]) return @"Оплата картой";
    return @"Неизвестно";
}

-(NSString*) getOrderSum {
    return [[NSString alloc] initWithFormat:@"%@ тнг.", [self.orderSum stringValue]];
}

@end
