//
//  OrderActionTableViewCell.m
//  SushimiCourierApp
//
//  Created by Artem Demidovich on 10/13/15.
//  Copyright © 2015 Aphion Software. All rights reserved.
//

#import "OrderActionTableViewCell.h"
#import "OrderModel.h"

@interface OrderActionTableViewCell()

@property OrderModel *orderModel;
@property UITableViewController *parentController;
@property SEL doCompleteOrderAction;
@property SEL doReturnOrderAction;

@end


@implementation OrderActionTableViewCell

- (void)awakeFromNib {
    [self setSelectionStyle:UITableViewCellSelectionStyleNone];
    [self setAccessoryType:UITableViewCellAccessoryNone];
}

- (void)setSelected:(BOOL)selected animated:(BOOL)animated {
    [super setSelected:selected animated:animated];
}

-(void) initCellWithOrderModel:(OrderModel*) orderModel deliveredSelection:(SEL)doDelivery returnSelection:(SEL) doReturn onParentController:(UITableViewController*) controller {
    self.orderModel = orderModel;
    self.parentController = controller;
    self.doCompleteOrderAction = doDelivery;
    self.doReturnOrderAction = doReturn;
}

- (IBAction)doDeliveryAction:(UIButton *)sender {
    [self.parentController performSelector:self.doCompleteOrderAction withObject:self.orderModel];
}

- (IBAction)doReturnAction:(UIButton *)sender {
    [self.parentController performSelector:self.doReturnOrderAction withObject:self.orderModel];
}
@end
