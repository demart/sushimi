//
//  OrdersDetailCell.h
//  SushimiApp
//
//  Created by Artem Demidovich on 5/8/15.
//  Copyright (c) 2015 AphionSoftware. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "OrderModel.h"

@interface OrdersDetailCell : UITableViewCell
@property (weak, nonatomic) IBOutlet UILabel *orderNumber;
@property (weak, nonatomic) IBOutlet UILabel *orderTime;
@property (weak, nonatomic) IBOutlet UILabel *orderPersonName;
@property (weak, nonatomic) IBOutlet UILabel *orderSum;
@property (weak, nonatomic) IBOutlet UILabel *orderStatus;

-(void) initCell:(OrderModel *)model;

@end
