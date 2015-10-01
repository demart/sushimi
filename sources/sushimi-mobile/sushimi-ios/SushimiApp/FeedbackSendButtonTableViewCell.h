//
//  FeedbackSendButtonTableViewCell.h
//  SushimiApp
//
//  Created by Artem Demidovich on 7/28/15.
//  Copyright (c) 2015 AphionSoftware. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface FeedbackSendButtonTableViewCell : UITableViewCell

@property UITableViewController* controller;

-(void) initCell:(UITableViewController*)controller;

- (IBAction)sendFeedbackAction:(UIButton *)sender;

@end
