//
//  SettingsManager.h
//  SushimiApp
//
//  Created by Artem Demidovich on 5/6/15.
//  Copyright (c) 2015 AphionSoftware. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "Settings.h"

@interface SettingsManager : NSObject

// Ключ Флаг первый ли раз открывается приложение
#define SYSTEM_SETTINGS_FIST_TIME_OPENED @"system.firstTimeOpened";

// Ключ где храниться токен для отпраки PUSH
#define SYSTEM_APPLICATION_DEVICE_TOKEN @"system.deviceToken";

// Ключ Флаг для указания отправили на сервер Токен или нет
#define SYSTEM_APPLICATION_DEVICE_TOKEN_SYNCHRONIZED @"system.deviceToken.isSynchronized";

// Ключ старый токен который не был замененм на новый в период синхронизаци
#define SYSTEM_APPLICATION_DEVICE_TOKEN_OLD @"system.deviceToken.old";


// Singleton Instance
+ (SettingsManager *) sharedInstance;

// Common settings
-(Settings*) getSettings;
-(Settings*) cloneSettingsForEditing;
-(void) synchronizeSettings:(Settings*) editedSettings;

// System Settings
-(void)setSettingKey:(NSString*)key withValue:(NSString*)value;
-(NSString*)getSettingValueByKey:(NSString*)key;

// Request store
-(void) addOrderModel:(NSObject *)request;
-(NSMutableArray *) getOrders;

@end
