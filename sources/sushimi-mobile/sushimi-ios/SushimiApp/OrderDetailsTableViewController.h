//
//  OrderDetailTableViewController.h
//  SushimiApp
//
//  Created by Artem Demidovich on 5/6/15.
//  Copyright (c) 2015 AphionSoftware. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "ArrayBasedTableViewController.h"

@interface OrderDetailsTableViewController : ArrayBasedTableViewController

-(void) setOrderKey:(NSString *) number hideBackButton:(BOOL) hideButton;

@end
