//
//  FeedbackTextFieldTableViewCell.h
//  SushimiApp
//
//  Created by Artem Demidovich on 7/27/15.
//  Copyright (c) 2015 AphionSoftware. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "FeedbackRegistrationModel.h"

@interface FeedbackTextFieldTableViewCell :  UITableViewCell<UITextFieldDelegate>
@property (weak, nonatomic) IBOutlet UILabel *fbLabelField;
@property (weak, nonatomic) IBOutlet UITextField *fbTextField;

@property FeedbackRegistrationModel *fbModel;
@property NSString *fbFieldType;


-(void) initCell:(FeedbackRegistrationModel*)model withFieldType:(NSString*)type withTextLabel:(NSString*) label withKeyboardType:(UIKeyboardType) keyboardType;

@end
