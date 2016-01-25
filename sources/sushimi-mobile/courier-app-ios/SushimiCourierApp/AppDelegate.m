//
//  AppDelegate.m
//  SushimiCourierApp
//
//  Created by Artem Demidovich on 10/11/15.
//  Copyright © 2015 Aphion Software. All rights reserved.
//

#import "AppDelegate.h"

@interface AppDelegate ()

@end

@implementation AppDelegate


- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
    if([[UIApplication sharedApplication] backgroundRefreshStatus] == UIBackgroundRefreshStatusDenied){
        NSLog(@"Приложение не может работать без включенного режима Background App Refresh. Для того чтобы включить, перейдите Найтройки > Основыне > Фоновый режим обновлений");
    }else if([[UIApplication sharedApplication] backgroundRefreshStatus] == UIBackgroundRefreshStatusRestricted){
        NSLog(@"Режим фонового обновления выключен. Включите Background App Refresh.");
    } else {
        NSLog(@"UIApplicationLaunchOptionsLocationKey : %@" , [launchOptions objectForKey:UIApplicationLaunchOptionsLocationKey]);
        if ([launchOptions objectForKey:UIApplicationLaunchOptionsLocationKey]) {
            
            // RUN APP IN BACKGROUND
            NSLog(@"Start significant location tracking in background app");
            self.locationTracker = [[LocationTracker alloc]init];
            self.locationTracker.isBackground = YES;
            [self.locationTracker startLocationTracking];
            
            
        } else {
            // USER START APPLICATION
            
            NSLog(@"Start location tracking in running app every 30 seconds");
            self.locationTracker = [[LocationTracker alloc]init];
            self.locationTracker.isBackground = NO;
            [self.locationTracker startLocationTracking];
            
            /*
            NSTimeInterval time = 30.0;
            self.locationUpdateTimer =
            [NSTimer scheduledTimerWithTimeInterval:time target:self selector:@selector(updateLocation) userInfo:nil repeats:YES];
             */
        }
        
    }
    
    
    return YES;
}

-(void)updateLocation {
    NSLog(@"updateLocation");
    [self.locationTracker updateLocationToServer];
}

- (void)applicationWillResignActive:(UIApplication *)application {
    NSLog(@"applicationWillResignActive");
    
    // Sent when the application is about to move from active to inactive state. This can occur for certain types of temporary interruptions (such as an incoming phone call or SMS message) or when the user quits the application and it begins the transition to the background state.
    // Use this method to pause ongoing tasks, disable timers, and throttle down OpenGL ES frame rates. Games should use this method to pause the game.
}

- (void)applicationDidEnterBackground:(UIApplication *)application {
    NSLog(@"applicationDidEnterBackground");

    if (self.locationTracker != nil) {
        [self.locationTracker applicationDidEnterBackground];
    }

    // Use this method to release shared resources, save user data, invalidate timers, and store enough application state information to restore your application to its current state in case it is terminated later.
    // If your application supports background execution, this method is called instead of applicationWillTerminate: when the user quits.
}

- (void)applicationWillEnterForeground:(UIApplication *)application {
    NSLog(@"applicationWillEnterForeground");
    // Called as part of the transition from the background to the inactive state; here you can undo many of the changes made on entering the background.
   
    if (self.locationTracker == nil) {
        self.locationTracker = [[LocationTracker alloc]init];
    }
    [self.locationTracker startLocationTracking];
    
    /*
    NSTimeInterval time = 30.0;
    self.locationUpdateTimer =
    [NSTimer scheduledTimerWithTimeInterval:time target:self selector:@selector(updateLocation) userInfo:nil repeats:YES];
    */
}

- (void)applicationDidBecomeActive:(UIApplication *)application {
    NSLog(@"applicationDidBecomeActive");
    // Restart any tasks that were paused (or not yet started) while the application was inactive. If the application was previously in the background, optionally refresh the user interface.
}

- (void)applicationWillTerminate:(UIApplication *)application {
    NSLog(@"applicationWillTerminate");
    // Called when the application is about to terminate. Save data if appropriate. See also applicationDidEnterBackground:.
}

@end
