//
//  ContactSegmentedCell.m
//  SushimiApp
//
//  Created by Artem Demidovich on 5/4/15.
//  Copyright (c) 2015 AphionSoftware. All rights reserved.
//

#import "ContactSegmentedCell.h"

@implementation ContactSegmentedCell

- (void)awakeFromNib {
    self.selectionStyle = UITableViewCellSelectionStyleNone;
    UIColor *greenColor = [UIColor colorWithRed:102/255.0f
                                        green:204.0f/255.0f
                                         blue:102.0f/255.0f
                                        alpha:1.0f];
    self.cellSegmentField.tintColor = greenColor;
    [self.cellSegmentField setTitleTextAttributes:@{NSForegroundColorAttributeName:[UIColor blackColor]} forState:UIControlStateNormal];
    [self.cellSegmentField setTitleTextAttributes:@{NSForegroundColorAttributeName:[UIColor whiteColor]} forState:UIControlStateSelected];
}

- (void)setSelected:(BOOL)selected animated:(BOOL)animated {
    [super setSelected:selected animated:animated];
}

@end
