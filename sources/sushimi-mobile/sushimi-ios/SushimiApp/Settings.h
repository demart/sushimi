//
//  Settings.h
//  SushimiApp
//
//  Created by Artem Demidovich on 5/6/15.
//  Copyright (c) 2015 AphionSoftware. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface Settings : NSObject

@property BOOL *systemFirstTimeOpened;

@property NSString *fullname;
@property NSString *phone;
@property NSString *email;

@property NSString *addressCityName;
@property NSString *addressStreetName;
@property NSString *addressHouse;
@property NSString *addressCorpus;
@property NSString *addressBuilding;
@property NSString *addressFlat;
@property NSString *addressPorch;
@property NSString *addressDoorCode;
@property NSString *addressFloor;
@property NSString *addressRoom;
@property NSString *addressOffice;
@property NSString *geoLatitude;
@property NSString *geoLongitude;

@end
