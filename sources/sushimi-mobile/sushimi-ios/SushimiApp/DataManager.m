//
//  DataManager.m
//  SushimiApp
//
//  Created by Artem Demidovich on 3/16/15.
//  Copyright (c) 2015 AphionSoftware. All rights reserved.
//

#import "DataManager.h"
#import "HeaderManager.h"
#import "RKObjectMapping.h"
#import "RKResponseDescriptor.h"
#import "RKObjectRequestOperation.h"
#import "RKRelationshipMapping.h"

#import "CategoryItem.h"
#import "ResponseWrapper.h"
#import "Product.h"

#import "Restaurant.h"
#import "RestaurantPhoto.h"

#import "Announcement.h"
#import "DeliveryInfo.h"
#import "AboutCompany.h"

#import "UrlHelper.h"


@implementation DataManager

static NSMutableDictionary *loadedCachedData;

+(NSObject*) getLoadedDataByKey:(NSString*)key {
    if (key == nil) return nil;
    
    if (loadedCachedData == nil)
        loadedCachedData = [[NSMutableDictionary alloc] init];
    
    return loadedCachedData[key];
}

+(void) putLoadedData:(NSObject*)object withKey:(NSString*)key {
    if (key == nil) return;
    
    if (loadedCachedData == nil)
        loadedCachedData = [[NSMutableDictionary alloc] init];
    [loadedCachedData setValue:object forKey:key];
}


+(void)loadCategories:(NSString *)rootCategoryId onTableViewController:(ArrayBasedTableViewController*)tableViewController {
    [tableViewController startLoading:YES];

    // Load data from cache
    NSObject *data = nil;
    if (rootCategoryId == nil) {
        data = [[self class] getLoadedDataByKey:@"ROOT_CATEGORIES"];
    } else {
        data = [[self class] getLoadedDataByKey: [[NSString alloc] initWithFormat:@"CATEGORY_KEY_%@", rootCategoryId]];
    }
    if (data != nil) {
        tableViewController.items = (NSArray*)data;
        [tableViewController stopLoading:NO withError:nil];
        [tableViewController.tableView reloadData];
        return;
    }
        
    // Load data from server
    RKObjectMapping* categoryMapping = [RKObjectMapping mappingForClass:[CategoryItem class]];
    [categoryMapping addAttributeMappingsFromDictionary:@{
                                                          @"id": @"id",
                                                          @"name": @"name",
                                                          @"hasChildren": @"hasChildren",
                                                          @"imageUrl": @"imageUrl",
                                                          @"childrenCount": @"childrenCount",
                                                          @"lastModifiedDate": @"lastModifiedDate"
                                                          }];
    
    // Override point for customization after application launch.
    RKObjectMapping* wrapperMapping = [RKObjectMapping mappingForClass:[ResponseWrapper class]];
    [wrapperMapping addAttributeMappingsFromDictionary:@{
                                                         @"status": @"status",
                                                         @"errorCode": @"errorCode",
                                                         //@"data": @"data",
                                                         @"errorMessage": @"errorMessage"
                                                         }];
    
    [wrapperMapping addPropertyMapping:[RKRelationshipMapping relationshipMappingFromKeyPath:@"data"
                                                                                   toKeyPath:@"data"
                                                                                 withMapping:categoryMapping]];
    
    RKResponseDescriptor *responseWrapperDescriptor = [RKResponseDescriptor responseDescriptorWithMapping:wrapperMapping method:RKRequestMethodAny pathPattern:nil keyPath:@"" statusCodes:RKStatusCodeIndexSetForClass(RKStatusCodeClassSuccessful)];
    
    NSURL *targetUrl = nil;
    if (rootCategoryId == nil) {
        targetUrl = [NSURL URLWithString:[UrlHelper getCategoriesUrl]];
//        targetUrl = [NSURL URLWithString:@"http://api.sushimi.kz/rest-api/v1/category/list"];
    } else {
        targetUrl = [NSURL URLWithString:[UrlHelper getCategoriesUrlByParent:rootCategoryId]];
        /*
        NSString *subCategoryURL = @"http://api.sushimi.kz/rest-api/v1/category/";
        subCategoryURL =  [subCategoryURL stringByAppendingString: rootCategoryId];
        subCategoryURL =  [subCategoryURL stringByAppendingString:@"/children"];
        targetUrl = [NSURL URLWithString:subCategoryURL];
        */
    }
    
    NSMutableURLRequest *request = [[NSMutableURLRequest alloc] initWithURL:targetUrl];
    [HeaderManager addApplicationHeaderToObjectRequestOperations:request];
    RKObjectRequestOperation *objectRequestOperation = [[RKObjectRequestOperation alloc] initWithRequest:request responseDescriptors:@[ responseWrapperDescriptor ]];
    [objectRequestOperation setCompletionBlockWithSuccess:^(RKObjectRequestOperation *operation, RKMappingResult *mappingResult) {
        tableViewController.items = [[mappingResult.array objectAtIndex:0] valueForKey:@"data"];
        [tableViewController stopLoading:YES withError:nil];
        [tableViewController.tableView reloadData];
        // caching
        if (rootCategoryId == nil) {
            [[self class] putLoadedData:tableViewController.items withKey:@"ROOT_CATEGORIES"];
        } else {
            [[self class] putLoadedData:tableViewController.items withKey:[[NSString alloc] initWithFormat:@"CATEGORY_KEY_%@", rootCategoryId]];
        }
    } failure:^(RKObjectRequestOperation *operation, NSError *error) {
        tableViewController.items = nil;
        [tableViewController stopLoading:YES withError:@"Ошибка загрузки данных..."];
        NSLog(@"Operation failed with error: %@", error);
    }];
    
    [objectRequestOperation start];
}


