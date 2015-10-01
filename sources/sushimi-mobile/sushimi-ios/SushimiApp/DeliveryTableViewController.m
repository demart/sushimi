//
//  DeliveryTableViewController.m
//  SushimiApp
//
//  Created by Artem Demidovich on 2/20/15.
//  Copyright (c) 2015 AphionSoftware. All rights reserved.
//

#import "DeliveryTableViewController.h"

#import "MapViewController.h"

#import "DeliveryTableViewCell.h"
#import "AddressTableViewCell.h"
#import "PhoneTableViewCell.h"

#import "DeliveryInfo.h"

#import "DataManager.h"
#import "DejalActivityView.h"
#import "DataLoadingErrorView.h"
#import "PhoneNumberFormatter.h"
#import "LocalImageCache.h"


@interface DeliveryTableViewController ()

@property DeliveryInfo *selectedDeliveryInfo;
@property DataLoadingErrorView *dataLoadingErrorView;
@property UIImage *loadingImage;
@end

@implementation DeliveryTableViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    _loadingImage = [UIImage imageNamed:@"loadingImage.png"];    
    _loadImageOperationQueue = [[NSOperationQueue alloc] init];
    [_loadImageOperationQueue setMaxConcurrentOperationCount:5];

    
    self.tableView.tableFooterView = [[UIView alloc] initWithFrame:CGRectZero];
    
    [DataManager loadDeliveryPoints:self];
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
    [DataManager loadDeliveryPoints:self];
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
}

#pragma mark - Table view data source

- (NSInteger)numberOfSectionsInTableView:(UITableView *)tableView {
    return 1;
}

- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section {
    if (self.items != nil)
        return (self.items.count*3);
    return 0;
}

- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath {
    if (indexPath.row % 3 == 0) {
        DeliveryTableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:@"DeliveriesInfo"];
        if (!cell) {
            [tableView registerNib:[UINib nibWithNibName:@"DeliveryTableViewCell" bundle:nil]forCellReuseIdentifier:@"DeliveriesInfo"];
            cell = [tableView dequeueReusableCellWithIdentifier:@"DeliveriesInfo"];
        }
        return cell;
    }
    
    if (indexPath.row % 3 == 1) {
        AddressTableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:@"AddressInfo"];
        if (!cell) {
            [tableView registerNib:[UINib nibWithNibName:@"AddressTableViewCell" bundle:nil]forCellReuseIdentifier:@"AddressInfo"];
            cell = [tableView dequeueReusableCellWithIdentifier:@"AddressInfo"];
            cell.accessoryType = UITableViewCellAccessoryDisclosureIndicator;
        }
        return cell;
    }
    
    if (indexPath.row % 3 == 2) {
        PhoneTableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:@"PhoneInfo"];
        if (!cell) {
            [tableView registerNib:[UINib nibWithNibName:@"PhoneTableViewCell" bundle:nil]forCellReuseIdentifier:@"PhoneInfo"];
            cell = [tableView dequeueReusableCellWithIdentifier:@"PhoneInfo"];
            cell.accessoryType = UITableViewCellAccessoryDisclosureIndicator;
        }
        return cell;
    }
    return nil;
}

- (CGFloat)tableView:(UITableView *)tableView heightForRowAtIndexPath:(NSIndexPath *)indexPath {
    if (indexPath.row % 3 == 0) return 475;
    if (indexPath.row % 3 == 1) return 36;
    if (indexPath.row % 3 == 2) return 36;
    return 36;
}


