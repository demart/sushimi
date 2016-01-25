//
//  UrlHelper.m
//  SushimiApp
//
//  Created by Artem Demidovich on 10/8/15.
//  Copyright © 2015 AphionSoftware. All rights reserved.
//

#import "UrlHelper.h"

@implementation UrlHelper

+(NSString*) getRestAPIBaseUrl {
#if DEBUG
    NSLog(@"Base REST API Url: %@", @"http://localhost:9002");
//    return @"http://localhost:9002";
    return @"http://172.20.10.2:9002";
#else
    NSLog(@"Base REST API Url: %@", @"http://api.sushimi.kz/rest-api");
    return @"http://api.sushimi.kz/rest-api";
    //return @"http://172.20.10.2:9002";
#endif
}

// ================
//   DEVICE TOKEN
// ================
+(NSString*) getRegisterDeviceTokenUrl {
    return [[NSString alloc] initWithFormat:@"%@/v1/app/device/push", [UrlHelper getRestAPIBaseUrl]];
}


// =============
//   CATEGORIES
// =============
+(NSString*) getCategoriesUrl {
    return [[NSString alloc] initWithFormat:@"%@/v1/category/list", [UrlHelper getRestAPIBaseUrl]];
}

+(NSString*) getCategoriesUrlByParent:(NSString *)parentCategoryId {
    return [[NSString alloc] initWithFormat:@"%@/v1/category/%@/children", [UrlHelper getRestAPIBaseUrl], parentCategoryId];
}


// =============
//   PRODUCTS
// =============

+(NSString*) getProductsUrlByCategory:(NSString *)categoryId {
    return [[NSString alloc] initWithFormat:@"%@/v1/product/list/in/category/%@", [UrlHelper getRestAPIBaseUrl], categoryId];
}

+(NSString*) getProductUrlWithId:(long)productId {
    return [[NSString alloc] initWithFormat:@"%@/v1/product/%li/detail", [UrlHelper getRestAPIBaseUrl], productId];
}

// =============
//   CART
// =============

+(NSString*) getCartInfoUrl {
    return [[NSString alloc] initWithFormat:@"%@/v1/cart/info", [UrlHelper getRestAPIBaseUrl]];
}

+(NSString*) getCartCleanUrlWithId:(NSString*) cartId {
    return [[NSString alloc] initWithFormat:@"%@/v1/cart/%@/clear", [UrlHelper getRestAPIBaseUrl], cartId];
}

+(NSString*) getCartAddProductsUrlWithId:(NSString*) cartId {
    return [[NSString alloc] initWithFormat:@"%@/v1/cart/%@/", [UrlHelper getRestAPIBaseUrl], cartId];
}

// =============
//   ORDER
// =============

+(NSString*) getOrderUrlByKey:(NSString *)orderKey {
    return [[NSString alloc] initWithFormat:@"%@/v1/order/%@/read", [UrlHelper getRestAPIBaseUrl], orderKey];
}

+(NSString*) getOrderSendUrl {
    return [[NSString alloc] initWithFormat:@"%@/v1/order/new/", [UrlHelper getRestAPIBaseUrl]];
}

// ===============
//  ANNOUNCEMENTS
// ===============

+(NSString*) getAnnouncementsUrlWithType:(long) type {
    return [[NSString alloc] initWithFormat:@"%@/v1/announcement/list/%ld", [UrlHelper getRestAPIBaseUrl], type];
}

// ===============
//  DELIVERY
// ===============

+(NSString*) getDeliveryPointsUrl {
    return [[NSString alloc] initWithFormat:@"%@/v1/company/delivery", [UrlHelper getRestAPIBaseUrl]];
}


// ===============
//  COMPANY INFO
// ===============

+(NSString*) getCompanyInfoUrl {
    return [[NSString alloc] initWithFormat:@"%@/v1/company/info", [UrlHelper getRestAPIBaseUrl]];
}


// =============
//   RESTAURANTS
// =============

+(NSString*) getRestuarantsUrl {
    return [[NSString alloc] initWithFormat:@"%@/v1/restaurant/list", [UrlHelper getRestAPIBaseUrl]];
}


// =============
//   FEEDBACKS
// =============

+(NSString*) getFeedbacksUrlWithPage:(long) page andSize:(long) size  {
    return [[NSString alloc] initWithFormat:@"%@/v1/feedback/list/page/%li/size/%li", [UrlHelper getRestAPIBaseUrl], page, size];
}

+(NSString*) getFeedbacksMetaUrl {
    return [[NSString alloc] initWithFormat:@"%@/v1/feedback/meta", [UrlHelper getRestAPIBaseUrl]];
}

+(NSString*) getFeedbacksCitiesUrl {
    return [[NSString alloc] initWithFormat:@"%@/v1/feedback/city/list", [UrlHelper getRestAPIBaseUrl]];
}

+(NSString*) getFeedbacksRestaurantsUrlByCityId:(long)citiId {
    return [[NSString alloc] initWithFormat:@"%@/v1/feedback/city/%li/restaurants", [UrlHelper getRestAPIBaseUrl], citiId ];
}

+(NSString*) getFeedbacksRegisterNewFeedbackUrl {
    return [[NSString alloc] initWithFormat:@"%@/v1/feedback/", [UrlHelper getRestAPIBaseUrl]];
}


@end
