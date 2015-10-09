//
//  FeedbackDataManager.m
//  SushimiApp
//
//  Created by Artem Demidovich on 7/27/15.
//  Copyright (c) 2015 AphionSoftware. All rights reserved.
//

#import "FeedbackDataManager.h"

#import "FeedbackModel.h"
#import "FeedbacksWrapperModel.h"
#import "ResponseWrapper.h"

#import "FeedbackMetaInformationModel.h"
#import "FeedbackCityModel.h"
#import "FeedbackRestaurantModel.h"
#import "FeedbackTypeModel.h"

#import "HeaderManager.h"
#import "ResponseWrapper.h"
#import "RKObjectManager.h"
#import "RKObjectMapping.h"
#import "RKResponseDescriptor.h"
#import "RKObjectRequestOperation.h"
#import "RKRelationshipMapping.h"
#import "RKLog.h"
#import "RKMIMETypes.h"

#import "Constants.h"
#import "UrlHelper.h"

@implementation FeedbackDataManager


+(void) loadFeedbacks:(ArrayBasedTableViewController*)tableViewController  successSelector:(SEL) success  failureSelector:(SEL) failure  withPage:(NSInteger) page withPageSize:(NSInteger) pageSize {
    
    RKObjectMapping* feedbackMapping = [RKObjectMapping mappingForClass:[FeedbackModel class]];
    [feedbackMapping addAttributeMappingsFromDictionary:@{
                                                          @"id": @"id",
                                                          @"created": @"created",
                                                          @"email": @"email",
                                                          @"feedbackType": @"feedbackType",
                                                          @"name": @"name",
                                                          @"phone": @"phone",
                                                          @"text": @"text",
                                                          }];
    
    
    RKObjectMapping* feedbacksWrapperMapping = [RKObjectMapping mappingForClass:[FeedbacksWrapperModel class]];
    [feedbacksWrapperMapping addAttributeMappingsFromDictionary:@{
                                                                  @"page": @"page",
                                                                  @"pageSize": @"pageSize",
                                                                  @"pageCount": @"pageCount"
                                                                  }];
    [feedbacksWrapperMapping addPropertyMapping:[RKRelationshipMapping relationshipMappingFromKeyPath:@"feedbacks"
                                                                                            toKeyPath:@"feedbacks"
                                                                                          withMapping:feedbackMapping]];
    
    
    RKObjectMapping* wrapperMapping = [RKObjectMapping mappingForClass:[ResponseWrapper class]];
    [wrapperMapping addAttributeMappingsFromDictionary:@{
                                                         @"status": @"status",
                                                         @"errorCode": @"errorCode",
                                                         @"errorMessage": @"errorMessage"
                                                         }];
    
    [wrapperMapping addPropertyMapping:[RKRelationshipMapping relationshipMappingFromKeyPath:@"data"
                                                                                   toKeyPath:@"data"
                                                                                 withMapping:feedbacksWrapperMapping]];
    
    RKResponseDescriptor *responseWrapperDescriptor = [RKResponseDescriptor responseDescriptorWithMapping:wrapperMapping method:RKRequestMethodAny pathPattern:nil keyPath:@"" statusCodes:RKStatusCodeIndexSetForClass(RKStatusCodeClassSuccessful)];
    
    NSURL *URL = [NSURL URLWithString:[UrlHelper getFeedbacksUrlWithPage:page andSize:pageSize]];
    
    NSMutableURLRequest *request = [[NSMutableURLRequest alloc] initWithURL:URL];
    [HeaderManager addApplicationHeaderToObjectRequestOperations:request];
    RKObjectRequestOperation *objectRequestOperation = [[RKObjectRequestOperation alloc] initWithRequest:request responseDescriptors:@[ responseWrapperDescriptor ]];
    [objectRequestOperation setCompletionBlockWithSuccess:^(RKObjectRequestOperation *operation, RKMappingResult *mappingResult) {
        NSObject *serverData = [[mappingResult.array objectAtIndex:0] valueForKey:@"data"][0];
        [tableViewController performSelector:success withObject:serverData];
    } failure:^(RKObjectRequestOperation *operation, NSError *error) {
        NSLog(@"Operation failed with error: %@", error);
        [tableViewController performSelector:failure withObject:error];
    }];
    
    [objectRequestOperation start];
}


