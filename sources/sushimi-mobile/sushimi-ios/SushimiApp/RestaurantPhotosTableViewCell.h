//
//  RestaurantPhotosTableViewCell.h
//  SushimiApp
//
//  Created by Artem Demidovich on 2/28/15.
//  Copyright (c) 2015 AphionSoftware. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "Restaurant.h"

@interface RestaurantPhotosTableViewCell : UITableViewCell<UIScrollViewDelegate>
@property (weak, nonatomic) IBOutlet UIScrollView *imageScrollView;
@property (weak, nonatomic) IBOutlet UIPageControl *imagePageController;

@property UIViewController *parentController;
@property Restaurant* restaurantModel;

@property NSMutableArray *photoUrlModels;

@property NSMutableDictionary *loadImageOperations;
@property NSOperationQueue *loadImageOperationQueue;

-(void) initCell:(Restaurant*) model fromController:(UIViewController*)controller withFrame:(CGRect) tableViewFrame;


@end
