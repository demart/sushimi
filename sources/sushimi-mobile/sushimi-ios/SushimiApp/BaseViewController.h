//
//  BaseViewController.h
//  SushimiApp
//
//  Created by Artem Demidovich on 4/16/15.
//  Copyright (c) 2015 AphionSoftware. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface BaseViewController : UIViewController

@property NSObject *item;
@property NSMutableArray *items;

-(void)startLoading:(BOOL)animated;
-(void)stopLoading:(BOOL)animated withError:(NSString *) errorMessage;


@end
