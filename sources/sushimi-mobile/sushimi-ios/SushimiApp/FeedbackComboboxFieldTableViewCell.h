//
//  FeedbackComboboxFieldTableViewCell.h
//  SushimiApp
//
//  Created by Artem Demidovich on 7/28/15.
//  Copyright (c) 2015 AphionSoftware. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "FeedbackRegistrationModel.h"
#import "TDArtemPicker/TDPickerController.h"

#import "FeedbackMetaInformationModel.h"

@interface FeedbackComboboxFieldTableViewCell : UITableViewCell<TDPickerControllerDelegate>

@property UITableViewController *controller;
@property UIPickerView* pickerView;
@property TDPickerController* dataPickerView;
@property UIView* parentView;

@property (weak, nonatomic) IBOutlet UILabel *fbLabelField;
@property (weak, nonatomic) IBOutlet UIButton *fbShowComboboxButton;

@property FeedbackRegistrationModel *fbModel;
@property NSString *fbFieldType;
@property FeedbackMetaInformationModel* metaInformation;

- (IBAction)showComboboxAction:(id)sender;

-(void) initCell:(FeedbackRegistrationModel*)model withFieldType:(NSString*)type withTextLabel:(NSString*) label withButtonLabel:(NSString*) buttonLabel withButtonColor:(UIColor*) buttonColor withParentView:(UIView *) parentView withMetaInformation:(FeedbackMetaInformationModel*) metaInfo  withParentController:(UITableViewController*) controller;

@end
