//
//  NotificationManager.m
//  SushimiApp
//
//  Created by Artem Demidovich on 10/10/15.
//  Copyright © 2015 AphionSoftware. All rights reserved.
//

#import "NotificationManager.h"
#import "AppDelegate.h"
#import "Constants.h" 
#import "SettingsManager.h"

#import "DevicePushRequestModel.h"
#import "UrlHelper.h"

#import "HeaderManager.h"
#import "ResponseWrapper.h"
#import "RKObjectManager.h"
#import "RKObjectMapping.h"
#import "RKResponseDescriptor.h"
#import "RKObjectRequestOperation.h"
#import "RKRelationshipMapping.h"
#import "RKLog.h"
#import "RKMIMETypes.h"

#import "HDNotificationView.h"
#import "OrderDetailsTableViewController.h"
#import "MainTabBarController.h"
#import "AnnouncementDetailViewController.h"
#import "AnnouncementsTableViewController.h"

@implementation NotificationManager

+ (void) registerForRemoteNotification {
    [[UIApplication sharedApplication] registerUserNotificationSettings:[UIUserNotificationSettings settingsForTypes:(UIUserNotificationTypeSound | UIUserNotificationTypeAlert | UIUserNotificationTypeBadge) categories:nil]];
    [[UIApplication sharedApplication] registerForRemoteNotifications];
}

