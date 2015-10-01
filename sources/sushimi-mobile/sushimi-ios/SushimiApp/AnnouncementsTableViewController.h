//
//  AnnouncementsTableViewController.h
//  SushimiApp
//
//  Created by Artem Demidovich on 2/17/15.
//  Copyright (c) 2015 AphionSoftware. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "ArrayBasedTableViewController.h"

@interface AnnouncementsTableViewController :ArrayBasedTableViewController

- (IBAction)announcementTypeChanged:(id)sender;

@property (weak, nonatomic) IBOutlet UISegmentedControl *announcementType;

@end
