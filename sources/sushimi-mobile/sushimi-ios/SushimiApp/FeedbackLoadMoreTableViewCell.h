//
//  FeedbackLoadMoreTableViewCell.h
//  SushimiApp
//
//  Created by Artem Demidovich on 7/25/15.
//  Copyright (c) 2015 AphionSoftware. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface FeedbackLoadMoreTableViewCell : UITableViewCell

@property UITableViewController* parent;

- (IBAction)loadMoreFeedbacks:(UIButton *)sender;


-(void) initCell:(UITableViewController*) controller;

@end
