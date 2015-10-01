//
//  FeedbackCityModel.h
//  SushimiApp
//
//  Created by Artem Demidovich on 7/27/15.
//  Copyright (c) 2015 AphionSoftware. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface FeedbackCityModel : NSObject

@property BOOL selected;
@property NSString *text;
@property NSInteger value;
@property NSArray* restaurants;

@end
