//
//  AnnouncementHeaderCell.h
//  SushimiApp
//
//  Created by Artem Demidovich on 7/8/15.
//  Copyright (c) 2015 AphionSoftware. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface AnnouncementHeaderCell : UITableViewCell
@property (weak, nonatomic) IBOutlet UILabel *headerTitle;

-(void) initHeader:(NSString*) title;

@end
