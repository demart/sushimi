//
//  UrlHelper.h
//  SushimiCourierApp
//
//  Created by Artem Demidovich on 10/11/15.
//  Copyright © 2015 Aphion Software. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface UrlHelper : NSObject

+(NSString*) baseUrl;

+(NSString*) loginUrl;

+(NSString*) updateGeolocationUrl;

+(NSString*) readOrdersUrl;

+(NSString*) updateOrderUrl;

+(NSString*) completeOrderUrl;

+(NSString*) returnOrderUrl;

@end
