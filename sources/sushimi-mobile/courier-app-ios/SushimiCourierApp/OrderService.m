//
//  OrderService.m
//  SushimiCourierApp
//
//  Created by Artem Demidovich on 10/11/15.
//  Copyright © 2015 Aphion Software. All rights reserved.
//

#import "OrderService.h"
#import "BaseTableViewController.h"
#import "UrlHelper.h"

#import "UserService.h"

#import "ReadOrdersRequestModel.h"
#import "OrderModel.h"
#import "ResponseWrapperModel.h"
#import "UpdateOrderStateModel.h"

#import "RKObjectManager.h"
#import "RKObjectMapping.h"
#import "RKResponseDescriptor.h"
#import "RKObjectRequestOperation.h"
#import "RKRelationshipMapping.h"
#import "RKRequestDescriptor.h"
#import "RKLog.h"
#import "RKMIMETypes.h"

/*
 Сервис для работы с заказами
 */
@implementation OrderService


+(void) completeOrder:(OrderModel*) orderModel withController:(UIViewController*)controller success:(SEL) success failure:(SEL) failure {
    UpdateOrderStateModel  *model = [[UpdateOrderStateModel alloc] init];
    model.authToken = nil; [UserService getAuthToken];
    model.latitude = @"51";
    model.longitude = @"53";
    model.orderNumber = orderModel.orderNumber;
    model.reason = nil;
    model.payMethod = orderModel.payMethod;
    model.creditCardNumber = nil;
    
    RKObjectManager *objectManager = [OrderService buildObjectManagerForUpdateOrder];
    [objectManager
     postObject:model
     path:@"complete"
     parameters:nil
     success:^(RKObjectRequestOperation *operation, RKMappingResult *result) {
         NSLog(@"%@",[[result.array objectAtIndex:0] valueForKey:@"status"]);
         NSLog(@"%@",[[result.array objectAtIndex:0] valueForKey:@"errorMessage"]);
         if ([[[result.array objectAtIndex:0] valueForKey:@"status"] isEqualToString:@"SUCCESS"]) {
             //NSObject *serverData = [[result.array objectAtIndex:0] valueForKey:@"data"];
             [controller performSelector:success];
         } else {
             [controller performSelector:failure withObject:nil];
         }
     }
     failure:^(RKObjectRequestOperation *operation, NSError *error){
         NSLog(@"Error %@", error);
         [controller performSelector:failure withObject:error];
     }];

}


+(void) returnOrder:(OrderModel*)orderModel withController:(UIViewController*)controller success:(SEL) success failure:(SEL) failure {
    UpdateOrderStateModel  *model = [[UpdateOrderStateModel alloc] init];
    model.authToken = [UserService getAuthToken];
    model.latitude = @"51";
    model.longitude = @"53";
    model.orderNumber = orderModel.orderNumber;
    model.reason = @"Причина пока не указывается";
    model.payMethod = orderModel.payMethod;
    model.creditCardNumber = nil;
    
    RKObjectManager *objectManager = [OrderService buildObjectManagerForUpdateOrder];
    [objectManager
     postObject:model
     path:@"return"
     parameters:nil
     success:^(RKObjectRequestOperation *operation, RKMappingResult *result) {
         NSLog(@"%@",[[result.array objectAtIndex:0] valueForKey:@"status"]);
         NSLog(@"%@",[[result.array objectAtIndex:0] valueForKey:@"errorMessage"]);
         if ([[[result.array objectAtIndex:0] valueForKey:@"status"] isEqualToString:@"SUCCESS"]) {
             //NSObject *serverData = [[result.array objectAtIndex:0] valueForKey:@"data"];
             [controller performSelector:success];
             
         } else {
             [controller performSelector:failure withObject:nil];
         }
     }
     failure:^(RKObjectRequestOperation *operation, NSError *error){
         NSLog(@"Error %@", error);
         [controller performSelector:failure withObject:error];
     }];
}


