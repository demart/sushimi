//
//  AppDelegate.h
//  SushimiCourierApp
//
//  Created by Artem Demidovich on 10/11/15.
//  Copyright © 2015 Aphion Software. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "LocationTracker.h"


@interface AppDelegate : UIResponder <UIApplicationDelegate>

@property (strong, nonatomic) UIWindow *window;

@property LocationTracker * locationTracker;
@property (nonatomic) NSTimer* locationUpdateTimer;

@end