+(void) loadMetaInformation:(UITableViewController*)tableViewController successSelector:(SEL) success  failureSelector:(SEL) failure {
    
    RKObjectMapping* feedbackRestaurantModelMapping = [RKObjectMapping mappingForClass:[FeedbackRestaurantModel class]];
    [feedbackRestaurantModelMapping addAttributeMappingsFromDictionary:@{
                                                                   @"selected": @"selected",
                                                                   @"text": @"text",
                                                                   @"value": @"value"
                                                                   }];

    
    RKObjectMapping* feedbackCityModelMapping = [RKObjectMapping mappingForClass:[FeedbackCityModel class]];
    [feedbackCityModelMapping addAttributeMappingsFromDictionary:@{
                                                                   @"selected": @"selected",
                                                                   @"text": @"text",
                                                                   @"value": @"value"
                                                                   }];
    
    [feedbackCityModelMapping addPropertyMapping:[RKRelationshipMapping relationshipMappingFromKeyPath:@"restaurants"
                                                                                   toKeyPath:@"restaurants"
                                                                                 withMapping:feedbackRestaurantModelMapping]];
    
    RKObjectMapping* feedbackTypeModelMapping = [RKObjectMapping mappingForClass:[FeedbackTypeModel class]];
    [feedbackTypeModelMapping addAttributeMappingsFromDictionary:@{
                                                                   @"value": @"value",
                                                                   @"name": @"name"
                                                                   }];
    
    RKObjectMapping* feedbackMetaModelMapping = [RKObjectMapping mappingForClass:[FeedbackMetaInformationModel class]];
    [feedbackMetaModelMapping addPropertyMapping:[RKRelationshipMapping relationshipMappingFromKeyPath:@"types"
                                                                                             toKeyPath:@"types"
                                                                                           withMapping:feedbackTypeModelMapping]];
    [feedbackMetaModelMapping addPropertyMapping:[RKRelationshipMapping relationshipMappingFromKeyPath:@"cities"
                                                                                   toKeyPath:@"cities"
                                                                                 withMapping:feedbackCityModelMapping]];
    
    
    RKObjectMapping* wrapperMapping = [RKObjectMapping mappingForClass:[ResponseWrapper class]];
    [wrapperMapping addAttributeMappingsFromDictionary:@{
                                                         @"status": @"status",
                                                         @"errorCode": @"errorCode",
                                                         @"errorMessage": @"errorMessage"
                                                         }];
    
    [wrapperMapping addPropertyMapping:[RKRelationshipMapping relationshipMappingFromKeyPath:@"data"
                                                                                   toKeyPath:@"data"
                                                                                 withMapping:feedbackMetaModelMapping]];
    
    RKResponseDescriptor *responseWrapperDescriptor = [RKResponseDescriptor responseDescriptorWithMapping:wrapperMapping method:RKRequestMethodAny pathPattern:nil keyPath:@"" statusCodes:RKStatusCodeIndexSetForClass(RKStatusCodeClassSuccessful)];
    
    NSURL *URL = [NSURL URLWithString: [UrlHelper getFeedbacksMetaUrl]];
    
    //NSURL *URL = [NSURL URLWithString: [[NSString alloc]  initWithFormat:@"%@%@",
    //                                 [Constants getRestAPIBaseUrl], @"/v1/feedback/meta"]];
                  
    //NSURL *URL = [NSURL URLWithString: @"http://localhost:9000/v1/feedback/meta"];
    /*
     NSURL *URL = [NSURL URLWithString: @"http://api.sushimi.kz/rest-api/v1/feedback/cities"];
     */
    
    NSMutableURLRequest *request = [[NSMutableURLRequest alloc] initWithURL:URL];
    [HeaderManager addApplicationHeaderToObjectRequestOperations:request];
    RKObjectRequestOperation *objectRequestOperation = [[RKObjectRequestOperation alloc] initWithRequest:request responseDescriptors:@[ responseWrapperDescriptor ]];
    [objectRequestOperation setCompletionBlockWithSuccess:^(RKObjectRequestOperation *operation, RKMappingResult *mappingResult) {
        NSObject *meta = [[mappingResult.array objectAtIndex:0] valueForKey:@"data"][0];
        [tableViewController performSelector:success withObject:meta];
    } failure:^(RKObjectRequestOperation *operation, NSError *error) {
        NSLog(@"Operation failed with error: %@", error);
        [tableViewController performSelector:failure withObject:error];
    }];
    
    [objectRequestOperation start];
}


