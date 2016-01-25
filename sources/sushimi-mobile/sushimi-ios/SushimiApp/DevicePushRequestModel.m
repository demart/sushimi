//
//  DevicePushRequestModel.m
//  SushimiApp
//
//  Created by Artem Demidovich on 10/10/15.
//  Copyright © 2015 AphionSoftware. All rights reserved.
//

#import "DevicePushRequestModel.h"

@implementation DevicePushRequestModel

+(DevicePushRequestModel*) buildModel {
    DevicePushRequestModel *model = [[DevicePushRequestModel alloc ] init];
    model.platform = @"IOS";
    return model;
}

@end
