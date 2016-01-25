//
//  Constants.m
//  SushimiApp
//
//  Created by Artem Demidovich on 4/16/15.
//  Copyright (c) 2015 AphionSoftware. All rights reserved.
//

#import "Constants.h"
#import <UIKit/UIColor.h>

@implementation Constants

static UIColor *systemGreenColor;
static UIColor *systemOrangeColor;

+(UIColor*) getSystemGreenColor {
    if (systemGreenColor == nil)
        systemGreenColor = [UIColor colorWithRed:102/255.0f green:204.0f/255.0f blue:102.0f/255.0f alpha:1.0f];
    return systemGreenColor;
}

+(UIColor*) getSystemOrangeColor {
    if (systemOrangeColor == nil)
        systemOrangeColor = [UIColor colorWithRed:255/255.0f green:153.0f/255.0f blue:0.0f/255.0f alpha:1.0f];
    return systemOrangeColor;
}

@end
