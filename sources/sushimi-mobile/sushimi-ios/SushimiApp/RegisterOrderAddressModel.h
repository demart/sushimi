//
//  RegisterOrderAddressModel.h
//  SushimiApp
//
//  Created by Artem Demidovich on 5/5/15.
//  Copyright (c) 2015 AphionSoftware. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface RegisterOrderAddressModel : NSObject

// required
@property NSString *streetName;
@property NSString *latitude;
@property NSString *longitude;

// Non required
@property NSString *cityName;
@property NSString *house;
@property NSString *corpus;
@property NSString *building;
@property NSString *flat;
@property NSString *porch;
@property NSString *doorCode;
@property NSString *floor;
@property NSString *room;
@property NSString *office;

@end
