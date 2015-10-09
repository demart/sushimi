//
//  OrderManager.m
//  SushimiApp
//
//  Created by Artem Demidovich on 4/8/15.
//  Copyright (c) 2015 AphionSoftware. All rights reserved.
//

#import "CartManager.h"
#import "CartItem.h"
#import "CartInfoModel.h"

#import "CartAddProductsModel.h"
#import "CartAddProductItemModel.h"

#import "CartModel.h"
#import "CartProductModel.h"
#import "CartProductItemModel.h"
#import "CartProductItemFileModel.h"

#import "DataManager.h"

#import "ResponseWrapper.h"
#import "RKObjectManager.h"
#import "RKObjectMapping.h"
#import "RKResponseDescriptor.h"
#import "RKObjectRequestOperation.h"
#import "RKRelationshipMapping.h"
#import "RKLog.h"
#import "RKMIMETypes.h"

#import "HeaderManager.h"

#import "MainTabBarController.h"

#import "UrlHelper.h"


@implementation CartManager

static CartManager *cartManagerInstance = nil;
static NSString *cartId = nil;
static BaseViewController *viewController = nil;
static CartInfoModel *cartInfoModel = nil;

+ (CartManager *) sharedInstance {
    @synchronized(self) {
        if (cartManagerInstance == nil) {
            cartManagerInstance = [[CartManager alloc] init];
            [cartManagerInstance initCart];
        }
    }
    return cartManagerInstance;
}

NSInteger totalSum = 0;
NSInteger totalSushimiSum = 0;
NSMutableDictionary *cartItems = nil;

-(void)initCart {
    cartItems = [[NSMutableDictionary alloc] init];
    [self generateNewCartId];
}

-(NSString*)getCartId {
    return cartId;
}

-(void)generateNewCartId {
    cartId = [[NSUUID UUID] UUIDString];
}

// Add products, and return total count of this product in the cart
-(NSInteger)addProductToCart:(Product*) product {
    if (product == nil)
        return 0;

    CartItem  *item = [cartItems objectForKey:product.code];
    if (item == nil) {
        item = [[CartItem alloc] init];
        item.product = product;
        item.amount = 1;
        [cartItems setObject:item forKey:product.code];
    } else {
        item.amount = item.amount + 1;
    }
    
    totalSum = totalSum + product.cost;
    if ([@"SUSHI" isEqualToString:product.type]) {
        totalSushimiSum = totalSushimiSum + product.cost;
    }
    
    [MainTabBarController setCartValue:totalSum];
    
    return item.amount;
}

// Remove product, and return total count of this product in the cart
-(NSInteger)removeProductFromCart:(Product*) product {
    if (product == nil)
        return 0;
    
    CartItem *item = [cartItems objectForKey:product.code];
    if (item == nil) {
        // already not exists in cart
        return 0;
    } else {
        // Already in cart
        item.amount = item.amount - 1;
        totalSum = totalSum - product.cost;
        if ([@"SUSHI" isEqualToString:product.type])
            totalSushimiSum = totalSushimiSum - product.cost;
        [MainTabBarController setCartValue:totalSum];
        if (item.amount < 1) {
            [cartItems removeObjectForKey:product.code];
            return 0;
        } else {
            return item.amount;
        }
    }
}

// Return amount of selected products in the cart
-(NSInteger)getProductCountInCart:(Product*) product {
    CartItem *cartItem = [cartItems objectForKey:product.code];
    if (cartItem != nil) {
        return cartItem.amount;
    }
    return 0;
}



-(Product*)getProductInCart:(NSInteger) productId {
    for (CartItem *cartItem in [cartItems allValues]) {
        if (cartItem != nil && cartItem.product.id == productId) {
            return cartItem.product;
        }
    };
    return nil;
}

-(CartItem*)getProductCartItemInCart:(NSInteger) productId {
    for (CartItem *cartItem in [cartItems allValues]) {
        if (cartItem != nil && cartItem.product.id == productId) {
            return cartItem;
        }
    };
    return nil;
}

-(NSInteger)getCartTotalSum {
    return totalSum;
}

-(NSInteger)getCartTotalSumWithMobileDiscount {
    if (cartInfoModel != nil) {
        return totalSum * (1 - cartInfoModel.mobileDiscount * 0.01);
    } else {
        return totalSum;
    }
}


-(void) cleanExistingCartAndInitNewCart {
    totalSum = 0;
    totalSushimiSum = 0;
    [cartItems removeAllObjects];
    cartItems = nil;
    [self initCart];
}

-(void) prepareCart:(BaseViewController*) viewController  {
    if (cartInfoModel == nil) {
        [viewController startLoading:YES];
        [self loadCartInfo:viewController];
    } else {
        [self buildCart:viewController];
    }
}

