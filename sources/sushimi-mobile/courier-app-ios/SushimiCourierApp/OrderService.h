//
//  OrderService.h
//  SushimiCourierApp
//
//  Created by Artem Demidovich on 10/11/15.
//  Copyright © 2015 Aphion Software. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "BaseTableViewController.h"
#import "OrderModel.h"

@interface OrderService : NSObject

// Загружает список заказов по указанному типу, выборка по pageSize не реализована
+(void) loadOrders:(BaseTableViewController*)tableViewController withOrderState:(NSString*) orderState  successSelector:(SEL) success  failureSelector:(SEL) failure  withPage:(NSInteger) page withPageSize:(NSInteger) pageSize;

+(void) completeOrder:(OrderModel*) orderModel withController:(UIViewController*)controller success:(SEL) success failure:(SEL) failure;

+(void) returnOrder:(OrderModel*) orderModel withController:(UIViewController*)controller success:(SEL) success failure:(SEL) failure;


@end
