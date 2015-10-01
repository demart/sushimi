//
//  TDDatePickerController.h
//
//  Created by Nathan  Reed on 30/09/10.
//  Copyright 2010 Nathan Reed. All rights reserved.
//

#import <UIKit/UIKit.h>
#import	"TDPickerModal.h"

@protocol TDPickerControllerDelegate;

@interface TDPickerController : TDPickerModalViewController<UIPickerViewDataSource, UIPickerViewDelegate>

@property (weak) id<TDPickerControllerDelegate> delegate;
@property (weak) IBOutlet UIPickerView* dataPicker;
@property (weak) IBOutlet UIToolbar *toolbar;

-(IBAction)saveDataEdit:(id)sender;
-(IBAction)clearDataEdit:(id)sender;
-(IBAction)cancelDataEdit:(id)sender;

@end

@protocol TDPickerControllerDelegate <NSObject>

- (void)dataPickerSetValue:(TDPickerController*)viewController;
- (void)dataPickerClearValue:(TDPickerController*)viewController;
- (void)dataPickerCancel:(TDPickerController*)viewController;

- (NSInteger)numberOfComponentsInPickerView:(UIPickerView *)pickerView;
- (NSInteger)pickerView:(UIPickerView *)pickerView numberOfRowsInComponent:(NSInteger)component;
- (NSString*)pickerView:(UIPickerView *)pickerView titleForRow:(NSInteger)row forComponent:(NSInteger)component;
- (void)pickerView:(UIPickerView *)pickerView didSelectRow:(NSInteger)row inComponent:(NSInteger)component;

@end

