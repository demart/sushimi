//
//  SubCategoriesTableViewController.m
//  SushimiApp
//
//  Created by Artem Demidovich on 2/13/15.
//  Copyright (c) 2015 AphionSoftware. All rights reserved.
//

#import "SubCategoriesTableViewController.h"
#import "ProductsTableViewController.h"

#import "CategoryTableViewCell.h"

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

@interface SubCategoriesTableViewController ()

@property UIView *originalView;
@property UIView *dataLoadingView;
@property DataLoadingErrorView *dataLoadingErrorView;

@property UIImage *loadingImage;

@end

@implementation SubCategoriesTableViewController

- (void)setParentCategory:(CategoryItem *)parentCategory{
    if (parentCategory != nil) {
        self._parentCategory = parentCategory;
    } else{
        NSLog(@"setParentCategory Received nil");
    }
}

- (void)viewDidLoad {
    [super viewDidLoad];
    
    _loadingImage = [UIImage imageNamed:@"loadingImage.png"];
    
    _loadImageOperationQueue = [[NSOperationQueue alloc] init];
    [_loadImageOperationQueue setMaxConcurrentOperationCount:5];
    
    self.tableView.tableFooterView = [[UIView alloc] initWithFrame:CGRectZero];
    
    self.navigationItem.title =self._parentCategory.name;
    self.navigationItem.backBarButtonItem.title = @"Назад";

    [DataManager loadCategories:[@(self._parentCategory.id) stringValue] onTableViewController:self];    
 }


-(void)startLoading:(BOOL)animated {
    [DataLoadingErrorView hideDataLoadingErrorView:self.dataLoadingErrorView];
    [DejalBezelActivityView activityViewForView:self.view withLabel:@"Подождите\nИдет загрузка..."];
}

-(void)stopLoading:(BOOL)animated withError:(NSString *)errorMessage {
    [DejalBezelActivityView removeViewAnimated:YES];
    
    if (errorMessage != nil) {
        self.dataLoadingErrorView = [DataLoadingErrorView showDataLoadingErrorView:self withRefreshSelector:@selector(reloadData:)];
    }
}

-(void) reloadData:(NSObject *) sender {
    [DataManager loadCategories:[@(self._parentCategory.id) stringValue] onTableViewController:self];
}

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

- (void)tableView:(UITableView *)tableView willDisplayCell:(CategoryTableViewCell *)cell forRowAtIndexPath:(NSIndexPath *)indexPath {
    [cell buildGradient:cell.bounds];
    
    if ([cell respondsToSelector:@selector(setSeparatorInset:)])
        [cell setSeparatorInset:UIEdgeInsetsZero];
    if ([cell respondsToSelector:@selector(setPreservesSuperviewLayoutMargins:)])
        [cell setPreservesSuperviewLayoutMargins:NO];
    if ([cell respondsToSelector:@selector(setLayoutMargins:)])
        [cell setLayoutMargins:UIEdgeInsetsZero];
}



- (void)tableView:(UITableView *)tableView didEndDisplayingCell:(UITableViewCell *)cell forRowAtIndexPath:(NSIndexPath *)indexPath {
    NSBlockOperation *ongoingDownloadOperation = [self.loadImageOperations objectForKey:indexPath];
    if (ongoingDownloadOperation) {
        [ongoingDownloadOperation cancel];
        [self.loadImageOperations removeObjectForKey:indexPath];
    }
}

-(void) viewWillDisappear:(BOOL)animated {
    [super viewWillDisappear:animated];
    [_loadImageOperationQueue cancelAllOperations];
    [_loadImageOperations removeAllObjects];
}

- (NSIndexPath *)tableView:(UITableView *)tableView willSelectRowAtIndexPath:(NSIndexPath *)indexPath {
    [tableView deselectRowAtIndexPath:indexPath animated:YES];
    self._selectedSubCategoryItem =[self.items objectAtIndex:[indexPath row]];
    [self performSegueWithIdentifier:@"SubCategoriesToProducts" sender:self];
    return indexPath;
}

#pragma mark - Navigation

- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
    if ([segue.destinationViewController isKindOfClass:[ProductsTableViewController class]]) {
        [ (ProductsTableViewController *)segue.destinationViewController setParentCategory:self._selectedSubCategoryItem];
    }
}


@end
