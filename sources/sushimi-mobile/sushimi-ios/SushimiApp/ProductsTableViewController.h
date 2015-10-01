//
//  ProductsTableViewController.h
//  SushimiApp
//
//  Created by Artem Demidovich on 2/13/15.
//  Copyright (c) 2015 AphionSoftware. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "ArrayBasedTableViewController.h"
#import "CategoryItem.h"
#import "Product.h"

#import "ProductTableViewCell.h"

@interface ProductsTableViewController : ArrayBasedTableViewController

@property CategoryItem *_parentCategory;
@property Product *_selectedProduct;
@property ProductTableViewCell *_selectedViewCell;

- (void)setParentCategory:(CategoryItem *)parentCategory;


@property NSOperationQueue *loadImageOperationQueue;
@property NSMutableDictionary *loadImageOperations;

@end