+ (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken {
    NSLog(@"PUSH: registered in APNS with deviceToken: %@", deviceToken);
    
    NSString *tokenKey = SYSTEM_APPLICATION_DEVICE_TOKEN;
    NSString *oldTokenValue = [[SettingsManager sharedInstance] getSettingValueByKey:tokenKey];
    NSString *newTokenValue = [deviceToken description] ;
    
    if (![newTokenValue isEqualToString:oldTokenValue]) {
        // Если токены не совпадают
        
        DevicePushRequestModel *model = [DevicePushRequestModel buildModel];
        model.pushKey = newTokenValue;
        
        if (oldTokenValue == nil || [oldTokenValue length] == 0) {
            // Первый раз токен
        } else {
            // Обновление токена
            model.oldPushKey = oldTokenValue;
        }
        
        // Сохраняем новый токен
        [[SettingsManager sharedInstance] setSettingKey:tokenKey withValue:newTokenValue];
        
        // Отправляем данные на сервер
        [NotificationManager sendDeviceTokenToServer:model];
        
    } else {
        // Всё норм ничего делать не нужно.
        // Убедимся что данные в прошлый раз успешно отпраивли на сервер
        NSString* isSycnKey = SYSTEM_APPLICATION_DEVICE_TOKEN_SYNCHRONIZED;
        NSString* oldTokenKey = SYSTEM_APPLICATION_DEVICE_TOKEN_OLD;
        NSString* isSync =[[SettingsManager sharedInstance] getSettingValueByKey:isSycnKey];
        NSString* oldTokenValue =[[SettingsManager sharedInstance] getSettingValueByKey:oldTokenKey];
        if (![isSync isEqualToString:@"YES"]) {
            DevicePushRequestModel *model = [DevicePushRequestModel buildModel];
            model.pushKey = newTokenValue;
            
            if (oldTokenValue != nil)
                model.oldPushKey = oldTokenValue;
            
            // Отправляем данные на сервер
            [NotificationManager sendDeviceTokenToServer:model];
        }
    }
}

+ (void)application:(UIApplication *)application didFailToRegisterForRemoteNotificationsWithError:(NSError *)error {
    NSLog(@"PUSH: error during regisntration in APNS, error: %@", error);
}

+ (void)application:(UIApplication *)application didRegisterUserNotificationSettings:(UIUserNotificationSettings *)notificationSettings {
    NSLog(@"PUSH: supported notificaiton settings: %@", notificationSettings);
    // Посмотреть что поддерживается пользователем
}

+ (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo fetchCompletionHandler:(void (^)(UIBackgroundFetchResult result))handler {
    NSLog(@"PUSH: receive push: %@", userInfo);
    
    // Проверить что работает только при выключенном приложении
    if (application.applicationState == UIApplicationStateActive) {
        // Получаем когда приложение запущено и пользователь его видит
        NSLog(@"PUSH: application state: %@", @"Active");
        
        NSDictionary *aps = (NSDictionary*)[userInfo valueForKey:@"aps"];
        NSString *orderKey = [userInfo valueForKey:@"o"]; // @"62fc01c0-3953-40e4-9c1a-a05f073596ba"
        NSString *orderNumber = [userInfo valueForKey:@"n"]; // orderNumber
        NSString *announcement = [userInfo valueForKey:@"a"]; // announcement
        
        if (orderKey != nil) {
            // Show news regarding order number
            if (aps != nil) {
                NSString *title = [[NSString alloc] initWithFormat:@"Заказ номер %@", orderNumber];
                NSString *alert = [aps valueForKey:@"alert"];
                
                [HDNotificationView showNotificationViewWithImage:nil title: title  message:alert isAutoHide:YES onTouch:^{
                    UIWindow *window = [[[UIApplication sharedApplication]  delegate] window];
                    MainTabBarController *navController = (MainTabBarController *)window.rootViewController;
                    
                    UINavigationController *navC = [navController.viewControllers objectAtIndex:navController.selectedIndex];
                    id visibleController = [navC.viewControllers objectAtIndex:[navC.viewControllers count]-1];
                    
                    if ([visibleController isKindOfClass:[OrderDetailsTableViewController class]]) {
                        [navC popViewControllerAnimated:YES];
                        OrderDetailsTableViewController *orderDetailsViewController = (OrderDetailsTableViewController*)visibleController;
                        [orderDetailsViewController setOrderKey:orderKey hideBackButton:NO];
                        [navC pushViewController:orderDetailsViewController animated:YES];
                    } else {
                        OrderDetailsTableViewController *orderDetailsViewController = [[OrderDetailsTableViewController alloc] init];
                        [orderDetailsViewController setOrderKey:orderKey hideBackButton:NO];
                        [navC pushViewController:orderDetailsViewController animated:YES];
                    }
                    [HDNotificationView hideNotificationView];
                }];
            }
        }
        
        if (announcement != nil) {
            // Show news regarding announcemement
            if (aps != nil) {
                NSString *title = @"Новости и акции";
                NSString *alert = [aps valueForKey:@"alert"];
                [HDNotificationView showNotificationViewWithImage:nil title: title  message:alert isAutoHide:YES onTouch:^{
                    UIWindow *window = [[[UIApplication sharedApplication]  delegate] window];
                    MainTabBarController *navController = (MainTabBarController *)window.rootViewController;
                    [navController setSelectedIndex:3];
                    UINavigationController *navC = [navController.viewControllers objectAtIndex:[navController selectedIndex]];
                    
                    [navC popToRootViewControllerAnimated:YES];
                    AnnouncementsTableViewController *announcementsTableViewController = [[AnnouncementsTableViewController alloc] init];
                    [navC pushViewController:announcementsTableViewController animated:YES];
                    
                    [HDNotificationView hideNotificationView];
                }];
            }
        }
        

        handler(UIBackgroundFetchResultNewData);
    }
    
    if (application.applicationState == UIApplicationStateInactive) {
        // Получаем когда приложение запущено но пользователь свернул его
        NSLog(@"PUSH: application state: %@", @"Inactive");
        
        NSString *orderKey = [userInfo valueForKey:@"o"]; // @"62fc01c0-3953-40e4-9c1a-a05f073596ba"
        
        if (orderKey != nil) {
        UIWindow *window = [[[UIApplication sharedApplication]  delegate] window];
        MainTabBarController *navController = (MainTabBarController *)window.rootViewController;
        
        UINavigationController *navC = [navController.viewControllers objectAtIndex:navController.selectedIndex];
        id visibleController = [navC.viewControllers objectAtIndex:[navC.viewControllers count]-1];
        
        if ([visibleController isKindOfClass:[OrderDetailsTableViewController class]]) {
            [navC popViewControllerAnimated:YES];
            OrderDetailsTableViewController *orderDetailsViewController = (OrderDetailsTableViewController*)visibleController;
            [orderDetailsViewController setOrderKey:orderKey hideBackButton:NO];
            [navC pushViewController:orderDetailsViewController animated:YES];
        } else {
            OrderDetailsTableViewController *orderDetailsViewController = [[OrderDetailsTableViewController alloc] init];
            [orderDetailsViewController setOrderKey:orderKey hideBackButton:NO];
            [navC pushViewController:orderDetailsViewController animated:YES];
        }
        }
        
        handler(UIBackgroundFetchResultNewData);
    }

    if (application.applicationState == UIApplicationStateBackground) {
        // Получаем когда приложение закрыто
        NSLog(@"PUSH: application state: %@", @"Background");
        
        NSString *orderKey = [userInfo valueForKey:@"o"]; // @"62fc01c0-3953-40e4-9c1a-a05f073596ba"
        //NSString *orderNumber = [userInfo valueForKey:@"n"]; // orderNumber
        if (orderKey != nil) {
        UIWindow *window = [[[UIApplication sharedApplication]  delegate] window];
        MainTabBarController *navController = (MainTabBarController *)window.rootViewController;
        UINavigationController *navC = [navController.viewControllers objectAtIndex:navController.selectedIndex];
        id visibleController = [navC.viewControllers objectAtIndex:[navC.viewControllers count]-1];
        
        OrderDetailsTableViewController *orderDetailsViewController = [[OrderDetailsTableViewController alloc] init];
        [orderDetailsViewController setOrderKey:orderKey hideBackButton:NO];
        [navC pushViewController:orderDetailsViewController animated:YES];
        }
        handler(UIBackgroundFetchResultNewData);
    }
    
}

+ (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo {
    NSLog(@"PUSH: receive push and app is running: %@", userInfo);
    // Проверить что работает только при включенном приложении
    if (application.applicationState == UIApplicationStateInactive) {
    }
}




+ (void) sendDeviceTokenToServer:(DevicePushRequestModel*) model {
    NSURL *targetUrl = [NSURL URLWithString: [UrlHelper getRegisterDeviceTokenUrl]];
    RKObjectMapping* wrapperMapping = [RKObjectMapping mappingForClass:[ResponseWrapper class]];
    [wrapperMapping addAttributeMappingsFromDictionary:@{
                                                         @"status": @"status",
                                                         //@"data": @"data",
                                                         @"errorCode": @"errorCode",
                                                         @"errorMessage": @"errorMessage"
                                                         }];
    
    RKResponseDescriptor *responseWrapperDescriptor = [RKResponseDescriptor responseDescriptorWithMapping:wrapperMapping method:RKRequestMethodAny pathPattern:nil keyPath:@"" statusCodes:RKStatusCodeIndexSetForClass(RKStatusCodeClassSuccessful) ];
    
    // ==== REQUEST DESC =====
    
    RKObjectMapping* deviceTokenRequestModelMapping = [RKObjectMapping requestMapping];
    [deviceTokenRequestModelMapping addAttributeMappingsFromDictionary:@{
                                                              @"platform": @"platform",
                                                              @"pushKey": @"pushKey",
                                                              @"oldPushKey": @"oldPushKey",
                                                              }];
    
    RKObjectManager *objectManager = [RKObjectManager managerWithBaseURL:targetUrl];
    objectManager.requestSerializationMIMEType = RKMIMETypeJSON;
    [HeaderManager addApplicationHeaderToObjectManager:objectManager];
    
    RKRequestDescriptor *requestDescriptor = [RKRequestDescriptor requestDescriptorWithMapping:deviceTokenRequestModelMapping objectClass:[DevicePushRequestModel class] rootKeyPath:nil method:RKRequestMethodPOST];
    
    [objectManager addRequestDescriptor:requestDescriptor];
    [objectManager addResponseDescriptor:responseWrapperDescriptor];
    
    // ==== SENDING REQUEST DESC =====
    NSString *isTokenSynchronized = SYSTEM_APPLICATION_DEVICE_TOKEN_SYNCHRONIZED;
    NSString *oldTokenKey = SYSTEM_APPLICATION_DEVICE_TOKEN_OLD;
    
    [objectManager
     postObject:model
     path:@""
     parameters:nil
     success:^(RKObjectRequestOperation *operation, RKMappingResult *result) {
         NSLog(@"%@",[[result.array objectAtIndex:0] valueForKey:@"status"]);
         NSLog(@"%@",[[result.array objectAtIndex:0] valueForKey:@"errorMessage"]);
         if ([[[result.array objectAtIndex:0] valueForKey:@"status"] isEqualToString:@"SUCCESS"]) {
             // Успешно отправили данные на сервер
             [[SettingsManager sharedInstance] setSettingKey:isTokenSynchronized withValue:@"YES"];
             [[SettingsManager sharedInstance] setSettingKey:oldTokenKey withValue:nil];
         } else {
             // Не удалось отправить данные на сервер :(
             [[SettingsManager sharedInstance] setSettingKey:isTokenSynchronized withValue:@"NO"];
             if (model.oldPushKey != nil) {
                // Если был старый токен, что означает замену токена, то сохраним его чтобы попробовать потом
                [[SettingsManager sharedInstance] setSettingKey:oldTokenKey withValue:model.oldPushKey];
             } else {
                // Если нету старого токена значит это первый раз регистрация
                [[SettingsManager sharedInstance] setSettingKey:oldTokenKey withValue:nil];
             }
         }
     }
     failure:^(RKObjectRequestOperation *operation, NSError *error){
         NSLog(@"Error %@", error);
         // Не удалось отправить данные на сервер :(
         [[SettingsManager sharedInstance] setSettingKey:isTokenSynchronized withValue:@"NO"];
         if (model.oldPushKey != nil) {
             // Если был старый токен, что означает замену токена, то сохраним его чтобы попробовать потом
             [[SettingsManager sharedInstance] setSettingKey:oldTokenKey withValue:model.oldPushKey];
         } else {
             // Если нету старого токена значит это первый раз регистрация
             [[SettingsManager sharedInstance] setSettingKey:oldTokenKey withValue:nil];
         }
     }];
}

@end
