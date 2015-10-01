//
//  ArrayBasedTableViewController.m
//  SushimiApp
//
//  Created by Artem Demidovich on 3/16/15.
//  Copyright (c) 2015 AphionSoftware. All rights reserved.
//

#import "ArrayBasedTableViewController.h"

@interface ArrayBasedTableViewController ()

@end

@implementation ArrayBasedTableViewController

- (void)viewDidLoad {
    [super viewDidLoad];
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
}

#pragma mark - Table view data source

- (NSInteger)numberOfSectionsInTableView:(UITableView *)tableView {
    return 0;
}

- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section {
    return 0;
}

-(void)startLoading:(BOOL)animated {}

-(void)stopLoading:(BOOL)animated withError:(NSString *) errorMessage {}

@end
