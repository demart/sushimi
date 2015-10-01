//
//  DeliveryInfo.h
//  SushimiApp
//
//  Created by Artem Demidovich on 2/16/15.
//  Copyright (c) 2015 AphionSoftware. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface DeliveryInfo : NSObject

@property NSInteger id;
@property NSString *title;
@property NSString *workhours;
@property NSString *minOrderSum;
@property NSString *deliveryArea;
@property NSString *deliveryAreaImageUrl;
@property NSString *deliveryAreaRemarks;
@property NSString *address;
@property NSString *addressGeoLatitude;
@property NSString *addressGeoLongitude;
@property NSString *phoneNumber;

@end
