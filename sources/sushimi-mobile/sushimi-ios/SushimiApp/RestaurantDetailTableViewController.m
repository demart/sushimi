//
//  RestaurantDetailTableViewController.m
//  SushimiApp
//
//  Created by Artem Demidovich on 2/28/15.
//  Copyright (c) 2015 AphionSoftware. All rights reserved.
//

#import "RestaurantDetailTableViewController.h"

#import "RestaurantPhotosTableViewCell.h"
#import "WorkhoursTableViewCell.h"
#import "AddressTableViewCell.h"
#import "PhoneTableViewCell.h"
#import "ScrolledViewImagesTableViewCell.h"
#import "RestaurantImageModalViewController.h"

#import "MapViewController.h"
#import "PhoneNumberFormatter.h"

@interface RestaurantDetailTableViewController ()

@property Restaurant *_selectedRestaurant;

@property NSArray *photoUrlModels;
@property NSInteger photoPosition;

@end

@implementation RestaurantDetailTableViewController

-(void)setSelectedRestaurant:(Restaurant *)restaurant {
    self._selectedRestaurant = restaurant;
}

- (void)viewDidLoad {
    [super viewDidLoad];
    self.navigationItem.backBarButtonItem.title = @"Назад";
    self.tableView.tableFooterView = [[UIView alloc] initWithFrame:CGRectZero];
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
}

#pragma mark - Table view data source

- (NSInteger)numberOfSectionsInTableView:(UITableView *)tableView {
    return 1;
}

- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section {
    return 5;
}

- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath {
    UITableViewCell *cell = nil;
 
    // RestaurantPhoto
    if (indexPath.row == 0) {
        cell = [tableView dequeueReusableCellWithIdentifier:@"RestaurantPhotos"];
        if (cell == nil) {
            [tableView registerNib:[UINib nibWithNibName:@"RestaurantPhotosTableViewCell" bundle:nil]forCellReuseIdentifier:@"RestaurantPhotos"];
            cell =[tableView dequeueReusableCellWithIdentifier:@"RestaurantPhotos"];
        }
        RestaurantPhotosTableViewCell *wCell = (RestaurantPhotosTableViewCell *)cell;
        [wCell initCell:self._selectedRestaurant fromController:self withFrame:self.tableView.frame];
        return wCell;
    }
    
    // Workhours
    if (indexPath.row == 1) {
        cell = [tableView dequeueReusableCellWithIdentifier:@"WorhoursInfo"];
        if (cell == nil) {
            [tableView registerNib:[UINib nibWithNibName:@"WorkhoursTableViewCell" bundle:nil]forCellReuseIdentifier:@"WorhoursInfo"];
            cell =[tableView dequeueReusableCellWithIdentifier:@"WorhoursInfo"];
        }
        WorkhoursTableViewCell *wCell = (WorkhoursTableViewCell *)cell;
        return wCell;
    }
    
    // Address
    if (indexPath.row == 2) {
        cell = [tableView dequeueReusableCellWithIdentifier:@"AddressInfo"];
        if (cell == nil) {
            [tableView registerNib:[UINib nibWithNibName:@"AddressTableViewCell" bundle:nil]forCellReuseIdentifier:@"AddressInfo"];
            cell =[tableView dequeueReusableCellWithIdentifier:@"AddressInfo"];
        }
        AddressTableViewCell *wCell = (AddressTableViewCell *)cell;
        return wCell;
    }
    
    // Address
    if (indexPath.row == 3) {
        cell = [tableView dequeueReusableCellWithIdentifier:@"PhoneInfo"];
        if (cell == nil) {
            [tableView registerNib:[UINib nibWithNibName:@"PhoneTableViewCell" bundle:nil]forCellReuseIdentifier:@"PhoneInfo"];
            cell =[tableView dequeueReusableCellWithIdentifier:@"PhoneInfo"];
        }
        PhoneTableViewCell *wCell = (PhoneTableViewCell *)cell;
        return wCell;
    }

    // RestaurantEvents
    if (indexPath.row == 4) {
        cell = [tableView dequeueReusableCellWithIdentifier:@"ScrolledImagesInfo"];
        if (cell == nil) {
            [tableView registerNib:[UINib nibWithNibName:@"ScrolledViewImagesTableViewCell" bundle:nil]forCellReuseIdentifier:@"ScrolledImagesInfo"];
            cell =[tableView dequeueReusableCellWithIdentifier:@"ScrolledImagesInfo"];
        }
        ScrolledViewImagesTableViewCell*wCell = (ScrolledViewImagesTableViewCell *)cell;
        [wCell initCell:self._selectedRestaurant fromController:self];
        return wCell;
    }
    
    return cell;
}


static NSInteger ImageWidth = 320;
static NSInteger ImageHeigth = 230;

