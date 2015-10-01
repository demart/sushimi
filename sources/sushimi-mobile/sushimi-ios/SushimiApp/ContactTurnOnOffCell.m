//
//  ContactTurnOnOffCell.m
//  SushimiApp
//
//  Created by Artem Demidovich on 5/5/15.
//  Copyright (c) 2015 AphionSoftware. All rights reserved.
//

#import "ContactTurnOnOffCell.h"

@implementation ContactTurnOnOffCell

static UIColor *orangeColor;

- (void)awakeFromNib {
    self.selectionStyle = UITableViewCellSelectionStyleNone;
    
    orangeColor = [UIColor colorWithRed:255/255.0f green:153.0f/255.0f blue:0.0f/255.0f alpha:1.0f];
    self.deliveryOnTimeSegment.tintColor = orangeColor;
    [self.deliveryOnTimeSegment setTitleTextAttributes:@{NSForegroundColorAttributeName:[UIColor blackColor]} forState:UIControlStateNormal];
    [self.deliveryOnTimeSegment setTitleTextAttributes:@{NSForegroundColorAttributeName:[UIColor whiteColor]} forState:UIControlStateSelected];
}

- (void)setSelected:(BOOL)selected animated:(BOOL)animated {
    [super setSelected:selected animated:animated];
}

@end
