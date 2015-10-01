//
//  LocalImageCache.h
//  SushimiApp
//
//  Created by Artem Demidovich on 3/16/15.
//  Copyright (c) 2015 AphionSoftware. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>

@interface LocalImageCache : NSObject

+(void)saveImageToLocalCache:(NSString *)imageName withData:(UIImage*)uiImage;
+(NSData *)loadImageFromLocalCache:(NSString *)imageName;

@end
