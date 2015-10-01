//
//  FeedbackDataManager.h
//  SushimiApp
//
//  Created by Artem Demidovich on 7/27/15.
//  Copyright (c) 2015 AphionSoftware. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "ArrayBasedTableViewController.h"
#import "FeedbackRegistrationModel.h"

@interface FeedbackDataManager : NSObject

+(void) loadFeedbacks:(ArrayBasedTableViewController*)tableViewController  successSelector:(SEL) success  failureSelector:(SEL) failure  withPage:(NSInteger) page  withPageSize:(NSInteger) pageSize;

+(void) loadMetaInformation:(UITableViewController*)tableViewController successSelector:(SEL) success  failureSelector:(SEL) failure;

// DEPRICATED
+(void) loadCities:(UITableViewController*)tableViewController successSelector:(SEL) success  failureSelector:(SEL) failure ;
// DEPRICATED
+(void) loadRestoraunts:(UITableViewController*)tableViewController successSelector:(SEL) success  failureSelector:(SEL) failure  withinCity:(NSInteger) cityId;

+(void) registerNewFeedback:(UITableViewController*)tableViewController successSelector:(SEL) success  failureSelector:(SEL) failure withFeedbackModel:(FeedbackRegistrationModel*)model;

@end
