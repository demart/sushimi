//
//  CenteredButtonTableViewCell.h
//  SushimiApp
//
//  Created by Artem Demidovich on 3/5/15.
//  Copyright (c) 2015 AphionSoftware. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "SettingsManager.h"
#import "Settings.h"

@interface CenteredButtonTableViewCell : UITableViewCell
- (IBAction)buttonClicked:(UIButton *)sender;
@property (weak, nonatomic) IBOutlet UIView *buttonView;
@property (weak, nonatomic) IBOutlet UIButton *button;


-(void)initCell:(Settings*)settings forManager:(SettingsManager*)manager navigation:(UINavigationController*)navControler;

@end
