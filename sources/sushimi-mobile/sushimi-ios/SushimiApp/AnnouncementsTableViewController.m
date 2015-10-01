//
//  AnnouncementsTableViewController.m
//  SushimiApp
//
//  Created by Artem Demidovich on 2/17/15.
//  Copyright (c) 2015 AphionSoftware. All rights reserved.
//

#import "AnnouncementHeaderCell.h"
#import "AnnouncementsTableViewController.h"
#import "AnnouncementDetailViewController.h"
#import "NewsTableViewCell.h"

#import "RKObjectMapping.h"
#import "RKResponseDescriptor.h"
#import "RKObjectRequestOperation.h"
#import "RKRelationshipMapping.h"

#import "ResponseWrapper.h"
#import "Announcement.h"

#import "DataManager.h"
#import "DataLoadingErrorView.h"
#import "DejalActivityView.h"

@interface AnnouncementsTableViewController ()

@property Announcement *selectedAnnouncement;
@property DataLoadingErrorView *dataLoadingErrorView;

@property NSMutableArray *activePromotions;
@property NSMutableArray *passedPromotions;

@end

@implementation AnnouncementsTableViewController

static NSInteger NEWS = 0;
static NSInteger PROMO = 1;



- (void)viewDidLoad {
    [super viewDidLoad];
    
    self.tableView.tableFooterView = [[UIView alloc] initWithFrame:CGRectZero];
    
    [self loadAnnouncements:PROMO];
}

-(void)loadAnnouncements:(NSInteger)announcementType {
    [DataManager loadAnnouncements:self withAnnouncementType:announcementType];
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
    
    if ([self getSelectedAnnouncementType] == PROMO)
        [self splitPromotionsByState];
    
    [self.tableView reloadData];
}

-(void) reloadData:(NSObject *) sender {
    [self loadAnnouncements:[self getSelectedAnnouncementType]];
}

-(NSInteger)getSelectedAnnouncementType {
    switch ([self.announcementType selectedSegmentIndex]) {
        case 0: return PROMO;
        case 1: return NEWS;
        default: return PROMO;
    }
}

- (IBAction)announcementTypeChanged:(id)sender {
    switch ([self.announcementType selectedSegmentIndex]) {
        case 0: [self loadAnnouncements:PROMO]; break;
        case 1: [self loadAnnouncements:NEWS]; break;
        default: break;
    }
    
}

-(void) splitPromotionsByState {
    if ([self getSelectedAnnouncementType] == NEWS)
        return;
    
    if (self.activePromotions == nil)
        self.activePromotions = [[NSMutableArray alloc] init];
    if (self.activePromotions.count > 0)
        [self.activePromotions removeAllObjects];
    
    if (self.passedPromotions == nil)
        self.passedPromotions = [[NSMutableArray alloc] init];
    if (self.passedPromotions.count > 0)
        [self.passedPromotions removeAllObjects];
    
    for (Announcement* promo in self.items) {
        //NSDate* endDate = [NSDate dateWithTimeIntervalSince1970:(promo.endDate / 1000.0)];
        if (promo.isActual == YES) {
            [self.activePromotions addObject:promo];
        } else {
            [self.passedPromotions addObject:promo];
        }
    }
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
}

#pragma mark - Table view data source

-(UIView *)tableView:(UITableView *)tableView viewForHeaderInSection:(NSInteger)section {
    AnnouncementHeaderCell*  headerCell = (AnnouncementHeaderCell*)[self.tableView dequeueReusableCellWithIdentifier:@"HeaderCell"];
    if (headerCell == nil) {
        [tableView registerNib:[UINib nibWithNibName:@"AnnouncementHeaderCell" bundle:nil]forCellReuseIdentifier:@"HeaderCell"];
        headerCell = [tableView dequeueReusableCellWithIdentifier:@"HeaderCell"];
    }

    if ([self getSelectedAnnouncementType] == NEWS) {
        [headerCell initHeader:nil];
    }
    
    if ([self getSelectedAnnouncementType] == PROMO) {
        if(section == 0)
            [headerCell initHeader:@"АКТИВНЫЕ"];
        if(section == 1)
            [headerCell initHeader:@"ПРОШЕДШИЕ"];
    }
    return headerCell;
}