-(void)tableView:(UITableView *)tableView willDisplayCell:(UITableViewCell *)cell forRowAtIndexPath:(NSIndexPath *)indexPath {
    
    if (self.items != nil) {
        DeliveryInfo *item = [self.items objectAtIndex:(indexPath.row / 3)];
        
        if ([cell isKindOfClass:[DeliveryTableViewCell class]]) {
            DeliveryTableViewCell *dCell = (DeliveryTableViewCell *)cell;
            dCell.deliveryTitle.text = item.title;
            dCell.deliveryWorkhours.text = item.workhours;
            dCell.deliveryMinOrderSum.text = item.minOrderSum;
            dCell.deliveryArea.text = item.deliveryArea;
            dCell.deliveryRemarks.text = [[NSString alloc] initWithFormat:@"* %@", item.deliveryAreaRemarks ];
            dCell.selectionStyle = UITableViewCellSelectionStyleNone;
            
            UIImage *loadedImage =(UIImage *)[LocalImageCache  loadImageFromLocalCache:item.deliveryAreaImageUrl];
            
            if (loadedImage != nil) {
                dCell.deliveryAreaImage.image = loadedImage;
            } else {
                dCell.deliveryAreaImage.image = _loadingImage;
                
                NSBlockOperation *loadImageOperation = [[NSBlockOperation alloc] init];
                __weak NSBlockOperation *weakOperation = loadImageOperation;
                
                [loadImageOperation addExecutionBlock:^(void){
                    UIImage *image = [UIImage imageWithData:[NSData dataWithContentsOfURL:[NSURL URLWithString:[NSString stringWithFormat:@"http://sushimi.kz/public/%@", item.deliveryAreaImageUrl]]] ];
                    [[NSOperationQueue mainQueue] addOperationWithBlock:^(void) {
                        if (! weakOperation.isCancelled) {
                            DeliveryTableViewCell *updateCell = (DeliveryTableViewCell *)[tableView cellForRowAtIndexPath:indexPath];
                            if (updateCell != nil) {
                                CGFloat height = image.size.height;
                                CGFloat width = image.size.width;
                                updateCell.deliveryAreaImage.image = image;
                            }
                            [LocalImageCache  saveImageToLocalCache:item.deliveryAreaImageUrl withData:image];
                            [self.loadImageOperations removeObjectForKey:indexPath];
                        }
                    }];
                }];
                
                [_loadImageOperations setObject: loadImageOperation forKey:indexPath];
                if (loadImageOperation) {
                    [_loadImageOperationQueue addOperation:loadImageOperation];
                }
            }
            
            return;
        }
        
        if ([cell isKindOfClass:[AddressTableViewCell class]]) {
            AddressTableViewCell *gCell = (AddressTableViewCell *)cell;
            gCell.address.text = item.address;
            cell.accessoryType = UITableViewCellAccessoryDisclosureIndicator;
            return;
        }
        
        if ([cell isKindOfClass:[PhoneTableViewCell class]]) {
            PhoneTableViewCell *gCell = (PhoneTableViewCell *)cell;
            PhoneNumberFormatter* phoneNumberFormatter = [[PhoneNumberFormatter alloc] init];
            gCell.phone.text = [phoneNumberFormatter format:item.phoneNumber withLocale:@"kzInfo"];
            cell.accessoryType = UITableViewCellAccessoryDisclosureIndicator;
            return;
        }
    }


}

- (NSIndexPath *)tableView:(UITableView *)tableView willSelectRowAtIndexPath:(NSIndexPath *)indexPath {
    [tableView deselectRowAtIndexPath:indexPath animated:YES];
    
    // Show Map
    if (indexPath.row % 3 == 1) {
        self.selectedDeliveryInfo = [self.items objectAtIndex:(indexPath.row / 3)];
        [self performSegueWithIdentifier:@"DeliveryToMap" sender:self];
    }
    
    // Direct Call
    if (indexPath.row % 3 == 2) {
        self.selectedDeliveryInfo = [self.items objectAtIndex:(indexPath.row / 3)];
        UIDevice *device = [UIDevice currentDevice];
        if ([[device model] isEqualToString:@"iPhone"] ) {
            [[UIApplication sharedApplication] openURL:[NSURL URLWithString:[[NSString alloc] initWithFormat:@"tel:%@", self.selectedDeliveryInfo.phoneNumber]]];
        } else {
            UIAlertView *notPermitted=[[UIAlertView alloc] initWithTitle:@"Внимание" message:@"Ваше устройство не поддерживает звонки" delegate:nil cancelButtonTitle:@"OK" otherButtonTitles:nil];
            [notPermitted show];
        }
    }
    return indexPath;
}


- (void)tableView:(UITableView *)tableView didEndDisplayingCell:(UITableViewCell *)cell forRowAtIndexPath:(NSIndexPath *)indexPath {
    NSBlockOperation *ongoingDownloadOperation = [self.loadImageOperations objectForKey:indexPath];
    
    if (ongoingDownloadOperation) {
        [ongoingDownloadOperation cancel];
        [self.loadImageOperations removeObjectForKey:indexPath];
    }
}


#pragma mark - Navigation

- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
    if ([segue.destinationViewController isKindOfClass:[MapViewController class]]) {
        NSArray *geoPoints = [NSArray arrayWithObjects:self.selectedDeliveryInfo.addressGeoLatitude,self.selectedDeliveryInfo.addressGeoLongitude,nil];
        
        [(MapViewController *)segue.destinationViewController setGeoPoints:(NSArray *)geoPoints];
    }
}

@end
