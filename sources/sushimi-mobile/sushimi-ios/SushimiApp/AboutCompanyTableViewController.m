//
//  AboutCompanyTableViewController.m
//  SushimiApp
//
//  Created by Artem Demidovich on 2/21/15.
//  Copyright (c) 2015 AphionSoftware. All rights reserved.
//

#import "AboutCompanyTableViewController.h"
#import "AboutCompanyTableViewCell.h"
#import "AboutCompanySocialTableViewCell.h"

#import "RKObjectMapping.h"
#import "RKResponseDescriptor.h"
#import "RKObjectRequestOperation.h"
#import "RKRelationshipMapping.h"

#import "ResponseWrapper.h"
#import "AboutCompany.h"
#import "DataManager.h"

#import "DejalActivityView.h"
#import "DataLoadingErrorView.h"

@interface AboutCompanyTableViewController ()
@property AboutCompany *_aboutCompany;
@property DataLoadingErrorView *dataLoadingErrorView;
@end

@implementation AboutCompanyTableViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    self.tableView.tableFooterView = [[UIView alloc] initWithFrame:CGRectZero];
    [DataManager loadAboutCompany:self];
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
    
    self._aboutCompany = (AboutCompany *)self.item;
    [self.tableView reloadData];
}


-(void) reloadData:(NSObject *) sender {
    [DataManager loadAboutCompany:self];
}


#pragma mark - Table view data source

- (NSInteger)numberOfSectionsInTableView:(UITableView *)tableView {
    return 1;
}

- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section {
    if (self._aboutCompany == nil)
        return 0;
    return 2;
}


- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath {
    if (indexPath.row == 0) {
        AboutCompanyTableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:@"AboutCompanyInfo"];
        if (!cell) {
            [tableView registerNib:[UINib nibWithNibName:@"AboutCompanyTableViewCell" bundle:nil]forCellReuseIdentifier:@"AboutCompanyInfo"];
            cell = [tableView dequeueReusableCellWithIdentifier:@"AboutCompanyInfo"];
        }
        return cell;
    }
    
    if (indexPath.row == 1) {
        AboutCompanySocialTableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:@"AboutCompanySocial"];
        if (!cell) {
            [tableView registerNib:[UINib nibWithNibName:@"AboutCompanySocialTableViewCell" bundle:nil]forCellReuseIdentifier:@"AboutCompanySocial"];
            cell = [tableView dequeueReusableCellWithIdentifier:@"AboutCompanySocial"];
            [cell initCell: self._aboutCompany];
        }
        return cell;
    }
    return nil;
}

- (CGFloat)tableView:(UITableView *)tableView heightForRowAtIndexPath:(NSIndexPath *)indexPath {
    if (indexPath.row == 0) return 330;
    if (indexPath.row == 1) return 75;
    return 36;
}

-(void)tableView:(UITableView *)tableView willDisplayCell:(UITableViewCell *)cell forRowAtIndexPath:(NSIndexPath *)indexPath {
        cell.selectionStyle = UITableViewCellSelectionStyleNone;
        if ([cell isKindOfClass:[AboutCompanyTableViewCell class]]) {
            AboutCompanyTableViewCell *dCell = (AboutCompanyTableViewCell *)cell;
            NSString *htmlString = self._aboutCompany.content;
            NSAttributedString *attributedString = [[NSAttributedString alloc] initWithData:[htmlString dataUsingEncoding:NSUnicodeStringEncoding] options:@{ NSDocumentTypeDocumentAttribute: NSHTMLTextDocumentType } documentAttributes:nil error:nil];
            dCell.companyContent.attributedText = attributedString;
            return;
        }
        
        if ([cell isKindOfClass:[AboutCompanySocialTableViewCell class]]) {
            AboutCompanySocialTableViewCell *dCell = (AboutCompanySocialTableViewCell *)cell;
            [dCell initCell: self._aboutCompany];
            return;
        }
}


- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
}

@end
