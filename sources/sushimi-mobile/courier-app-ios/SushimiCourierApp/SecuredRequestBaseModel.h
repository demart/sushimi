//
//  SecuredRequestBaseModel.h
//  SushimiCourierApp
//
//  Created by Artem Demidovich on 10/11/15.
//  Copyright © 2015 Aphion Software. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface SecuredRequestBaseModel : NSObject

@property NSString *authToken;
@property NSString *latitude;
@property NSString *longitude;

@end
