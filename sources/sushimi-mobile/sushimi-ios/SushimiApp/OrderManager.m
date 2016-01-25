//
//  OrderManager.m
//  SushimiApp
//
//  Created by Artem Demidovich on 5/4/15.
//  Copyright (c) 2015 AphionSoftware. All rights reserved.
//

#import "OrderManager.h"
#import "OrderModel.h"
#import "OrderItemModel.h"
#import "RegisterOrderModel.h"

#import "CartManager.h"
#import "HeaderManager.h"

#import "ResponseWrapper.h"
#import "RKObjectManager.h"
#import "RKObjectMapping.h"
#import "RKResponseDescriptor.h"
#import "RKObjectRequestOperation.h"
#import "RKRelationshipMapping.h"
#import "RKLog.h"
#import "RKMIMETypes.h"

#import "CategoryItem.h"
#import "Product.h"

#import "SettingsManager.h"
#import "Settings.h"

#import "UrlHelper.h"

@implementation OrderManager

static OrderManager *orderManagerInstance = nil;
static OrderModel *orderModel;
static RegisterOrderModel *registerOrderModel;


+ (OrderManager *) sharedInstance {
    @synchronized(self) {
        if (orderManagerInstance == nil) {
            orderManagerInstance = [[OrderManager alloc] init];
            [orderManagerInstance initOrder];
        }
    }
    return orderManagerInstance;
}


-(void) initOrder {
    registerOrderModel = [[RegisterOrderModel alloc] init];
    registerOrderModel.delivery = @"DELIVERY";
    registerOrderModel.payMethod = @"CASH";
    registerOrderModel.personCount = 1;
    registerOrderModel.phone = @"+7";
    registerOrderModel.allowTerms = YES;
    registerOrderModel.cartId = [[CartManager sharedInstance] getCartId];
    registerOrderModel.address = [[RegisterOrderAddressModel alloc] init];
}

-(OrderModel *) getOrderModel {
    return orderModel;
}

-(OrderModel *) loadLocalOrderByOrderKey:(NSString *)orderKey {
    NSMutableArray *orders = [[SettingsManager sharedInstance] getOrders];
    if (orders != nil)
        for (int i = 0; i < orders.count; i++) {
            OrderModel *om = [orders objectAtIndex:i];
            if (om == nil)
                continue;
            
            if ([om.key isEqualToString:orderKey])
                return om;
        }
    
    return nil;
}



-(RegisterOrderModel *) getRegisterOrderModel {
    return registerOrderModel;
}

-(void) loadContactDataFromSettings {
    Settings *settings = [[SettingsManager sharedInstance] getSettings];
    
    registerOrderModel.fullname = settings.fullname;
    registerOrderModel.phone = settings.phone;
    registerOrderModel.email = settings.email;
    
    registerOrderModel.address.building = settings.addressBuilding;
    registerOrderModel.address.cityName = settings.addressCityName;
    registerOrderModel.address.corpus = settings.addressCorpus;
    registerOrderModel.address.doorCode = settings.addressDoorCode;
    registerOrderModel.address.flat = settings.addressFlat;
    registerOrderModel.address.floor = settings.addressFloor;
    registerOrderModel.address.house = settings.addressHouse;
    registerOrderModel.address.office = settings.addressOffice;
    registerOrderModel.address.porch = settings.addressPorch;
    registerOrderModel.address.room = settings.addressRoom;
    registerOrderModel.address.streetName = settings.addressStreetName;
}

-(void) cleanTempDataAndCompleteOrderRegistration {
    // Clean all temp data
    [[CartManager sharedInstance] cleanExistingCartAndInitNewCart];
    registerOrderModel = nil;
    [orderManagerInstance initOrder];
    
    // Save to Settings if user didn't save it before
    // TODO
    
    // Store requestNumber and Discount
    [[SettingsManager sharedInstance] addOrderModel:orderModel];
}

