//
//  NotificationManager.h
//  SushimiApp
//
//  Created by Artem Demidovich on 10/10/15.
//  Copyright © 2015 AphionSoftware. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "AppDelegate.h"

@interface NotificationManager : NSObject

+ (void) registerForRemoteNotification;

+ (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken;

+ (void)application:(UIApplication *)application didFailToRegisterForRemoteNotificationsWithError:(NSError *)error;
+ (void)application:(UIApplication *)application didRegisterUserNotificationSettings:(UIUserNotificationSettings *)notificationSettings;

+ (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo fetchCompletionHandler:(void (^)(UIBackgroundFetchResult result))handler;

+ (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo;

@end
