//
//  RestaurantTableViewController.h
//  SushimiApp
//
//  Created by Artem Demidovich on 2/26/15.
//  Copyright (c) 2015 AphionSoftware. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "Restaurant.h"  
#import "ArrayBasedTableViewController.h"

@interface RestaurantTableViewController : ArrayBasedTableViewController

@property Restaurant *selectedRestaurant;

@property NSMutableDictionary *loadImageOperations;
@property NSOperationQueue *loadImageOperationQueue;

@end
