//
//  RestaurantDetailTableViewController.h
//  SushimiApp
//
//  Created by Artem Demidovich on 2/28/15.
//  Copyright (c) 2015 AphionSoftware. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "Restaurant.h"

@interface RestaurantDetailTableViewController : UITableViewController

-(void) setSelectedRestaurant:(Restaurant *)selectedRestaurant;

@end
