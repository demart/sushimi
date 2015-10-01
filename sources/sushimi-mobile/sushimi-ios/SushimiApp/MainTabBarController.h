//
//  MainTabBarController.h
//  SushimiApp
//
//  Created by Artem Demidovich on 3/4/15.
//  Copyright (c) 2015 AphionSoftware. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "JTNumberScrollAnimatedView.h"

@interface MainTabBarController : UITabBarController

@property (weak, nonatomic) IBOutlet JTNumberScrollAnimatedView *animatedView;
@property UITapGestureRecognizer *discountInfoTap;

+(void) setCartValue:(NSInteger) newValue;

@end