- (CGFloat)tableView:(UITableView *)tableView heightForRowAtIndexPath:(NSIndexPath *)indexPath {
    if (indexPath.row == 0) return self.tableView.frame.size.width / ImageWidth * ImageHeigth;
    if (indexPath.row == 1) return 35;
    if (indexPath.row == 2) return 35;
    if (indexPath.row == 3) return 35;
    if (indexPath.row == 4) return 90;
    return 35;
}

-(void)tableView:(UITableView *)tableView willDisplayCell:(UITableViewCell *)cell forRowAtIndexPath:(NSIndexPath *)indexPath {
    
    if ([cell respondsToSelector:@selector(setSeparatorInset:)])
        [cell setSeparatorInset:UIEdgeInsetsZero];
    if ([cell respondsToSelector:@selector(setPreservesSuperviewLayoutMargins:)])
        [cell setPreservesSuperviewLayoutMargins:NO];
    if ([cell respondsToSelector:@selector(setLayoutMargins:)])
        [cell setLayoutMargins:UIEdgeInsetsZero];
    
    
    if (self._selectedRestaurant != nil) {
        if ([cell isKindOfClass:[RestaurantPhotosTableViewCell class]]) {
            RestaurantPhotosTableViewCell *dCell = (RestaurantPhotosTableViewCell *)cell;
            dCell.selectionStyle = UITableViewCellSelectionStyleNone;
            return;
        }
        
        if ([cell isKindOfClass:[WorkhoursTableViewCell class]]) {
            WorkhoursTableViewCell *dCell = (WorkhoursTableViewCell *)cell;
            dCell.selectionStyle = UITableViewCellSelectionStyleNone;
            dCell.workhours.text = self._selectedRestaurant.workhours;
            return;
        }
        
        if ([cell isKindOfClass:[AddressTableViewCell class]]) {
            AddressTableViewCell *dCell = (AddressTableViewCell *)cell;
            dCell.accessoryType = UITableViewCellAccessoryDisclosureIndicator;
            dCell.address.text = self._selectedRestaurant.address;
            return;
        }
        
        if ([cell isKindOfClass:[PhoneTableViewCell class]]) {
            PhoneTableViewCell *dCell = (PhoneTableViewCell *)cell;
            dCell.accessoryType = UITableViewCellAccessoryDisclosureIndicator;
            PhoneNumberFormatter* phoneNumberFormatter = [[PhoneNumberFormatter alloc] init];
            dCell.phone.text = [phoneNumberFormatter format:self._selectedRestaurant.phoneNumber withLocale:@"kzInfo"];
            return;
        }
        
        if ([cell isKindOfClass:[ScrolledViewImagesTableViewCell class]]) {
            ScrolledViewImagesTableViewCell *dCell = (ScrolledViewImagesTableViewCell *)cell;
            dCell.selectionStyle = UITableViewCellSelectionStyleNone;
            return;
        }
    }
}


- (NSIndexPath *)tableView:(UITableView *)tableView willSelectRowAtIndexPath:(NSIndexPath *)indexPath {
    [tableView deselectRowAtIndexPath:indexPath animated:YES];
    // Show Map
    if (indexPath.row == 2)
        [self performSegueWithIdentifier:@"RestaurantToMap" sender:self];
    
    // Direct Call
    if (indexPath.row == 3) {
        UIDevice *device = [UIDevice currentDevice];
        if ([[device model] isEqualToString:@"iPhone"] ) {
            [[UIApplication sharedApplication] openURL:[NSURL URLWithString:[[NSString alloc] initWithFormat:@"tel:%@", self._selectedRestaurant.phoneNumber]]];
        } else {
            UIAlertView *notPermitted=[[UIAlertView alloc] initWithTitle:@"Внимание" message:@"Ваше устройство не поддерживает звонки" delegate:nil cancelButtonTitle:@"OK" otherButtonTitles:nil];
            [notPermitted show];
        }
    }
    return indexPath;
}

#pragma mark - Navigation

-(void)setImagesWithPositionToOpenWithImageViewer:(NSArray*)photoUrlModels withPosition:(NSString*)position{
    self.photoUrlModels = photoUrlModels;
    self.photoPosition = [position integerValue];
    [self performSegueWithIdentifier:@"RestaurantToImageView" sender:nil];
}

- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
    if ([segue.destinationViewController isKindOfClass:[RestaurantImageModalViewController class]])
        [(RestaurantImageModalViewController *)segue.destinationViewController initImagesView:self.photoUrlModels withPosition:self.photoPosition];
    
    if ([segue.destinationViewController isKindOfClass:[MapViewController class]]) {
        NSArray *geoPoints = [NSArray arrayWithObjects:
                              self._selectedRestaurant.addressGeoLatitude,
                              self._selectedRestaurant.addressGeoLongitude,
                              nil];
        
        [(MapViewController *)segue.destinationViewController setGeoPoints:(NSArray *)geoPoints];
    }
}

@end
