//
//  RestaurantTableViewCell.h
//  SushimiApp
//
//  Created by Artem Demidovich on 2/26/15.
//  Copyright (c) 2015 AphionSoftware. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "Restaurant.h"

@interface RestaurantTableViewCell : UITableViewCell

@property (weak, nonatomic) IBOutlet UIImageView *image;
@property (weak, nonatomic) IBOutlet UILabel *title;

@property Restaurant* restaurant;

-(void)initCell:(Restaurant*)model;


@end
