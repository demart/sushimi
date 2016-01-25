//
//  UrlHelper.m
//  SushimiCourierApp
//
//  Created by Artem Demidovich on 10/11/15.
//  Copyright © 2015 Aphion Software. All rights reserved.
//

#import "UrlHelper.h"

@implementation UrlHelper

+(NSString*) baseUrl {
#if DEBUG
    //return @"http://localhost:9002";
    //return @"http://172.20.10.2";
    return @"http://api.sushimi.kz/rest-api";
#else
//    return @"http://172.20.10.2";
    return @"http://api.sushimi.kz/rest-api";
#endif
}

+(NSString*) loginUrl {
    return [[NSString alloc] initWithFormat:@"%@/v1/courier/", UrlHelper.baseUrl];
}

+(NSString*) updateGeolocationUrl {
    return [[NSString alloc] initWithFormat:@"%@/v1/courier/", UrlHelper.baseUrl];
}

+(NSString*) readOrdersUrl {
    return [[NSString alloc] initWithFormat:@"%@/v1/courier/orders/", UrlHelper.baseUrl];
}

+(NSString*) updateOrderUrl {
    return [[NSString alloc] initWithFormat:@"%@/v1/courier/orders/", UrlHelper.baseUrl];
}

+(NSString*) completeOrderUrl {
    return [[NSString alloc] initWithFormat:@"%@/v1/courier/orders/complete", UrlHelper.baseUrl];
}

+(NSString*) returnOrderUrl  {
    return [[NSString alloc] initWithFormat:@"%@/v1/courier/orders/return", UrlHelper.baseUrl];
}

@end
