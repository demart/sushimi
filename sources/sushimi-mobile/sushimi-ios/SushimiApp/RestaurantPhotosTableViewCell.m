//
//  RestaurantPhotosTableViewCell.m
//  SushimiApp
//
//  Created by Artem Demidovich on 2/28/15.
//  Copyright (c) 2015 AphionSoftware. All rights reserved.
//

#import "RestaurantPhotosTableViewCell.h"
#import "LocalImageCache.h"
#import "RestaurantPhoto.h"

@implementation RestaurantPhotosTableViewCell

- (void)awakeFromNib {
    _loadImageOperationQueue = [[NSOperationQueue alloc] init];
    [_loadImageOperationQueue setMaxConcurrentOperationCount:3];
    self.imageScrollView.delegate = self;
}

-(void) tappedRestaurantImage:(UITapGestureRecognizer *)recognizer {
    NSInteger position = recognizer.view.tag;
    [self.parentController performSelector:@selector(setImagesWithPositionToOpenWithImageViewer:withPosition:) withObject:(id)self.photoUrlModels withObject:(id)[@(position) stringValue]];
}

- (void)setSelected:(BOOL)selected animated:(BOOL)animated {
    [super setSelected:selected animated:animated];
}

-(void) initCell:(Restaurant*) model fromController:(UIViewController*)controller withFrame:(CGRect) tableViewFrame {
    self.restaurantModel = model;
    self.parentController = controller;
    
    if (self.restaurantModel.photos != nil) {
        [self.imagePageController setNumberOfPages:self.restaurantModel.photos.count + 1];
    } else {
        [self.imagePageController setNumberOfPages:1];
    }
    
    if (self.photoUrlModels == nil)
        self.photoUrlModels = [[NSMutableArray alloc] init];
    [self.photoUrlModels addObject:self.restaurantModel.imageUrl];
    [self loadPhoto:self.restaurantModel.imageUrl position:0 withFrame:tableViewFrame];
    for (int i=0; i < self.restaurantModel.photos.count; i++) {
        [self.photoUrlModels addObject:((RestaurantPhoto*)self.restaurantModel.photos[i]).imageUrl];
        [self loadPhoto:((RestaurantPhoto*)self.restaurantModel.photos[i]).imageUrl position:i+1 withFrame:tableViewFrame];
    }
    
    self.imageScrollView.contentSize = CGSizeMake(tableViewFrame.size.width * (self.restaurantModel.photos.count + 1), self.imageScrollView.frame.size.height);
}


-(void) loadPhoto:(NSString*) imageUrl position:(NSInteger) offset withFrame:(CGRect) frame  {
    UIImage *loadedImage =(UIImage *)[LocalImageCache  loadImageFromLocalCache:imageUrl];
    if (loadedImage != nil) {
        [self buildImageFrame:loadedImage position:offset withFrame:frame];
    } else {
        NSBlockOperation *loadImageOperation = [[NSBlockOperation alloc] init];
        __weak NSBlockOperation *weakOperation = loadImageOperation;
        [loadImageOperation addExecutionBlock:^(void){
            // Loading bar
            UIActivityIndicatorView *activityView = [[UIActivityIndicatorView alloc] initWithActivityIndicatorStyle:UIActivityIndicatorViewStyleGray];
            activityView.center = CGPointMake((frame.size.width * offset) + frame.size.width/2, self.contentView.bounds.size.height/2);
            [activityView startAnimating];
            [self addSubview:activityView];
            [self bringSubviewToFront:activityView];
            
            UIImage *image = [UIImage imageWithData:[NSData dataWithContentsOfURL:[NSURL URLWithString:[NSString stringWithFormat:@"http://sushimi.kz/public/%@", imageUrl]]] ];
            [[NSOperationQueue mainQueue] addOperationWithBlock:^(void) {
                if (! weakOperation.isCancelled) {
                    [activityView removeFromSuperview];
                    
                    [self buildImageFrame:image position:offset withFrame:frame];
                    [LocalImageCache  saveImageToLocalCache:imageUrl withData:image];
                    [self.loadImageOperations removeObjectForKey:imageUrl];
                }
            }];
        }];
        
        [_loadImageOperations setObject: loadImageOperation forKey:imageUrl];
        if (loadImageOperation) {
            [_loadImageOperationQueue addOperation:loadImageOperation];
        }
    }
}

static NSInteger ImageWidth = 320;
static NSInteger ImageHeigth = 230;

-(void) buildImageFrame:(UIImage*) image position:(NSInteger) offset withFrame:(CGRect) frame {
    CGRect imageFrame;
    imageFrame.origin.x = frame.size.width * offset;
    imageFrame.origin.y = 0;
    imageFrame.size.width = frame.size.width;
    imageFrame.size.height = frame.size.width / ImageWidth * ImageHeigth;
    
    UIImageView *imageView = [[UIImageView alloc] initWithFrame:imageFrame];
    imageView.image = image;
    imageView.tag = offset;
    
    UITapGestureRecognizer *restaurantImageTap = [[UITapGestureRecognizer alloc] initWithTarget:self action:@selector(tappedRestaurantImage:)];
    [restaurantImageTap setNumberOfTouchesRequired:1];
    [imageView setUserInteractionEnabled:YES];
    [imageView addGestureRecognizer:restaurantImageTap];
    
    [self.imageScrollView addSubview:imageView];
}

- (void)scrollViewDidScroll:(UIScrollView *)sender {
    CGFloat pageWidth = self.imageScrollView.frame.size.width;
    int page = floor((self.imageScrollView.contentOffset.x - pageWidth / 2) / pageWidth) + 1;
    self.imagePageController.currentPage = page;
}

@end
