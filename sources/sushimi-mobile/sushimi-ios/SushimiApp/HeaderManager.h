//
//  HeaderManager.h
//  SushimiApp
//
//  Created by Artem Demidovich on 7/10/15.
//  Copyright (c) 2015 AphionSoftware. All rights reserved.
//

#import <Foundation/Foundation.h>

#import "RKObjectRequestOperation.h"
#import "RKObjectManager.h"

@interface HeaderManager : NSObject

+(void) addApplicationHeaderToObjectRequestOperations:(NSMutableURLRequest*) mutableUrlRequest;

+(void) addApplicationHeaderToObjectManager:(RKObjectManager*)objectManager;

@end
