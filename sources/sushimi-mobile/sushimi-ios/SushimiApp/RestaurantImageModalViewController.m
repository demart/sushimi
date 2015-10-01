//
//  RestaurantImageModalViewController.m
//  SushimiApp
//
//  Created by Artem Demidovich on 7/7/15.
//  Copyright (c) 2015 AphionSoftware. All rights reserved.
//

#import "RestaurantImageModalViewController.h"
#import "LocalImageCache.h"

@interface RestaurantImageModalViewController ()

@property NSInteger currentPage;

@end

@implementation RestaurantImageModalViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    _loadImageOperationQueue = [[NSOperationQueue alloc] init];
    [_loadImageOperationQueue setMaxConcurrentOperationCount:3];
    self.imageScrollView.delegate = self;
    
    UISwipeGestureRecognizer *swipe = [[UISwipeGestureRecognizer alloc] initWithTarget:self action:@selector(didSwipeScreen:)];
    swipe.direction = UISwipeGestureRecognizerDirectionDown;
    [self.imageScrollView addGestureRecognizer:swipe];
    
}

- (void)didSwipeScreen:(UISwipeGestureRecognizer *)gesture {
    switch (gesture.direction) {
        case UISwipeGestureRecognizerDirectionDown:
            [self dismissViewControllerAnimated:YES completion:nil];
            break;
        default:
            break;
    }
}


-(void)viewDidAppear:(BOOL)animated {
    [super viewDidAppear:animated];
    
    for (int i=0; i < self.photoUrlModels.count; i++)
        [self loadPhoto:self.photoUrlModels[i] position:i];
    
    self.imageScrollView.contentSize = CGSizeMake((self.imageScrollView.frame.size.width + 5) * (self.photoUrlModels.count), self.imageScrollView.frame.size.height);
    
    [self setCurrentPosition:self.photoPosition];
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
}

- (IBAction)doneButton:(UIButton *)sender {
    [self dismissViewControllerAnimated:YES completion:nil];
}

static NSInteger photoWidth = 320;
static NSInteger photoHeight = 224;

-(NSInteger) getPhotoWidth {
    return self.imageScrollView.frame.size.width - 10;
}

-(NSInteger) getPhotoHeight {
    return (self.imageScrollView.frame.size.width - 10) / photoWidth * photoHeight;
}

-(void) initImagesView:(NSArray*) photoUrlModels withPosition:(NSInteger) position {
    self.photoUrlModels = photoUrlModels;
    self.photoPosition = position;
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
            activityView.center = CGPointMake((self.imageScrollView.frame.size.width * offset) + self.imageScrollView.frame.size.width/2, self.imageScrollView.frame.size.height/2);
            [activityView startAnimating];
            [self.imageScrollView addSubview:activityView];
            [self.imageScrollView bringSubviewToFront:activityView];
            
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
    frame.origin.x = 5 + (self.imageScrollView.frame.size.width) * offset;
    frame.origin.y = (self.imageScrollView.frame.size.height / 2) - ([self getPhotoHeight] / 2);
    
    frame.size.width = [self getPhotoWidth];
    frame.size.height = [self getPhotoHeight];

    UIImageView *imageView = [[UIImageView alloc] initWithFrame:frame];
    imageView.image = image;
    
    [self.imageScrollView addSubview:imageView];
}

- (void)scrollViewDidEndDecelerating:(UIScrollView *)sender {
     self.currentPositionLabel.text = [[NSString alloc] initWithFormat:@"%li из %lu", (long)[self getCurrentPage]+1, (unsigned long)self.photoUrlModels.count];
}

-(void) setCurrentPosition:(NSInteger) position {
    CGPoint point = CGPointMake(([self getPhotoWidth] + 10) * position, 0);
    [self.imageScrollView setContentOffset: point];
    self.currentPositionLabel.text = [[NSString alloc] initWithFormat:@"%li из %lu", position+1, (unsigned long)self.photoUrlModels.count];
}

-(NSInteger) getCurrentPage {
    CGFloat pageWidth = self.imageScrollView.frame.size.width;
    NSInteger imageNumber = floor((self.imageScrollView.contentOffset.x - pageWidth / 2) / pageWidth) + 1;
    return imageNumber;
}

@end
