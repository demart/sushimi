//
//  UserService.m
//  SushimiCourierApp
//
//  Created by Artem Demidovich on 10/11/15.
//  Copyright © 2015 Aphion Software. All rights reserved.
//

#import "UserService.h"
#import "UrlHelper.h"

#import "ResponseWrapperModel.h"
#import "LoginRequestModel.h"
#import "LoginResponseModel.h"
#import "UpdateGeolocationCoordinateModel.h"

#import "RKObjectManager.h"
#import "RKObjectMapping.h"
#import "RKResponseDescriptor.h"
#import "RKObjectRequestOperation.h"
#import "RKRelationshipMapping.h"
#import "RKRequestDescriptor.h"
#import "RKLog.h"
#import "RKMIMETypes.h"

/*
 Сервис для входа и передачи геолокации и других функций связанных с пользователем
 */
@implementation UserService

// Временное хранение имени пользователя
static NSString* _username;

+(NSString*) getUserLogin {
    NSUserDefaults *defaults = [NSUserDefaults standardUserDefaults];
    return  [defaults objectForKey:@"settings.userLogin"];
}
+(void) saveUserLogin:(NSString*) login {
    NSUserDefaults *defaults = [NSUserDefaults standardUserDefaults];
    [defaults setObject:login forKey:@"settings.userLogin"];
    [defaults synchronize];
}




// Получить сохраненный (в памяти) токен
+(NSString*) getAuthToken {
    NSUserDefaults *defaults = [NSUserDefaults standardUserDefaults];
    return  [defaults objectForKey:@"settings.authToken"];
}

+(void) authenticate:(LoginResponseModel*) loginResponseModel {
    NSUserDefaults *defaults = [NSUserDefaults standardUserDefaults];
    [defaults setObject:loginResponseModel.authToken forKey:@"settings.authToken"];
    [defaults synchronize];
    
    _username = loginResponseModel.username;
}



// Асинхронный процесс авторизации пользователя
+(void) userLoginWithLogin:(NSString*) loginValue andWithCallback:(SEL) callback onController:(BaseViewController*) controller {
    NSLog(@"Авторизуемся");
    
    LoginRequestModel *model = [LoginRequestModel alloc];
    model.userKey = loginValue;
    model.appVersion = @"1.0";
    model.operationSystemVersion = @"9.0.2";
    model.mobileOperationSystem = @"IOS";
    model.pushKey = @"super push";
    model.latitude = @"52";
    model.longitude = @"51";
    
    RKObjectManager *objectManager = [UserService buildObjectManagerForLogin];
    [objectManager
     postObject:model
     path:@"auth"
     parameters:nil
     success:^(RKObjectRequestOperation *operation, RKMappingResult *result) {
         NSLog(@"%@",[[result.array objectAtIndex:0] valueForKey:@"status"]);
         NSLog(@"%@",[[result.array objectAtIndex:0] valueForKey:@"errorMessage"]);
         if ([[[result.array objectAtIndex:0] valueForKey:@"status"] isEqualToString:@"SUCCESS"]) {
             NSObject *data = [[result.array objectAtIndex:0] valueForKey:@"data"];
             [controller performSelector:callback withObject:data withObject:nil ];
         } else {
             [controller performSelector:callback withObject:nil withObject:nil];
             //[controller stopLoading:YES withError:@"Ошибка при попытке зарегистрировать Ваш заказ. Попробуйте еще раз."];
         }
     }
     failure:^(RKObjectRequestOperation *operation, NSError *error){
         NSLog(@"Error %@", error);
         [controller performSelector:callback withObject:nil withObject:error];
         //[controller stopLoading:YES withError:@"Ошибка при попытке зарегистрировать Ваш заказ. Попробуйте еще раз."];
     }];
}



+ (RKObjectManager *) buildObjectManagerForLogin {
    NSURL *targetUrl = [NSURL URLWithString:[UrlHelper loginUrl]];
    RKObjectMapping* responseDataModel = [RKObjectMapping mappingForClass:[LoginResponseModel class]];
    [responseDataModel addAttributeMappingsFromDictionary:@{
                                                            @"authToken": @"authToken",
                                                            @"username": @"username"
                                                            }];
    
    RKObjectMapping* wrapperMapping = [RKObjectMapping mappingForClass:[ResponseWrapperModel class]];
    [wrapperMapping addAttributeMappingsFromDictionary:@{
                                                         @"status": @"status",
                                                         //@"data": @"data",
                                                         @"errorCode": @"errorCode",
                                                         @"errorMessage": @"errorMessage"
                                                         }];
    
    
    [wrapperMapping addPropertyMapping:[RKRelationshipMapping relationshipMappingFromKeyPath:@"data"
                                                                                   toKeyPath:@"data"
                                                                                 withMapping:responseDataModel]];
    
    RKResponseDescriptor *responseWrapperDescriptor = [RKResponseDescriptor responseDescriptorWithMapping:wrapperMapping method:RKRequestMethodAny pathPattern:nil keyPath:@"" statusCodes:RKStatusCodeIndexSetForClass(RKStatusCodeClassSuccessful) ];
    
    // ==== REQUEST DESC =====
    
    RKObjectMapping* loginRequestModel = [RKObjectMapping requestMapping];
    [loginRequestModel addAttributeMappingsFromDictionary:@{
                                                    @"userKey": @"userKey",
                                                    @"appVersion": @"appVersion",
                                                    @"operationSystemVersion": @"operationSystemVersion",
                                                    @"mobileOperationSystem": @"mobileOperationSystem",
                                                    @"pushKey": @"pushKey",
                                                    @"latitude": @"latitude",
                                                    @"longitude": @"longitude"
                                                }];
    
    
    RKObjectManager *objectManager = [RKObjectManager managerWithBaseURL:targetUrl];
    objectManager.requestSerializationMIMEType = RKMIMETypeJSON;
    
    RKRequestDescriptor *requestDescriptor = [RKRequestDescriptor requestDescriptorWithMapping:loginRequestModel objectClass:[LoginRequestModel class] rootKeyPath:nil method:RKRequestMethodPOST];
    
    [objectManager addRequestDescriptor:requestDescriptor];
    [objectManager addResponseDescriptor:responseWrapperDescriptor];
    
    return objectManager;
}

