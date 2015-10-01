//
//  CartInfoModel.h
//  SushimiApp
//
//  Created by Artem Demidovich on 7/3/15.
//  Copyright (c) 2015 AphionSoftware. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface CartInfoModel : NSObject

@property (nonatomic) NSInteger freeSauceSum;
@property (nonatomic) NSInteger freeDeliverySum;
@property (nonatomic, retain) NSMutableArray *freeSushiSauces;

@property (nonatomic) NSInteger mobileDiscount;
@property (nonatomic) NSString *mobileDiscountDescription;

@end
