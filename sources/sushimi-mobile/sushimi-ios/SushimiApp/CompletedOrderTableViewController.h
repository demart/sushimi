//
//  CompletedOrderTableViewController.h
//  SushimiApp
//
//  Created by Artem Demidovich on 5/6/15.
//  Copyright (c) 2015 AphionSoftware. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface CompletedOrderTableViewController : UITableViewController

- (IBAction)backToMainMenu:(UIBarButtonItem *)sender;
- (IBAction)goToOrderDetails:(UIButton *)sender;
@property (weak, nonatomic) IBOutlet UIButton *backToMainMenuButton;

- (void) setOrderKey:(NSString *)number;

@end
