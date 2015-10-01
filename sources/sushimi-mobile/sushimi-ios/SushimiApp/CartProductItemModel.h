//
//  CartProductItemModel.h
//  SushimiApp
//
//  Created by Artem Demidovich on 4/16/15.
//  Copyright (c) 2015 AphionSoftware. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface CartProductItemModel : NSObject

@property NSString *category;
@property NSInteger id;
@property NSString *name;
@property NSString *path;
@property NSNumber *price;
@property NSArray *files;
@property NSString *_description;
@property NSInteger sort;
@property NSInteger uid;
@property NSString *unitName;
@property NSString *weight;
@property NSInteger freeCount;

@end
