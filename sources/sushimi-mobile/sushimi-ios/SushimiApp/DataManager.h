//
//  DataManager.h
//  SushimiApp
//
//  Created by Artem Demidovich on 3/16/15.
//  Copyright (c) 2015 AphionSoftware. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>
#import "ArrayBasedTableViewController.h"
#import "Product.h"

@interface DataManager : NSObject

+(void)loadCategories:(NSString *)rootCategoryId onTableViewController:(ArrayBasedTableViewController*)tableViewController;

+(void)loadProductsInCategory:(NSString*)categoryId onTableViewController:(ArrayBasedTableViewController*)tableViewController;

+(Product*)loadProductById:(NSInteger) productId;

+(void)loadRestuarants:(ArrayBasedTableViewController*)tableViewController;

+(void)loadAnnouncements:(ArrayBasedTableViewController*)tableViewController withAnnouncementType:(NSInteger)announcementType;


+(void)loadDeliveryPoints:(ArrayBasedTableViewController*)tableViewController;


+(void) loadAboutCompany:(ArrayBasedTableViewController*)tableViewController;


@end
