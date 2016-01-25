//
//  OrderActionTableViewCell.h
//  SushimiCourierApp
//
//  Created by Artem Demidovich on 10/13/15.
//  Copyright © 2015 Aphion Software. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "OrderModel.h"

@interface OrderActionTableViewCell : UITableViewCell
@property (weak, nonatomic) IBOutlet UIButton *completeDeliveryButton;
@property (weak, nonatomic) IBOutlet UIButton *returnOrderButton;
- (IBAction)doDeliveryAction:(UIButton *)sender;
- (IBAction)doReturnAction:(UIButton *)sender;

-(void) initCellWithOrderModel:(OrderModel*) orderModel deliveredSelection:(SEL)doDelivery returnSelection:(SEL) doReturn onParentController:(UITableViewController*) controller;

@end
