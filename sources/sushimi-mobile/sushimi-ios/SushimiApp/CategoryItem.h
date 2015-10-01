//
//  CategoryItem.h
//  SushimiApp
//
//  Created by Artem Demidovich on 2/1/15.
//  Copyright (c) 2015 AphionSoftware. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface CategoryItem : NSObject

@property NSInteger id;
@property NSString *name;
@property NSString *imageUrl;
@property Boolean hasChildren;
@property NSInteger childrenCount;
@property long lastModifiedDate;

@end
