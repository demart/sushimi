//
//  ContactDeliveryTimeCellTableViewCell.m
//  SushimiApp
//
//  Created by Artem Demidovich on 5/6/15.
//  Copyright (c) 2015 AphionSoftware. All rights reserved.
//

#import "ContactDeliveryTimeCell.h"
#import "TDSemiModal.h"
#import "OrderManager.h"

@implementation ContactDeliveryTimeCell

NSObject *_cartController;
UIView *_parentView;

- (void)awakeFromNib {
    self.selectionStyle = UITableViewCellSelectionStyleNone;
    
    // DATE PICKER
    self.datePickerView = [[TDDatePickerController alloc]
                      initWithNibName:@"TDDatePickerController"
                      bundle:nil];
    self.datePickerView.delegate = self;
}

- (void)setSelected:(BOOL)selected animated:(BOOL)animated {
    [super setSelected:selected animated:animated];
}


-(void)touchesBegan:(NSSet *)touches withEvent:(UIEvent *)event {
    [self showDateTimePicker];
    [super touchesBegan:touches withEvent:event];
}

-(void)initCell: (RegisterOrderModel *) registerOrderModel withParentView:(UIView *) parentView withLabel:(NSString *)label {
    [self.deliveryTimeLabel setText:label];
    self.registerOrderModel = registerOrderModel;
    _parentView = parentView;
    [self updateCell];
}


-(void)updateCell {
    if ([[OrderManager sharedInstance] getRegisterOrderModel].deliveryTime < 1) {
        self.deliveryTime.text = @"Укажите время...";
    } else {
        NSDate* date = [NSDate dateWithTimeIntervalSince1970:([[OrderManager sharedInstance] getRegisterOrderModel].deliveryTime.longLongValue / 1000)];
        NSDateFormatter *_formatter=[[NSDateFormatter alloc]init];
        [_formatter setDateFormat:@"dd.MM.yyyy HH:mm:ss"];
        self.deliveryTime.text = [_formatter stringFromDate:date];
    }
}

#pragma mark User Actions

-(void)showDateTimePicker {
    [self presentSemiModalViewController:self.datePickerView inView:_parentView];
}


#pragma mark -
#pragma mark Date Picker Delegate

-(void)datePickerSetDate:(TDDatePickerController*)viewController {
    [self dismissSemiModalViewController:self.datePickerView];
    [[OrderManager sharedInstance] getRegisterOrderModel].deliveryTime = [NSNumber numberWithUnsignedLongLong:[viewController.datePicker.date  timeIntervalSince1970] * 1000];
    [self updateCell];
}

-(void)datePickerClearDate:(TDDatePickerController*)viewController {
    [self dismissSemiModalViewController:self.datePickerView];
    [[OrderManager sharedInstance] getRegisterOrderModel].deliveryTime = 0;
    [self updateCell];
}

-(void)datePickerCancel:(TDDatePickerController*)viewController {
    [self dismissSemiModalViewController:self.datePickerView];
}



- (void) presentSemiModalViewController:(TDSemiModalViewController*)vc
                                 inView:(UIView *)rootView {
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
    
    if ([self.registerOrderModel.delivery isEqualToString:@"SELF_SERVICE"]){
        NSTimeInterval minInterval =  30 * 60;
        self.datePickerView.datePicker.date = [[NSDate date] dateByAddingTimeInterval:minInterval];
        [self.datePickerView.datePicker setMinimumDate:[[NSDate date] dateByAddingTimeInterval:minInterval]];
        NSTimeInterval maxInterval = 14 * 24 * 60 * 60;
        [self.datePickerView.datePicker setMaximumDate:[[NSDate date] dateByAddingTimeInterval:maxInterval]];
    } else {
        NSTimeInterval minInterval =  90 * 60;
        self.datePickerView.datePicker.date = [[NSDate date] dateByAddingTimeInterval:minInterval];
        [self.datePickerView.datePicker setMinimumDate:[[NSDate date] dateByAddingTimeInterval:minInterval]];
        NSTimeInterval maxInterval = 14 * 24 * 60 * 60;
        [self.datePickerView.datePicker setMaximumDate:[[NSDate date] dateByAddingTimeInterval:maxInterval]];
    }
    [self updateCell];
}

-(void) dismissSemiModalViewController:(TDSemiModalViewController*)vc {
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
