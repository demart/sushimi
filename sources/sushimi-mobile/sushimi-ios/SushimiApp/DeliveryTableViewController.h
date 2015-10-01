//
//  DeliveryTableViewController.h
//  SushimiApp
//
//  Created by Artem Demidovich on 2/20/15.
//  Copyright (c) 2015 AphionSoftware. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "DeliveryInfo.h"
#import "ArrayBasedTableViewController.h"

@interface DeliveryTableViewController : ArrayBasedTableViewController

@property NSMutableDictionary *loadImageOperations;
@property NSOperationQueue *loadImageOperationQueue;

@end