+(void)loadProductsInCategory:(NSString*)categoryId onTableViewController:(ArrayBasedTableViewController*)tableViewController {
    [tableViewController startLoading:YES];
    
    // Load data from cache
    NSObject *data = [[self class] getLoadedDataByKey:[[NSString alloc] initWithFormat:@"PRODUCTS_IN_CATEGORY_%@", categoryId]];
    if (data != nil) {
        tableViewController.items = (NSArray*)data;
        [tableViewController stopLoading:NO withError:nil];
        [tableViewController.tableView reloadData];
        return;
    }
    
    RKObjectMapping* categoryMapping = [RKObjectMapping mappingForClass:[CategoryItem class]];
    [categoryMapping addAttributeMappingsFromDictionary:@{
                                                          @"id": @"id",
                                                          @"name": @"name",
                                                          @"hasChildren": @"hasChildren",
                                                          @"childrenCount": @"childrenCount",
                                                          @"lastModifiedDate": @"lastModifiedDate"
                                                          }];
    
    RKObjectMapping* productMapping = [RKObjectMapping mappingForClass:[Product class]];
    [productMapping addAttributeMappingsFromDictionary:@{
                                                         @"id": @"id",
                                                         @"code": @"code",
                                                         @"name": @"name",
                                                         @"description": @"_description",
                                                         @"imageLink": @"imageLink",
                                                         @"smallImageLink": @"smallImageLink",
                                                         @"orderNumber": @"orderNumber",
                                                         @"cost": @"cost",
                                                         @"itemCount": @"itemCount",
                                                         
                                                         @"proteins": @"proteins",
                                                         @"carbohydrates": @"carbohydrates",
                                                         @"fats": @"fats",
                                                         
                                                         @"isRecomended": @"isRecomended",
                                                         @"isNew": @"isNew",
                                                         @"isHit": @"isHit",
                                                         @"isHot": @"isHot",
                                                         @"isVegetable": @"isVegetable",
                                                         @"isPopular": @"isPopular",
                                                         
                                                         @"popularSex": @"popularSex",
                                                         @"popularAge": @"popularAge",
                                                         @"type": @"type",
                                                         }];
    
    [productMapping addPropertyMapping:[RKRelationshipMapping relationshipMappingFromKeyPath:@"category"
                                                                                   toKeyPath:@"category"
                                                                                 withMapping:categoryMapping]];
    
    
    RKObjectMapping* wrapperMapping = [RKObjectMapping mappingForClass:[ResponseWrapper class]];
    [wrapperMapping addAttributeMappingsFromDictionary:@{
                                                         @"status": @"status",
                                                         @"errorCode": @"errorCode",
                                                         @"errorMessage": @"errorMessage"
                                                         }];
    
    [wrapperMapping addPropertyMapping:[RKRelationshipMapping relationshipMappingFromKeyPath:@"data"
                                                                                   toKeyPath:@"data"
                                                                                 withMapping:productMapping]];
    
    RKResponseDescriptor *responseWrapperDescriptor = [RKResponseDescriptor responseDescriptorWithMapping:wrapperMapping method:RKRequestMethodAny pathPattern:nil keyPath:@"" statusCodes:RKStatusCodeIndexSetForClass(RKStatusCodeClassSuccessful)];
    
    /*
    NSString *productsURL = @"http://api.sushimi.kz/rest-api/v1/product/list/in/category/";
    productsURL =  [productsURL stringByAppendingString: categoryId];
    NSURL *URL = [NSURL URLWithString:productsURL];
    */
    
    NSURL *URL = [NSURL URLWithString:[UrlHelper getProductsUrlByCategory:categoryId]];
    NSMutableURLRequest *request = [[NSMutableURLRequest alloc] initWithURL:URL];
    [HeaderManager addApplicationHeaderToObjectRequestOperations:request];
    RKObjectRequestOperation *objectRequestOperation = [[RKObjectRequestOperation alloc] initWithRequest:request responseDescriptors:@[ responseWrapperDescriptor ]];
    [objectRequestOperation setCompletionBlockWithSuccess:^(RKObjectRequestOperation *operation, RKMappingResult *mappingResult) {
        tableViewController.items = [[mappingResult.array objectAtIndex:0] valueForKey:@"data"];
        [tableViewController stopLoading:YES withError:nil];
        [tableViewController.tableView reloadData];
        // caching
        [[self class] putLoadedData:tableViewController.items withKey:[[NSString alloc] initWithFormat:@"PRODUCTS_IN_CATEGORY_%@", categoryId]];
    } failure:^(RKObjectRequestOperation *operation, NSError *error) {
        tableViewController.items = nil;
        [tableViewController stopLoading:YES withError:@"Ошибка при загрузке данных..."];
        NSLog(@"Operation failed with error: %@", error);
    }];
    
    [objectRequestOperation start];
}


