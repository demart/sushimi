//
//  FeedbackTextViewTableViewCell.h
//  SushimiApp
//
//  Created by Artem Demidovich on 7/28/15.
//  Copyright (c) 2015 AphionSoftware. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "FeedbackRegistrationModel.h"

@interface FeedbackTextViewTableViewCell : UITableViewCell<UITextViewDelegate>
@property (weak, nonatomic) IBOutlet UILabel *fbFieldLabel;
@property (weak, nonatomic) IBOutlet UITextView *fbTextViewField;

@property  FeedbackRegistrationModel* model;

-(void) initCell:(FeedbackRegistrationModel*)model withFieldType:(NSString*)type withTextLabel:(NSString*) label withKeyboardType:(UIKeyboardType) keyboardType;

@end
