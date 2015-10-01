//
//  SettingsTextFieldCell.m
//  SushimiApp
//
//  Created by Artem Demidovich on 5/6/15.
//  Copyright (c) 2015 AphionSoftware. All rights reserved.
//

#import "SettingsTextFieldCell.h"
#import "PhoneNumberFormatter.h"
#import "Settings.h"

@implementation SettingsTextFieldCell

UIToolbar *numberToolbar;
PhoneNumberFormatter *phoneNumberFormatter;

- (void)awakeFromNib {
    self.selectionStyle = UITableViewCellSelectionStyleNone;
    
    phoneNumberFormatter = [[PhoneNumberFormatter alloc] init];
    [self.cellTextField addTarget:self action:@selector(autoFormatTextField:) forControlEvents:UIControlEventEditingChanged];
    
    numberToolbar = [[UIToolbar alloc]initWithFrame:CGRectMake(0, 0, 320, 50)];
    numberToolbar.items = @[
                            [[UIBarButtonItem alloc]initWithBarButtonSystemItem:UIBarButtonSystemItemFlexibleSpace target:nil action:nil],
                            [[UIBarButtonItem alloc]initWithTitle:@"Готово" style:UIBarButtonItemStyleDone target:self action:@selector(doneWithNumberPad)]];
    [numberToolbar sizeToFit];
    self.cellTextField.inputAccessoryView = numberToolbar;
}

- (void)setSelected:(BOOL)selected animated:(BOOL)animated {
    [super setSelected:selected animated:animated];
}

-(void)doneWithNumberPad{
    [self.cellTextField resignFirstResponder];
}


- (void)autoFormatTextField:(id)sender {
    if ([self.fieldType isEqualToString:@"fullname"]) {
        NSMutableCharacterSet *nonNumberMutableSet = [NSMutableCharacterSet characterSetWithCharactersInString:@" "];
        [nonNumberMutableSet formUnionWithCharacterSet:[NSCharacterSet letterCharacterSet]];
        NSCharacterSet *nonNumberSet = [nonNumberMutableSet invertedSet];
        NSString *filtered = [[self.cellTextField.text componentsSeparatedByCharactersInSet:nonNumberSet] componentsJoinedByString:@""];
        self.cellTextField.text = filtered;
    }
    
    if ([self.fieldType isEqualToString:@"phone"]) {
        if (self.cellTextField.text.length > 18)
            self.cellTextField.text = [self.cellTextField.text substringToIndex:18];
        if (self.cellTextField.text.length < 3)
            self.cellTextField.text = @"+7";
        self.cellTextField.text = [phoneNumberFormatter format:self.cellTextField.text withLocale:@"kz"];
    }
    
    [self fieldUpdated:self.cellTextField];
}


-(void)initCell:(Settings*)settings withField:(NSString *)fieldTypeName withLabelText:(NSString *)text withKeyboardType:(UIKeyboardType) keyboardType {
    [self.cellLabel setText:text];
    [self.cellTextField setKeyboardType:keyboardType];
    self.localSettings = settings;
    self.fieldType = fieldTypeName;
    [self setOrderModelFieldText];
}

-(void)setOrderModelFieldText {
    // Person
    if ([self.fieldType  isEqual: @"fullname"])
        [self.cellTextField setText:self.localSettings.fullname];
    if ([self.fieldType  isEqual: @"phone"])
        [self.cellTextField setText:self.localSettings.phone];
    if ([self.fieldType  isEqual: @"email"])
        [self.cellTextField setText:self.localSettings.email];

    // Address
    if ([self.fieldType  isEqual: @"addressBuilding"])
        [self.cellTextField setText:self.localSettings.addressBuilding];
    if ([self.fieldType  isEqual: @"addressCityName"])
        [self.cellTextField setText:self.localSettings.addressCityName];
    if ([self.fieldType  isEqual: @"addressFlat"])
        [self.cellTextField setText:self.localSettings.addressFlat];
    if ([self.fieldType  isEqual: @"addressFloor"])
        [self.cellTextField setText:self.localSettings.addressFloor];
    if ([self.fieldType  isEqual: @"addressHouse"])
        [self.cellTextField setText:self.localSettings.addressHouse];
    if ([self.fieldType  isEqual: @"addressOffice"])
        [self.cellTextField setText:self.localSettings.addressOffice];
    if ([self.fieldType  isEqual: @"addressPorch"])
        [self.cellTextField setText:self.localSettings.addressPorch];
    if ([self.fieldType  isEqual: @"addressRoom"])
        [self.cellTextField setText:self.localSettings.addressRoom];
    if ([self.fieldType  isEqual: @"addressStreetName"])
        [self.cellTextField setText:self.localSettings.addressStreetName];
}


-(void)fieldUpdated:(UITextField *) sender {
    // Person
    if ([self.fieldType  isEqual: @"fullname"])
        self.localSettings.fullname = self.cellTextField.text;
    if ([self.fieldType  isEqual: @"phone"])
        self.localSettings.phone = self.cellTextField.text;
    if ([self.fieldType  isEqual: @"email"])
        self.localSettings.email = self.cellTextField.text;
    
    // Address
    if ([self.fieldType  isEqual: @"addressBuilding"])
        self.localSettings.addressBuilding = self.cellTextField.text;
    if ([self.fieldType  isEqual: @"addressCityName"])
        self.localSettings.addressCityName = self.cellTextField.text;
    if ([self.fieldType  isEqual: @"addressFlat"])
        self.localSettings.addressFlat = self.cellTextField.text;
    if ([self.fieldType  isEqual: @"addressFloor"])
        self.localSettings.addressFloor = self.cellTextField.text;
    if ([self.fieldType  isEqual: @"addressHouse"])
        self.localSettings.addressHouse = self.cellTextField.text;
    if ([self.fieldType  isEqual: @"addressOffice"])
        self.localSettings.addressOffice = self.cellTextField.text;
    if ([self.fieldType  isEqual: @"addressPorch"])
        self.localSettings.addressPorch = self.cellTextField.text;
    if ([self.fieldType  isEqual: @"addressRoom"])
        self.localSettings.addressRoom = self.cellTextField.text;
    if ([self.fieldType  isEqual: @"addressStreetName"])
        self.localSettings.addressStreetName = self.cellTextField.text;
}

@end
