//
//  CategoryTableViewCell.m
//  SushimiApp
//
//  Created by Artem Demidovich on 2/28/15.
//  Copyright (c) 2015 AphionSoftware. All rights reserved.
//

#import "CategoryTableViewCell.h"

@implementation CategoryTableViewCell

- (void)awakeFromNib {}

- (void)setSelected:(BOOL)selected animated:(BOOL)animated {
    [super setSelected:selected animated:animated];
}

-(void)buildGradient:(CGRect) bounds {
    UIColor *green = [UIColor colorWithRed:102/255.0f green:204.0f/255.0f blue:102.0f/255.0f alpha:1.0f];
    UIColor *white = [UIColor colorWithRed:0/255.0f green:0.0f/255.0f blue:0.0f/255.0f alpha:0.0f];
    
    UIView* view = self.gradientView;
    for (CALayer *layer in view.layer.sublayers) {
        [layer removeFromSuperlayer];
    }
    
    CAGradientLayer *gradient = [CAGradientLayer layer];
    gradient.frame = bounds;
    gradient.colors = [NSArray arrayWithObjects:(id)[green CGColor], (id)[white CGColor],nil];
    gradient.locations = [NSArray arrayWithObjects:
                          [NSNumber numberWithFloat:0],
                          [NSNumber numberWithFloat:0.4f],
                          nil];
    gradient.opacity = 0.6f;
    
    [view.layer insertSublayer:gradient atIndex:0];
}

@end
