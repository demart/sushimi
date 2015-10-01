//
//  SubCategoriesViewController.h
//  SushimiApp
//
//  Created by Artem Demidovich on 2/13/15.
//  Copyright (c) 2015 AphionSoftware. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "CategoryItem.h"

@interface SubCategoriesViewController  : UITableViewController

@property NSArray *categories;
@property CategoryItem *parentCategory;

@end
