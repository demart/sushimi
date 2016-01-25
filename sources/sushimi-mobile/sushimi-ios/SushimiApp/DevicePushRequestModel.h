//
//  DevicePushRequestModel.h
//  SushimiApp
//
//  Created by Artem Demidovich on 10/10/15.
//  Copyright © 2015 AphionSoftware. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface DevicePushRequestModel : NSObject

// Operation system should be IOS
@property NSString *platform;

// String representation of DeviceToken
@property NSString *pushKey;

// aString representation of DeviceToken
@property NSString *oldPushKey;

+(DevicePushRequestModel*) buildModel;

@end