-(void) buildCart:(BaseViewController*) viewController {
    NSMutableArray *items = [[cartItems allValues] mutableCopy];
    for (CartItem *cartItem in items) {
        if (cartItem.free > 0) cartItem.free = 0;
    }
    
    // add free sauce if needed
    if (totalSushimiSum > 0) {
        long freeSauces = totalSushimiSum / cartInfoModel.freeSauceSum;
        if (freeSauces > 0) {
            for (Product *product in cartInfoModel.freeSushiSauces) {
                BOOL isExist = NO;
                for (CartItem *cartItem in items) {
                    if (cartItem.product.code == product.code) {
                        isExist = YES;
                        cartItem.free = freeSauces;
                    }
                }
                if (isExist == NO) {
                    CartItem *cartItem = [[CartItem alloc] init];
                    cartItem.product = product;
                    cartItem.free = freeSauces;
                    [items addObject:cartItem];
                }
            }
        }
    }
    
    // Sort
    NSArray *sortedArray;
    sortedArray = [[items copy] sortedArrayUsingComparator:^NSComparisonResult(id a, id b) {
        NSInteger first = [(CartItem*)a product].orderNumber;
        NSInteger second = [(CartItem*)b product].orderNumber;
        return first > second;
    }];
    
    viewController.items = [sortedArray mutableCopy];
    [viewController stopLoading:YES withError:nil];
}



-(CartInfoModel*) getCartInfo {
    return cartInfoModel;
}

-(void) setCartInfo:(CartInfoModel *)model{
    cartInfoModel = model;
}


/// ==============================
/// ======== REMOTE CART =========
/// ==============================

-(void) loadCartInfo:(BaseViewController*) viewController {
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
    
    RKObjectMapping* cartInfoModel = [RKObjectMapping mappingForClass:[CartInfoModel class]];
    [cartInfoModel addAttributeMappingsFromDictionary:@{
                                                          @"freeDeliverySum": @"freeDeliverySum",
                                                          @"freeSauceSum": @"freeSauceSum",
                                                          @"mobileDiscount": @"mobileDiscount",
                                                          @"mobileDiscountDescription": @"mobileDiscountDescription",
                                                          }];
    
    [cartInfoModel addPropertyMapping:[RKRelationshipMapping
                                       relationshipMappingFromKeyPath:@"freeSushiSauces"
                                       toKeyPath:@"freeSushiSauces"
                                       withMapping:productMapping]];
    
    RKObjectMapping* wrapperMapping = [RKObjectMapping mappingForClass:[ResponseWrapper class]];
    [wrapperMapping addAttributeMappingsFromDictionary:@{
                                                         @"status": @"status",
                                                         @"errorCode": @"errorCode",
                                                         //@"data": @"data",
                                                         @"errorMessage": @"errorMessage"
                                                         }];
    
    [wrapperMapping addPropertyMapping:[RKRelationshipMapping relationshipMappingFromKeyPath:@"data"
                                                                                   toKeyPath:@"data"
                                                                                 withMapping:cartInfoModel]];
    
    RKResponseDescriptor *responseWrapperDescriptor = [RKResponseDescriptor responseDescriptorWithMapping:wrapperMapping method:RKRequestMethodAny pathPattern:nil keyPath:@"" statusCodes:RKStatusCodeIndexSetForClass(RKStatusCodeClassSuccessful)];
    
    //NSURL *URL = [NSURL URLWithString:@"http://api.sushimi.kz/rest-api/v1/cart/info"];
    
    NSURL *URL = [NSURL URLWithString:[UrlHelper getCartInfoUrl]];
    NSMutableURLRequest *request = [[NSMutableURLRequest alloc] initWithURL:URL];
    [HeaderManager addApplicationHeaderToObjectRequestOperations:request];
    RKObjectRequestOperation *objectRequestOperation = [[RKObjectRequestOperation alloc] initWithRequest:request responseDescriptors:@[ responseWrapperDescriptor ]];
    
    
    [objectRequestOperation setCompletionBlockWithSuccess:
        ^(RKObjectRequestOperation *operation, RKMappingResult *result) {
        NSLog(@"%@",[[result.array objectAtIndex:0] valueForKey:@"status"]);
        NSLog(@"%@",[[result.array objectAtIndex:0] valueForKey:@"errorMessage"]);
            
        [[CartManager sharedInstance] setCartInfo:[[result.array objectAtIndex:0] valueForKey:@"data"][0]];
        [self prepareCart:viewController];
        if (viewController != nil)
            [viewController stopLoading:YES withError:nil];
    }
    failure:^(RKObjectRequestOperation *operation, NSError *error){
        NSLog(@"Error %@", error);
        if (viewController != nil)
            [viewController stopLoading:YES withError:@"Ошибка обращении к серверу."];
    }];
    
    [objectRequestOperation start];
}

