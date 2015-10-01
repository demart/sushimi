//
//  CartConactViewController.h
//  SushimiApp
//
//  Created by Artem Demidovich on 4/17/15.
//  Copyright (c) 2015 AphionSoftware. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "CartModel.h"
#import "BaseViewController.h"
#import "ContactDeliveryTimeCell.h"

@interface CartContactViewController : BaseViewController<UITableViewDelegate, UITableViewDataSource>;
@property (strong, nonatomic) IBOutlet UIView *mainView;

@property (weak, nonatomic) IBOutlet UITableView *contactTableView;

- (IBAction)continueOrder:(UIButton *)sender;

@property (weak, nonatomic) IBOutlet UIButton *continueOrderButton;
@property (weak, nonatomic) IBOutlet UILabel *totalOrderSum;
@property (weak, nonatomic) IBOutlet UILabel *discountField;

@end
