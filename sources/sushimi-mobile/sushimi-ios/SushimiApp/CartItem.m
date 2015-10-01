//
//  CartItem.m
//  SushimiApp
//
//  Created by Artem Demidovich on 4/9/15.
//  Copyright (c) 2015 AphionSoftware. All rights reserved.
//

#import "CartItem.h"

@implementation CartItem

-(NSInteger) getTotalCost {
    return self.product.cost * self.amount;
}

-(NSInteger) getTotalAmount {
    return self.amount + self.free;
}

@end
