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

#define SYSTEM_SETTINGS_FIST_TIME_OPENED @"system.firstTimeOpened";

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
