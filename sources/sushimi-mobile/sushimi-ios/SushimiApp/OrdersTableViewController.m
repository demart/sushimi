//
//  OrdersTableViewController.m
//  SushimiApp
//
//  Created by Artem Demidovich on 5/8/15.
//  Copyright (c) 2015 AphionSoftware. All rights reserved.
//

#import "OrdersTableViewController.h"
#import "OrderDetailsTableViewController.h"

#import "OrdersDetailCell.h"

#import "SettingsManager.h"

#import "OrderModel.h"

@interface OrdersTableViewController ()

@property NSMutableArray* orders;
@property NSString* selectedOrderKey;

@end

@implementation OrdersTableViewController

- (void)viewDidLoad {
    [super viewDidLoad];

    self.orders = [[SettingsManager sharedInstance] getOrders];
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
}

#pragma mark - Table view data source

- (NSInteger)numberOfSectionsInTableView:(UITableView *)tableView {
    return 1;
}

- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section {
    if (self.orders != nil)
        return self.orders.count;
    return 0;
}

- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath {
    OrdersDetailCell *cell = [tableView dequeueReusableCellWithIdentifier:@"OrdersDetailCell"];
    if (cell == nil) {
        [tableView registerNib:[UINib nibWithNibName:@"OrdersDetailCell" bundle:nil]forCellReuseIdentifier:@"OrdersDetailCell"];
        cell = [tableView dequeueReusableCellWithIdentifier:@"OrdersDetailCell"];
    }
    
    OrderModel* om = (OrderModel*)[self.orders objectAtIndex:indexPath.row];
    [cell initCell:om];
    return cell;
}


- (NSIndexPath *)tableView:(UITableView *)tableView willSelectRowAtIndexPath:(NSIndexPath *)indexPath {
    [tableView deselectRowAtIndexPath:indexPath animated:YES];
    self.selectedOrderKey = ((OrderModel*)[self.orders objectAtIndex:indexPath.row]).key;
    [self performSegueWithIdentifier:@"OrdersToOrderDetails" sender:self];
    NSLog(@"Navigation from Orders History to Order Details");
    return indexPath;
}



 #pragma mark - Navigation

 - (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
     if ([segue.destinationViewController isKindOfClass:[OrderDetailsTableViewController class]]) {
         [(OrderDetailsTableViewController *)segue.destinationViewController setOrderKey:self.selectedOrderKey hideBackButton: NO];
         NSLog(@"Orders History -> Order Details");
     }
 }

@end