-(void)addProductToCart:(BaseViewController*) viewController cartItem:(CartItem*)cartItem {
    [self addProductToCart:cartItem.product];
    [self prepareCart:viewController];
}

-(void)removeProductFromCart:(BaseViewController*) viewController cartItem:(CartItem*)cartItem {
    [self removeProductFromCart:cartItem.product];
    [self prepareCart:viewController];
}


/*
// Needed to change amount of products or remove unneeded one
-(void)synchronizeLocalAndRemoteCart:(BaseViewController*) viewController {
    [viewController startLoading:YES];
 
    RKObjectManager *objectManager = [self buildAddProductsToCartObjectManager];
    CartAddProductsModel *model =  [self buildCartAddProductsModel];
    [objectManager
     postObject:model
     path:@"clear/add/product"
     parameters:nil
     success:^(RKObjectRequestOperation *operation, RKMappingResult *result) {
         NSLog(@"%@",[[result.array objectAtIndex:0] valueForKey:@"status"]);
         NSLog(@"%@",[[result.array objectAtIndex:0] valueForKey:@"errorMessage"]);
         
         // Sychronize local cart
         CartModel* cartModel = [[result.array objectAtIndex:0] valueForKey:@"data"][0];
         //[self updateLocalCart:cartModel];
         
         viewController.item = cartModel;
         [viewController stopLoading:YES  withError:nil];
     }
     failure:^(RKObjectRequestOperation *operation, NSError *error){
         NSLog(@"Error %@", error);
         [viewController stopLoading:YES withError:@"Ошибка при попытке обновить корзину"];
     }];
}
 */

/// ============ ================ ===========
/// ============ REQUEST BUILDERS ===========
/// ============ ================ ===========

-(RKObjectRequestOperation *) buildClearCartRequestOperation {
    /*
    NSURL *clearCartTargetUrl = [NSURL URLWithString:
                                 [[NSString alloc]
                                  initWithFormat:@"http://api.sushimi.kz/rest-api/v1/cart/%@/clear", self.getCartId]];
    */
    
    NSURL *clearCartTargetUrl = [NSURL URLWithString:[UrlHelper getCartCleanUrlWithId: self.getCartId]];
    NSMutableURLRequest *clearCartRequest = [NSMutableURLRequest requestWithURL:clearCartTargetUrl];
    [clearCartRequest setHTTPMethod:@"POST"];
    
    RKObjectMapping* wrapperMapping = [RKObjectMapping mappingForClass:[ResponseWrapper class]];
    [wrapperMapping addAttributeMappingsFromDictionary:@{
                                                         @"status": @"status",
                                                         @"errorCode": @"errorCode",
                                                         @"errorMessage": @"errorMessage"
                                                         }];
    RKResponseDescriptor *responseWrapperDescriptor = [RKResponseDescriptor responseDescriptorWithMapping:wrapperMapping method:RKRequestMethodAny pathPattern:nil keyPath:@"" statusCodes:RKStatusCodeIndexSetForClass(RKStatusCodeClassSuccessful) ];
    
    RKObjectRequestOperation *clearCartRequestOperation = [[RKObjectRequestOperation alloc] initWithRequest:clearCartRequest responseDescriptors:@[ responseWrapperDescriptor ]];
    
    return clearCartRequestOperation;
}

