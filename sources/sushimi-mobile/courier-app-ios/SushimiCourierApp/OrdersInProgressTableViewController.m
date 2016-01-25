//
//  OrdersInProgressTableViewController.m
//  SushimiCourierApp
//
//  Created by Artem Demidovich on 10/13/15.
//  Copyright © 2015 Aphion Software. All rights reserved.
//

#import "OrdersInProgressTableViewController.h"
#import "OrderDetailTableViewController.h"
#import "Constants.h"

#import "DataLoadingErrorView.h"
#import "DejalActivityView.h"

#import "OrderService.h"
#import "OrderModel.h"

#import "OrderTableViewCell.h"

@interface OrdersInProgressTableViewController ()

@property NSMutableArray* orders;
@property DataLoadingErrorView *dataLoadingErrorView;
@property NSString *orderState;
@property OrderModel *selectedOrderModel;

@end

@implementation OrdersInProgressTableViewController

static UIRefreshControl* refreshControl;

- (void)viewDidLoad {
    [super viewDidLoad];
    
    self.orderState = @"IN_PROGRESS";
    self.orders = [[NSMutableArray alloc] init];
    self.tableView.tableFooterView = [[UIView alloc] initWithFrame:CGRectZero];
    [self initRefreshControl];
}


-(void) initRefreshControl {
    refreshControl = [[UIRefreshControl alloc] init];
    refreshControl.backgroundColor = [Constants getSystemOrangeColor];
    refreshControl.tintColor = [UIColor whiteColor];
    
    NSMutableAttributedString *mutableString = [[NSMutableAttributedString alloc] initWithString:@"Идет загрузка..."];
    NSRange range = NSMakeRange(0,mutableString.length);
    [mutableString addAttribute:NSFontAttributeName value:[UIFont fontWithName:@"Gill Sans" size:(12.0)] range:range];
    [mutableString addAttribute:NSForegroundColorAttributeName value:[UIColor whiteColor] range:range];
    refreshControl.attributedTitle = mutableString;
    [refreshControl addTarget:self action:@selector(handleRefresh:) forControlEvents:UIControlEventValueChanged];
    self.refreshControl = refreshControl;
}


-(void) handleRefresh:(UIRefreshControl*) refreshControll {
    [OrderService loadOrders:self withOrderState:self.orderState successSelector:@selector(successRefreshControlLoadOrders:) failureSelector:@selector(failureRefreshControlLoadOrders:) withPage:0 withPageSize:0];
    [refreshControl endRefreshing];
}

-(void) successRefreshControlLoadOrders:(NSObject*) response {
    if (response != nil) {
        if ([response isKindOfClass:[NSArray class]])
            self.orders = [NSMutableArray arrayWithArray:(NSArray*)response];
    }
    
    [self.refreshControl endRefreshing];
    [self.tableView reloadData];
}

-(void) failureRefreshControlLoadOrders:(NSError*) error {
    [self.refreshControl endRefreshing];
    [self.tableView reloadData];
}

-(void)viewWillAppear:(BOOL)animated {
    [DataLoadingErrorView hideDataLoadingErrorView:self.dataLoadingErrorView];
    [DejalBezelActivityView activityViewForView:self.view withLabel:@"Подождите\nИдет загрузка..."];
    
    [OrderService loadOrders:self withOrderState:self.orderState successSelector:@selector(successfullyLoadedOrders:) failureSelector:@selector(failureLoadingOrders:) withPage:0 withPageSize:0];
}


-(void) successfullyLoadedOrders:(NSObject*) response {
    [DejalBezelActivityView removeViewAnimated:YES];
    if (response != nil) {
        if ([response isKindOfClass:[NSArray class]])
            self.orders = [NSMutableArray arrayWithArray:(NSArray*)response];
    }
    
    [self.tableView reloadData];
}


-(void) failureLoadingOrders:(NSError*) error {
    [DejalBezelActivityView removeViewAnimated:NO];
    self.dataLoadingErrorView = [DataLoadingErrorView showDataLoadingErrorView:self withRefreshSelector:@selector(reloadData:)];
}

-(void) reloadData:(NSObject *) sender {
    [DataLoadingErrorView hideDataLoadingErrorView:self.dataLoadingErrorView];
    [DejalBezelActivityView activityViewForView:self.view withLabel:@"Подождите\nИдет загрузка..."];
    [OrderService loadOrders:self withOrderState:self.orderState successSelector:@selector(successfullyLoadedOrders:) failureSelector:@selector(failureLoadingOrders:) withPage:0 withPageSize:0];
}


#pragma mark - Table view data source

- (NSInteger)numberOfSectionsInTableView:(UITableView *)tableView {
    return 1;
}

- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section {
    if (self.orders.count == 0) {
        UILabel *messageLabel = [[UILabel alloc] initWithFrame:CGRectMake(0, 0, self.view.bounds.size.width, self.view.bounds.size.height)];
        messageLabel.text = @"Пока нет ни одного заказа...\nПотяните вниз вдруг, что появится ;)...";
        messageLabel.textColor = [Constants getSystemOrangeColor];
        messageLabel.numberOfLines = 0;
        messageLabel.textAlignment = NSTextAlignmentCenter;
        messageLabel.font = [UIFont fontWithName:@"Gill Sans" size:15];
        [messageLabel sizeToFit];
        self.tableView.backgroundView = messageLabel;
        return self.orders.count;
    } else {
        self.tableView.backgroundView = [[UILabel alloc]init];
        return self.orders.count;
    }
}

- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath {
    OrderTableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:@"OrderTableViewCell"];
    if (cell == nil) {
        [tableView registerNib:[UINib nibWithNibName:@"OrderTableViewCell" bundle:nil]forCellReuseIdentifier:@"OrderTableViewCell"];
        cell = [tableView dequeueReusableCellWithIdentifier:@"OrderTableViewCell"];
    }
    OrderModel* om = self.orders[indexPath.row];
    [cell initCell:om];
    return cell;
}

- (void)tableView:(UITableView *)tableView didEndDisplayingCell:(UITableViewCell *)cell forRowAtIndexPath:(NSIndexPath *)indexPath {
    if ([tableView.indexPathsForVisibleRows indexOfObject:indexPath] == NSNotFound) {
        [(OrderTableViewCell*)cell stopTimer];
    }
}

- (CGFloat)tableView:(UITableView *)tableView heightForRowAtIndexPath:(NSIndexPath *)indexPath {
    return 130;
}


-(void) tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath {
    self.selectedOrderModel =  (OrderModel*)self.orders[indexPath.row];
    [self performSegueWithIdentifier:@"OrdersToOrderDetail" sender:self];
}

- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
    
    if ([segue.destinationViewController isKindOfClass:[OrderDetailTableViewController class]]) {
        [(OrderDetailTableViewController*)segue.destinationViewController setSelectedOrderModel:self.selectedOrderModel];
    NSLog(@"InProgressOrders List -> Order Details");
}
    
}
@end
