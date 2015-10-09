//
//  OrderManager.h
//  SushimiApp
//
//  Created by Artem Demidovich on 4/8/15.
//  Copyright (c) 2015 AphionSoftware. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "Product.h"
#import "BaseViewController.h"
#import "CartProductModel.h"
#import "CartInfoModel.h"
#import "CartItem.h"
#import "RKObjectManager.h"
#import "CartAddProductsModel.h"

@interface CartManager : NSObject

// Singleton Instance
+ (CartManager *) sharedInstance;

-(NSString*) getCartId;

// Add products, and return total count of this product in the cart
-(NSInteger)addProductToCart:(Product*) product; // withAmount:(NSInteger) count;

// Remove product, and return total count of this product in the cart
-(NSInteger)removeProductFromCart:(Product*) product; // withAmount:(NSInteger) count;

// Return amount of selected products in the cart
-(NSInteger)getProductCountInCart:(Product*) product;

-(Product*)getProductInCart:(NSInteger) productId;

// Return total sum in the cart
-(NSInteger)getCartTotalSum;
-(NSInteger)getCartTotalSumWithMobileDiscount;


-(void) prepareCart:(BaseViewController*) viewController;

// Get common information about cart
-(CartInfoModel*) getCartInfo;
-(void) setCartInfo:(CartInfoModel*) model;

-(void)addProductToCart:(BaseViewController*) viewController cartItem:(CartItem*)cartItem;
-(void)removeProductFromCart:(BaseViewController*) viewController cartItem:(CartItem*)cartItem;

-(void) cleanExistingCartAndInitNewCart;
-(void) loadCartInfo:(BaseViewController*) viewController;


-(RKObjectManager *) buildAddProductsToCartObjectManager;
-(CartAddProductsModel*) buildCartAddProductsModel;

@end