-(void) sendRequestFromController:(BaseViewController *) controller {
    // Validation -> throw error
    [controller startLoading:YES];
    // VALIDATION PART
    if (registerOrderModel.personCount < 1) registerOrderModel.personCount = 1;
    NSCharacterSet *nonNumberSet = [[NSCharacterSet decimalDigitCharacterSet] invertedSet];
    registerOrderModel.phone = [[registerOrderModel.phone componentsSeparatedByCharactersInSet:nonNumberSet] componentsJoinedByString:@""];
    registerOrderModel.phone = [registerOrderModel.phone substringFromIndex:1];
    
    
    // Sychronize local and remote cart
    // Send Order
    RKObjectManager *objectManager = [[CartManager sharedInstance] buildAddProductsToCartObjectManager];
    [HeaderManager addApplicationHeaderToObjectManager:objectManager];
    CartAddProductsModel *model =  [[CartManager sharedInstance] buildCartAddProductsModel];
    [objectManager
     postObject:model
     path:@"clear/add/product"
     parameters:nil
     success:^(RKObjectRequestOperation *operation, RKMappingResult *result) {
         NSLog(@"%@",[[result.array objectAtIndex:0] valueForKey:@"status"]);
         NSLog(@"%@",[[result.array objectAtIndex:0] valueForKey:@"errorMessage"]);
         //CartModel* cartModel = [[result.array objectAtIndex:0] valueForKey:@"data"][0];
         
         // SEND REQUEST
         RKObjectManager *objectManager = [self buildOrderRequestObjectManager];
         [objectManager
          postObject:registerOrderModel
          path:@"register"
          parameters:nil
          success:^(RKObjectRequestOperation *operation, RKMappingResult *result) {
              NSLog(@"%@",[[result.array objectAtIndex:0] valueForKey:@"status"]);
              NSLog(@"%@",[[result.array objectAtIndex:0] valueForKey:@"errorMessage"]);
              if ([[[result.array objectAtIndex:0] valueForKey:@"status"] isEqualToString:@"SUCCESS"]) {
                  orderModel = [[result.array objectAtIndex:0] valueForKey:@"data"][0];
                  controller.item = orderModel;
                  [orderManagerInstance cleanTempDataAndCompleteOrderRegistration];
                  [controller stopLoading:YES withError:nil];
              } else {
                  [controller stopLoading:YES withError:@"Ошибка при попытке зарегистрировать Ваш заказ. Попробуйте еще раз."];
              }
          }
          failure:^(RKObjectRequestOperation *operation, NSError *error){
              NSLog(@"Error %@", error);
              [controller stopLoading:YES withError:@"Ошибка при попытке зарегистрировать Ваш заказ. Попробуйте еще раз."];
          }];
         
     }
     failure:^(RKObjectRequestOperation *operation, NSError *error){
         NSLog(@"Error %@", error);
         [controller stopLoading:YES withError:@"Ошибка при попытке зарегистрировать Ваш заказ. Попробуйте еще раз."];
     }];
    
    

}


