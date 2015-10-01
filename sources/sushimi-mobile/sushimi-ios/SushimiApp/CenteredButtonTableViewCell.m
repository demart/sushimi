//
//  CenteredButtonTableViewCell.m
//  SushimiApp
//
//  Created by Artem Demidovich on 3/5/15.
//  Copyright (c) 2015 AphionSoftware. All rights reserved.
//

#import "CenteredButtonTableViewCell.h"

@implementation CenteredButtonTableViewCell

Settings *localSettings;
SettingsManager *settingsManager;
UINavigationController *navigationController;

- (void)awakeFromNib {
    self.button.layer.cornerRadius = 2.0f;
    self.buttonView.layer.cornerRadius = 2.0f;
}

- (void)setSelected:(BOOL)selected animated:(BOOL)animated {
    [super setSelected:selected animated:animated];
}

-(void)initCell:(Settings*)settings forManager:(SettingsManager*)manager  navigation:(UINavigationController*)navControler {
    localSettings = settings;
    settingsManager = manager;
    navigationController = navControler;
}

- (IBAction)buttonClicked:(UIButton *)sender {
    [settingsManager synchronizeSettings:localSettings];
    [navigationController popToRootViewControllerAnimated:YES];
}
@end