+(RKObjectManager*) buildObjectManagerForUpdateOrder {
    NSURL *targetUrl = [NSURL URLWithString:[UrlHelper updateOrderUrl]];
    
    
    RKObjectMapping* wrapperMapping = [RKObjectMapping mappingForClass:[ResponseWrapperModel class]];
    [wrapperMapping addAttributeMappingsFromDictionary:@{
                                                         @"status": @"status",
                                                         @"errorCode": @"errorCode",
                                                         @"errorMessage": @"errorMessage"
                                                         }];
    
    RKResponseDescriptor *responseWrapperDescriptor = [RKResponseDescriptor responseDescriptorWithMapping:wrapperMapping method:RKRequestMethodAny pathPattern:nil keyPath:@"" statusCodes:RKStatusCodeIndexSetForClass(RKStatusCodeClassSuccessful)];
    
    // ==== REQUEST DESC =====
    
    RKObjectMapping* readOrdersRequestModel = [RKObjectMapping requestMapping];
    [readOrdersRequestModel addAttributeMappingsFromDictionary:@{
                                                                 @"authToken": @"authToken",
                                                                 @"latitude": @"latitude",
                                                                 @"longitude": @"longitude",
                                                                 @"orderNumber": @"orderNumber",
                                                                 @"reason": @"reason",
                                                                 @"payMethod": @"payMethod",
                                                                 @"creditCardNumber": @"creditCardNumber"
                                                                 }];
    
    RKObjectManager *objectManager = [RKObjectManager managerWithBaseURL:targetUrl];
    objectManager.requestSerializationMIMEType = RKMIMETypeJSON;
    
    RKRequestDescriptor *requestDescriptor = [RKRequestDescriptor requestDescriptorWithMapping:readOrdersRequestModel objectClass:[UpdateOrderStateModel class] rootKeyPath:nil method:RKRequestMethodPOST];
    
    [objectManager addRequestDescriptor:requestDescriptor];
    [objectManager addResponseDescriptor:responseWrapperDescriptor];
    
    return objectManager;
}





+(void) loadOrders:(BaseTableViewController*)tableViewController withOrderState:(NSString*) orderState  successSelector:(SEL) success  failureSelector:(SEL) failure  withPage:(NSInteger) page withPageSize:(NSInteger) pageSize {
    
    ReadOrdersRequestModel *model = [[ReadOrdersRequestModel  alloc] init];
    model.authToken = [UserService getAuthToken];
    model.latitude = @"51";
    model.longitude = @"52";
    model.orderState = orderState;
    model.filterEndDate = nil;
    model.filterEndDate = nil;
    
    //RKLogConfigureByName("RestKit", RKLogLevelWarning);
    //RKLogConfigureByName("RestKit/ObjectMapping", RKLogLevelTrace);
    //RKLogConfigureByName("RestKit/Network", RKLogLevelTrace);
    
    RKObjectManager *objectManager = [OrderService buildObjectManagerForReadOrders];
    [objectManager
     postObject:model
     path:@"read"
     parameters:nil
     success:^(RKObjectRequestOperation *operation, RKMappingResult *result) {
         NSLog(@"%@",[[result.array objectAtIndex:0] valueForKey:@"status"]);
         NSLog(@"%@",[[result.array objectAtIndex:0] valueForKey:@"errorMessage"]);
         if ([[[result.array objectAtIndex:0] valueForKey:@"status"] isEqualToString:@"SUCCESS"]) {
             NSObject *serverData = [[result.array objectAtIndex:0] valueForKey:@"data"];
             [tableViewController performSelector:success withObject:serverData];

         } else {
             [tableViewController performSelector:failure withObject:nil];
         }
     }
     failure:^(RKObjectRequestOperation *operation, NSError *error){
         NSLog(@"Error %@", error);
         [tableViewController performSelector:failure withObject:error];
         //[controller performSelector:callback withObject:error];
         //[controller stopLoading:YES withError:@"Ошибка при попытке зарегистрировать Ваш заказ. Попробуйте еще раз."];
     }];
    
    
}

