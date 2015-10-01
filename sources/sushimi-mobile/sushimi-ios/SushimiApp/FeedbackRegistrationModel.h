//
//  FeedbackRegistrationModel.h
//  SushimiApp
//
//  Created by Artem Demidovich on 7/27/15.
//  Copyright (c) 2015 AphionSoftware. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface FeedbackRegistrationModel : NSObject

@property NSString *name;
@property NSString *phone;
@property NSInteger cityId;
@property NSInteger placeId;
@property NSString *type;
@property NSString *orderNumber;
@property NSString *text;

@end
