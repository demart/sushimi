//
//  Wrapper.h
//  SushimiApp
//
//  Created by Artem Demidovich on 2/12/15.
//  Copyright (c) 2015 AphionSoftware. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface ResponseWrapper : NSObject

@property NSString *status;
@property NSArray *data;
@property NSString *errorCode;
@property NSString *errorMessage;

@end