-(CGFloat)tableView:(UITableView *)tableView heightForFooterInSection:(NSInteger)section {
    return 0;
}

- (CGFloat)tableView:(UITableView *)tableView heightForHeaderInSection:(NSInteger)section {
    return 40;
}

-(UIView*) tableView:(UITableView *)tableView viewForFooterInSection:(NSInteger)section{
    AnnouncementHeaderCell*  headerCell = (AnnouncementHeaderCell*)[self.tableView dequeueReusableCellWithIdentifier:@"HeaderCell"];
    if (headerCell == nil) {
        [tableView registerNib:[UINib nibWithNibName:@"AnnouncementHeaderCell" bundle:nil]forCellReuseIdentifier:@"HeaderCell"];
        headerCell = [tableView dequeueReusableCellWithIdentifier:@"HeaderCell"];
    }
    [headerCell initHeader:nil];
    return headerCell;
}



- (NSInteger)numberOfSectionsInTableView:(UITableView *)tableView {
    if ([self getSelectedAnnouncementType] == PROMO)
        return 2;
    if ([self getSelectedAnnouncementType] == NEWS)
        return 1;
    return 1;
}

- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section {
    if ([self getSelectedAnnouncementType] == PROMO) {
        if (section == 0) { // Active
            if (self.items != nil)
                return self.activePromotions.count;
            return 0;
        }
        if (section == 1) { // Passed
            if (self.items != nil)
                return self.passedPromotions.count;
            return 0;
        }
    }
    
    if ([self getSelectedAnnouncementType] == NEWS) {
        if (self.items)
            return self.items.count;
    }
    return 0;
}


- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath {
    NewsTableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:@"NewsCell"];
    if (cell == nil) {
        [tableView registerNib:[UINib nibWithNibName:@"NewsTableViewCell" bundle:nil]forCellReuseIdentifier:@"NewsCell"];
        cell =[tableView dequeueReusableCellWithIdentifier:@"NewsCell"];
    }
    
    Announcement *news;
    if ([self getSelectedAnnouncementType] == NEWS) {
        news = ((Announcement *)[self.items objectAtIndex:indexPath.row]);
    }
    
    if ([self getSelectedAnnouncementType] == PROMO) {
        if (indexPath.section == 0) {
            news = ((Announcement *)[self.activePromotions objectAtIndex:indexPath.row]);
        }
        if (indexPath.section == 1) {
            news = ((Announcement *)[self.passedPromotions objectAtIndex:indexPath.row]);
        }
    }
    
    [cell initCell:news];
    
    return cell;
}

-(void)tableView:(UITableView *)tableView willDisplayCell:(UITableViewCell *)cell forRowAtIndexPath:(NSIndexPath *)indexPath {
    cell.accessoryType = UITableViewCellAccessoryDisclosureIndicator;
}


- (NSIndexPath *)tableView:(UITableView *)tableView willSelectRowAtIndexPath:(NSIndexPath *)indexPath {
    [tableView deselectRowAtIndexPath:indexPath animated:YES];
    
    // Show Map
    if (self.items != nil) {
        if ([self getSelectedAnnouncementType] == PROMO) {
            if (indexPath.section == 0)
                self.selectedAnnouncement = (Announcement*)[self.activePromotions objectAtIndex:indexPath.row];
            if (indexPath.section == 1)
                self.selectedAnnouncement = (Announcement*)[self.passedPromotions objectAtIndex:indexPath.row];
        } else {
            self.selectedAnnouncement = (Announcement*)[self.items objectAtIndex:indexPath.row];
        }
        
        [self performSegueWithIdentifier:@"AnnouncementToDetail" sender:self];
    }

    return indexPath;
}

#pragma mark - Navigation

// In a storyboard-based application, you will often want to do a little preparation before navigation
- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
    if ([segue.destinationViewController isKindOfClass:[AnnouncementDetailViewController class]]) {
        [(AnnouncementDetailViewController *)segue.destinationViewController setNews:self.selectedAnnouncement];
        NSLog(@"Announcements -> Detail navigation");
    }
}

@end
