//
//  OrderManager.h
//  SushimiApp
//
//  Created by Artem Demidovich on 5/4/15.
//  Copyright (c) 2015 AphionSoftware. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "OrderModel.h"
#import "RegisterOrderModel.h"
#import "BaseViewController.h"
#import "ArrayBasedTableViewController.h"

@interface OrderManager : NSObject

// Singleton Instance
+ (OrderManager *) sharedInstance;

-(OrderModel *) getOrderModel;

-(RegisterOrderModel *) getRegisterOrderModel;

-(void)loadContactDataFromSettings;

-(void) sendRequestFromController:(BaseViewController *) controller;

-(void) loadOrderFromServer:(ArrayBasedTableViewController *) controller withOrderKey:(NSString *)orderKey;

-(OrderModel *) loadLocalOrderByOrderKey:(NSString *)orderKey;

@end
