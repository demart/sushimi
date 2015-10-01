//
//  NewsTableViewCell.m
//  SushimiApp
//
//  Created by Artem Demidovich on 3/7/15.
//  Copyright (c) 2015 AphionSoftware. All rights reserved.
//

#import "NewsTableViewCell.h"
#import "Announcement.h"

@implementation NewsTableViewCell

static NSInteger NEWS = 0;
static NSInteger PROMO = 1;

- (void)awakeFromNib {}

- (void)setSelected:(BOOL)selected animated:(BOOL)animated {
    [super setSelected:selected animated:animated];
}

-(void)initCell:(Announcement*) news {
    self.title.text = news.title;
    NSDate* date = [NSDate dateWithTimeIntervalSince1970:(news.publishDate/ 1000.0)];
    NSDateFormatter *_formatter=[[NSDateFormatter alloc]init];
    [_formatter setDateFormat:@"dd.MM.yyyy"];
    self.createdDate.text = [_formatter stringFromDate:date];
    
    if (news.type == PROMO) {
        /*
        // Раскрашиваем разным цветом если акция уже не действительна
        NSDate* endDate = [NSDate dateWithTimeIntervalSince1970:(news.endDate / 1000.0)];
//        NSLog(@"End Date: %@", endDate);
//        NSLog(@"Cur Date: %@", [NSDate date]);
         */
        if (news.isActual == NO) {
            self.title.textColor = [UIColor lightGrayColor]; // @"Акция закончилась";
        } else {
            self.title.textColor = [UIColor darkGrayColor];
        }
    } else {
        self.title.textColor = [UIColor darkGrayColor];
    }

}


@end
