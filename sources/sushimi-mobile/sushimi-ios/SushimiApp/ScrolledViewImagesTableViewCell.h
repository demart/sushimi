//
//  ScrolledViewImagesTableViewCell.h
//  SushimiApp
//
//  Created by Artem Demidovich on 2/28/15.
//  Copyright (c) 2015 AphionSoftware. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "Restaurant.h"

@interface ScrolledViewImagesTableViewCell : UITableViewCell<UIScrollViewDelegate>

@property (weak, nonatomic) IBOutlet UIScrollView *imageScrollView;

@property NSMutableDictionary *loadImageOperations;
@property NSOperationQueue *loadImageOperationQueue;

@property UIViewController *parentController;
@property Restaurant *restaurantModel;
@property NSMutableArray *photoUrlModels;

-(void) initCell:(Restaurant*) model fromController:(UIViewController*)controller;

@end
