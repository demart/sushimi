//
//  FeedbackTextFieldTableViewCell.m
//  SushimiApp
//
//  Created by Artem Demidovich on 7/27/15.
//  Copyright (c) 2015 AphionSoftware. All rights reserved.
//

#import "FeedbackTextFieldTableViewCell.h"

#import "PhoneNumberFormatter.h"

@implementation FeedbackTextFieldTableViewCell

UIToolbar *numberToolbar;
PhoneNumberFormatter *phoneNumberFormatter;

- (void)awakeFromNib {
    [self.fbTextField addTarget:self action:@selector(fieldUpdated:) forControlEvents:UIControlEventEditingChanged];
    self.selectionStyle = UITableViewCellSelectionStyleNone;
    
    phoneNumberFormatter = [[PhoneNumberFormatter alloc] init];
    [self.fbTextField addTarget:self
                           action:@selector(autoFormatTextField:)
                 forControlEvents:UIControlEventEditingChanged];
    
    self.fbTextField.delegate = self;
    
    numberToolbar = [[UIToolbar alloc]initWithFrame:CGRectMake(0, 0, 320, 50)];
    numberToolbar.items = @[
                            //orderSumInfoButton,
                            [[UIBarButtonItem alloc]initWithBarButtonSystemItem:UIBarButtonSystemItemFlexibleSpace target:nil action:nil],
                            [[UIBarButtonItem alloc]initWithTitle:@"Готово" style:UIBarButtonItemStyleDone target:self action:@selector(doneWithNumberPad)]];
    [numberToolbar sizeToFit];
    self.fbTextField.inputAccessoryView = numberToolbar;
}

- (BOOL)textFieldShouldReturn:(UITextField *)theTextField {
    if (theTextField == self.fbTextField) {
        [theTextField resignFirstResponder];
    }
    return YES;
}

-(void)doneWithNumberPad{
    [self.fbTextField resignFirstResponder];
}

- (void)setSelected:(BOOL)selected animated:(BOOL)animated {
    [super setSelected:selected animated:animated];
}

- (void)autoFormatTextField:(id)sender {
    if ([self.fbFieldType isEqualToString:@"NAME"]) {
        NSMutableCharacterSet *nonNumberMutableSet = [NSMutableCharacterSet characterSetWithCharactersInString:@" "];
        [nonNumberMutableSet formUnionWithCharacterSet:[NSCharacterSet letterCharacterSet]];
        NSCharacterSet *nonNumberSet = [nonNumberMutableSet invertedSet];
        NSString *filtered = [[self.fbTextField.text componentsSeparatedByCharactersInSet:nonNumberSet] componentsJoinedByString:@""];
        self.fbTextField.text = filtered;
    }
    
    // Phone number
    if ([self.fbFieldType isEqualToString:@"PHONE"]) {
        if (self.fbTextField.text.length > 18)
            self.fbTextField.text = [self.fbTextField.text substringToIndex:18];
        if (self.fbTextField.text.length < 3)
            self.fbTextField.text = @"+7";
        self.fbTextField.text = [phoneNumberFormatter format:self.fbTextField.text withLocale:@"kz"];
    }
    
    // Order Number
    if ([self.fbFieldType isEqualToString:@"ORDER_NUMBER"]) {
        NSCharacterSet *nonNumberSet = [[NSCharacterSet decimalDigitCharacterSet] invertedSet];
        NSString *filtered = [[self.fbTextField.text componentsSeparatedByCharactersInSet:nonNumberSet] componentsJoinedByString:@""];
        self.fbTextField.text = filtered;
        
        if (self.fbTextField.text.length > 10)
            self.fbTextField.text = [self.fbTextField.text substringToIndex:10];
    }
    
    [self fieldUpdated:self.fbTextField];
}

-(void) initCell:(FeedbackRegistrationModel*)model withFieldType:(NSString*)type withTextLabel:(NSString*) label withKeyboardType:(UIKeyboardType) keyboardType{
    [self.fbLabelField setText:label];
    
    self.fbFieldType = type;
    self.fbModel = model;
    [self setFeedbackModelFieldText];
    [self.fbTextField setKeyboardType:keyboardType];
    
}


-(void)setFeedbackModelFieldText {
    // Person
    if ([self.fbFieldType  isEqual: @"NAME"])
        [self.fbTextField setText:self.fbModel.name];
    if ([self.fbFieldType  isEqual: @"PHONE"])
        [self.fbTextField setText:self.fbModel.phone];
    if ([self.fbFieldType  isEqual: @"ORDER_NUMBER"])
        [self.fbTextField setText:self.fbModel.orderNumber];
}


-(void)fieldUpdated:(UITextField *) sender {
    // Person
    if ([self.fbFieldType  isEqual: @"NAME"])
        self.fbModel.name = self.fbTextField.text;
    if ([self.fbFieldType  isEqual: @"PHONE"]) {
        self.fbModel.phone = self.fbTextField.text;
    }
    if ([self.fbFieldType  isEqual: @"ORDER_NUMBER"])
        self.fbModel.orderNumber = self.fbTextField.text;
}

@end
