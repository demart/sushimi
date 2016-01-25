//
//  DataLoadingErrorView.m
//  SushimiApp
//
//  Created by Artem Demidovich on 5/14/15.
//  Copyright (c) 2015 AphionSoftware. All rights reserved.
//

#import "DataLoadingErrorView.h"

@implementation DataLoadingErrorView


+(DataLoadingErrorView *)showDataLoadingErrorView:(UIViewController *)viewController withRefreshSelector:(SEL) refreshSelector{
    DataLoadingErrorView *view = [[DataLoadingErrorView alloc] initWithFrame:CGRectZero];
    view.opaque = NO;
    view.autoresizingMask = UIViewAutoresizingFlexibleLeftMargin | UIViewAutoresizingFlexibleRightMargin | UIViewAutoresizingFlexibleTopMargin | UIViewAutoresizingFlexibleBottomMargin;
    view.backgroundColor = [UIColor whiteColor];
        /*
         emptyCartView.backgroundColor = [UIColor colorWithRed:102/255.0f
         green:204.0f/255.0f
         blue:102.0f/255.0f
         alpha:0.35f];
         */
    view.frame = viewController.view.window.frame;
        
    UIView *viewBorder = [[UIView alloc] initWithFrame:CGRectZero];
    CGRect borderFrame = CGRectZero;
    borderFrame.size.width = 210.0;
    borderFrame.size.height = 100;
    borderFrame.origin.x = floor(0.5 * (view.frame.size.width - borderFrame.size.width));
    borderFrame.origin.y = floor(0.5 * (view.frame.size.height - borderFrame.size.height - 20.0));
    
    viewBorder.frame = borderFrame;
    viewBorder.autoresizingMask = UIViewAutoresizingFlexibleWidth | UIViewAutoresizingFlexibleHeight;
    
    viewBorder.backgroundColor = [UIColor colorWithRed:102/255.0f
                                                              green:204.0f/255.0f
                                                               blue:102.0f/255.0f
                                                              alpha:0.80f];
    [view addSubview:viewBorder];
        
    UILabel *title = [[UILabel alloc] initWithFrame:CGRectZero];
    [title setText:@"Уппс...\nНе удалось загрузить..."];
    title.textColor = [UIColor whiteColor];
    title.lineBreakMode = NSLineBreakByWordWrapping;
    title.numberOfLines = 2;
    title.backgroundColor = [UIColor clearColor];
    title.font = [UIFont fontWithName:@"Gill Sans" size:15.0];
        
    [title  setTextAlignment:NSTextAlignmentCenter];
    CGRect titleLabelFrame = CGRectZero;
    titleLabelFrame.size.width = 210.0 - 20.0;
    titleLabelFrame.size.height = 44;
    titleLabelFrame.origin.x = 10;
    titleLabelFrame.origin.y = 10;
    title.frame = titleLabelFrame;
    [viewBorder addSubview:title];
    
    UIButton *button = [[UIButton alloc] initWithFrame:CGRectZero];
    [button setTitle:@"Попробовать снова?" forState:UIControlStateNormal];
    [button setTitleColor:[UIColor whiteColor] forState:UIControlStateNormal];
        
    [button setTitle:@"Попробовать снова?" forState:UIControlStateSelected];
    button.backgroundColor = [UIColor orangeColor];
    button.titleLabel.font = [UIFont fontWithName:@"Gill Sans" size:16.0];
    button.titleLabel.textAlignment = NSTextAlignmentCenter;
        
    [button addTarget:viewController
            action:refreshSelector forControlEvents:UIControlEventTouchUpInside];
        
    CGRect buttonLabelFrame = CGRectZero;
    buttonLabelFrame.size.width = 210.0 - 60.0;
    buttonLabelFrame.size.height = 32;
    buttonLabelFrame.origin.x = 30;
    buttonLabelFrame.origin.y = 60;
    button.frame = buttonLabelFrame;
    [viewBorder addSubview:button];
        
    viewBorder.layer.cornerRadius = 5.0;
    
    [viewController.view addSubview:view];
    
    return view;
}

+(void)hideDataLoadingErrorView:(DataLoadingErrorView *) view{
    if (view != nil)
        [view removeFromSuperview];
}


/*
// Only override drawRect: if you perform custom drawing.
// An empty implementation adversely affects performance during animation.
- (void)drawRect:(CGRect)rect {
    // Drawing code
}
*/

@end