-(void) loadOrderFromServer:(ArrayBasedTableViewController *) controller withOrderKey:(NSString *)orderKey {
    RKObjectMapping* categoryMapping = [RKObjectMapping mappingForClass:[CategoryItem class]];
    [categoryMapping addAttributeMappingsFromDictionary:@{
                                                          @"id": @"id",
                                                          @"name": @"name",
                                                          @"hasChildren": @"hasChildren",
                                                          @"childrenCount": @"childrenCount",
                                                          @"lastModifiedDate": @"lastModifiedDate"
                                                          }];
    
    RKObjectMapping* productMapping = [RKObjectMapping mappingForClass:[Product class]];
    [productMapping addAttributeMappingsFromDictionary:@{
                                                         @"id": @"id",
                                                         @"code": @"code",
                                                         @"name": @"name",
                                                         @"description": @"_description",
                                                         @"imageLink": @"imageLink",
                                                         @"smallImageLink": @"smallImageLink",
                                                         @"orderNumber": @"orderNumber",
                                                         @"cost": @"cost",
                                                         @"itemCount": @"itemCount",
                                                         
                                                         @"proteins": @"proteins",
                                                         @"carbohydrates": @"carbohydrates",
                                                         @"fats": @"fats",
                                                         
                                                         
                                                         @"isRecomended": @"isRecomended",
                                                         @"isNew": @"isNew",
                                                         @"isHit": @"isHit",
                                                         @"isHot": @"isHot",
                                                         @"isVegetable": @"isVegetable",
                                                         @"isPopular": @"isPopular",
                                                         
                                                         @"popularSex": @"popularSex",
                                                         @"popularAge": @"popularAge",
                                                         
                                                         @"type": @"type"
                                                         }];
    
    [productMapping addPropertyMapping:[RKRelationshipMapping relationshipMappingFromKeyPath:@"category"
                                                                                   toKeyPath:@"category"
                                                                                 withMapping:categoryMapping]];
    
    
    RKObjectMapping* orderItemMapping = [RKObjectMapping mappingForClass:[OrderItemModel class]];
    [orderItemMapping addAttributeMappingsFromDictionary:@{
                                                           @"id": @"id",
                                                           @"count":@"count",
                                                           @"price": @"price",
                                                           @"sum": @"sum"
                                                           }];
    
    [orderItemMapping addPropertyMapping:[RKRelationshipMapping relationshipMappingFromKeyPath:@"product"
                                                                                     toKeyPath:@"product"
                                                                                   withMapping:productMapping]];
    
    
    RKObjectMapping* orderMapping = [RKObjectMapping mappingForClass:[OrderModel class]];
    [orderMapping addAttributeMappingsFromDictionary:@{
                                                       @"id": @"id",
                                                       @"key": @"key",
                                                       @"orderNumber": @"orderNumber",
                                                       @"orderSum": @"orderSum",
                                                       @"orderTime": @"orderTime",
                                                       @"orderStatus": @"orderStatus",
                                                       @"personName": @"personName",
                                                       @"personPhone": @"personPhone",
                                                       @"personCount": @"personCount",
                                                       @"personComments": @"personComments",
                                                       @"personEmail": @"personEmail",
                                                       @"personCash": @"personCash",
                                                       @"departmentName": @"departmentName",
                                                       @"departmentAddress": @"departmentAddress",
                                                       @"deliveryType": @"deliveryType",
                                                       @"deliveryTime": @"deliveryTime",
                                                       @"payMethod": @"payMethod",
                                                       @"addressCityName": @"addressCityName",
                                                       @"addressStreetName": @"addressStreetName",
                                                       @"addressHouse": @"addressHouse",
                                                       @"addressCorpus": @"addressCorpus",
                                                       @"addressBuilding": @"addressBuilding",
                                                       @"addressFlat": @"addressFlat",
                                                       @"addressPorch": @"addressPorch",
                                                       @"addressDoorCode": @"addressDoorCode",
                                                       @"addressFloor": @"addressFloor",
                                                       @"addressRoom": @"addressRoom",
                                                       @"addressOffice": @"addressOffice",
                                                       @"geoLatitude": @"geoLatitude",
                                                       @"geoLongitude": @"geoLongitude"
                                                       }];
    
    [orderMapping addPropertyMapping:[RKRelationshipMapping relationshipMappingFromKeyPath:@"orderItems"
                                                                                 toKeyPath:@"orderItems"
                                                                               withMapping:orderItemMapping]];
    
    RKObjectMapping* wrapperMapping = [RKObjectMapping mappingForClass:[ResponseWrapper class]];
    [wrapperMapping addAttributeMappingsFromDictionary:@{
                                                         @"status": @"status",
                                                         //@"data": @"data",
                                                         @"errorCode": @"errorCode",
                                                         @"errorMessage": @"errorMessage"
                                                         }];
    
    [wrapperMapping addPropertyMapping:[RKRelationshipMapping relationshipMappingFromKeyPath:@"data"
                                                                                   toKeyPath:@"data"
                                                                                 withMapping:orderMapping]];
    
    RKResponseDescriptor *responseWrapperDescriptor = [RKResponseDescriptor responseDescriptorWithMapping:wrapperMapping method:RKRequestMethodAny pathPattern:nil keyPath:@"" statusCodes:RKStatusCodeIndexSetForClass(RKStatusCodeClassSuccessful) ];
    
    [controller startLoading:YES];
    
    /*
    NSURL *targetUrl = [NSURL URLWithString:
                        [[NSString alloc] initWithFormat:@"http://api.sushimi.kz/rest-api/v1/order/%@/read", orderKey]];
    */
    
    NSURL *targetUrl = [NSURL URLWithString:[UrlHelper getOrderUrlByKey:orderKey]];
    NSMutableURLRequest *request = [[NSMutableURLRequest alloc] initWithURL:targetUrl];
    [HeaderManager addApplicationHeaderToObjectRequestOperations:request];
    RKObjectRequestOperation *objectRequestOperation = [[RKObjectRequestOperation alloc] initWithRequest:request responseDescriptors:@[ responseWrapperDescriptor ]];
    [objectRequestOperation setCompletionBlockWithSuccess:^(RKObjectRequestOperation *operation, RKMappingResult *mappingResult) {
        controller.item = [[mappingResult.array objectAtIndex:0] valueForKey:@"data"][0];
        [controller stopLoading:YES withError:nil];
    } failure:^(RKObjectRequestOperation *operation, NSError *error) {
        controller.items = nil;
        [controller stopLoading:YES withError:@"Ошибка при получении информации о заказе, попробуйте позднее."];
        NSLog(@"Operation failed with error: %@", error);
    }];
    
    [objectRequestOperation start];
    
}



