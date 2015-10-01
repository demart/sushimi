//
//  FeedbackTableViewCell.h
//  SushimiApp
//
//  Created by Artem Demidovich on 7/25/15.
//  Copyright (c) 2015 AphionSoftware. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "FeedbackModel.h"

@interface FeedbackTableViewCell : UITableViewCell
@property (weak, nonatomic) IBOutlet UILabel *feedbackText;
@property (weak, nonatomic) IBOutlet UILabel *feedbackPhone;
@property (weak, nonatomic) IBOutlet UILabel *feedbackClientName;

-(void)initCell:(FeedbackModel*) fbModel;

@end
