//
//  FeedbackSendButtonTableViewCell.m
//  SushimiApp
//
//  Created by Artem Demidovich on 7/28/15.
//  Copyright (c) 2015 AphionSoftware. All rights reserved.
//

#import "FeedbackSendButtonTableViewCell.h"

@implementation FeedbackSendButtonTableViewCell

- (void)awakeFromNib {}

- (void)setSelected:(BOOL)selected animated:(BOOL)animated {
    [super setSelected:selected animated:animated];
}

-(void) initCell:(UITableViewController*)controller {
    self.controller = controller;
}

- (IBAction)sendFeedbackAction:(UIButton *)sender {
    [self.controller performSelector:@selector(doSendFeedback)];
}
@end
