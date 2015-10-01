//
//  OrderItemModel.h
//  SushimiApp
//
//  Created by Artem Demidovich on 5/4/15.
//  Copyright (c) 2015 AphionSoftware. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "Product.h"

@interface OrderItemModel : NSObject

@property NSInteger id;
@property Product *product;
@property NSInteger price;
@property NSInteger count;
@property NSInteger sum;

@end