+(void) loadCities:(UITableViewController*)tableViewController successSelector:(SEL) success  failureSelector:(SEL) failure {
    
    RKObjectMapping* feedbackCityModelMapping = [RKObjectMapping mappingForClass:[FeedbackCityModel class]];
    [feedbackCityModelMapping addAttributeMappingsFromDictionary:@{
                                                                  @"selected": @"selected",
                                                                  @"text": @"text",
                                                                  @"value": @"value"
                                                                  }];
    
    RKObjectMapping* wrapperMapping = [RKObjectMapping mappingForClass:[ResponseWrapper class]];
    [wrapperMapping addAttributeMappingsFromDictionary:@{
                                                         @"status": @"status",
                                                         @"errorCode": @"errorCode",
                                                         @"errorMessage": @"errorMessage"
                                                         }];
    
    [wrapperMapping addPropertyMapping:[RKRelationshipMapping relationshipMappingFromKeyPath:@"data"
                                                                                   toKeyPath:@"data"
                                                                                 withMapping:feedbackCityModelMapping]];
    
    RKResponseDescriptor *responseWrapperDescriptor = [RKResponseDescriptor responseDescriptorWithMapping:wrapperMapping method:RKRequestMethodAny pathPattern:nil keyPath:@"" statusCodes:RKStatusCodeIndexSetForClass(RKStatusCodeClassSuccessful)];
    
    NSURL *URL = [NSURL URLWithString: [UrlHelper getFeedbacksCitiesUrl]];
    
    //NSURL *URL = [NSURL URLWithString: @"http://localhost:9000/v1/feedback/city/list"];
    /*
    NSURL *URL = [NSURL URLWithString: @"http://api.sushimi.kz/rest-api/v1/feedback/cities"];
     */
    
    NSMutableURLRequest *request = [[NSMutableURLRequest alloc] initWithURL:URL];
    [HeaderManager addApplicationHeaderToObjectRequestOperations:request];
    RKObjectRequestOperation *objectRequestOperation = [[RKObjectRequestOperation alloc] initWithRequest:request responseDescriptors:@[ responseWrapperDescriptor ]];
    [objectRequestOperation setCompletionBlockWithSuccess:^(RKObjectRequestOperation *operation, RKMappingResult *mappingResult) {
        NSArray *cities = [[mappingResult.array objectAtIndex:0] valueForKey:@"data"][0];
        [tableViewController performSelector:success withObject:cities];
    } failure:^(RKObjectRequestOperation *operation, NSError *error) {
        NSLog(@"Operation failed with error: %@", error);
        [tableViewController performSelector:failure];
    }];
    
    [objectRequestOperation start];
}

+(void) loadRestoraunts:(UITableViewController*)tableViewController successSelector:(SEL) success  failureSelector:(SEL) failure withinCity:(NSInteger) cityId {
    RKObjectMapping* feedbackCityModelMapping = [RKObjectMapping mappingForClass:[FeedbackCityModel class]];
    [feedbackCityModelMapping addAttributeMappingsFromDictionary:@{
                                                                   @"selected": @"selected",
                                                                   @"text": @"text",
                                                                   @"value": @"value"
                                                                   }];
    
    RKObjectMapping* wrapperMapping = [RKObjectMapping mappingForClass:[ResponseWrapper class]];
    [wrapperMapping addAttributeMappingsFromDictionary:@{
                                                         @"status": @"status",
                                                         @"errorCode": @"errorCode",
                                                         @"errorMessage": @"errorMessage"
                                                         }];
    
    [wrapperMapping addPropertyMapping:[RKRelationshipMapping relationshipMappingFromKeyPath:@"data"
                                                                                   toKeyPath:@"data"
                                                                                 withMapping:feedbackCityModelMapping]];
    
    RKResponseDescriptor *responseWrapperDescriptor = [RKResponseDescriptor responseDescriptorWithMapping:wrapperMapping method:RKRequestMethodAny pathPattern:nil keyPath:@"" statusCodes:RKStatusCodeIndexSetForClass(RKStatusCodeClassSuccessful)];
    
    
    NSURL *URL = [NSURL URLWithString: [UrlHelper getFeedbacksRestaurantsUrlByCityId:cityId]];
    
    /*
    NSURL *URL = [NSURL URLWithString: [[NSString alloc] initWithFormat:@"http://localhost:9000/v1/feedback/city/%li/restaurants", (long)cityId]];
    */
    /*
     NSURL *URL = [NSURL URLWithString: @"http://api.sushimi.kz/rest-api/v1/feedback/cities"];
     */
    NSMutableURLRequest *request = [[NSMutableURLRequest alloc] initWithURL:URL];
    [HeaderManager addApplicationHeaderToObjectRequestOperations:request];
    RKObjectRequestOperation *objectRequestOperation = [[RKObjectRequestOperation alloc] initWithRequest:request responseDescriptors:@[ responseWrapperDescriptor ]];
    [objectRequestOperation setCompletionBlockWithSuccess:^(RKObjectRequestOperation *operation, RKMappingResult *mappingResult) {
        NSArray *restaurants = [[mappingResult.array objectAtIndex:0] valueForKey:@"data"][0];
        NSLog(@"SENT");
        [tableViewController performSelector:success withObject:restaurants];
    } failure:^(RKObjectRequestOperation *operation, NSError *error) {
        NSLog(@"Operation failed with error: %@", error);
        [tableViewController performSelector:failure];
    }];
    
    [objectRequestOperation start];
}

