//
//  Product.h
//  SushimiApp
//
//  Created by Artem Demidovich on 2/13/15.
//  Copyright (c) 2015 AphionSoftware. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "CategoryItem.h"

@interface Product : NSObject

@property NSInteger id;

@property NSString *code;

@property NSString *name;
@property NSString *_description;

@property NSString *imageLink;
@property NSString *smallImageLink;
@property NSString *iconImageLink;

@property CategoryItem *category;

@property NSInteger orderNumber;
@property NSInteger cost;
@property NSInteger itemCount;

@property NSInteger proteins;
@property NSInteger carbohydrates;
@property NSInteger fats;

@property Boolean isRecomended;
@property Boolean isNew;
@property Boolean isHit;
@property Boolean isHot;
@property Boolean isVegetable;
@property Boolean isPopular;

@property NSInteger popularSex;
@property NSInteger popularAge;

@property NSString *type;

@end
