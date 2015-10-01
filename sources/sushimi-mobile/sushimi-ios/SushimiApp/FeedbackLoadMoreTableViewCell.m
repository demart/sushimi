//
//  FeedbackLoadMoreTableViewCell.m
//  SushimiApp
//
//  Created by Artem Demidovich on 7/25/15.
//  Copyright (c) 2015 AphionSoftware. All rights reserved.
//

#import "FeedbackLoadMoreTableViewCell.h"

@implementation FeedbackLoadMoreTableViewCell

- (void)awakeFromNib {
    self.accessoryType = UITableViewCellAccessoryNone;
    self.selectionStyle = UITableViewCellSelectionStyleNone;
}

- (void)setSelected:(BOOL)selected animated:(BOOL)animated {
    [super setSelected:selected animated:animated];
}


-(void) initCell:(UITableViewController*) controller {
    self.parent = controller;
}


- (IBAction)loadMoreFeedbacks:(UIButton *)sender {
    [self.parent performSelector:@selector(loadMoreFeedbacks)];
}


@end