-(RKObjectManager *) buildAddProductsToCartObjectManager {
    /*
    NSURL *targetUrl = [NSURL URLWithString:
                                 [[NSString alloc]
                                  initWithFormat:@"http://api.sushimi.kz/rest-api/v1/cart/%@/", self.getCartId]];
    */
    NSURL *targetUrl = [NSURL URLWithString:[UrlHelper getCartAddProductsUrlWithId:self.getCartId]];
    RKObjectMapping* productItemImages = [RKObjectMapping mappingForClass:[CartProductItemFileModel class]];
    [productItemImages addAttributeMappingsFromDictionary:@{
                                                          @"description": @"_description",
                                                          @"extension": @"extension",
                                                          @"height": @"height",
                                                          @"id": @"id",
                                                          @"link": @"link",
                                                          @"name": @"name",
                                                          @"sort": @"sort",
                                                          @"width":@"width"
                                                          }];
    [productItemImages addPropertyMapping:[RKRelationshipMapping relationshipMappingFromKeyPath:@"thumbnails"
                                                                                   toKeyPath:@"thumbnails"
                                                                                 withMapping:productItemImages]];
    
    
    RKObjectMapping* productItemMapping = [RKObjectMapping mappingForClass:[CartProductItemModel class]];
    [productItemMapping addAttributeMappingsFromDictionary:@{
                                                          @"category": @"category",
                                                          @"id": @"id",
                                                          @"name": @"name",
                                                          @"path": @"path",
                                                          @"price": @"price",
                                                          @"description": @"_description",
                                                          @"sort": @"sort",
                                                          @"uid": @"uid",
                                                          @"unitName": @"unitName",
                                                          @"weight": @"weight",
                                                          @"freeCount": @"freeCount"
                                                         }];
    
    RKObjectMapping* productMapping = [RKObjectMapping mappingForClass:[CartProductModel class]];
    [productMapping addAttributeMappingsFromDictionary:@{
                                                         @"cost": @"cost",
                                                         @"count": @"count"
                                                         }];
    [productMapping addPropertyMapping:[RKRelationshipMapping relationshipMappingFromKeyPath:@"item"
                                                                                   toKeyPath:@"item"
                                                                                 withMapping:productItemMapping]];
    
    
    RKObjectMapping* cartMapping = [RKObjectMapping mappingForClass:[CartModel class]];
    [cartMapping addAttributeMappingsFromDictionary:@{
                                                         @"id": @"id",
                                                         @"cityId": @"cityId",
                                                         @"count": @"count",
                                                         @"isEmpty": @"isEmpty",
                                                         @"minSum": @"minSum",
                                                         @"sum": @"sum"
                                                         }];
    [cartMapping addPropertyMapping:[RKRelationshipMapping relationshipMappingFromKeyPath:@"items"
                                                                                   toKeyPath:@"items"
                                                                                 withMapping:productMapping]];
    
    RKObjectMapping* wrapperMapping = [RKObjectMapping mappingForClass:[ResponseWrapper class]];
    [wrapperMapping addAttributeMappingsFromDictionary:@{
                                                         @"status": @"status",
                                                         //@"data": @"data",
                                                         @"errorCode": @"errorCode",
                                                         @"errorMessage": @"errorMessage"
                                                        }];

    [wrapperMapping addPropertyMapping:[RKRelationshipMapping relationshipMappingFromKeyPath:@"data"
                                                                                   toKeyPath:@"data"
                                                                                 withMapping:cartMapping]];
                                                         
    RKResponseDescriptor *responseWrapperDescriptor = [RKResponseDescriptor responseDescriptorWithMapping:wrapperMapping method:RKRequestMethodAny pathPattern:nil keyPath:@"" statusCodes:RKStatusCodeIndexSetForClass(RKStatusCodeClassSuccessful) ];
    
    
    // ==== REQUEST DESC =====
    
    RKObjectMapping* requestProductItemMapping = [RKObjectMapping requestMapping];
    [requestProductItemMapping addAttributeMappingsFromDictionary:@{
                                                             @"key": @"key",
                                                             @"value": @"value",
                                                             @"price": @"price"
                                                             }];
    
    RKObjectMapping* productItemsMapping = [RKObjectMapping requestMapping];
    [productItemsMapping addPropertyMapping:[RKRelationshipMapping relationshipMappingFromKeyPath:@"items"
                                                                                        toKeyPath:@"items"
                                                                                      withMapping:requestProductItemMapping]];
    
    RKObjectManager *objectManager = [RKObjectManager managerWithBaseURL:targetUrl];
    objectManager.requestSerializationMIMEType = RKMIMETypeJSON;
    
    RKRequestDescriptor *requestDescriptor = [RKRequestDescriptor requestDescriptorWithMapping:productItemsMapping objectClass:[CartAddProductsModel class] rootKeyPath:nil method:RKRequestMethodPOST];
    
    [objectManager addRequestDescriptor:requestDescriptor];
    [objectManager addResponseDescriptor:responseWrapperDescriptor];
    
    return objectManager;
}

-(CartAddProductsModel*) buildCartAddProductsModel {
    CartAddProductsModel *model = [[CartAddProductsModel alloc] init];
    model.items = [[NSMutableArray alloc] init];
    
    if (cartItems == nil || cartItems.count == 0)
        return model;
    
    for (NSString* key in cartItems) {
        CartItem *cartItem = [cartItems objectForKey:key];
        if (cartItem == nil)
            continue;
        
        CartAddProductItemModel  *item = [[CartAddProductItemModel alloc] init];
        item.key = cartItem.product.id;
        item.value = cartItem.amount;
        [model.items addObject:item];
    }
    
    return model;
}


-(CartAddProductsModel*) buildCartAddProductModel:(CartProductModel*) productModel withValue:(NSInteger)value {
    CartAddProductsModel *model = [[CartAddProductsModel alloc] init];
    model.items = [[NSMutableArray alloc] init];
    
    CartAddProductItemModel *addProductModel = [[CartAddProductItemModel alloc] init];
    addProductModel.key = productModel.item.id;
    addProductModel.value = value;
    [model.items addObject:addProductModel];
    
    return model;
}



@end