// 1. Получить токен авторизации
// 2. Получить гепозицию
// 3. Обновить данные на сервере
+(void) updateGeolocationCoordinate:(CLLocationCoordinate2D) lastLocation {
    NSString* authToken = [UserService getAuthToken];
    if (authToken == nil) {
        NSLog(@"Stop updating service, because this is invalid state");
        // TODO: Stop updating service, because this is invalid state
        return;
    }
    
    // Model
    UpdateGeolocationCoordinateModel *model = [[UpdateGeolocationCoordinateModel alloc] init];
    model.authToken = authToken;
    model.latitude = [@(lastLocation.latitude) stringValue];
    model.longitude = [@(lastLocation.longitude) stringValue];
    
    // Service invocation
    RKObjectManager *objectManager = [UserService buildObjectManagerForUpdateGeolocation];
    [objectManager
     postObject:model
     path:@"geolocation"
     parameters:nil
     success:^(RKObjectRequestOperation *operation, RKMappingResult *result) {
         NSString* status = [[result.array objectAtIndex:0] valueForKey:@"status"];
         NSLog(@"%@",status);
         NSLog(@"%@",[[result.array objectAtIndex:0] valueForKey:@"errorMessage"]);
         if ([[[result.array objectAtIndex:0] valueForKey:@"status"] isEqualToString:@"SUCCESS"]) {
             // Ok
             //NSObject *data = [[result.array objectAtIndex:0] valueForKey:@"data"];
         } else {
             // CHECK SECURITY
             if ([status isEqualToString:@"004"]) { // USER ACCOUNT IS BLOCKED
                 // STOP UPDATING GEOLOCATION UNTIL SUCCESSFULL SIGNIN
             }
         }
     }
     failure:^(RKObjectRequestOperation *operation, NSError *error){
         NSLog(@"Error %@", error);
            // LOG AND SKIP
     }];
    
}



+ (RKObjectManager *) buildObjectManagerForUpdateGeolocation {
    NSURL *targetUrl = [NSURL URLWithString:[UrlHelper updateGeolocationUrl]];
    
    // ==== RESPONSE DESC =====
    
    RKObjectMapping* wrapperMapping = [RKObjectMapping mappingForClass:[ResponseWrapperModel class]];
    [wrapperMapping addAttributeMappingsFromDictionary:@{
                                                         @"status": @"status",
                                                         @"errorCode": @"errorCode",
                                                         @"errorMessage": @"errorMessage"
                                                         }];
    
    RKResponseDescriptor *responseWrapperDescriptor = [RKResponseDescriptor responseDescriptorWithMapping:wrapperMapping method:RKRequestMethodAny pathPattern:nil keyPath:@"" statusCodes:RKStatusCodeIndexSetForClass(RKStatusCodeClassSuccessful) ];
    
    // ==== REQUEST DESC =====
    
    RKObjectMapping* loginRequestModel = [RKObjectMapping requestMapping];
    [loginRequestModel addAttributeMappingsFromDictionary:@{
                                                            @"authToken": @"authToken",
                                                            @"latitude": @"latitude",
                                                            @"longitude": @"longitude"
                                                            }];
    
    RKObjectManager *objectManager = [RKObjectManager managerWithBaseURL:targetUrl];
    objectManager.requestSerializationMIMEType = RKMIMETypeJSON;
    
    RKRequestDescriptor *requestDescriptor = [RKRequestDescriptor requestDescriptorWithMapping:loginRequestModel objectClass:[UpdateGeolocationCoordinateModel class] rootKeyPath:nil method:RKRequestMethodPOST];
    
    [objectManager addRequestDescriptor:requestDescriptor];
    [objectManager addResponseDescriptor:responseWrapperDescriptor];
    
    return objectManager;
}




@end
