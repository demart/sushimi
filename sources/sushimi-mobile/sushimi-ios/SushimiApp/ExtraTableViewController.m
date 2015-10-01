//
//  ExtraTableViewController.m
//  SushimiApp
//
//  Created by Artem Demidovich on 2/16/15.
//  Copyright (c) 2015 AphionSoftware. All rights reserved.
//

#import "ExtraTableViewController.h"
#import "ExtraTableViewCell.h"
#import "ExtraDevelopedByTableViewCell.h"

@interface ExtraTableViewController ()

@property NSArray *menu;

@property UIImage *sushi;
@property UIImage *news;
@property UIImage *delivery;
@property UIImage *settings;
@property UIImage *feedback;

@end

@implementation ExtraTableViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    
    self.tableView.tableFooterView = [[UIView alloc] initWithFrame:CGRectZero];
    
    _sushi = [UIImage imageNamed:@"sushi.png"];
    _news = [UIImage imageNamed:@"news.png"];
    _delivery = [UIImage imageNamed:@"delivery.png"];
    _settings = [UIImage imageNamed:@"settings.png"];
    _feedback = [UIImage imageNamed:@"feedback.png"];
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
}

#pragma mark - Table view data source

- (NSInteger)numberOfSectionsInTableView:(UITableView *)tableView {
    return 1;
}

- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section {
    return 6;
}

-(void)tableView:(UITableView *)tableView willDisplayCell:(UITableViewCell *)cell forRowAtIndexPath:(NSIndexPath *)indexPath {
    cell.accessoryType = UITableViewCellAccessoryDisclosureIndicator;
}

- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath {
    if (indexPath.row == 5) {
        ExtraDevelopedByTableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:@"ExtraDevelopedBy"];
        if (cell == nil) {
            [tableView registerNib:[UINib nibWithNibName:@"ExtraDevelopedByTableViewCell" bundle:nil]forCellReuseIdentifier:@"ExtraDevelopedBy"];
            cell =[tableView dequeueReusableCellWithIdentifier:@"ExtraDevelopedBy"];
        }
        
        return cell;
    } else {
        ExtraTableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:@"ExtraItemCell"];
        if (cell == nil) {
            [tableView registerNib:[UINib nibWithNibName:@"ExtraTableViewCell" bundle:nil]forCellReuseIdentifier:@"ExtraItemCell"];
            cell =[tableView dequeueReusableCellWithIdentifier:@"ExtraItemCell"];
        }
    
        switch (indexPath.row) {
            case 0:
                cell.text.text = @"О компании";
                cell.imageView.image = _sushi;
                break;
            case 1:
                cell.text.text = @"Новости";
                cell.imageView.image = _news;
                break;
            case 2:
                cell.text.text = @"Доставка";
                cell.imageView.image = _delivery;
                break;
            case 3:
                cell.text.text = @"Отзывы";
                cell.imageView.image = _feedback;
                break;
            case 4:
                cell.text.text = @"Настройки";
                cell.imageView.image = _settings;
                break;
            /*
            case 4:
                cell.text.text = @"Разработано в Aphion Software";
                // ExtraDevelopedBy
                cell.imageView.image = nil;
                break;
             */
            default:
                break;
        }
        return cell;
    }
    
}


- (NSIndexPath *)tableView:(UITableView *)tableView willSelectRowAtIndexPath:(NSIndexPath *)indexPath {
    [tableView deselectRowAtIndexPath:indexPath animated:YES];
    
    switch (indexPath.row) {
        case 0:
            [self performSegueWithIdentifier:@"ExtraToAboutCompany" sender:self];
            break;
        case 1:
            [self performSegueWithIdentifier:@"ExtraToAnnouncements" sender:self];
            break;
        case 2:
            [self performSegueWithIdentifier:@"ExtraToDelivery" sender:self];
            break;
        case 3:
            [self performSegueWithIdentifier:@"ExtraToFeedbacks" sender:self];
            break;
        case 4:
            [self performSegueWithIdentifier:@"ExtraToSettings" sender:self];
            break;
        case 5: {
            NSURL *url = [NSURL URLWithString:@"http://www.aphion.kz?source=sushimi.kz&platform=iOS"];
            [[UIApplication sharedApplication] openURL:url];
            break;
        }
        default:
            break;
    }
    
    return indexPath;
}


@end
