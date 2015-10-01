//
//  RestaurantTableViewController.m
//  SushimiApp
//
//  Created by Artem Demidovich on 2/26/15.
//  Copyright (c) 2015 AphionSoftware. All rights reserved.
//

#import "RestaurantTableViewController.h"
#import "RestaurantDetailTableViewController.h"
#import "RestaurantTableViewCell.h"

#import "Restaurant.h"
#import "DataManager.h"

#import "DejalActivityView.h"
#import "DataLoadingErrorView.h"

#import "LocalImageCache.h"

@interface RestaurantTableViewController ()

@property DataLoadingErrorView *dataLoadingErrorView;
@property UIImage *loadingImage;
@end

@implementation RestaurantTableViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    self.navigationItem.backBarButtonItem.title = @"Назад";
    self.tableView.tableFooterView = [[UIView alloc] initWithFrame:CGRectZero];
    
    _loadingImage = [UIImage imageNamed:@"loadingImage.png"];
    
    _loadImageOperationQueue = [[NSOperationQueue alloc] init];
    [_loadImageOperationQueue setMaxConcurrentOperationCount:3];
    
    [DataManager loadRestuarants:self];
}

-(void)startLoading:(BOOL)animated {
    [DataLoadingErrorView hideDataLoadingErrorView:self.dataLoadingErrorView];
    [DejalBezelActivityView activityViewForView:self.view withLabel:@"Подождите\nИдет загрузка..."];
}

-(void)stopLoading:(BOOL)animated withError:(NSString *) errorMessage {
    [DejalBezelActivityView removeViewAnimated:YES];
    
    if (errorMessage != nil) {
        self.dataLoadingErrorView = [DataLoadingErrorView showDataLoadingErrorView:self withRefreshSelector:@selector(reloadData:)];
        return;
    }
    
    [self.tableView reloadData];
}

-(void) reloadData:(NSObject *) sender {
   [DataManager loadRestuarants:self];
}

#pragma mark - Table view data source

- (NSInteger)numberOfSectionsInTableView:(UITableView *)tableView {
    return 1;
}

- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section {
    if (self.items != nil)
        return self.items.count;
    return 0;
}


- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath {
    RestaurantTableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:@"RestaurantInfo"];
    if (!cell) {
        [tableView registerNib:[UINib nibWithNibName:@"RestaurantTableViewCell" bundle:nil]forCellReuseIdentifier:@"RestaurantInfo"];
        cell = [tableView dequeueReusableCellWithIdentifier:@"RestaurantInfo"];
    }
    
    if (self.items == nil)
        return cell;
        
    Restaurant *item   = (Restaurant *)[self.items objectAtIndex:indexPath.row];
    [cell initCell:item];
    
    UIImage *loadedImage =(UIImage *)[LocalImageCache  loadImageFromLocalCache:item.imageUrl];
    
    if (loadedImage != nil) {
        cell.image.image = loadedImage;
    } else {
        cell.image.image = _loadingImage;
        
        NSBlockOperation *loadImageOperation = [[NSBlockOperation alloc] init];
        __weak NSBlockOperation *weakOperation = loadImageOperation;
        
        [loadImageOperation addExecutionBlock:^(void){
            UIImage *image = [UIImage imageWithData:[NSData dataWithContentsOfURL:[NSURL URLWithString:[NSString stringWithFormat:@"http://sushimi.kz/public/%@", item.imageUrl]]] ];
            [[NSOperationQueue mainQueue] addOperationWithBlock:^(void) {
                if (! weakOperation.isCancelled) {
                    RestaurantTableViewCell *updateCell = (RestaurantTableViewCell *)[tableView cellForRowAtIndexPath:indexPath];
                    if (updateCell != nil)
                        updateCell.image.image = image;
                    [LocalImageCache  saveImageToLocalCache:item.imageUrl withData:image];
                    [self.loadImageOperations removeObjectForKey:indexPath];
                }
            }];
        }];
        
        [_loadImageOperations setObject: loadImageOperation forKey:indexPath];
        if (loadImageOperation)
            [_loadImageOperationQueue addOperation:loadImageOperation];
    }
    
    return cell;
}

-(void)tableView:(UITableView *)tableView willDisplayCell:(RestaurantTableViewCell *)cell forRowAtIndexPath:(NSIndexPath *)indexPath {
    if ([cell respondsToSelector:@selector(setSeparatorInset:)])
        [cell setSeparatorInset:UIEdgeInsetsZero];
    if ([cell respondsToSelector:@selector(setPreservesSuperviewLayoutMargins:)])
        [cell setPreservesSuperviewLayoutMargins:NO];
    if ([cell respondsToSelector:@selector(setLayoutMargins:)])
        [cell setLayoutMargins:UIEdgeInsetsZero];
}


- (NSIndexPath *)tableView:(UITableView *)tableView willSelectRowAtIndexPath:(NSIndexPath *)indexPath {
    [tableView deselectRowAtIndexPath:indexPath animated:YES];
    self.selectedRestaurant = (Restaurant *)[self.items objectAtIndex:indexPath.row];
    [self performSegueWithIdentifier:@"RestaurantsToDetail" sender:self];
    return indexPath;
}

static NSInteger ImageWidth = 320;
static NSInteger ImageHeigth = 230;

- (CGFloat)tableView:(UITableView *)tableView heightForRowAtIndexPath:(NSIndexPath *)indexPath {
    return self.tableView.frame.size.width / ImageWidth * ImageHeigth;
}

#pragma mark - Navigation

- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
    if ([segue.destinationViewController isKindOfClass:[RestaurantDetailTableViewController class]])
        [(RestaurantDetailTableViewController *)segue.destinationViewController setSelectedRestaurant:self.selectedRestaurant];
}

- (void)tableView:(UITableView *)tableView didEndDisplayingCell:(UITableViewCell *)cell forRowAtIndexPath:(NSIndexPath *)indexPath {
    NSBlockOperation *ongoingDownloadOperation = [self.loadImageOperations objectForKey:indexPath];
    if (ongoingDownloadOperation)   {
        [ongoingDownloadOperation cancel];
        [self.loadImageOperations removeObjectForKey:indexPath];
    }
}

-(void) viewWillDisappear:(BOOL)animated {
    [super viewWillDisappear:animated];
    [_loadImageOperationQueue cancelAllOperations];
    [_loadImageOperations removeAllObjects];
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
}

@end
