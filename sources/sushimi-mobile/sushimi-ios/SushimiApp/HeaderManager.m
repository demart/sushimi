//
//  HeaderManager.m
//  SushimiApp
//
//  Created by Artem Demidovich on 7/10/15.
//  Copyright (c) 2015 AphionSoftware. All rights reserved.
//

#import "HeaderManager.h"
#import "Constants.h"

@implementation HeaderManager

static NSString *SYSTEM_NAME = @"sushimi-system-name";
static NSString *SYSTEM_VERSION = @"sushimi-system-version";
static NSString *SYSTEM_UNIQUE_IDENTIFIER = @"sushimi-system-unique-identifier";
static NSString *SYSTEM_APPLICATION_IDENTIFIER = @"sushimi-system-application-identifier";
static NSString *APPLICATION_VERSION = @"sushimi-app-version";

static NSString *AppVer = @"1.0";

+(void) addApplicationHeaderToObjectRequestOperations:(NSMutableURLRequest*) mutableUrlRequest {
    [mutableUrlRequest setValue:[[UIDevice currentDevice] systemName] forHTTPHeaderField:SYSTEM_NAME];
    [mutableUrlRequest setValue:[[UIDevice currentDevice] systemVersion] forHTTPHeaderField:SYSTEM_VERSION];
    [mutableUrlRequest setValue:[[[UIDevice currentDevice] identifierForVendor] UUIDString] forHTTPHeaderField:SYSTEM_UNIQUE_IDENTIFIER];
    [mutableUrlRequest setValue:[[[UIDevice currentDevice] identifierForVendor] UUIDString] forHTTPHeaderField:SYSTEM_APPLICATION_IDENTIFIER];
    [mutableUrlRequest setValue:AppVer forHTTPHeaderField:APPLICATION_VERSION];
}

+(void) addApplicationHeaderToObjectManager:(RKObjectManager*)objectManager {
    [objectManager.HTTPClient setDefaultHeader:SYSTEM_NAME value:[[UIDevice currentDevice] systemName]];
    [objectManager.HTTPClient setDefaultHeader:SYSTEM_VERSION value:[[UIDevice currentDevice] systemVersion]];
    [objectManager.HTTPClient setDefaultHeader:SYSTEM_UNIQUE_IDENTIFIER value:[[[UIDevice currentDevice] identifierForVendor] UUIDString]];
    [objectManager.HTTPClient setDefaultHeader:SYSTEM_APPLICATION_IDENTIFIER value:[[[UIDevice currentDevice] identifierForVendor] UUIDString]];
    [objectManager.HTTPClient setDefaultHeader:APPLICATION_VERSION value:AppVer];
}
     
     /*
NSLog(@"ASI: %@", [[[ASIdentifierManager sharedManager] advertisingIdentifier] UUIDString]);

NSLog(@"identifierForVendor: %@", [[[UIDevice currentDevice] identifierForVendor] UUIDString]);
NSLog(@"model: %@", [[UIDevice currentDevice] model]);
NSLog(@"name: %@", [[UIDevice currentDevice] name]);
NSLog(@"systemName: %@", [[UIDevice currentDevice] systemName]);
NSLog(@"systemVersion: %@", [[UIDevice currentDevice] systemVersion]);
*/


@end
