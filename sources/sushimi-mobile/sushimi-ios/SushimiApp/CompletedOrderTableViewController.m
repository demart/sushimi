//
//  CompletedOrderTableViewController.m
//  SushimiApp
//
//  Created by Artem Demidovich on 5/6/15.
//  Copyright (c) 2015 AphionSoftware. All rights reserved.
//

#import "CompletedOrderTableViewController.h"
#import "OrderManager.h"

#import "OrderDetailsTableViewController.h"

@interface CompletedOrderTableViewController ()

@property NSString* orderNumber;

@end

@implementation CompletedOrderTableViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    
    self.tableView.tableFooterView = [[UIView alloc] initWithFrame:CGRectZero];
    self.backToMainMenuButton.layer.cornerRadius = 3.0;
}


- (IBAction)backToMainMenu:(UIBarButtonItem *)sender {
    [self.navigationController popToRootViewControllerAnimated:NO];
    [self.tabBarController setSelectedIndex:0];
    [[self.tabBarController selectedViewController].navigationController popToRootViewControllerAnimated:NO];
}

- (IBAction)goToOrderDetails:(UIButton *)sender {
    [self performSegueWithIdentifier:@"CompletedOrderToOrderDetails" sender:self];
}

 #pragma mark - Navigation

 - (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
     if ([segue.destinationViewController isKindOfClass:[OrderDetailsTableViewController class]]) {
         [(OrderDetailsTableViewController *)segue.destinationViewController setOrderKey:self.orderNumber hideBackButton:YES];
     }
 }

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
}

- (void) setOrderKey:(NSString *)number {
    self.orderNumber = number;
}


#pragma mark - Table view data source

- (NSInteger)numberOfSectionsInTableView:(UITableView *)tableView {
    return 1;
}

- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section {
    return 5;
}

@end
