//
//  OrderTableViewCell.h
//  SushimiCourierApp
//
//  Created by Artem Demidovich on 10/12/15.
//  Copyright © 2015 Aphion Software. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "OrderModel.h"

@interface OrderTableViewCell : UITableViewCell
@property (weak, nonatomic) IBOutlet UILabel *orderNumber;
@property (weak, nonatomic) IBOutlet UILabel *clientName;
@property (weak, nonatomic) IBOutlet UILabel *clientPhone;
@property (weak, nonatomic) IBOutlet UILabel *deliveryTime;
@property (weak, nonatomic) IBOutlet UILabel *leftTime;
@property (weak, nonatomic) IBOutlet UILabel *orderState;

// Инициализирует ячеку, для того чтобы отрисовать данные
-(void) initCell:(OrderModel*) orderModel;

// Таймер счетчика
@property NSTimer *timer;

-(void) startTimer;
-(void) stopTimer;

@end
