//
//  Restaurant.h
//  SushimiApp
//
//  Created by Artem Demidovich on 2/26/15.
//  Copyright (c) 2015 AphionSoftware. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface Restaurant : NSObject

@property NSInteger id;
@property NSString *title;
@property NSString *shortDescription;
@property NSString *workhours;
@property NSString *imageUrl;
@property NSString *phoneNumber;
@property NSString *address;
@property NSString *addressGeoLatitude;
@property NSString *addressGeoLongitude;

@property NSArray *photos;
@property NSArray *promoPhotos;

@end
