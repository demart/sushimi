//
//  FeedbackTableViewController.m
//  SushimiApp
//
//  Created by Artem Demidovich on 7/24/15.
//  Copyright (c) 2015 AphionSoftware. All rights reserved.
//

#import "FeedbackTableViewController.h"

#import "DejalActivityView.h"
#import "DataLoadingErrorView.h"

#import "FeedbackDataManager.h"

#import "FeedbackModel.h"
#import "FeedbacksWrapperModel.h"

#import "FeedbackTableViewCell.h"
#import "FeedbackLoadMoreTableViewCell.h"

#import "SendFeedbackTableViewController.h"
#import "Constants.h"

@interface FeedbackTableViewController ()

@property DataLoadingErrorView *dataLoadingErrorView;

@property NSInteger currentPage;
@property NSMutableArray* feedbacks;
@property bool isExistsMoreRecords;

@end

@implementation FeedbackTableViewController

static NSInteger feedbackPageSize = 10;
static UIRefreshControl* refreshControl;

- (void)viewDidLoad {
    [super viewDidLoad];
    
    self.feedbacks = [[NSMutableArray alloc] init];
    self.currentPage = 0;
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
    self.currentPage = 0;
    [FeedbackDataManager loadFeedbacks:self successSelector:@selector(successRefreshControlLoadFeedbacks:) failureSelector:@selector(failureRefreshControlLoadFeedbacks:) withPage:self.currentPage withPageSize:feedbackPageSize];
    [refreshControl endRefreshing];
}

-(void) successRefreshControlLoadFeedbacks:(FeedbacksWrapperModel*) response {
    if (response != nil) {
        if (response.feedbacks != nil && response.feedbacks.count > 0) {
            [self.feedbacks removeAllObjects];
            [self.feedbacks addObjectsFromArray:response.feedbacks];
            self.currentPage = self.currentPage + 1;
        }
        self.isExistsMoreRecords = response.pageCount > response.page;
    }
    
    [self.refreshControl endRefreshing];
    [self.tableView reloadData];
}

-(void) failureRefreshControlLoadFeedbacks:(NSError*) error {
    [self.refreshControl endRefreshing];
    [self.tableView reloadData];
}

-(void)viewWillAppear:(BOOL)animated {
    [DataLoadingErrorView hideDataLoadingErrorView:self.dataLoadingErrorView];
    [DejalBezelActivityView activityViewForView:self.view withLabel:@"Подождите\nИдет загрузка..."];
    self.currentPage = 0;
    [FeedbackDataManager loadFeedbacks:self successSelector:@selector(successfullyLoadedFeedbacks:) failureSelector:@selector(failureLoadingFeedbacks:) withPage:self.currentPage withPageSize:feedbackPageSize];
}


// Loader View
-(void) successfullyLoadedFeedbacks:(FeedbacksWrapperModel*) response {
    [DejalBezelActivityView removeViewAnimated:YES];
    
    if (response != nil) {
        if (response.feedbacks != nil && response.feedbacks.count > 0) {
            [self.feedbacks addObjectsFromArray:response.feedbacks];
            self.currentPage = self.currentPage + 1;
        }
        self.isExistsMoreRecords = response.pageCount > response.page;
    } else {
        self.isExistsMoreRecords = false;
    }
    
    [self.tableView reloadData];
}

-(void) failureLoadingFeedbacks:(NSError*) error {
    [DejalBezelActivityView removeViewAnimated:NO];
    self.dataLoadingErrorView = [DataLoadingErrorView showDataLoadingErrorView:self withRefreshSelector:@selector(reloadData:)];
}

-(void) reloadData:(NSObject *) sender {
    [DataLoadingErrorView hideDataLoadingErrorView:self.dataLoadingErrorView];
    [DejalBezelActivityView activityViewForView:self.view withLabel:@"Подождите\nИдет загрузка..."];
    [FeedbackDataManager loadFeedbacks:self successSelector:@selector(successfullyLoadedFeedbacks:) failureSelector:@selector(failureLoadingFeedbacks:) withPage:self.currentPage withPageSize:feedbackPageSize];
}


-(void) loadMoreFeedbacks {
    [DataLoadingErrorView hideDataLoadingErrorView:self.dataLoadingErrorView];
    [DejalBezelActivityView activityViewForView:self.view withLabel:@"Подождите\nИдет загрузка..."];
    [FeedbackDataManager loadFeedbacks:self successSelector:@selector(successfullyLoadedFeedbacks:) failureSelector:@selector(failureLoadingFeedbacks:) withPage:self.currentPage withPageSize:feedbackPageSize];
}


#pragma mark - Table view data source

- (NSInteger)numberOfSectionsInTableView:(UITableView *)tableView {
    return 1;
}

- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section {
    if (self.feedbacks.count == 0) {
        UILabel *messageLabel = [[UILabel alloc] initWithFrame:CGRectMake(0, 0, self.view.bounds.size.width, self.view.bounds.size.height)];
        messageLabel.text = @"Пока нет ни одного отзыва...\nПотяните вниз вдруг, что появится ;)...";
        messageLabel.textColor = [Constants getSystemOrangeColor];
        messageLabel.numberOfLines = 0;
        messageLabel.textAlignment = NSTextAlignmentCenter;
        messageLabel.font = [UIFont fontWithName:@"Gill Sans" size:15];
        [messageLabel sizeToFit];
        self.tableView.backgroundView = messageLabel;
        return self.feedbacks.count;
    } else {
        if (self.isExistsMoreRecords)
            return self.feedbacks.count + 1;
        return self.feedbacks.count;
    }
}


- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath {
    if (indexPath.row < self.feedbacks.count) {
        FeedbackTableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:@"FeedbackCell"];
        if (cell == nil) {
            [tableView registerNib:[UINib nibWithNibName:@"FeedbackTableViewCell" bundle:nil]forCellReuseIdentifier:@"FeedbackCell"];
            cell = [tableView dequeueReusableCellWithIdentifier:@"FeedbackCell"];
        }
        FeedbackModel* fb = self.feedbacks[indexPath.row];
        [cell initCell:fb];
        return cell;
    } else {
        FeedbackLoadMoreTableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:@"FeedbackLoadMoreCell"];
        if (cell == nil) {
            [tableView registerNib:[UINib nibWithNibName:@"FeedbackLoadMoreTableViewCell" bundle:nil]forCellReuseIdentifier:@"FeedbackLoadMoreCell"];
            cell = [tableView dequeueReusableCellWithIdentifier:@"FeedbackLoadMoreCell"];
        }
        [cell initCell:self];
        return cell;
    }
}

- (CGFloat)tableView:(UITableView *)tableView heightForRowAtIndexPath:(NSIndexPath *)indexPath {
    if (indexPath.row == self.feedbacks.count)
        return 75;
    return 75;
}

- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
    if ([segue.destinationViewController isKindOfClass:[SendFeedbackTableViewController class]]) {
        NSLog(@"Feedback List -> New feedback");
    }
}

- (IBAction)showNewFeedbackForm:(UIBarButtonItem *)sender {
    [self performSegueWithIdentifier:@"FeedbackToNewFeedbackForm" sender:nil];
}


- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
}

@end
