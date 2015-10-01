//
//  RestaurantTableViewCell.m
//  SushimiApp
//
//  Created by Artem Demidovich on 2/26/15.
//  Copyright (c) 2015 AphionSoftware. All rights reserved.
//

#import "RestaurantTableViewCell.h"

@implementation RestaurantTableViewCell

- (void)awakeFromNib {
}

- (void)setSelected:(BOOL)selected animated:(BOOL)animated {
    [super setSelected:selected animated:animated];
}


-(void)initCell:(Restaurant*)model {
    if (model == nil) return;
    
    self.title.text = model.title;
    self.selectionStyle = UITableViewCellSelectionStyleNone;
    
}

@end
