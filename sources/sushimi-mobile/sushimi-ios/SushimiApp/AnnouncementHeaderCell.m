//
//  AnnouncementHeaderCell.m
//  SushimiApp
//
//  Created by Artem Demidovich on 7/8/15.
//  Copyright (c) 2015 AphionSoftware. All rights reserved.
//

#import "AnnouncementHeaderCell.h"

@implementation AnnouncementHeaderCell

- (void)awakeFromNib {
}

- (void)setSelected:(BOOL)selected animated:(BOOL)animated {
    [super setSelected:selected animated:animated];
}

-(void) initHeader:(NSString*) title {
    self.headerTitle.text = title;
}

@end
