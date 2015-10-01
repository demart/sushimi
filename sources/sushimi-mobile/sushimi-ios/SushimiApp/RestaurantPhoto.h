//
//  RestaurantPhoto.h
//  SushimiApp
//
//  Created by Artem Demidovich on 7/7/15.
//  Copyright (c) 2015 AphionSoftware. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface RestaurantPhoto : NSObject

@property NSInteger id;
@property NSString *imageDescription;
@property NSString *imageUrl;
@property NSString *smallImageUrl;
@property NSInteger lastModifiedDate;

@end
