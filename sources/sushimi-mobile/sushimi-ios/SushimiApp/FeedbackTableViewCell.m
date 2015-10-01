//
//  FeedbackTableViewCell.m
//  SushimiApp
//
//  Created by Artem Demidovich on 7/25/15.
//  Copyright (c) 2015 AphionSoftware. All rights reserved.
//

#import "FeedbackTableViewCell.h"

@implementation FeedbackTableViewCell

- (void)awakeFromNib {
//    self.accessoryType = UITableViewCellAccessoryDisclosureIndicator;
    self.selectionStyle = UITableViewCellSelectionStyleNone;
}

- (void)setSelected:(BOOL)selected animated:(BOOL)animated {
    [super setSelected:selected animated:animated];
}

-(void)initCell:(FeedbackModel*) fbModel {
    self.feedbackClientName.text = fbModel.name;
    self.feedbackPhone.text = fbModel.phone;
    self.feedbackText.text = fbModel.text;
    
}

@end
