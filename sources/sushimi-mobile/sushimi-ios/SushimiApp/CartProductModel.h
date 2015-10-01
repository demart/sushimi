//
//  CartProductModel.h
//  SushimiApp
//
//  Created by Artem Demidovich on 4/16/15.
//  Copyright (c) 2015 AphionSoftware. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "CartProductItemModel.h"

@interface CartProductModel : NSObject

@property float cost;
@property NSInteger count;
@property CartProductItemModel *item;

@end
