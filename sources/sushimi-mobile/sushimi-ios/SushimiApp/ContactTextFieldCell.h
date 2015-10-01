//
//  ContactTextFieldCell.h
//  SushimiApp
//
//  Created by Artem Demidovich on 5/4/15.
//  Copyright (c) 2015 AphionSoftware. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "OrderManager.h"
#import "RegisterOrderModel.h"

@interface ContactTextFieldCell : UITableViewCell<UITextFieldDelegate>


@property (weak, nonatomic) IBOutlet UILabel *cellLabel;
@property (weak, nonatomic) IBOutlet UITextField *cellTextField;

-(void)initCell: (RegisterOrderModel *) registerOrderModel withField:(NSString *)fieldType withLabelText:(NSString *)text withKeyboardType:(UIKeyboardType) keyboardType;

@property RegisterOrderModel* registerOrderModel;
@property NSString* fieldType;

@end
