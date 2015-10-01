//
//  FeedbackComboboxFieldTableViewCell.m
//  SushimiApp
//
//  Created by Artem Demidovich on 7/28/15.
//  Copyright (c) 2015 AphionSoftware. All rights reserved.
//

#import "FeedbackComboboxFieldTableViewCell.h"

#import "TDArtemPicker/TDPickerModal.h"
#import "FeedbackCityModel.h"
#import "FeedbackTypeModel.h"
#import "FeedbackRestaurantModel.h"

@implementation FeedbackComboboxFieldTableViewCell

- (void)awakeFromNib {
    self.dataPickerView = [[TDPickerController alloc] initWithNibName:@"TDPickerController" bundle:nil];
    self.dataPickerView.delegate = self;
}

- (void)setSelected:(BOOL)selected animated:(BOOL)animated {
    [super setSelected:selected animated:animated];
}

- (IBAction)showComboboxAction:(id)sender {
    [self presentSemiModalViewController:self.dataPickerView inView:self.parentView.window];
}

// The number of columns of data
- (NSInteger)numberOfComponentsInPickerView:(UIPickerView *)pickerView {
    return 1;
}

// The number of rows of data
- (NSInteger)pickerView:(UIPickerView *)pickerView numberOfRowsInComponent:(NSInteger)component {
    if ([self.fbFieldType isEqual:@"TYPE"]) {
        return self.metaInformation.types.count;
    }
    if ([self.fbFieldType isEqual:@"CITY"]) {
        return self.metaInformation.cities.count;
    }
    if ([self.fbFieldType isEqual:@"RESTAURANT"]) {
        for (int i=0; i< self.metaInformation.cities.count; i++) {
            if (self.fbModel.cityId == ((FeedbackCityModel*)self.metaInformation.cities[i]).value) {
                return ((FeedbackCityModel*)self.metaInformation.cities[i]).restaurants.count;
            }
        }
            
    }
    return 0;
}

// The data to return for the row and component (column) that's being passed in
- (NSString*)pickerView:(UIPickerView *)pickerView titleForRow:(NSInteger)row forComponent:(NSInteger)component {
    if ([self.fbFieldType isEqual:@"TYPE"]) {
        return ((FeedbackTypeModel*)self.metaInformation.types[row]).name;
    }
    if ([self.fbFieldType isEqual:@"CITY"]) {
        return ((FeedbackCityModel*)self.metaInformation.cities[row]).text;
    }
    if ([self.fbFieldType isEqual:@"RESTAURANT"]) {
        for (int i=0; i< self.metaInformation.cities.count; i++) {
            if (self.fbModel.cityId == ((FeedbackCityModel*)self.metaInformation.cities[i]).value) {
                return ((FeedbackRestaurantModel*)((FeedbackCityModel*)self.metaInformation.cities[i]).restaurants[row]).text;
            }
        }
    }
    return @"";
}


- (void)pickerView:(UIPickerView *)pickerView didSelectRow:(NSInteger)row inComponent:(NSInteger)component {
}



-(void) initCell:(FeedbackRegistrationModel*)model withFieldType:(NSString*)type withTextLabel:(NSString*) label withButtonLabel:(NSString*) buttonLabel withButtonColor:(UIColor*) buttonColor withParentView:(UIView *) parentView withMetaInformation:(FeedbackMetaInformationModel*) metaInfo  withParentController:(UITableViewController*) controller {
    self.fbFieldType = type;
    self.parentView = parentView;
    self.fbLabelField.text = label;
    self.metaInformation = metaInfo;
    self.controller = controller;
    //[self.dataPickerView.dataPicker reloadAllComponents];
    self.fbModel = model;
    
    bool found = NO;
    
    if ([self.fbFieldType isEqual:@"TYPE"]) {
        for (int i=0; i < self.metaInformation.types.count; i++) {
            if ([self.fbModel.type isEqualToString:((FeedbackTypeModel*)self.metaInformation.types[i]).value]) {
                [self.fbShowComboboxButton setTitle:((FeedbackTypeModel*)self.metaInformation.types[i]).name forState:UIControlStateNormal];
                [self.dataPickerView.dataPicker selectRow:i inComponent:0 animated:YES];
                found = YES;
            }
        }
    }
    
    if ([self.fbFieldType isEqual:@"CITY"]) {
        for (int i=0; i < self.metaInformation.cities.count; i++) {
            if (self.fbModel.cityId == ((FeedbackCityModel*)self.metaInformation.cities[i]).value) {
                [self.fbShowComboboxButton setTitle:((FeedbackCityModel*)self.metaInformation.cities[i]).text forState:UIControlStateNormal];
                [self.dataPickerView.dataPicker selectRow:i inComponent:0 animated:YES];
                found = YES;
            }
        }
    }
    
    
    if ([self.fbFieldType isEqual:@"RESTAURANT"]) {
        for (int i=0; i < self.metaInformation.cities.count; i++) {
            if (self.fbModel.cityId == ((FeedbackCityModel*)self.metaInformation.cities[i]).value) {
                for (int z=0; z < ((FeedbackCityModel*)self.metaInformation.cities[i]).restaurants.count; z++) {
                    if (((FeedbackRestaurantModel*)((FeedbackCityModel*)self.metaInformation.cities[i]).restaurants[z]).value == self.fbModel.placeId) {
                        [self.dataPickerView.dataPicker selectRow:z inComponent:0 animated:YES];
                        [self.fbShowComboboxButton setTitle:((FeedbackRestaurantModel*)((FeedbackCityModel*)self.metaInformation.cities[i]).restaurants[z]).text forState:UIControlStateNormal];
                        found = YES;
                    }
                    
                }
            }
        }
    }
    
    
    if (found == NO) {
        [self.fbShowComboboxButton setTitle:buttonLabel forState:UIControlStateNormal];
        [self.fbShowComboboxButton setTitleColor:buttonColor forState:UIControlStateNormal];
        [self.fbShowComboboxButton setTitleColor:buttonColor forState:UIControlStateSelected];
    }
}

