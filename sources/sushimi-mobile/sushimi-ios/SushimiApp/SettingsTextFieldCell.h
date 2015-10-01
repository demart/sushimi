//
//  SettingsTextFieldCell.h
//  SushimiApp
//
//  Created by Artem Demidovich on 5/6/15.
//  Copyright (c) 2015 AphionSoftware. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "Settings.h"

@interface SettingsTextFieldCell : UITableViewCell

@property (weak, nonatomic) IBOutlet UILabel *cellLabel;
@property (weak, nonatomic) IBOutlet UITextField *cellTextField;


-(void)initCell:(Settings*)settings withField:(NSString *)fieldTypeName withLabelText:(NSString *)text withKeyboardType:(UIKeyboardType) keyboardType;

@property Settings* localSettings;
@property NSString* fieldType;


@end
