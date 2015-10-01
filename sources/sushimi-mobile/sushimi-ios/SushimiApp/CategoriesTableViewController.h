//
//  CategoriesTableViewController.h
//  SushimiApp
//
//  Created by Artem Demidovich on 2/1/15.
//  Copyright (c) 2015 AphionSoftware. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "ArrayBasedTableViewController.h"
#import "CategoryItem.h"
#import "SubCategoriesTableViewController.h"


@interface CategoriesTableViewController : ArrayBasedTableViewController

@property CategoryItem *selectedCategoryItem;

@property NSMutableDictionary *loadImageOperations;
@property NSOperationQueue *loadImageOperationQueue;

@end
