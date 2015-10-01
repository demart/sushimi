//
//  ContactTextFieldCell.m
//  SushimiApp
//
//  Created by Artem Demidovich on 5/4/15.
//  Copyright (c) 2015 AphionSoftware. All rights reserved.
//

#import "ContactTextFieldCell.h"
#import "PhoneNumberFormatter.h"
#import "CartManager.h"


@implementation ContactTextFieldCell

UIToolbar *numberToolbar;
UIBarButtonItem *orderSumInfoButton;
PhoneNumberFormatter *phoneNumberFormatter;

- (void)awakeFromNib {
    [self.cellTextField addTarget:self action:@selector(fieldUpdated:) forControlEvents:UIControlEventEditingChanged];
    self.selectionStyle = UITableViewCellSelectionStyleNone;

    phoneNumberFormatter = [[PhoneNumberFormatter alloc] init];
    [self.cellTextField addTarget:self
                        action:@selector(autoFormatTextField:)
                        forControlEvents:UIControlEventEditingChanged];
    
    self.cellTextField.delegate = self;
    
    numberToolbar = [[UIToolbar alloc]initWithFrame:CGRectMake(0, 0, 320, 50)];
    orderSumInfoButton = [[UIBarButtonItem alloc]initWithTitle:@"" style:UIBarButtonItemStylePlain target:self action:@selector(cancelNumberPad)];
    
    numberToolbar.items = @[
                            orderSumInfoButton,
                            [[UIBarButtonItem alloc]initWithBarButtonSystemItem:UIBarButtonSystemItemFlexibleSpace target:nil action:nil],
                            [[UIBarButtonItem alloc]initWithTitle:@"Готово" style:UIBarButtonItemStyleDone target:self action:@selector(doneWithNumberPad)]];
    [numberToolbar sizeToFit];
    self.cellTextField.inputAccessoryView = numberToolbar;
}

- (BOOL)textFieldShouldReturn:(UITextField *)theTextField {
    if (theTextField == self.cellTextField) {
        [theTextField resignFirstResponder];
    }
    return YES;
}

-(void) prepareCancelButton {
    if ([self.fieldType isEqualToString:@"cash"]) {
        NSInteger orderSum = [[CartManager sharedInstance] getCartTotalSumWithMobileDiscount];
        [orderSumInfoButton setTitle:[[NSString alloc] initWithFormat:@"Будет без сдачи: %li тнг.", (long)orderSum]];
    } else {
        [orderSumInfoButton setTitle:nil];
    }
}

-(void)cancelNumberPad{
    NSInteger orderSum = [[CartManager sharedInstance] getCartTotalSumWithMobileDiscount];
    [self.cellTextField setText:[@(orderSum) stringValue]];
    [self.cellTextField resignFirstResponder];
    [self fieldUpdated:self.cellTextField];
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
    
    
    if ([self.fieldType isEqualToString:@"personCount"]) {
        NSCharacterSet *nonNumberSet = [[NSCharacterSet decimalDigitCharacterSet] invertedSet];
        NSString *filtered = [[self.cellTextField.text componentsSeparatedByCharactersInSet:nonNumberSet] componentsJoinedByString:@""];
        self.cellTextField.text = filtered;
        
        if (self.cellTextField.text.length > 2)
            self.cellTextField.text = [self.cellTextField.text substringToIndex:2];
    }
    

    if ([self.fieldType isEqualToString:@"cash"]) {
        NSCharacterSet *nonNumberSet = [[NSCharacterSet decimalDigitCharacterSet] invertedSet];
        NSString *filtered = [[self.cellTextField.text componentsSeparatedByCharactersInSet:nonNumberSet] componentsJoinedByString:@""];
        self.cellTextField.text = filtered;
 
        if (self.cellTextField.text.length > 5)
            self.cellTextField.text = [self.cellTextField.text substringToIndex:5];
    }
    
    [self fieldUpdated:self.cellTextField];
}


- (void)setSelected:(BOOL)selected animated:(BOOL)animated {
    [super setSelected:selected animated:animated];
}


-(void)initCell: (RegisterOrderModel *) registerOrderModel withField:(NSString *)fieldType withLabelText:(NSString *)text withKeyboardType:(UIKeyboardType) keyboardType{
    self.fieldType = fieldType;
    self.registerOrderModel = registerOrderModel;
    [self.cellLabel setText:text];
    [self setOrderModelFieldText];
    [self.cellTextField setKeyboardType:keyboardType];
    [self prepareCancelButton];
}

