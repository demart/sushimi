//
//  UIViewController+TDSemiModalExtension.h
//  TDSemiModal
//
//  Created by Nathan  Reed on 18/10/10.
//  Copyright 2010 Nathan Reed. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "TDPickerModalViewController.h"

@interface UIViewController (TDPickerModalExtension)

- (void)presentPickerModalViewController:(TDPickerModalViewController*)vc;
- (void)presentPickerModalViewController:(TDPickerModalViewController*)vc
                                inView:(UIView *)rootView;
- (void)dismissPickerModalViewController:(TDPickerModalViewController*)vc;

@end
