//
//  OrdersDetailCell.m
//  SushimiApp
//
//  Created by Artem Demidovich on 5/8/15.
//  Copyright (c) 2015 AphionSoftware. All rights reserved.
//

#import "OrdersDetailCell.h"

@implementation OrdersDetailCell

- (void)awakeFromNib {
    self.accessoryType = UITableViewCellAccessoryDisclosureIndicator;
}

- (void)setSelected:(BOOL)selected animated:(BOOL)animated {
    [super setSelected:selected animated:animated];
}


-(void) initCell:(OrderModel *)model {
    self.orderNumber.text = [[NSString alloc] initWithFormat:@"№ %@", model.orderNumber];
    self.orderPersonName.text = model.personName;
    
    NSString *orderSum = [[NSString alloc] initWithFormat:@"%li ₸", model.orderSum];
    if (orderSum.length > 5) {
        [orderSum substringToIndex:orderSum.length - 5];
    orderSum = [[NSString alloc] initWithFormat:@"%@ %@", [orderSum substringToIndex:orderSum.length - 5]  ,[orderSum substringFromIndex:orderSum.length - 5]];
    }
    self.orderSum.text = orderSum;
    
    NSDate* date = [NSDate dateWithTimeIntervalSince1970:(model.orderTime.longLongValue / 1000)];
    NSDateFormatter *_formatter=[[NSDateFormatter alloc]init];
    [_formatter setDateFormat:@"HH:mm   dd.MM.yyyy"];
    self.orderTime.text = [_formatter stringFromDate:date];
    self.orderStatus.text = [self buildStatusString:model.orderStatus];
}


-(NSString*) buildStatusString:(NSString*) status {
    if ([status isEqualToString:@"NOT_PROCESSED"] ||
        [status isEqualToString:@"NOT_PROCESSED_MOBI"])
        return @"Заказ зарегистрирован";
    if ([status isEqualToString:@"PROCESSED"] ||
        [status isEqualToString:@"PROCESSED_MOBI"])
        return @"Заказ обработан";
    if ([status isEqualToString:@"REGISTERED"])
        return @"Заказ принят";
    if ([status isEqualToString:@"WAITING_FOR_PRODUCING"])
        return @"Заказ в очереди";
    if ([status isEqualToString:@"ON_PRODUCING"])
        return @"Заказ готовиться";
    if ([status isEqualToString:@"WAITING_FOR_DELIVERY"])
        return @"Заказ ожидает доставки";
    if ([status isEqualToString:@"ON_DELIVERY"])
        return @"Заказ на доставке";
    if ([status isEqualToString:@"DELIVERED"])
        return @"Заказ доставлен";
    if ([status isEqualToString:@"CANCELED"])
        return @"Заказ отменен";
    if ([status isEqualToString:@"RETURNED"])
        return @"Заказ отозван";
    return @"Информация не доступна";
}


@end
