//
//  Announcement.h
//  SushimiApp
//
//  Created by Artem Demidovich on 2/20/15.
//  Copyright (c) 2015 AphionSoftware. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface Announcement : NSObject

@property NSInteger id;
@property NSInteger type;
@property NSString *title;
@property NSString *shortDescription;
@property NSString *content;
@property NSString *imageLink;
@property long publishDate;
@property long endDate;
@property long lastModifiedDate;
@property Boolean isActual;

@end
