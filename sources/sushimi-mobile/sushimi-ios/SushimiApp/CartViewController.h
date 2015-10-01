//
//  OrderViewController.h
//  SushimiApp
//
//  Created by Artem Demidovich on 4/15/15.
//  Copyright (c) 2015 AphionSoftware. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "BaseViewController.h"

@interface CartViewController : BaseViewController<UITableViewDelegate, UITableViewDataSource>

- (IBAction)showOrderHistory:(UIBarButtonItem *)sender;
@property (weak, nonatomic) IBOutlet UIView *continueOrderButtomView;

@property (weak, nonatomic) IBOutlet UITableView *cartTableView;
- (IBAction)continueOrder:(UIButton *)sender;
@property (weak, nonatomic) IBOutlet UIButton *continueOrderButton;
@property (weak, nonatomic) IBOutlet UILabel *totalOrderSum;
@property (weak, nonatomic) IBOutlet UILabel *discountField;
@end
