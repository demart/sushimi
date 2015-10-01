//
//  FeedbackTextViewTableViewCell.m
//  SushimiApp
//
//  Created by Artem Demidovich on 7/28/15.
//  Copyright (c) 2015 AphionSoftware. All rights reserved.
//

#import "FeedbackTextViewTableViewCell.h"

@implementation FeedbackTextViewTableViewCell

UIToolbar *numberToolbar;

- (void)awakeFromNib {
    numberToolbar = [[UIToolbar alloc]initWithFrame:CGRectMake(0, 0, 320, 50)];
    numberToolbar.items = @[
                            //orderSumInfoButton,
                            [[UIBarButtonItem alloc]initWithBarButtonSystemItem:UIBarButtonSystemItemFlexibleSpace target:nil action:nil],
                            [[UIBarButtonItem alloc]initWithTitle:@"Готово" style:UIBarButtonItemStyleDone target:self action:@selector(doneWithNumberPad)]];
    [numberToolbar sizeToFit];
    self.fbTextViewField.inputAccessoryView = numberToolbar;
    
    self.fbTextViewField.delegate = self;
    
}

-(void)doneWithNumberPad{
    [self.fbTextViewField resignFirstResponder];
}

- (void)setSelected:(BOOL)selected animated:(BOOL)animated {
    [super setSelected:selected animated:animated];
}

-(void) initCell:(FeedbackRegistrationModel*)model withFieldType:(NSString*)type withTextLabel:(NSString*) label withKeyboardType:(UIKeyboardType) keyboardType{
    self.model = model;
    self.fbFieldLabel.text = label;
    [self.fbTextViewField setKeyboardType:keyboardType];
    [self.fbTextViewField setText:self.model.text];
}

- (BOOL)textView:(UITextView *)textView shouldChangeTextInRange:(NSRange)range replacementText:(NSString *)text {
    self.model.text = self.fbTextViewField.text;
    return YES;
}

@end
