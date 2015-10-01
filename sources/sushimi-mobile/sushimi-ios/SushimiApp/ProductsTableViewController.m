//
//  ProductsTableViewController.m
//  SushimiApp
//
//  Created by Artem Demidovich on 2/13/15.
//  Copyright (c) 2015 AphionSoftware. All rights reserved.
//

#import "ProductsTableViewController.h"
#import "ProductTableViewCell.h"
#import "ProductDetailViewController.h"

#import "RKObjectMapping.h"
#import "RKResponseDescriptor.h"
#import "RKObjectRequestOperation.h"
#import "RKRelationshipMapping.h"

#import "Product.h" 
#import "CategoryItem.h"    
#import "ResponseWrapper.h"

#import "LocalImageCache.h"
#import "DataManager.h"

#import "DejalActivityView.h"
#import "DataLoadingErrorView.h"

@interface ProductsTableViewController ()

@property UIView *originalView;
@property UIView *dataLoadingView;
@property DataLoadingErrorView *dataLoadingErrorView;

@property UIImage *loadingImage;

@end


@implementation ProductsTableViewController

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
    
    [DataManager loadProductsInCategory:[@(self._parentCategory.id) stringValue] onTableViewController:self];
}



-(void)startLoading:(BOOL)animated {
    [DataLoadingErrorView hideDataLoadingErrorView:self.dataLoadingErrorView];
    [DejalBezelActivityView activityViewForView:self.view withLabel:@"Подождите\nИдет загрузка..."];
}

-(void)stopLoading:(BOOL)animated withError:(NSString *)errorMessage{
    [DejalBezelActivityView removeViewAnimated:true];
    
    if (errorMessage != nil) {
        self.dataLoadingErrorView = [DataLoadingErrorView showDataLoadingErrorView:self withRefreshSelector:@selector(reloadData:)];
    }
}

-(void) reloadData:(NSObject *) sender {
    [DataManager loadProductsInCategory:[@(self._parentCategory.id) stringValue] onTableViewController:self];
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
    ProductTableViewCell *cell = (ProductTableViewCell *)[tableView dequeueReusableCellWithIdentifier:@"ProductCell"];
    if (!cell) {
        [tableView registerNib:[UINib nibWithNibName:@"ProductTableViewCell" bundle:nil]forCellReuseIdentifier:@"ProductCell"];
        cell = [tableView dequeueReusableCellWithIdentifier:@"ProductCell"];
    }
    
    Product   *item   = [self.items objectAtIndex:indexPath.row];
    ProductTableViewCell *dCell = (ProductTableViewCell *)cell;
    dCell.selectionStyle = UITableViewCellSelectionStyleNone;
    [dCell.productOrderView setHidden:YES];
    
    [dCell initProductCell:item];

    UIImage *loadedImage =(UIImage *)[LocalImageCache  loadImageFromLocalCache:item.smallImageLink];
    if (loadedImage != nil) {
        dCell.image.image = loadedImage;
    } else {
        dCell.image.image = _loadingImage;
        
        NSBlockOperation *loadImageOperation = [[NSBlockOperation alloc] init];
        __weak NSBlockOperation *weakOperation = loadImageOperation;

        [loadImageOperation addExecutionBlock:^(void){
            UIImage *image = [UIImage imageWithData:[NSData dataWithContentsOfURL:[NSURL URLWithString:[NSString stringWithFormat: @"http://sushimi.kz/public/images/menu/items/%@", item.smallImageLink]]] ];

            [[NSOperationQueue mainQueue] addOperationWithBlock:^(void) {
                if (! weakOperation.isCancelled) {
                    ProductTableViewCell *updateCell = (ProductTableViewCell *)[tableView cellForRowAtIndexPath:indexPath];
                    if (updateCell != nil)
                        updateCell.image.image = image;
                
                    [LocalImageCache  saveImageToLocalCache:item.smallImageLink withData:image];
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


- (void)tableView:(UITableView *)tableView didEndDisplayingCell:(UITableViewCell *)cell forRowAtIndexPath:(NSIndexPath *)indexPath
{
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


-(void) viewWillAppear:(BOOL)animated {
    [self.tableView reloadData];
}


- (void)tableView:(UITableView *)tableView willDisplayCell:(ProductTableViewCell *)cell forRowAtIndexPath:(NSIndexPath *)indexPath {
    [cell buildGradient:cell.bounds];
    
    if ([cell respondsToSelector:@selector(setSeparatorInset:)])
        [cell setSeparatorInset:UIEdgeInsetsZero];
    if ([cell respondsToSelector:@selector(setPreservesSuperviewLayoutMargins:)])
        [cell setPreservesSuperviewLayoutMargins:NO];
    if ([cell respondsToSelector:@selector(setLayoutMargins:)])
        [cell setLayoutMargins:UIEdgeInsetsZero];
}


- (NSIndexPath *)tableView:(UITableView *)tableView willSelectRowAtIndexPath:(NSIndexPath *)indexPath {
    [tableView deselectRowAtIndexPath:indexPath animated:YES];
    
    self._selectedProduct =[self.items objectAtIndex:[indexPath row]];
    self._selectedViewCell = (ProductTableViewCell*)[tableView cellForRowAtIndexPath:indexPath];
    
    [self performSegueWithIdentifier:@"ProductsToDetail" sender:self];
    return indexPath;
}

#pragma mark - Navigation

- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
    if ([segue.destinationViewController isKindOfClass:[ProductDetailViewController class]])
        [ (ProductDetailViewController *)segue.destinationViewController setProduct:self._selectedProduct fromCell:self._selectedViewCell];
}

@end