-(RKObjectManager *) buildOrderRequestObjectManager {
    NSURL *targetUrl = [NSURL URLWithString: [UrlHelper getOrderSendUrl]];
    RKObjectMapping* categoryMapping = [RKObjectMapping mappingForClass:[CategoryItem class]];
    [categoryMapping addAttributeMappingsFromDictionary:@{
                                                          @"id": @"id",
                                                          @"name": @"name",
                                                          @"hasChildren": @"hasChildren",
                                                          @"childrenCount": @"childrenCount",
                                                          @"lastModifiedDate": @"lastModifiedDate"
                                                          }];
    
    RKObjectMapping* productMapping = [RKObjectMapping mappingForClass:[Product class]];
    [productMapping addAttributeMappingsFromDictionary:@{
                                                         @"id": @"id",
                                                         @"code": @"code",
                                                         @"name": @"name",
                                                         @"description": @"_description",
                                                         @"imageLink": @"imageLink",
                                                         @"smallImageLink": @"smallImageLink",
                                                         @"orderNumber": @"orderNumber",
                                                         @"cost": @"cost",
                                                         @"itemCount": @"itemCount",
                                                         
                                                         @"proteins": @"proteins",
                                                         @"carbohydrates": @"carbohydrates",
                                                         @"fats": @"fats",
                                                         
                                                         
                                                         @"isRecomended": @"isRecomended",
                                                         @"isNew": @"isNew",
                                                         @"isHit": @"isHit",
                                                         @"isHot": @"isHot",
                                                         @"isVegetable": @"isVegetable",
                                                         @"isPopular": @"isPopular",
                                                         
                                                         @"popularSex": @"popularSex",
                                                         @"popularAge": @"popularAge",
                                                         
                                                         @"type": @"type"
                                                         }];
    
    [productMapping addPropertyMapping:[RKRelationshipMapping relationshipMappingFromKeyPath:@"category"
                                                                                   toKeyPath:@"category"
                                                                                 withMapping:categoryMapping]];
    
    
    RKObjectMapping* orderItemMapping = [RKObjectMapping mappingForClass:[OrderItemModel class]];
    [orderItemMapping addAttributeMappingsFromDictionary:@{
                                                         @"id": @"id",
                                                         @"count":@"count",
                                                         @"price": @"price",
                                                         @"sum": @"sum"
                                                         }];
    
    [orderItemMapping addPropertyMapping:[RKRelationshipMapping relationshipMappingFromKeyPath:@"product"
                                                                                   toKeyPath:@"product"
                                                                                 withMapping:productMapping]];
    
    
    RKObjectMapping* orderMapping = [RKObjectMapping mappingForClass:[OrderModel class]];
    [orderMapping addAttributeMappingsFromDictionary:@{
                                                      @"id": @"id",
                                                      @"key": @"key",
                                                      @"orderNumber": @"orderNumber",
                                                      @"orderSum": @"orderSum",
                                                      @"orderTime": @"orderTime",
                                                      @"orderStatus": @"orderStatus",
                                                      @"personName": @"personName",
                                                      @"personPhone": @"personPhone",
                                                      @"personCount": @"personCount",
                                                      @"personComments": @"personComments",
                                                      @"personEmail": @"personEmail",
                                                      @"personCash": @"personCash",
                                                      @"departmentName": @"departmentName",
                                                      @"departmentAddress": @"departmentAddress",
                                                      @"deliveryType": @"deliveryType",
                                                      @"deliveryTime": @"deliveryTime",
                                                      @"payMethod": @"payMethod",
                                                      @"addressCityName": @"addressCityName",
                                                      @"addressStreetName": @"addressStreetName",
                                                      @"addressHouse": @"addressHouse",
                                                      @"addressCorpus": @"addressCorpus",
                                                      @"addressBuilding": @"addressBuilding",
                                                      @"addressFlat": @"addressFlat",
                                                      @"addressPorch": @"addressPorch",
                                                      @"addressDoorCode": @"addressDoorCode",
                                                      @"addressFloor": @"addressFloor",
                                                      @"addressRoom": @"addressRoom",
                                                      @"addressOffice": @"addressOffice",
                                                      @"geoLatitude": @"geoLatitude",
                                                      @"geoLongitude": @"geoLongitude"
                                                      }];
    
    [orderMapping addPropertyMapping:[RKRelationshipMapping relationshipMappingFromKeyPath:@"orderItems"
                                                                                toKeyPath:@"orderItems"
                                                                              withMapping:orderItemMapping]];
    
    RKObjectMapping* wrapperMapping = [RKObjectMapping mappingForClass:[ResponseWrapper class]];
    [wrapperMapping addAttributeMappingsFromDictionary:@{
                                                         @"status": @"status",
                                                         //@"data": @"data",
                                                         @"errorCode": @"errorCode",
                                                         @"errorMessage": @"errorMessage"
                                                         }];
    
    [wrapperMapping addPropertyMapping:[RKRelationshipMapping relationshipMappingFromKeyPath:@"data"
                                                                                   toKeyPath:@"data"
                                                                                 withMapping:orderMapping]];
    
    RKResponseDescriptor *responseWrapperDescriptor = [RKResponseDescriptor responseDescriptorWithMapping:wrapperMapping method:RKRequestMethodAny pathPattern:nil keyPath:@"" statusCodes:RKStatusCodeIndexSetForClass(RKStatusCodeClassSuccessful) ];
    
    
    // ==== REQUEST DESC =====
    
    
    RKObjectMapping* requestOrderMapping = [RKObjectMapping requestMapping];
    [requestOrderMapping addAttributeMappingsFromDictionary:@{
                                                       @"fullname": @"fullname",
                                                       @"phone": @"phone",
                                                       @"email": @"email",
                                                       @"delivery": @"delivery",
                                                       @"deliveryTime": @"deliveryTime",
                                                       @"personCount": @"personCount",
                                                       @"departmentId": @"departmentId",
                                                       @"personCount": @"personCount",
                                                       @"comment": @"comment",
                                                       @"payMethod": @"payMethod",
                                                       @"cash": @"cash",
                                                       //@"allowTerms": @"allowTerms",
                                                       @"cartId": @"cartId",
                                                       @"comment": @"comment",
                                                       }];
  
    RKObjectMapping* requestAddressOrderMapping = [RKObjectMapping requestMapping];
    [requestAddressOrderMapping addAttributeMappingsFromDictionary:@{
                                                              @"streetName": @"streetName",
                                                              @"latitude": @"latitude",
                                                              @"longitude": @"longitude",
                                                              
                                                              @"cityName": @"cityName",
                                                              @"house": @"house",
                                                              @"corpus": @"corpus",
                                                              @"building": @"building",
                                                              @"flat": @"flat",
                                                              @"porch": @"porch",
                                                              @"doorCode": @"doorCode",
                                                              @"floor": @"floor",
                                                              @"room": @"room",
                                                              @"office": @"office"
                                                              }];
    
    [requestOrderMapping addPropertyMapping:[RKRelationshipMapping relationshipMappingFromKeyPath:@"address"
                                                                                   toKeyPath:@"address"
                                                                                 withMapping:requestAddressOrderMapping]];
    
    RKObjectManager *objectManager = [RKObjectManager managerWithBaseURL:targetUrl];
    objectManager.requestSerializationMIMEType = RKMIMETypeJSON;
    [HeaderManager addApplicationHeaderToObjectManager:objectManager];
    
    RKRequestDescriptor *requestDescriptor = [RKRequestDescriptor requestDescriptorWithMapping:requestOrderMapping objectClass:[RegisterOrderModel class] rootKeyPath:nil method:RKRequestMethodPOST];
    
    [objectManager addRequestDescriptor:requestDescriptor];
    [objectManager addResponseDescriptor:responseWrapperDescriptor];
    
    return objectManager;
}

@end
