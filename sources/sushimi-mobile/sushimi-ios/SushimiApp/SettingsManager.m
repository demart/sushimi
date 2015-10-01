//
//  SettingsManager.m
//  SushimiApp
//
//  Created by Artem Demidovich on 5/6/15.
//  Copyright (c) 2015 AphionSoftware. All rights reserved.
//

#import "SettingsManager.h"
#import "Settings.h"
#import "OrderModel.h"

@implementation SettingsManager

SettingsManager*    settingsManagerInstance;
Settings*           settings;

+ (SettingsManager *) sharedInstance {
    @synchronized(self) {
        if (settingsManagerInstance == nil) {
            settingsManagerInstance = [[SettingsManager alloc] init];
            [settingsManagerInstance loadSettings];
        }
    }
    return settingsManagerInstance;
}

-(void) loadSettings {
    if (settings == nil)
        settings = [[Settings alloc] init];
    
    NSUserDefaults *defaults = [NSUserDefaults standardUserDefaults];
    
    settings.fullname = [defaults objectForKey:@"settings.fullname"];
    settings.email = [defaults objectForKey:@"settings.email"];
    
    settings.phone = [defaults objectForKey:@"settings.phone"];
    if (settings.phone == nil || settings.phone.length < 2)
        settings.phone = @"+7";
    
    settings.addressBuilding = [defaults objectForKey:@"settings.addressBuilding"];
    settings.addressCityName = [defaults objectForKey:@"settings.addressCityName"];
    settings.addressCorpus = [defaults objectForKey:@"settings.addressCorpus"];
    settings.addressDoorCode = [defaults objectForKey:@"settings.addressDoorCode"];
    settings.addressFlat = [defaults objectForKey:@"settings.addressFlat"];
    settings.addressFloor = [defaults objectForKey:@"settings.addressFloor"];
    settings.addressHouse = [defaults objectForKey:@"settings.addressHouse"];
    settings.addressOffice = [defaults objectForKey:@"settings.addressOffice"];
    settings.addressPorch = [defaults objectForKey:@"settings.addressPorch"];
    settings.addressRoom = [defaults objectForKey:@"settings.addressRoom"];
    settings.addressStreetName = [defaults objectForKey:@"settings.addressStreetName"];

}

-(Settings*) getSettings {
    return settings;
}

-(Settings*) cloneSettingsForEditing {
    Settings *cloneSettings = [[Settings alloc] init];
    cloneSettings.fullname = settings.fullname;
    cloneSettings.phone = settings.phone;
    cloneSettings.email = settings.email;
    
    cloneSettings.addressBuilding = settings.addressBuilding;
    cloneSettings.addressCityName = settings.addressCityName;
    cloneSettings.addressCorpus = settings.addressCorpus;
    cloneSettings.addressDoorCode = settings.addressDoorCode;
    cloneSettings.addressFlat = settings.addressFlat;
    cloneSettings.addressFloor = settings.addressFloor;
    cloneSettings.addressHouse = settings.addressHouse;
    cloneSettings.addressOffice = settings.addressOffice;
    cloneSettings.addressPorch = settings.addressPorch;
    cloneSettings.addressRoom = settings.addressRoom;
    cloneSettings.addressStreetName = settings.addressStreetName;
    return cloneSettings;
}

-(void) synchronizeSettings:(Settings*) editedSettings {
    NSUserDefaults *defaults = [NSUserDefaults standardUserDefaults];
    
    [defaults setObject:settings.fullname forKey:@"settings.fullname"];
    [defaults setObject:settings.phone forKey:@"settings.phone"];
    [defaults setObject:settings.email forKey:@"settings.email"];
    
    [defaults setObject:settings.addressBuilding forKey:@"settings.addressBuilding"];
    [defaults setObject:settings.addressCityName forKey:@"settings.addressCityName"];
    [defaults setObject:settings.addressCorpus forKey:@"settings.addressCorpus"];
    [defaults setObject:settings.addressDoorCode forKey:@"settings.addressDoorCode"];
    [defaults setObject:settings.addressFlat forKey:@"settings.addressFlat"];
    [defaults setObject:settings.addressFloor forKey:@"settings.addressFloor"];
    [defaults setObject:settings.addressHouse forKey:@"settings.addressHouse"];
    [defaults setObject:settings.addressOffice forKey:@"settings.addressOffice"];
    [defaults setObject:settings.addressPorch forKey:@"settings.addressPorch"];
    [defaults setObject:settings.addressRoom forKey:@"settings.addressRoom"];
    [defaults setObject:settings.addressStreetName forKey:@"settings.addressStreetName"];
    
    [defaults synchronize];
    [settingsManagerInstance loadSettings];
}



// System Settings
-(void)setSettingKey:(NSString*)key withValue:(NSString*)value {
    NSUserDefaults *defaults = [NSUserDefaults standardUserDefaults];
    [defaults setObject:value forKey:key];
    [defaults synchronize];
}


-(NSString*)getSettingValueByKey:(NSString*)key {
    NSUserDefaults *defaults = [NSUserDefaults standardUserDefaults];
    return [defaults objectForKey:key];
}


// ===============================
// ====== REQUEST STORE ==========
// ===============================

static NSString* HISTORY_REQUEST_KEY = @"history.requests";

-(void) addOrderModel:(NSObject *)order {
    if (order == nil)
        return;
    
    NSMutableArray *orders = [settingsManagerInstance getOrders];
    
    OrderModel *newModel = (OrderModel*)order;
    NSInteger replaceIndex = -1;
    for (int i = 0; i < orders.count; i++) {
        if ([((OrderModel*)orders[i]).orderNumber isEqualToString:newModel.orderNumber]) {
            replaceIndex = i;
            break;
        }
    }
    if (replaceIndex > -1) {
        [orders replaceObjectAtIndex:replaceIndex withObject:order];
    } else {
        [orders insertObject:order atIndex:0];
    }
    NSUserDefaults *defaults = [NSUserDefaults standardUserDefaults];
    NSData *savingData = [NSKeyedArchiver archivedDataWithRootObject:orders];
    [defaults setObject:savingData forKey:HISTORY_REQUEST_KEY];
    [defaults synchronize];
}

-(NSMutableArray *) getOrders {
    NSUserDefaults *defaults = [NSUserDefaults standardUserDefaults];
    NSData *requests = [defaults objectForKey:HISTORY_REQUEST_KEY];
    if (requests == nil) {
        NSMutableArray *requestList = [[NSMutableArray alloc] init];
        return requestList;
    } else {
        NSMutableArray *orders = [NSKeyedUnarchiver unarchiveObjectWithData:requests];
        return orders;
    }
}




@end
