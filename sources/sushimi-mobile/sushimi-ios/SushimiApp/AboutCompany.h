//
//  AboutCompany.h
//  SushimiApp
//
//  Created by Artem Demidovich on 2/16/15.
//  Copyright (c) 2015 AphionSoftware. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface AboutCompany : NSObject

@property NSInteger id;
@property NSString *content;
@property NSString *imageUrl;
@property NSString *instagramUrl;
@property NSString *vkUrl;

@property long lastModifiedDate;

@end
