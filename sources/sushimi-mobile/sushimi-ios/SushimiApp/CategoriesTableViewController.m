//
//  CategoriesTableViewController.m
//  SushimiApp
//
//  Created by Artem Demidovich on 2/1/15.
//  Copyright (c) 2015 AphionSoftware. All rights reserved.
//

#import "CategoriesTableViewController.h"
#import "CategoryTableViewCell.h"

#import "ProductsTableViewController.h"
#import "SubCategoriesTableViewController.h"

#import "RKObjectMapping.h"
#import "RKResponseDescriptor.h"
#import "RKObjectRequestOperation.h"
#import "RKRelationshipMapping.h"

#import "CategoryItem.h"
#import "ResponseWrapper.h"

#import "LocalImageCache.h"
#import "DataManager.h"

#import "DejalActivityView.h"
#import "DataLoadingErrorView.h"

@interface CategoriesTableViewController ()
@property UIView *originalView;
@property UIView *dataLoadingView;
@property DataLoadingErrorView *dataLoadingErrorView;
@property NSMutableArray *imageActivityIndicators;

@property UIImage *loadingImage;

@end

@implementation CategoriesTableViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    
    _loadingImage = [UIImage imageNamed:@"loadingImage.png"];
    
    _loadImageOperationQueue = [[NSOperationQueue alloc] init];
    [_loadImageOperationQueue setMaxConcurrentOperationCount:5];

    self.tableView.tableFooterView = [[UIView alloc] initWithFrame:CGRectZero];
    [DataManager loadCategories:nil onTableViewController:self];
}

-(void)startLoading:(BOOL)animated {
    [DataLoadingErrorView hideDataLoadingErrorView:self.dataLoadingErrorView];
    [DejalBezelActivityView activityViewForView:self.view withLabel:@"Подождите\nИдет загрузка..."];
}

-(void)stopLoading:(BOOL)animated withError:(NSString *) errorMessage {
    [DejalBezelActivityView removeViewAnimated:YES];
    
    if (errorMessage != nil) {
        self.dataLoadingErrorView = [DataLoadingErrorView showDataLoadingErrorView:self withRefreshSelector:@selector(reloadData:)];
    }
}


-(void) reloadData:(NSObject *) sender {
    [DataManager loadCategories:nil onTableViewController:self];
}


- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
}

#pragma mark - Table view data source

- (NSInteger)numberOfSectionsInTableView:(UITableView *)tableView {
    return 1;
}

- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section {
    if (self.items != nil) {
        return self.items.count;
    }
    return 0;
    
}



- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath {
    UITableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:@"CategoryCell"];
    if (!cell) {
        [tableView registerNib:[UINib nibWithNibName:@"CategoryTableViewCell" bundle:nil]forCellReuseIdentifier:@"CategoryCell"];
        cell = [tableView dequeueReusableCellWithIdentifier:@"CategoryCell"];
    }
    
    CategoryItem   *item   = [self.items objectAtIndex:indexPath.row];
    CategoryTableViewCell *dCell = (CategoryTableViewCell *)cell;
    dCell.title.text = item.name;
    dCell.selectionStyle = UITableViewCellSelectionStyleNone;
    
    UIImage *loadedImage =(UIImage *)[LocalImageCache  loadImageFromLocalCache:item.imageUrl];
     
    if (loadedImage != nil) {
        dCell.image.image = loadedImage;
    } else {
        dCell.image.image = _loadingImage;
        
        NSBlockOperation *loadImageOperation = [[NSBlockOperation alloc] init];
        __weak NSBlockOperation *weakOperation = loadImageOperation;
        
        [loadImageOperation addExecutionBlock:^(void){
            UIImage *image = [UIImage imageWithData:[NSData dataWithContentsOfURL:[NSURL URLWithString:[NSString stringWithFormat:@"http://sushimi.kz/public/images/menu/categories/%@", item.imageUrl]]] ];
            [[NSOperationQueue mainQueue] addOperationWithBlock:^(void) {
                if (! weakOperation.isCancelled) {
                    CategoryTableViewCell *updateCell = (CategoryTableViewCell *)[tableView cellForRowAtIndexPath:indexPath];
                    if (updateCell != nil) {
                        updateCell.image.image = image;
                    }
                    
                    NSLog(@"Photo loaded %@", item.imageUrl);
                    [LocalImageCache  saveImageToLocalCache:item.imageUrl withData:image];
                    [self.loadImageOperations removeObjectForKey:indexPath];
                }
            }];
        }];

        [_loadImageOperations setObject: loadImageOperation forKey:indexPath];
        if (loadImageOperation) {
            [_loadImageOperationQueue addOperation:loadImageOperation];
        }
    }
    
    return cell;
}

- (void)tableView:(UITableView *)tableView didEndDisplayingCell:(UITableViewCell *)cell forRowAtIndexPath:(NSIndexPath *)indexPath {
    NSBlockOperation *ongoingDownloadOperation = [self.loadImageOperations objectForKey:indexPath];

    if (ongoingDownloadOperation) {
        [ongoingDownloadOperation cancel];
        [self.loadImageOperations removeObjectForKey:indexPath];
    }
}

- (void)tableView:(UITableView *)tableView willDisplayCell:(CategoryTableViewCell *)cell forRowAtIndexPath:(NSIndexPath *)indexPath {
    [cell buildGradient:cell.bounds];
    
    if ([cell respondsToSelector:@selector(setSeparatorInset:)]) {
        [cell setSeparatorInset:UIEdgeInsetsZero];
    }
    if ([cell respondsToSelector:@selector(setPreservesSuperviewLayoutMargins:)]) {
        [cell setPreservesSuperviewLayoutMargins:NO];
    }
    if ([cell respondsToSelector:@selector(setLayoutMargins:)]) {
        [cell setLayoutMargins:UIEdgeInsetsZero];
    }

}

-(void) viewWillDisappear:(BOOL)animated {
    [super viewWillDisappear:animated];
    [_loadImageOperationQueue cancelAllOperations];
    [_loadImageOperations removeAllObjects];
}

- (NSIndexPath *)tableView:(UITableView *)tableView willSelectRowAtIndexPath:(NSIndexPath *)indexPath {
    [tableView deselectRowAtIndexPath:indexPath animated:YES];
    self.selectedCategoryItem =[self.items objectAtIndex:[indexPath row]];
    if (self.selectedCategoryItem.hasChildren) {
        [self performSegueWithIdentifier:@"CategoriesToSubCategories" sender:self];
    } else {
        [self performSegueWithIdentifier:@"CategoriesToProducts" sender:self];
    }
    return indexPath;
}

#pragma mark - Navigation

- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
    if ([segue.destinationViewController isKindOfClass:[SubCategoriesTableViewController class]]) {
        [ (SubCategoriesTableViewController *)segue.destinationViewController setParentCategory:self.selectedCategoryItem];
    }
    
    if ([segue.destinationViewController isKindOfClass:[ProductsTableViewController class]]) {
        [ (ProductsTableViewController *)segue.destinationViewController setParentCategory:self.selectedCategoryItem];
    }
}

@end
