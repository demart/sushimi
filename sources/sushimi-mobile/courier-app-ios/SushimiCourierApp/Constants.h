//
//  Constants.h
//  SushimiCourierApp
//
//  Created by Artem Demidovich on 10/11/15.
//  Copyright © 2015 Aphion Software. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIColor.h>

#define SETTINGS_AUTH_TOKEN = @"settings.authToken";

@interface Constants : NSObject

+(UIColor*) getSystemGreenColor;
+(UIColor*) getSystemOrangeColor;

@end