+(Product*)loadProductById:(NSInteger) productId {
    
    RKObjectMapping* categoryMapping = [RKObjectMapping mappingForClass:[CategoryItem class]];
    [categoryMapping addAttributeMappingsFromDictionary:@{
                                                          @"id": @"id",
                                                          @"name": @"name",
                                                          @"hasChildren": @"hasChildren",
                                                          @"childrenCount": @"childrenCount",
                                                          @"lastModifiedDate": @"lastModifiedDate"
                                                          }];
    
    RKObjectMapping* productMapping = [RKObjectMapping mappingForClass:[Product class]];
    [productMapping addAttributeMappingsFromDictionary:@{
                                                         @"id": @"id",
                                                         @"code": @"code",
                                                         @"name": @"name",
                                                         @"description": @"_description",
                                                         @"imageLink": @"imageLink",
                                                         @"smallImageLink": @"smallImageLink",
                                                         @"orderNumber": @"orderNumber",
                                                         @"cost": @"cost",
                                                         @"itemCount": @"itemCount",
                                                         
                                                         @"proteins": @"proteins",
                                                         @"carbohydrates": @"carbohydrates",
                                                         @"fats": @"fats",
                                                         
                                                         
                                                         @"isRecomended": @"isRecomended",
                                                         @"isNew": @"isNew",
                                                         @"isHit": @"isHit",
                                                         @"isHot": @"isHot",
                                                         @"isVegetable": @"isVegetable",
                                                         @"isPopular": @"isPopular",
                                                         
                                                         @"popularSex": @"popularSex",
                                                         @"popularAge": @"popularAge",
                                                         
                                                         @"type": @"type",
                                                         }];
    
    [productMapping addPropertyMapping:[RKRelationshipMapping relationshipMappingFromKeyPath:@"category"
                                                                                   toKeyPath:@"category"
                                                                                 withMapping:categoryMapping]];
    
    
    RKObjectMapping* wrapperMapping = [RKObjectMapping mappingForClass:[ResponseWrapper class]];
    [wrapperMapping addAttributeMappingsFromDictionary:@{
                                                         @"status": @"status",
                                                         @"errorCode": @"errorCode",
                                                         //@"data": @"data",
                                                         @"errorMessage": @"errorMessage"
                                                         }];
    
    [wrapperMapping addPropertyMapping:[RKRelationshipMapping relationshipMappingFromKeyPath:@"data"
                                                                                   toKeyPath:@"data"
                                                                                 withMapping:productMapping]];
    
    RKResponseDescriptor *responseWrapperDescriptor = [RKResponseDescriptor responseDescriptorWithMapping:wrapperMapping method:RKRequestMethodAny pathPattern:nil keyPath:@"" statusCodes:RKStatusCodeIndexSetForClass(RKStatusCodeClassSuccessful)];
    
    /*
    NSString *productsURL = @"http://api.sushimi.kz/rest-api/v1/product/";
    productsURL =  [productsURL stringByAppendingString: [@(productId) stringValue]];
    productsURL = [productsURL stringByAppendingString:@"/detail"];
    NSURL *URL = [NSURL URLWithString:productsURL];
     */
    
    NSURL *URL = [NSURL URLWithString:[UrlHelper getProductUrlWithId:productId]];
    NSMutableURLRequest *request = [[NSMutableURLRequest alloc] initWithURL:URL];
    [HeaderManager addApplicationHeaderToObjectRequestOperations:request];
    RKObjectRequestOperation *objectRequestOperation = [[RKObjectRequestOperation alloc] initWithRequest:request responseDescriptors:@[ responseWrapperDescriptor ]];
    
    [objectRequestOperation start];
    [objectRequestOperation waitUntilFinished];
    
    if (objectRequestOperation.error) {
        NSLog(@"Error during getting product info by Id %@", objectRequestOperation.error);
        return nil;
    } else {
        return (Product*)[[[objectRequestOperation.mappingResult array] objectAtIndex:0] valueForKey:@"data"][0];
    }
    
}



