//
//  UrlHelper.h
//  SushimiApp
//
//  Created by Artem Demidovich on 10/8/15.
//  Copyright © 2015 AphionSoftware. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface UrlHelper : NSObject

// Return base URL for all REST API contexts
+(NSString*) getRestAPIBaseUrl;

// PUSH DEVICE TOKEN URL
+(NSString*) getRegisterDeviceTokenUrl;

// CATEGORIES
+(NSString*) getCategoriesUrl;
+(NSString*) getCategoriesUrlByParent:(NSString*) parentCategoryId;

// PRODUCTS
+(NSString*) getProductsUrlByCategory:(NSString*) categoryId;
+(NSString*) getProductUrlWithId:(long) productId;

// RESTAURANTS
+(NSString*) getRestuarantsUrl;


// CART
+(NSString*) getCartInfoUrl;
+(NSString*) getCartCleanUrlWithId:(NSString*) cartId;
+(NSString*) getCartAddProductsUrlWithId:(NSString*) cartId;

// ORDERS
+(NSString*) getOrderUrlByKey:(NSString*) orderKey;
+(NSString*) getOrderSendUrl;


// ANNOUNCEMENTS
+(NSString*) getAnnouncementsUrlWithType:(long) type;

// DELIVERY
+(NSString*) getDeliveryPointsUrl;

// COMPANY INFO
+(NSString*) getCompanyInfoUrl;

// FEEDBACKS
+(NSString*) getFeedbacksUrlWithPage:(long) page andSize:(long) size;
+(NSString*) getFeedbacksMetaUrl;
+(NSString*) getFeedbacksCitiesUrl;
+(NSString*) getFeedbacksRestaurantsUrlByCityId:(long) citiId;
+(NSString*) getFeedbacksRegisterNewFeedbackUrl;

@end
