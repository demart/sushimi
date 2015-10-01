//
//  TDDatePickerController.m
//
//  Created by Nathan  Reed on 30/09/10.
//  Copyright 2010 Nathan Reed. All rights reserved.
//

#import "TDPickerController.h"

@implementation TDPickerController

-(void)viewDidLoad {
    [super viewDidLoad];
    self.dataPicker.delegate = self;
    self.dataPicker.dataSource = self;
    self.dataPicker.backgroundColor = [UIColor whiteColor];
	// we need to set the subview dimensions or it will not always render correctly
	// http://stackoverflow.com/questions/1088163
	for (UIView* subview in self.dataPicker.subviews) {
		subview.frame = self.dataPicker.bounds;
	}
}

-(BOOL)shouldAutorotate {
    return YES;
}

- (BOOL)shouldAutorotateToInterfaceOrientation:(UIInterfaceOrientation)interfaceOrientation {
    return YES;
}

- (NSUInteger)supportedInterfaceOrientations {
    return UIInterfaceOrientationMaskAll;
}

#pragma mark -
#pragma mark Actions

-(IBAction)saveDataEdit:(id)sender {
    if([self.delegate respondsToSelector:@selector(dataPickerSetValue:)]) {
		[self.delegate dataPickerSetValue:self];
	}
}

-(IBAction)clearDataEdit:(id)sender {
    if([self.delegate respondsToSelector:@selector(dataPickerClearValue:)]) {
		[self.delegate dataPickerClearValue:self];
	}
}

-(IBAction)cancelDataEdit:(id)sender {
	if([self.delegate respondsToSelector:@selector(dataPickerCancel:)]) {
		[self.delegate dataPickerCancel:self];
	} else {
		// just dismiss the view automatically?
	}
}



// The number of columns of data
- (NSInteger)numberOfComponentsInPickerView:(UIPickerView *)pickerView {
    if([self.delegate respondsToSelector:@selector(numberOfComponentsInPickerView:)]) {
        return [self.delegate numberOfComponentsInPickerView:self.dataPicker];
    }
    return 0;
}

// The number of rows of data
- (NSInteger)pickerView:(UIPickerView *)pickerView numberOfRowsInComponent:(NSInteger)component {
    if([self.delegate respondsToSelector:@selector(pickerView:numberOfRowsInComponent:)]) {
        return [self.delegate pickerView:pickerView numberOfRowsInComponent:component];
    }
    return 0;
}

// The data to return for the row and component (column) that's being passed in
- (NSString*)pickerView:(UIPickerView *)pickerView titleForRow:(NSInteger)row forComponent:(NSInteger)component {
    if([self.delegate respondsToSelector:@selector(pickerView:titleForRow:forComponent:)]) {
        return [self.delegate pickerView:pickerView titleForRow:row forComponent:component];
    }
    return @"";
}

- (void)pickerView:(UIPickerView *)pickerView didSelectRow:(NSInteger)row inComponent:(NSInteger)component {
    if([self.delegate respondsToSelector:@selector(pickerView:didSelectRow:inComponent:)]) {
        [self.delegate pickerView:pickerView didSelectRow:row inComponent:component];
    }
}



#pragma mark -
#pragma mark Memory Management

- (void)viewDidUnload {
    [self setToolbar:nil];
    [super viewDidUnload];
	self.dataPicker = nil;
	self.delegate = nil;
}

@end