+(void)loadRestuarants:(ArrayBasedTableViewController*)tableViewController {
    [tableViewController startLoading:YES];
    
    
    RKObjectMapping* restaurantPhotoMapping = [RKObjectMapping mappingForClass:[RestaurantPhoto class]];
    [restaurantPhotoMapping addAttributeMappingsFromDictionary:@{
                                                             @"id": @"id",
                                                             @"description": @"imageDescription",
                                                             @"imageUrl": @"imageUrl",
                                                             @"smallImageUrl": @"smallImageUrl",
                                                             @"lastModifiedDate": @"lastModifiedDate",
                                                             }];

    
    RKObjectMapping* restaurantsMapping = [RKObjectMapping mappingForClass:[Restaurant class]];
    [restaurantsMapping addAttributeMappingsFromDictionary:@{
                                                             @"id": @"id",
                                                             @"title": @"title",
                                                             @"description":@"shortDescription",
                                                             @"workhours": @"workhours",
                                                             @"imageUrl": @"imageUrl",
                                                             @"phoneNumber": @"phoneNumber",
                                                             @"address": @"address",
                                                             @"latitude":@"addressGeoLatitude",
                                                             @"longitude":@"addressGeoLongitude"
                                                             }];
    
    [restaurantsMapping addPropertyMapping:[RKRelationshipMapping relationshipMappingFromKeyPath:@"photos"
                                                                                   toKeyPath:@"photos"
                                                                                 withMapping:restaurantPhotoMapping]];
    
    [restaurantsMapping addPropertyMapping:[RKRelationshipMapping relationshipMappingFromKeyPath:@"promoPhotos"
                                                                                       toKeyPath:@"promoPhotos"
                                                                                     withMapping:restaurantPhotoMapping]];
    
    RKObjectMapping* wrapperMapping = [RKObjectMapping mappingForClass:[ResponseWrapper class]];
    [wrapperMapping addAttributeMappingsFromDictionary:@{
                                                         @"status": @"status",
                                                         @"errorCode": @"errorCode",
                                                         //@"data": @"data",
                                                         @"errorMessage": @"errorMessage"
                                                         }];
    
    [wrapperMapping addPropertyMapping:[RKRelationshipMapping relationshipMappingFromKeyPath:@"data"
                                                                                   toKeyPath:@"data"
                                                                                 withMapping:restaurantsMapping]];
    
    RKResponseDescriptor *responseWrapperDescriptor = [RKResponseDescriptor responseDescriptorWithMapping:wrapperMapping method:RKRequestMethodAny pathPattern:nil keyPath:@"" statusCodes:RKStatusCodeIndexSetForClass(RKStatusCodeClassSuccessful)];
    
    //NSURL *URL = [NSURL URLWithString:@"http://api.sushimi.kz/rest-api/v1/restaurant/list"];
    
    NSURL *URL = [NSURL URLWithString:[UrlHelper getRestuarantsUrl]];
    NSMutableURLRequest *request = [[NSMutableURLRequest alloc] initWithURL:URL];
    [HeaderManager addApplicationHeaderToObjectRequestOperations:request];
    RKObjectRequestOperation *objectRequestOperation = [[RKObjectRequestOperation alloc] initWithRequest:request responseDescriptors:@[ responseWrapperDescriptor ]];
    [objectRequestOperation setCompletionBlockWithSuccess:^(RKObjectRequestOperation *operation, RKMappingResult *mappingResult) {
        tableViewController.items = [[mappingResult.array objectAtIndex:0] valueForKey:@"data"];
        [tableViewController stopLoading:YES withError:nil];
        
    } failure:^(RKObjectRequestOperation *operation, NSError *error) {
        tableViewController.items = nil;
        [tableViewController stopLoading:YES withError:@"Ошибка загрузки данных..."];
        NSLog(@"Operation failed with error: %@", error);
    }];
    
    [objectRequestOperation start];
}