-(void)dataPickerSetValue:(TDPickerController*)viewController {
    [self dismissSemiModalViewController:self.dataPickerView];
    // refresh table
    NSInteger row = [self.dataPickerView.dataPicker selectedRowInComponent:0];
    if ([self.fbFieldType isEqual:@"TYPE"]) {
        if (self.metaInformation.types != nil && self.metaInformation.types.count > 0) {
            self.fbModel.type = ((FeedbackTypeModel*)self.metaInformation.types[row]).value;
            [self.fbShowComboboxButton setTitle:((FeedbackTypeModel*)self.metaInformation.types[row]).name forState:UIControlStateNormal];
        }
    }
    if ([self.fbFieldType isEqual:@"CITY"]) {
        if (self.metaInformation.cities != nil && self.metaInformation.cities.count > 0) {
            self.fbModel.cityId = ((FeedbackCityModel*)self.metaInformation.cities[row]).value;
            [self.fbShowComboboxButton setTitle:((FeedbackCityModel*)self.metaInformation.cities[row]).text forState:UIControlStateNormal];
        }
    }
    if ([self.fbFieldType isEqual:@"RESTAURANT"]) {
        if (self.metaInformation.cities != nil && self.metaInformation.cities.count > 0) {
            for (int i=0; i< self.metaInformation.cities.count; i++) {
                if (self.fbModel.cityId == ((FeedbackCityModel*)self.metaInformation.cities[i]).value) {
                    self.fbModel.placeId = ((FeedbackRestaurantModel*)((FeedbackCityModel*)self.metaInformation.cities[i]).restaurants[row]).value;
                    [self.fbShowComboboxButton setTitle:((FeedbackRestaurantModel*)((FeedbackCityModel*)self.metaInformation.cities[i]).restaurants[row]).text forState:UIControlStateNormal];
                }
            }
        }
    }
    
    [self.controller performSelector:@selector(reloadTableView)];
}

-(void)dataPickerClearValue:(TDPickerController*)viewController {
    [self dismissSemiModalViewController:self.dataPickerView];
    // refresh table
    [self.controller performSelector:@selector(reloadTableView)];
}

-(void)dataPickerCancel:(TDPickerController*)viewController {
    [self dismissSemiModalViewController:self.dataPickerView];
    [self.controller performSelector:@selector(reloadTableView)];
    // refresh table
}


- (void) presentSemiModalViewController:(TDPickerModalViewController*)vc inView:(UIView *)rootView {
    UIView* modalView = vc.view;
    UIView* coverView = vc.coverView;
    
    coverView.frame = rootView.bounds;
    coverView.alpha = 0.0f;
    modalView.frame = rootView.bounds;
    modalView.center = self.offscreenCenter;
    [rootView addSubview:coverView];
    [rootView addSubview:modalView];
    [UIView animateWithDuration:.6 animations:^{
        modalView.frame = CGRectMake(0,
                                     0,
                                     modalView.frame.size.width,
                                     modalView.frame.size.height);
        coverView.alpha = 0.5;
    }];
}

-(void) dismissSemiModalViewController:(TDPickerModalViewController*)vc {
    double animationDelay = 0.7;
    UIView* modalView = vc.view;
    UIView* coverView = vc.coverView;
    
    [UIView animateWithDuration:animationDelay animations:^{
        modalView.center = self.offscreenCenter;
        coverView.alpha = 0.0f;
    } completion:^(BOOL finished) {
        if (finished) {
            [coverView removeFromSuperview];
            [modalView removeFromSuperview];
        }
    }];
}

- (CGPoint) offscreenCenter {
    CGPoint offScreenCenter = CGPointZero;
    UIDeviceOrientation orientation = [[UIDevice currentDevice] orientation];
    CGSize offSize = UIScreen.mainScreen.bounds.size;
    if(orientation == UIInterfaceOrientationLandscapeLeft
       || orientation == UIInterfaceOrientationLandscapeRight) {
        offScreenCenter = CGPointMake(offSize.height / 2.0, offSize.width * 1.5);
    } else {
        offScreenCenter = CGPointMake(offSize.width / 2.0, offSize.height * 1.5);
    }
    return offScreenCenter;
}


@end
