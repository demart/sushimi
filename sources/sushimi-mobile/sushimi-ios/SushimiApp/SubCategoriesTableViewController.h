//
//  SubCategoriesTableViewController.h
//  SushimiApp
//
//  Created by Artem Demidovich on 2/13/15.
//  Copyright (c) 2015 AphionSoftware. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "ArrayBasedTableViewController.h"
#import "CategoryItem.h"

@interface SubCategoriesTableViewController : ArrayBasedTableViewController

@property CategoryItem *_parentCategory;
@property CategoryItem *_selectedSubCategoryItem;

- (void)setParentCategory:(CategoryItem *)parentCategory;

@property NSMutableDictionary *loadImageOperations;
@property NSOperationQueue *loadImageOperationQueue;

@end