+(void)loadAnnouncements:(ArrayBasedTableViewController *)tableViewController withAnnouncementType:(NSInteger)announcementType {
    [tableViewController startLoading:YES];
    
    RKObjectMapping* announcementsMapping = [RKObjectMapping mappingForClass:[Announcement class]];
    [announcementsMapping addAttributeMappingsFromDictionary:@{
                                                               @"id": @"id",
                                                               @"type": @"type",
                                                               @"title": @"title",
                                                               @"shortDescription": @"description",
                                                               @"content": @"content",
                                                               @"imageLink": @"imageLink",
                                                               @"publishDate": @"publishDate",
                                                               @"endDate": @"endDate",
                                                               @"lastModifiedDate": @"lastModifiedDate",
                                                               @"isActual":@"isActual"
                                                               }];
    
    RKObjectMapping* wrapperMapping = [RKObjectMapping mappingForClass:[ResponseWrapper class]];
    [wrapperMapping addAttributeMappingsFromDictionary:@{
                                                         @"status": @"status",
                                                         @"errorCode": @"errorCode",
                                                         @"errorMessage": @"errorMessage"
                                                         }];
    
    [wrapperMapping addPropertyMapping:[RKRelationshipMapping relationshipMappingFromKeyPath:@"data"
                                                                                   toKeyPath:@"data"
                                                                                 withMapping:announcementsMapping]];
    
    RKResponseDescriptor *responseWrapperDescriptor = [RKResponseDescriptor responseDescriptorWithMapping:wrapperMapping method:RKRequestMethodAny pathPattern:nil keyPath:@"" statusCodes:RKStatusCodeIndexSetForClass(RKStatusCodeClassSuccessful)];
    
    
    NSURL *URL = [NSURL URLWithString:[UrlHelper getAnnouncementsUrlWithType:announcementType]];
    
    /*
    NSURL *URL = [NSURL URLWithString:[[NSString alloc] initWithFormat:@"http://api.sushimi.kz/rest-api/v1/announcement/list/%ld",(long)announcementType ]];
    */
    
    NSMutableURLRequest *request = [[NSMutableURLRequest alloc] initWithURL:URL];
    [HeaderManager addApplicationHeaderToObjectRequestOperations:request];
    
    RKObjectRequestOperation *objectRequestOperation = [[RKObjectRequestOperation alloc] initWithRequest:request responseDescriptors:@[ responseWrapperDescriptor ]];
    [objectRequestOperation setCompletionBlockWithSuccess:^(RKObjectRequestOperation *operation, RKMappingResult *mappingResult) {
        tableViewController.items = [[mappingResult.array objectAtIndex:0] valueForKey:@"data"];
        [tableViewController stopLoading:YES withError:nil];

    } failure:^(RKObjectRequestOperation *operation, NSError *error) {
        NSLog(@"Operation failed with error: %@", error);
        
        tableViewController.items = nil;
        [tableViewController stopLoading:YES withError:@"Ошибка загрузки данных..."];
    }];
    
    [objectRequestOperation start];
}


