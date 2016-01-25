//
//  OrderTableViewCell.m
//  SushimiCourierApp
//
//  Created by Artem Demidovich on 10/12/15.
//  Copyright © 2015 Aphion Software. All rights reserved.
//

#import "OrderTableViewCell.h"
#import "PhoneNumberFormatter.h"

@interface OrderTableViewCell ()

@property OrderModel *orderModel;

@end

@implementation OrderTableViewCell

- (void)awakeFromNib {
    self.accessoryType = UITableViewCellAccessoryNone;
    self.selectionStyle = UITableViewCellSelectionStyleNone;
}

- (void)setSelected:(BOOL)selected animated:(BOOL)animated {
    [super setSelected:selected animated:animated];
}

-(void) initCell:(OrderModel *)orderModel {
    self.orderModel = orderModel;
    
    [self.orderNumber setText: [[NSString alloc] initWithFormat:@"№ %@", orderModel.orderNumber]];
    [self.clientName setText:orderModel.clientName];
    [self.clientPhone setText: [self.orderModel getFormattedPhoneNumber]];
    [self.orderState setText:[orderModel getStatusName]];
    [self.deliveryTime setText: [self.orderModel getDeliveryTime]];
    
    if ([orderModel.orderState isEqualToString:@"IN_PROGRESS"] ||
        [orderModel.orderState isEqualToString:@"ON_DELIVERY"]) {
        [self.leftTime setText:nil];
        [self startTimer];
    } else {
        [self.leftTime setText:nil];
    }
}


-(void) startTimer {
    // запускаем timer
    self.timer = [NSTimer timerWithTimeInterval:1.0 target:self selector:@selector(updateLeftTime:)userInfo:nil repeats:YES];
    [[NSRunLoop mainRunLoop] addTimer:self.timer forMode:NSRunLoopCommonModes];
}

-(void) stopTimer {
    if (self.timer != nil)
        [self.timer invalidate];
}

-(void) updateLeftTime:(NSTimer*) theTimer{
    NSDate *currentTime = [NSDate date];
    NSDate* deliveryTime = [self.orderModel.deliveryTime date];
    NSTimeInterval secondsBetween = [currentTime timeIntervalSinceDate:deliveryTime];

    NSInteger ti = (NSInteger)secondsBetween;
    NSInteger seconds = ti % 60;
    NSInteger minutes = (ti / 60) % 60;
    NSInteger hours = (ti / 3600);
    
    NSString *formattedTime = nil;
    NSString *prefix = @"";
    if (secondsBetween > 0) { // Просрочен
        prefix = @"+";
        // Change color
        //self.backgroundColor = [UIColor colorWithHue:0.00 saturation:0.33 brightness:0.33 alpha:1.0];
        [self.leftTime setTextColor:[UIColor redColor]];
    } else {
        prefix = @"";
        // Change color
        [self.leftTime setTextColor:[UIColor greenColor]];
    }
    
    NSString *hoursStr;
    if (labs(hours) < 10) {
        hoursStr = [[NSString alloc] initWithFormat:@"0%li", labs(hours)];
    } else {
        hoursStr = [ @(labs(hours)) stringValue];
    }
 
    NSString *minutesStr;
    if (labs(minutes) < 10) {
        minutesStr = [[NSString alloc] initWithFormat:@"0%li", labs(minutes)];
    } else {
        minutesStr = [ @(labs(minutes)) stringValue];
    }
    
    NSString *secondsStr;
    if (labs(seconds) < 10) {
        secondsStr = [[NSString alloc] initWithFormat:@"0%li", labs(seconds)];
    } else {
        secondsStr = [ @(labs(seconds)) stringValue];
    }
    
    formattedTime = [NSString stringWithFormat:@"%@ %@:%@:%@", prefix, hoursStr, minutesStr, secondsStr];
    [self.leftTime setText:formattedTime];
}

@end
