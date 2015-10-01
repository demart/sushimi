//
//  SettingsTableViewController.m
//  SushimiApp
//
//  Created by Artem Demidovich on 3/5/15.
//  Copyright (c) 2015 AphionSoftware. All rights reserved.
//

#import "SettingsTableViewController.h"

#import "SettingsNoteCell.h"
#import "SettingsTextFieldCell.h"
#import "CenteredButtonTableViewCell.h"
#import "SettingHeaderTableViewCell.h"

#import "SettingsManager.h"
#import "Settings.h"

@interface SettingsTableViewController ()

@property UIGestureRecognizer *tapper;

@end

@implementation SettingsTableViewController

// temporary settings cloned from original one
Settings *settings;

- (void)viewDidLoad {
    [super viewDidLoad];

    settings = [[SettingsManager sharedInstance] cloneSettingsForEditing];

    self.tableView.tableFooterView = [[UIView alloc] initWithFrame:CGRectZero];
    self.tableView.backgroundColor = [UIColor whiteColor];
    
    self.tapper = [[UITapGestureRecognizer alloc]
                   initWithTarget:self action:@selector(hideKeyboardTap:)];
    self.tapper.cancelsTouchesInView = NO;
    [self.view addGestureRecognizer:self.tapper];
}

- (void)hideKeyboardTap:(UITapGestureRecognizer *) sender {
    [self.view endEditing:YES];
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
}

#pragma mark - Table view data source

- (NSInteger)numberOfSectionsInTableView:(UITableView *)tableView {
    return 3;
}

- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section {
    if (section == 0)
        return 1;
    if (section == 1)
        return 2;
    return 6;
}

-(UIView *)tableView:(UITableView *)tableView viewForHeaderInSection:(NSInteger)section {
    SettingHeaderTableViewCell*  headerCell = (SettingHeaderTableViewCell*)[self.tableView dequeueReusableCellWithIdentifier:@"HeaderCell"];
    if (headerCell == nil) {
        [tableView registerNib:[UINib nibWithNibName:@"SettingHeaderTableViewCell" bundle:nil]forCellReuseIdentifier:@"HeaderCell"];
        headerCell = [tableView dequeueReusableCellWithIdentifier:@"HeaderCell"];
    }
    
    if (section == 0) {
        headerCell.headerTitle.text = nil;
    } else
        if (section == 1) {
            headerCell.headerTitle.text = @"ВАШИ КОНТАКТНЫЕ ДАННЫЕ";
        } else {
            headerCell.headerTitle.text = @"АДРЕС ДОСТАВКИ";
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
    SettingHeaderTableViewCell*  headerCell = (SettingHeaderTableViewCell*)[self.tableView dequeueReusableCellWithIdentifier:@"HeaderCell"];
    if (headerCell == nil) {
        [tableView registerNib:[UINib nibWithNibName:@"SettingHeaderTableViewCell" bundle:nil]forCellReuseIdentifier:@"HeaderCell"];
        headerCell = [tableView dequeueReusableCellWithIdentifier:@"HeaderCell"];
    }
    headerCell.headerTitle.text = nil;
    return headerCell;
}

- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath {
    if (indexPath.section == 0) {
        SettingsNoteCell *cell = [tableView dequeueReusableCellWithIdentifier:@"SettingsNoteCell"];
        if (!cell) {
            [tableView registerNib:[UINib nibWithNibName:@"SettingsNoteCell" bundle:nil]forCellReuseIdentifier:@"SettingsNoteCell"];
            cell = [tableView dequeueReusableCellWithIdentifier:@"SettingsNoteCell"];
        }
        return cell;
    }
    
    SettingsTextFieldCell *cell = [tableView dequeueReusableCellWithIdentifier:@"SettingsTextFieldCell"];
    
    if (cell == nil) {
        [tableView registerNib:[UINib nibWithNibName:@"SettingsTextFieldCell" bundle:nil]forCellReuseIdentifier:@"SettingsTextFieldCell"];
        cell = [tableView dequeueReusableCellWithIdentifier:@"SettingsTextFieldCell"];
    }
    
    
    if (indexPath.section == 1) {
        if (indexPath.row == 0) {
            [cell initCell:settings withField:@"fullname" withLabelText:@"ФИО*" withKeyboardType:UIKeyboardTypeDefault];
        }
        
        if (indexPath.row == 1) {
            [cell initCell:settings withField:@"phone" withLabelText:@"Телефон*" withKeyboardType:UIKeyboardTypeNumberPad];
        }
        return cell;
    }
    
    if (indexPath.section == 2) {
        if (indexPath.row == 0)
            [cell initCell:settings withField:@"addressStreetName" withLabelText:@"Улица*" withKeyboardType:UIKeyboardTypeDefault];
        if (indexPath.row == 1)
            [cell initCell:settings withField:@"addressHouse" withLabelText:@"Дом*" withKeyboardType:UIKeyboardTypeDefault];
        if (indexPath.row == 2)
            [cell initCell:settings withField:@"addressFlat" withLabelText:@"Квартира" withKeyboardType:UIKeyboardTypeDefault];
        if (indexPath.row == 3)
            [cell initCell:settings withField:@"addressPorch" withLabelText:@"Подъезд" withKeyboardType:UIKeyboardTypeDefault];
        if (indexPath.row == 4)
            [cell initCell:settings withField:@"addressFloor" withLabelText:@"Этаж" withKeyboardType:UIKeyboardTypeDefault];
        if (indexPath.row == 5) {
            CenteredButtonTableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:@"CenteredButtonCell"];
            if (!cell) {
                [tableView registerNib:[UINib nibWithNibName:@"CenteredButtonTableViewCell" bundle:nil]forCellReuseIdentifier:@"CenteredButtonCell"];
                cell = [tableView dequeueReusableCellWithIdentifier:@"CenteredButtonCell"];
            }
            [cell initCell:settings forManager:[SettingsManager sharedInstance] navigation:[self navigationController]];
            return cell;
        }
        return cell;
    }
    return nil;
}


- (CGFloat)tableView:(UITableView *)tableView heightForRowAtIndexPath:(NSIndexPath *)indexPath {
    if (indexPath.section == 2 && indexPath.row == 5) {
        return 70;
    }
    return 44;
}


- (void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath {
    [self.tableView deselectRowAtIndexPath:indexPath animated:YES];
}

- (void)tableView:(UITableView *)tableView willDisplayCell:(UITableViewCell *)cell forRowAtIndexPath:(NSIndexPath *)indexPath {
    
    if ([cell respondsToSelector:@selector(setSeparatorInset:)])
        [cell setSeparatorInset:UIEdgeInsetsZero];
    if ([cell respondsToSelector:@selector(setPreservesSuperviewLayoutMargins:)])
        [cell setPreservesSuperviewLayoutMargins:NO];
    if ([cell respondsToSelector:@selector(setLayoutMargins:)])
        [cell setLayoutMargins:UIEdgeInsetsZero];
    
}

#pragma mark - Navigation

- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {}


@end
