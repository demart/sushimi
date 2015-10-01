//
//  Cart.h
//  SushimiApp
//
//  Created by Artem Demidovich on 4/16/15.
//  Copyright (c) 2015 AphionSoftware. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface CartModel : NSObject

@property (nonatomic, retain) NSString *id;
@property (nonatomic) NSInteger cityId;
@property (nonatomic) NSInteger count;
@property (nonatomic) BOOL isEmpty;
@property (nonatomic, retain) NSMutableArray *items;
@property (nonatomic) NSInteger minSum;
@property (nonatomic) NSInteger sum;

@end
