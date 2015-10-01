//
//  Constants.h
//  SushimiApp
//
//  Created by Artem Demidovich on 4/16/15.
//  Copyright (c) 2015 AphionSoftware. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIColor.h>

@interface Constants : NSObject

#define SYSTEM_APP_VERSION = @"1.0";

#define SYSTEM_REST_API_BASE_URL = @"http://sushimi.kz/";

#define SYSTEM_IMAGE_BASE_URL = @"http://sushimi.kz/public/images/menu/items/";
#define SYSTEM_CATEGORY_IMAGE_BASE_URL = @"http://sushimi.kz/public/images/menu/categories/";

+(UIColor*) getSystemGreenColor;
+(UIColor*) getSystemOrangeColor;

// green = [UIColor colorWithRed:102/255.0f green:204.0f/255.0f blue:102.0f/255.0f alpha:1.0f];
// orageColor = [UIColor colorWithRed:255/255.0f green:153.0f/255.0f blue:0.0f/255.0f alpha:1.0f];

@end