+(void)loadDeliveryPoints:(ArrayBasedTableViewController *)tableViewController {
    [tableViewController startLoading:YES];
    
    // Load data from cache
    NSObject *data = [[self class] getLoadedDataByKey:[[NSString alloc] initWithFormat:@"DELIVERIES_INFO"]];
    if (data != nil) {
        tableViewController.items = (NSArray*)data;
        [tableViewController stopLoading:YES withError:nil];
        return;
    }
    
    RKObjectMapping* deliveriesMapping = [RKObjectMapping mappingForClass:[DeliveryInfo class]];
    [deliveriesMapping addAttributeMappingsFromDictionary:@{
                                                            @"id": @"id",
                                                            @"title": @"title",
                                                            @"workhours": @"workhours",
                                                            @"minOrderSum": @"minOrderSum",
                                                            @"deliveryArea": @"deliveryArea",
                                                            @"deliveryAreaImageUrl": @"deliveryAreaImageUrl",
                                                            @"deliveryAreaRemarks": @"deliveryAreaRemarks",
                                                            @"address": @"address",
                                                            @"addressGeoLatitude": @"addressGeoLatitude",
                                                            @"addressGeoLongitude": @"addressGeoLongitude",
                                                            @"phoneNumber": @"phoneNumber"
                                                            }];
    
    RKObjectMapping* wrapperMapping = [RKObjectMapping mappingForClass:[ResponseWrapper class]];
    [wrapperMapping addAttributeMappingsFromDictionary:@{
                                                         @"status": @"status",
                                                         @"errorCode": @"errorCode",
                                                         @"errorMessage": @"errorMessage"
                                                         }];
    
    [wrapperMapping addPropertyMapping:[RKRelationshipMapping relationshipMappingFromKeyPath:@"data"
                                                                                   toKeyPath:@"data"
                                                                                 withMapping:deliveriesMapping]];
    
    RKResponseDescriptor *responseWrapperDescriptor = [RKResponseDescriptor responseDescriptorWithMapping:wrapperMapping method:RKRequestMethodAny pathPattern:nil keyPath:@"" statusCodes:RKStatusCodeIndexSetForClass(RKStatusCodeClassSuccessful)];
    
    //NSURL *URL = [NSURL URLWithString:@"http://api.sushimi.kz/rest-api/v1/company/delivery"];
    NSURL *URL = [NSURL URLWithString:[UrlHelper getDeliveryPointsUrl]];
    
    NSMutableURLRequest *request = [[NSMutableURLRequest alloc] initWithURL:URL];
    [HeaderManager addApplicationHeaderToObjectRequestOperations:request];
    RKObjectRequestOperation *objectRequestOperation = [[RKObjectRequestOperation alloc] initWithRequest:request responseDescriptors:@[ responseWrapperDescriptor ]];
    [objectRequestOperation setCompletionBlockWithSuccess:^(RKObjectRequestOperation *operation, RKMappingResult *mappingResult) {
        tableViewController.items = [[mappingResult.array objectAtIndex:0] valueForKey:@"data"];
        [[self class] putLoadedData:tableViewController.items withKey:@"DELIVERIES_INFO"];
        [tableViewController stopLoading:YES withError:nil];
    } failure:^(RKObjectRequestOperation *operation, NSError *error) {
        NSLog(@"Operation failed with error: %@", error);
        tableViewController.items = nil;
        [tableViewController stopLoading:YES withError:@"Ошибка загрузки данных..."];
    }];
    
    [objectRequestOperation start];
}

