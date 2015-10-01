//
//  ArrayBasedTableViewController.h
//  SushimiApp
//
//  Created by Artem Demidovich on 3/16/15.
//  Copyright (c) 2015 AphionSoftware. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface ArrayBasedTableViewController : UITableViewController

@property NSObject *item;
@property NSArray *items;

-(void)startLoading:(BOOL)animated;
-(void)stopLoading:(BOOL)animated withError:(NSString *) errorMessage;

@end
