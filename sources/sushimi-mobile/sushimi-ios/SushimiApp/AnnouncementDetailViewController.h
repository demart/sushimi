//
//  AnnouncementDetailViewController.h
//  SushimiApp
//
//  Created by Artem Demidovich on 2/21/15.
//  Copyright (c) 2015 AphionSoftware. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "Announcement.h"

@interface AnnouncementDetailViewController : UIViewController

@property Announcement *announcement;
-(void)setNews:(Announcement *)news;


@property (weak, nonatomic) IBOutlet UILabel *announcementPublishDate;
@property (weak, nonatomic) IBOutlet UILabel *announcementTitle;

@property (weak, nonatomic) IBOutlet UIImageView *announcementImage;
@property (weak, nonatomic) IBOutlet UILabel *announcementContent;
@property (weak, nonatomic) IBOutlet UILabel *promoExpired;

@property NSOperationQueue *loadImageOperationQueue;
@property NSMutableDictionary *loadImageOperations;
@property NSMutableDictionary *loadedPhotos;

@end
