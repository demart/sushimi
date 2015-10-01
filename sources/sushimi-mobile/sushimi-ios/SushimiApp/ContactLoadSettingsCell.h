//
//  ContactLoadSettingsCell.h
//  SushimiApp
//
//  Created by Artem Demidovich on 5/7/15.
//  Copyright (c) 2015 AphionSoftware. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface ContactLoadSettingsCell : UITableViewCell

@property (weak, nonatomic) IBOutlet UIButton *loadSettings;

- (IBAction)loadSettings:(UIButton *)sender;
@end