+(void) loadAboutCompany:(ArrayBasedTableViewController*)tableViewController {
    [tableViewController startLoading:YES];
    
    // Load data from cache
    NSObject *data = [[self class] getLoadedDataByKey:[[NSString alloc] initWithFormat:@"ABOUT_COMPANY"]];
    if (data != nil) {
        tableViewController.item = data;
        [tableViewController stopLoading:YES withError:nil];
        return;
    }
    
    RKObjectMapping* aboutCompanyMapping = [RKObjectMapping mappingForClass:[AboutCompany class]];
    [aboutCompanyMapping addAttributeMappingsFromDictionary:@{
                                                              @"id": @"id",
                                                              @"content": @"content",
                                                              @"imageUrl": @"imageUrl",
                                                              @"instagramUrl": @"instagramUrl",
                                                              @"vkUrl": @"vkUrl",
                                                              @"lastModifiedDate": @"lastModifiedDate"
                                                              }];
    
    RKObjectMapping* wrapperMapping = [RKObjectMapping mappingForClass:[ResponseWrapper class]];
    [wrapperMapping addAttributeMappingsFromDictionary:@{
                                                         @"status": @"status",
                                                         @"errorCode": @"errorCode",
                                                         @"errorMessage": @"errorMessage"
                                                         }];
    
    [wrapperMapping addPropertyMapping:[RKRelationshipMapping relationshipMappingFromKeyPath:@"data"
                                                                                   toKeyPath:@"data"
                                                                                 withMapping:aboutCompanyMapping]];
    
    RKResponseDescriptor *responseWrapperDescriptor = [RKResponseDescriptor responseDescriptorWithMapping:wrapperMapping method:RKRequestMethodAny pathPattern:nil keyPath:@"" statusCodes:RKStatusCodeIndexSetForClass(RKStatusCodeClassSuccessful)];
    
    //NSURL *URL = [NSURL URLWithString:@"http://api.sushimi.kz/rest-api/v1/company/info"];
    
    NSURL *URL = [NSURL URLWithString:[UrlHelper getCompanyInfoUrl]];
    NSMutableURLRequest *request = [[NSMutableURLRequest alloc] initWithURL:URL];
    [HeaderManager addApplicationHeaderToObjectRequestOperations:request];
    RKObjectRequestOperation *objectRequestOperation = [[RKObjectRequestOperation alloc] initWithRequest:request responseDescriptors:@[ responseWrapperDescriptor ]];
    [objectRequestOperation setCompletionBlockWithSuccess:^(RKObjectRequestOperation *operation, RKMappingResult *mappingResult) {
        tableViewController.item = [[mappingResult.array objectAtIndex:0] valueForKey:@"data"][0];
        [[self class] putLoadedData:tableViewController.item withKey:@"ABOUT_COMPANY"];
        [tableViewController stopLoading:YES withError:nil];
    } failure:^(RKObjectRequestOperation *operation, NSError *error) {
        NSLog(@"Operation failed with error: %@", error);
        tableViewController.item = nil;
        [tableViewController stopLoading:YES withError:@"Ошибка загрузки данных..."];
    }];
    
    [objectRequestOperation start];
}


@end