+(void) registerNewFeedback:(UITableViewController*)tableViewController successSelector:(SEL) successSelector  failureSelector:(SEL) failureSelector withFeedbackModel:(FeedbackRegistrationModel*)model {

    // remove unneeded symbols like ( ) + and space
    NSCharacterSet *nonNumberSet = [[NSCharacterSet decimalDigitCharacterSet] invertedSet];
    model.phone = [[model.phone componentsSeparatedByCharactersInSet:nonNumberSet] componentsJoinedByString:@""];
    model.phone = [model.phone substringFromIndex:1];
    
    RKObjectMapping* wrapperMapping = [RKObjectMapping mappingForClass:[ResponseWrapper class]];
    [wrapperMapping addAttributeMappingsFromDictionary:@{
                                                         @"status": @"status",
                                                         @"errorCode": @"errorCode",
                                                         @"errorMessage": @"errorMessage"
                                                         }];
    
    RKResponseDescriptor *responseWrapperDescriptor = [RKResponseDescriptor responseDescriptorWithMapping:wrapperMapping method:RKRequestMethodAny pathPattern:nil keyPath:@"" statusCodes:RKStatusCodeIndexSetForClass(RKStatusCodeClassSuccessful)];
    
    
    NSURL *URL = [NSURL URLWithString: [UrlHelper getFeedbacksRegisterNewFeedbackUrl]];
    
    //NSURL *URL = [NSURL URLWithString: @"http://localhost:9000/v1/feedback/"];
    
    RKObjectMapping* requestNewFeedbackModelMapping = [RKObjectMapping requestMapping];
    [requestNewFeedbackModelMapping addAttributeMappingsFromDictionary:@{
                                                                    @"name": @"name",
                                                                    @"phone": @"phone",
                                                                    @"cityId": @"cityId",
                                                                    @"placeId": @"placeId",
                                                                    @"type": @"type",
                                                                    @"orderNumber": @"orderNumber",
                                                                    @"text": @"text",
                                                                    }];
    
    RKObjectManager *objectManager = [RKObjectManager managerWithBaseURL:URL];
    objectManager.requestSerializationMIMEType = RKMIMETypeJSON;
    
    RKRequestDescriptor *requestDescriptor = [RKRequestDescriptor requestDescriptorWithMapping:requestNewFeedbackModelMapping objectClass:[FeedbackRegistrationModel class] rootKeyPath:nil method:RKRequestMethodPOST];
    
    [objectManager addRequestDescriptor:requestDescriptor];
    [objectManager addResponseDescriptor:responseWrapperDescriptor];
    
    
    [HeaderManager addApplicationHeaderToObjectManager:objectManager];
    
    [objectManager
     postObject:model
     path:@"register"
     parameters:nil
     success:^(RKObjectRequestOperation *operation, RKMappingResult *result) {
         NSString *status = [[result.array objectAtIndex:0] valueForKey:@"status"];
         [tableViewController performSelector:successSelector withObject:status];
     }
     failure:^(RKObjectRequestOperation *operation, NSError *error){
         NSLog(@"Operation failed with error: %@", error);
         [tableViewController performSelector:failureSelector withObject:error];
     }];
/*
    NSMutableURLRequest *request = [[NSMutableURLRequest alloc] initWithURL:URL];
    RKObjectRequestOperation *objectRequestOperation = [[RKObjectRequestOperation alloc] initWithRequest:request responseDescriptors:@[ responseWrapperDescriptor ]];
    [objectRequestOperation setCompletionBlockWithSuccess:^(RKObjectRequestOperation *operation, RKMappingResult *mappingResult) {
        NSString *status = [[mappingResult.array objectAtIndex:0] valueForKey:@"status"][0];
        [tableViewController performSelector:success withObject:status];
    } failure:^(RKObjectRequestOperation *operation, NSError *error) {
        NSLog(@"Operation failed with error: %@", error);
        [tableViewController performSelector:failure withObject:error];
    }];
    
    [objectRequestOperation start];
 */
}

@end