-(void)setOrderModelFieldText {
    // Person
    if ([self.fieldType  isEqual: @"fullname"])
        [self.cellTextField setText:self.registerOrderModel.fullname];
    if ([self.fieldType  isEqual: @"phone"])
        [self.cellTextField setText:self.registerOrderModel.phone];
    if ([self.fieldType  isEqual: @"email"])
        [self.cellTextField setText:self.registerOrderModel.email];
    if ([self.fieldType  isEqual: @"comment"])
        [self.cellTextField setText:self.registerOrderModel.comment];
    if ([self.fieldType  isEqual: @"cash"]) {
        if (self.registerOrderModel.cash > 0) {
            [self.cellTextField setText:[@(self.registerOrderModel.cash) stringValue]];
        } else {
            [self.cellTextField setText:@""];
        }
    }
    
    if ([self.fieldType  isEqual: @"personCount"]) {
        if (self.registerOrderModel.personCount > 0) {
            [self.cellTextField setText:[@(self.registerOrderModel.personCount) stringValue]];
        } else {
            [self.cellTextField setText:@""];
        }
    }
    
    // Address
    if ([self.fieldType  isEqual: @"addressBuilding"])
        [self.cellTextField setText:self.registerOrderModel.address.building];
    if ([self.fieldType  isEqual: @"addressCityName"])
        [self.cellTextField setText:self.registerOrderModel.address.cityName];
    if ([self.fieldType  isEqual: @"addressCorpus"])
        [self.cellTextField setText:self.registerOrderModel.address.corpus];
    if ([self.fieldType  isEqual: @"addressDoorCode"])
        [self.cellTextField setText:self.registerOrderModel.address.doorCode];
    if ([self.fieldType  isEqual: @"addressFlat"])
        [self.cellTextField setText:self.registerOrderModel.address.flat];
    if ([self.fieldType  isEqual: @"addressFloor"])
        [self.cellTextField setText:self.registerOrderModel.address.floor];
    if ([self.fieldType  isEqual: @"addressHouse"])
        [self.cellTextField setText:self.registerOrderModel.address.house];
    if ([self.fieldType  isEqual: @"addressOffice"])
        [self.cellTextField setText:self.registerOrderModel.address.office];
    if ([self.fieldType  isEqual: @"addressPorch"])
        [self.cellTextField setText:self.registerOrderModel.address.porch];
    if ([self.fieldType  isEqual: @"addressRoom"])
        [self.cellTextField setText:self.registerOrderModel.address.room];
    if ([self.fieldType  isEqual: @"addressStreetName"])
        [self.cellTextField setText:self.registerOrderModel.address.streetName];
}


-(void)fieldUpdated:(UITextField *) sender {
    // Person
    if ([self.fieldType  isEqual: @"fullname"])
        self.registerOrderModel.fullname = self.cellTextField.text;
    if ([self.fieldType  isEqual: @"phone"])
        self.registerOrderModel.phone = self.cellTextField.text;
    if ([self.fieldType  isEqual: @"email"])
        self.registerOrderModel.email = self.cellTextField.text;
    if ([self.fieldType  isEqual: @"comment"])
        self.registerOrderModel.comment = self.cellTextField.text;
    
    if ([self.fieldType  isEqual: @"cash"]) {
        self.registerOrderModel.cash = [self.cellTextField.text integerValue];
    }
    
    if ([self.fieldType  isEqual: @"personCount"]) {
        self.registerOrderModel.personCount = [self.cellTextField.text integerValue];
    }
    
    // Address
    if ([self.fieldType  isEqual: @"addressBuilding"])
        self.registerOrderModel.address.building = self.cellTextField.text;
    if ([self.fieldType  isEqual: @"addressCityName"])
        self.registerOrderModel.address.cityName = self.cellTextField.text;
    if ([self.fieldType  isEqual: @"addressCorpus"])
        self.registerOrderModel.address.corpus = self.cellTextField.text;
    if ([self.fieldType  isEqual: @"addressDoorCode"])
        self.registerOrderModel.address.doorCode = self.cellTextField.text;
    if ([self.fieldType  isEqual: @"addressFlat"])
        self.registerOrderModel.address.flat = self.cellTextField.text;
    if ([self.fieldType  isEqual: @"addressFloor"])
        self.registerOrderModel.address.floor = self.cellTextField.text;
    if ([self.fieldType  isEqual: @"addressHouse"])
        self.registerOrderModel.address.house = self.cellTextField.text;
    if ([self.fieldType  isEqual: @"addressOffice"])
        self.registerOrderModel.address.office = self.cellTextField.text;
    if ([self.fieldType  isEqual: @"addressPorch"])
        self.registerOrderModel.address.porch = self.cellTextField.text;
    if ([self.fieldType  isEqual: @"addressRoom"])
        self.registerOrderModel.address.room = self.cellTextField.text;
    if ([self.fieldType  isEqual: @"addressStreetName"])
        self.registerOrderModel.address.streetName = self.cellTextField.text;
}


@end
