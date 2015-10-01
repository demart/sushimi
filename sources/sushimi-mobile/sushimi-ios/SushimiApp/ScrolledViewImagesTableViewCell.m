//
//  ScrolledViewImagesTableViewCell.m
//  SushimiApp
//
//  Created by Artem Demidovich on 2/28/15.
//  Copyright (c) 2015 AphionSoftware. All rights reserved.
//

#import "ScrolledViewImagesTableViewCell.h"
#import "LocalImageCache.h"
#import "RestaurantPhoto.h"

@implementation ScrolledViewImagesTableViewCell

- (void)awakeFromNib {
    _loadImageOperationQueue = [[NSOperationQueue alloc] init];
    [_loadImageOperationQueue setMaxConcurrentOperationCount:3];
    self.imageScrollView.delegate = self;

}

- (void)setSelected:(BOOL)selected animated:(BOOL)animated {
    [super setSelected:selected animated:animated];
}

-(void) tappedRestaurantImage:(UITapGestureRecognizer *)recognizer {
    NSInteger position = recognizer.view.tag;
    [self.parentController performSelector:@selector(setImagesWithPositionToOpenWithImageViewer:withPosition:) withObject:(id)self.photoUrlModels withObject:(id)[@(position) stringValue]];
}


-(void) initCell:(Restaurant*) model fromController:(UIViewController*)controller {
    self.restaurantModel = model;
    self.parentController = controller;
    
    if (self.photoUrlModels == nil)
        self.photoUrlModels = [[NSMutableArray alloc] init];
    [self.photoUrlModels addObject:self.restaurantModel.imageUrl];
    [self loadPhoto:self.restaurantModel.imageUrl position:0];
    
    for (int i=0; i < self.restaurantModel.photos.count; i++) {
        [self.photoUrlModels addObject:((RestaurantPhoto*)self.restaurantModel.photos[i]).imageUrl];
        [self loadPhoto:((RestaurantPhoto*)self.restaurantModel.photos[i]).imageUrl position:i+1];
    }
    self.imageScrollView.contentSize = CGSizeMake(115 * (self.restaurantModel.photos.count + 1), self.imageScrollView.frame.size.height);
}


-(void) loadPhoto:(NSString*) imageUrl position:(NSInteger) offset  {
    UIImage *loadedImage =(UIImage *)[LocalImageCache  loadImageFromLocalCache:imageUrl];
    if (loadedImage != nil) {
        [self buildImageFrame:loadedImage position:offset];
    } else {
        NSBlockOperation *loadImageOperation = [[NSBlockOperation alloc] init];
        __weak NSBlockOperation *weakOperation = loadImageOperation;
        [loadImageOperation addExecutionBlock:^(void){
            // Loading bar
            UIActivityIndicatorView *activityView = [[UIActivityIndicatorView alloc] initWithActivityIndicatorStyle:UIActivityIndicatorViewStyleGray];
            activityView.center = CGPointMake((115 * offset) + 115/2, self.imageScrollView.frame.size.height/2);
            [activityView startAnimating];
            [self addSubview:activityView];
            [self bringSubviewToFront:activityView];
            
            UIImage *image = [UIImage imageWithData:[NSData dataWithContentsOfURL:[NSURL URLWithString:[NSString stringWithFormat:@"http://sushimi.kz/public/%@", imageUrl]]] ];
            [[NSOperationQueue mainQueue] addOperationWithBlock:^(void) {
                if (! weakOperation.isCancelled) {
                    [activityView removeFromSuperview];
                    [self buildImageFrame:image position:offset];
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

-(void) buildImageFrame:(UIImage*) image position:(NSInteger) offset {
    CGRect frame;
    frame.origin.x = 115 *  offset;
    frame.origin.y = 0;
    frame.size.height = self.imageScrollView.frame.size.height;
    frame.size.width = 110;
    
    UIImageView *imageView = [[UIImageView alloc] initWithFrame:frame];
    imageView.image = image;
    imageView.tag = offset;
    
    UITapGestureRecognizer *restaurantImageTap = [[UITapGestureRecognizer alloc] initWithTarget:self action:@selector(tappedRestaurantImage:)];
    [restaurantImageTap setNumberOfTouchesRequired:1];
    [imageView setUserInteractionEnabled:YES];
    [imageView addGestureRecognizer:restaurantImageTap];
    [self.imageScrollView addSubview:imageView];
}


@end
