//
//  RestaurantImageModalViewController.h
//  SushimiApp
//
//  Created by Artem Demidovich on 7/7/15.
//  Copyright (c) 2015 AphionSoftware. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "RestaurantPhoto.h"

@interface RestaurantImageModalViewController : UIViewController<UIScrollViewDelegate>

- (IBAction)doneButton:(UIButton *)sender;
@property (strong, nonatomic) IBOutlet UILabel *currentPositionLabel;
@property (strong, nonatomic) IBOutlet UIScrollView *imageScrollView;

@property NSInteger photoPosition;
@property NSArray* photoUrlModels;

@property NSMutableDictionary *loadImageOperations;
@property NSOperationQueue *loadImageOperationQueue;

-(void) initImagesView:(NSArray*) photoModels withPosition:(NSInteger) position;

@end
