//
//  LoginModel.h
//  SushimiCourierApp
//
//  Created by Artem Demidovich on 10/11/15.
//  Copyright © 2015 Aphion Software. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface LoginRequestModel : NSObject

@property NSString *userKey;
@property NSString *appVersion;
@property NSString *operationSystemVersion;
@property NSString *mobileOperationSystem;
@property NSString *pushKey;
@property NSString *latitude;
@property NSString *longitude;

@end
