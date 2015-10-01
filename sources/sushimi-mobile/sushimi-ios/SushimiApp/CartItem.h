//
//  CartItem.h
//  SushimiApp
//
//  Created by Artem Demidovich on 4/9/15.
//  Copyright (c) 2015 AphionSoftware. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "Product.h"

@interface CartItem : NSObject

@property Product  *product;
@property NSInteger amount;
@property NSInteger free;
-(NSInteger) getTotalCost;
-(NSInteger) getTotalAmount;

@end
