//
//  NewsTableViewCell.h
//  SushimiApp
//
//  Created by Artem Demidovich on 3/7/15.
//  Copyright (c) 2015 AphionSoftware. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "Announcement.h"

@interface NewsTableViewCell : UITableViewCell
@property (weak, nonatomic) IBOutlet UILabel *createdDate;
@property (weak, nonatomic) IBOutlet UILabel *title;

-(void)initCell:(Announcement*) news;

@end