+(RKObjectManager*) buildObjectManagerForReadOrders {
    NSURL *targetUrl = [NSURL URLWithString:[UrlHelper readOrdersUrl]];
    
    
    RKObjectMapping* calendarTypeModelMapping = [RKObjectMapping mappingForClass:[CalendarTypeModel class]];
    [calendarTypeModelMapping addAttributeMappingsFromDictionary:@{
                                                            @"dayOfMonth": @"dayOfMonth",
                                                            @"hourOfDay": @"hourOfDay",
                                                            @"minute": @"minute",
                                                            @"month": @"month",
                                                            @"second": @"second",
                                                            @"year": @"year"
                                                            }];
    
    RKObjectMapping* orderModelMapping = [RKObjectMapping mappingForClass:[OrderModel class]];
    [orderModelMapping addAttributeMappingsFromDictionary:@{
                                                            @"id": @"id",
                                                            @"orderNumber": @"orderNumber",
                                                            @"clientName": @"clientName",
                                                            @"clientPhone": @"clientPhone",
                                                            @"clientComment": @"clientComment",
                                                            @"clientCash": @"clientCash",
   //                                                         @"orderTime": @"orderTime",
   //                                                         @"deliveryTime": @"deliveryTime",
                                                            @"deliveryType": @"deliveryType",
                                                            @"source": @"source",
                                                            @"orderState": @"orderState",
                                                            @"payMethod": @"payMethod",
                                                            @"orderSum": @"orderSum",
                                                            @"address": @"address"
                                                            }];
    
    [orderModelMapping addPropertyMapping:[RKRelationshipMapping relationshipMappingFromKeyPath:@"deliveryTime"
                                                                                   toKeyPath:@"deliveryTime"
                                                                                 withMapping:calendarTypeModelMapping]];
    
    [orderModelMapping addPropertyMapping:[RKRelationshipMapping relationshipMappingFromKeyPath:@"orderTime"
                                                                                      toKeyPath:@"orderTime"
                                                                                    withMapping:calendarTypeModelMapping]];
    
    RKObjectMapping* wrapperMapping = [RKObjectMapping mappingForClass:[ResponseWrapperModel class]];
    [wrapperMapping addAttributeMappingsFromDictionary:@{
                                                         @"status": @"status",
                                                         @"errorCode": @"errorCode",
                                                         @"errorMessage": @"errorMessage"
                                                         }];
    
    [wrapperMapping addPropertyMapping:[RKRelationshipMapping relationshipMappingFromKeyPath:@"data"
                                                                                   toKeyPath:@"data"
                                                                                 withMapping:orderModelMapping]];
    
    RKResponseDescriptor *responseWrapperDescriptor = [RKResponseDescriptor responseDescriptorWithMapping:wrapperMapping method:RKRequestMethodAny pathPattern:nil keyPath:@"" statusCodes:RKStatusCodeIndexSetForClass(RKStatusCodeClassSuccessful)];
    
    
    // ==== REQUEST DESC =====
    
    RKObjectMapping* readOrdersRequestModel = [RKObjectMapping requestMapping];
    [readOrdersRequestModel addAttributeMappingsFromDictionary:@{
                                            @"authToken": @"authToken",
                                            @"latitude": @"latitude",
                                            @"longitude": @"longitude",
                                                                 
                                            @"orderState": @"orderState",
                                            @"filterStartDate": @"filterStartDate",
                                            @"filterEndDate": @"filterEndDate",
                                        }];
    
    RKObjectManager *objectManager = [RKObjectManager managerWithBaseURL:targetUrl];
    objectManager.requestSerializationMIMEType = RKMIMETypeJSON;
    
    RKRequestDescriptor *requestDescriptor = [RKRequestDescriptor requestDescriptorWithMapping:readOrdersRequestModel objectClass:[ReadOrdersRequestModel class] rootKeyPath:nil method:RKRequestMethodPOST];
    
    [objectManager addRequestDescriptor:requestDescriptor];
    [objectManager addResponseDescriptor:responseWrapperDescriptor];
    
    return objectManager;
}



@end
