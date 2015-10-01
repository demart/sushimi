//
//  AnnouncementDetailViewController.m
//  SushimiApp
//
//  Created by Artem Demidovich on 2/21/15.
//  Copyright (c) 2015 AphionSoftware. All rights reserved.
//

#import "AnnouncementDetailViewController.h"

@interface AnnouncementDetailViewController ()
@property UIImage *loadingImage;
@end
@implementation AnnouncementDetailViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    _loadingImage = [UIImage imageNamed:@"loadingImage.png"];
    _loadImageOperationQueue = [[NSOperationQueue alloc] init];
    [_loadImageOperationQueue setMaxConcurrentOperationCount:5];
    
    if (self.loadedPhotos == nil)
        self.loadedPhotos = [[NSMutableDictionary alloc] init];
    
    NSDate* date = [NSDate dateWithTimeIntervalSince1970:(self.announcement.publishDate / 1000.0)];
    NSDateFormatter *_formatter=[[NSDateFormatter alloc]init];
    [_formatter setDateFormat:@"dd.MM.yyyy"];
    self.announcementPublishDate.text = [_formatter stringFromDate:date];
    
    self.announcementTitle.text = self.announcement.title;
    NSString *htmlString = self.announcement.content;
    NSAttributedString *attributedString = [[NSAttributedString alloc] initWithData:[htmlString dataUsingEncoding:NSUnicodeStringEncoding] options:@{ NSDocumentTypeDocumentAttribute: NSHTMLTextDocumentType } documentAttributes:nil error:nil];
    
    self.announcementContent.attributedText = attributedString;
    
    if (self.announcement.type == 1) {
        if (self.announcement.isActual == NO) {
            self.promoExpired.text = @"Акция закончилась";
        } else {
            self.promoExpired.text = @"";
        }
    } else {
        self.promoExpired.text = @"";
    }
    
    if (self.announcement.imageLink == nil || [self.announcement.imageLink isEqualToString:@""]) {
        [self.announcementImage setHidden:YES];
        return;
    }
    
    self.announcementImage.image = _loadingImage;
    
    NSBlockOperation *loadImageOperation = [[NSBlockOperation alloc] init];
    __weak NSBlockOperation *weakOperation = loadImageOperation;
    
    [loadImageOperation addExecutionBlock:^(void){
        UIImage *image = [UIImage imageWithData:[NSData dataWithContentsOfURL:[NSURL URLWithString:[NSString stringWithFormat:@"http://sushimi.kz/public/images/announcements/%@", self.announcement.imageLink]]] ];
        
        [[NSOperationQueue mainQueue] addOperationWithBlock:^(void) {
            if (! weakOperation.isCancelled) {
                self.announcementImage.image = image;
                NSLog(@"Photo loaded %@", @"stub");
                [self.loadedPhotos setObject:image forKey: self.announcement.imageLink];
                [self.loadImageOperations removeObjectForKey:self.announcement.imageLink];
            }
        }];
    }];
    
    [_loadImageOperations setObject: loadImageOperation forKey:self.announcement.imageLink];
    if (loadImageOperation) {
        [_loadImageOperationQueue addOperation:loadImageOperation];
    }
}

-(void) setNews:(Announcement *)news {
    self.announcement = news;
}

-(void) viewWillDisappear:(BOOL)animated {
    [super viewWillDisappear:animated];
    
    [_loadImageOperationQueue cancelAllOperations];
    [_loadImageOperations removeAllObjects];
}


- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
}

@end
