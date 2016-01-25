//
//  AppDelegate.m
//  SushimiApp
//
//  Created by Artem Demidovich on 1/29/15.
//  Copyright (c) 2015 AphionSoftware. All rights reserved.
//

#import "AppDelegate.h"
#import "RKLog.h"

#import "SettingsManager.h"
#import "NotificationManager.h"

@interface AppDelegate ()

@end

@implementation AppDelegate


-(void)setRootViewController:(UIViewController *)rootViewController {
    self.window.rootViewController = rootViewController;
    [self.window makeKeyAndVisible];
}

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {

    // Подаписываемся на получение пуш уведомлений
    [NotificationManager registerForRemoteNotification];
    
    // =================
    //  Other settings
    // =================
    UIStoryboard *storyboard = self.window.rootViewController.storyboard;
    
    NSString *settings = SYSTEM_SETTINGS_FIST_TIME_OPENED;
    NSString *settingsValue = [[SettingsManager sharedInstance] getSettingValueByKey:settings];
    if([@"NO" isEqualToString:settingsValue]) {
        UITabBarController *rootViewController= [storyboard instantiateViewControllerWithIdentifier:@"MainTabBar"];
        [self setRootViewController:rootViewController];
    } else {
        UIViewController *rootViewController= [storyboard instantiateViewControllerWithIdentifier:@"SplashScreen"];
        [self setRootViewController:rootViewController];
    }
    //    RKLogConfigureByName("RestKit", RKLogLevelWarning);
    //    RKLogConfigureByName("RestKit/ObjectMapping", RKLogLevelTrace);
    //    RKLogConfigureByName("RestKit/Network", RKLogLevelTrace);

    
    UIColor *orangeColor = [UIColor colorWithRed:255/255.0f green:153.0f/255.0f blue:0.0f/255.0f alpha:1.0f];
    UIColor *bg_color = [UIColor colorWithRed:102/255.0f green:204.0f/255.0f blue:102.0f/255.0f alpha:1.0f];

    [[UINavigationBar appearance] setBarTintColor:bg_color];
    [UINavigationBar appearance].tintColor = [UIColor   whiteColor];
    
    [UIButton appearance].layer.cornerRadius = 2.0f;
    
    
    [[UINavigationBar appearance] setTitleTextAttributes:
     [NSDictionary dictionaryWithObjectsAndKeys:
      [UIColor whiteColor], NSForegroundColorAttributeName,
      [UIFont fontWithName:@"Gill Sans" size:17.0], NSFontAttributeName,
      nil]];
    
    
    [[UIBarButtonItem appearanceWhenContainedIn:[UINavigationBar class], nil] setTitleTextAttributes:
     @{NSForegroundColorAttributeName:[UIColor whiteColor],
       NSFontAttributeName: [UIFont fontWithName:@"Gill Sans" size:17.0]
       } forState:UIControlStateNormal];
    
    [UISegmentedControl appearance].tintColor = orangeColor;
    [[UISegmentedControl appearance] setTitleTextAttributes:@{NSForegroundColorAttributeName:[UIColor whiteColor]} forState:UIControlStateNormal];
    [[UISegmentedControl appearance] setTitleTextAttributes:@{NSForegroundColorAttributeName:[UIColor whiteColor]} forState:UIControlStateSelected];

    return YES;
}


// ================
//   NOTFICATIONS
// ================

- (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken {
    [NotificationManager application:application didRegisterForRemoteNotificationsWithDeviceToken:deviceToken];
}

- (void)application:(UIApplication *)application didFailToRegisterForRemoteNotificationsWithError:(NSError *)error {
    [NotificationManager application:application didFailToRegisterForRemoteNotificationsWithError:error];
}

- (void)application:(UIApplication *)application didRegisterUserNotificationSettings:(UIUserNotificationSettings *)notificationSettings {
    [NotificationManager application:application didRegisterUserNotificationSettings:notificationSettings];
}

- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo {
    [NotificationManager application:application didReceiveRemoteNotification:userInfo];
}

-(void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo fetchCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler {
    [NotificationManager application:application didReceiveRemoteNotification:userInfo fetchCompletionHandler:completionHandler];
}




- (void)applicationWillResignActive:(UIApplication *)application {
    // Sent when the application is about to move from active to inactive state. This can occur for certain types of temporary interruptions (such as an incoming phone call or SMS message) or when the user quits the application and it begins the transition to the background state.
    // Use this method to pause ongoing tasks, disable timers, and throttle down OpenGL ES frame rates. Games should use this method to pause the game.
}

- (void)applicationDidEnterBackground:(UIApplication *)application {
    // Use this method to release shared resources, save user data, invalidate timers, and store enough application state information to restore your application to its current state in case it is terminated later.
    // If your application supports background execution, this method is called instead of applicationWillTerminate: when the user quits.
}

- (void)applicationWillEnterForeground:(UIApplication *)application {
    // Called as part of the transition from the background to the inactive state; here you can undo many of the changes made on entering the background.
}

- (void)applicationDidBecomeActive:(UIApplication *)application {
    // Restart any tasks that were paused (or not yet started) while the application was inactive. If the application was previously in the background, optionally refresh the user interface.
}

- (void)applicationWillTerminate:(UIApplication *)application {
    // Called when the application is about to terminate. Save data if appropriate. See also applicationDidEnterBackground:.
}

@end
