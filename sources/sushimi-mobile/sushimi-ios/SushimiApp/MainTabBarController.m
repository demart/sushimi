//
//  MainTabBarController.m
//  SushimiApp
//
//  Created by Artem Demidovich on 3/4/15.
//  Copyright (c) 2015 AphionSoftware. All rights reserved.
//

#import "MainTabBarController.h"
#import "JTNumberScrollAnimatedView.h"
#import "CartWithSumTabBarItem.h"

#import "CartManager.h"

#import "SettingsManager.h"

@implementation MainTabBarController

static UITabBarItem* _cartUITabBarItem;

- (void)tabBar:(UITabBar *)tabBar didSelectItem:(UITabBarItem *)item {
}

+(void) setCartValue:(NSInteger) newValue {
    if (_cartUITabBarItem == nil)
        return;
    
    if (newValue < 1) {
        [cartSumView setHidden:YES];
    } else {
        [cartSumView setHidden:NO];
        [cartSumLabel setText:[[NSString alloc] initWithFormat:@"%@ тнг", [@(newValue) stringValue]]];
        
        [UIView animateWithDuration:0.1
                              delay:0
                              options:UIViewAnimationOptionCurveEaseInOut
                         animations:^{
                             cartSumLabel.transform = CGAffineTransformMakeTranslation(0, -1);
                         }
                         completion:^(BOOL finished) {
                             [UIView animateWithDuration:0.1
                                                   delay:0
                                                 options:UIViewAnimationOptionCurveEaseInOut
                                              animations:^{
                                                  cartSumLabel.transform = CGAffineTransformMakeTranslation(0,1);
                                              }
                                              completion:^(BOOL finished) {
                                                  [UIView animateWithDuration:0.1
                                                                        delay:0
                                                                      options:UIViewAnimationOptionCurveEaseInOut
                                                                   animations:^{
                                                                       cartSumLabel.transform = CGAffineTransformMakeTranslation(0,0);
                                                                   }
                                                                   completion:nil];
                                              }];
                             
                         }];
        
    }
}

-(void) initCartUIBarItem {
    UITabBarItem* _cartItem = self.tabBar.items[2];
    _cartUITabBarItem = _cartItem;
}

-(void)viewDidLoad {
    [super viewDidLoad];
    [self initCartUIBarItem];
    
    UIColor *bg_color = [UIColor colorWithRed:102/255.0f
                                        green:204.0f/255.0f
                                         blue:102.0f/255.0f
                                        alpha:1.0f];
    
    UIColor *backgroundOrageColor = [UIColor colorWithRed:255/255.0f
                                                    green:153.0f/255.0f
                                                     blue:0.0f/255.0f
                                                    alpha:1.0f];
    
    [UITabBar appearance].barTintColor = bg_color;
    self.tabBar.tintColor = [UIColor   whiteColor];
    [[UITabBarItem appearance] setTitleTextAttributes:@{ NSForegroundColorAttributeName : [UIColor whiteColor], [UIFont fontWithName:@"Gill Sans" size:8.0]: NSFontAttributeName }
                                             forState:UIControlStateNormal];
    [[UITabBarItem appearance] setTitleTextAttributes:@{ NSForegroundColorAttributeName : [UIColor whiteColor], [UIFont fontWithName:@"Gill Sans" size:8.0]: NSFontAttributeName }
                                             forState:UIControlStateSelected];
    
    
    CGRect frame = [MainTabBarController frameForTabInTabBar:self.tabBar withIndex:0];
    CGRect rect = CGRectMake(0.0f, 0.0f, frame.size.width, self.tabBar.frame.size.height);
    UIGraphicsBeginImageContext(rect.size);
    CGContextRef context = UIGraphicsGetCurrentContext();
    CGContextSetFillColorWithColor(context, [backgroundOrageColor CGColor]);
    CGContextFillRect(context, rect);
    UIImage *image = UIGraphicsGetImageFromCurrentImageContext();
    UIGraphicsEndImageContext();
    [[UITabBar appearance] setSelectionIndicatorImage: image];
    
    UIImage *menuIcon = [UIImage imageNamed:@"menuIcon.png"];
    ((UITabBarItem *)[self.tabBar.items objectAtIndex:0]).image = [menuIcon imageWithRenderingMode:UIImageRenderingModeAlwaysOriginal];
    
    UIImage *restaurantIcon = [UIImage imageNamed:@"restaurantIcon.png"];
    ((UITabBarItem *)[self.tabBar.items objectAtIndex:1]).image = [restaurantIcon  imageWithRenderingMode:UIImageRenderingModeAlwaysOriginal];
    
    UIImage *ordersIcon = [UIImage imageNamed:@"orderIcon.png"];
    ((UITabBarItem *)[self.tabBar.items objectAtIndex:2]).image = [ordersIcon  imageWithRenderingMode:UIImageRenderingModeAlwaysOriginal];
    
    UIImage *extraIcon = [UIImage imageNamed:@"extraIcon.png"];
    ((UITabBarItem *)[self.tabBar.items objectAtIndex:3]).image = [extraIcon  imageWithRenderingMode:UIImageRenderingModeAlwaysOriginal];
    
    // LOAD IN BACKGROUND CART INFO
    [[CartManager sharedInstance] loadCartInfo:nil];
    
    // SET SETTINGS
    NSString *firstTimeOpenedKey = SYSTEM_SETTINGS_FIST_TIME_OPENED;
    [[SettingsManager sharedInstance] setSettingKey:firstTimeOpenedKey withValue:@"NO"];
}

static UIView *cartSumView;
static UILabel *cartSumLabel;


-(void)viewDidAppear:(BOOL)animated {
    CGRect or_frame = [MainTabBarController frameForTabInTabBar:self.tabBar withIndex:2];
    
    cartSumView = [[UIView alloc] init];
    CGRect frame;
    frame.origin.x = or_frame.origin.x + (or_frame.size.width / 2) - 35;
    frame.origin.y =  (or_frame.size.height / 2) - 10 + self.tabBar.viewForBaselineLayout.frame.origin.y - 2;
    frame.size.width = 70;
    frame.size.height = 20;
    
    cartSumLabel = [[UILabel alloc] initWithFrame:CGRectZero];
    [cartSumLabel setText:@""];
    cartSumLabel.textColor = [UIColor whiteColor];
    cartSumLabel.backgroundColor = [UIColor clearColor];
    cartSumLabel.font = [UIFont fontWithName:@"Gill Sans" size:15.0];
    
    [cartSumLabel  setTextAlignment:NSTextAlignmentCenter];
    CGRect titleLabelFrame = CGRectZero;
    titleLabelFrame.size.width = 70;
    titleLabelFrame.size.height = 20;
    titleLabelFrame.origin.x = 0;
    titleLabelFrame.origin.y = 0;
    cartSumLabel.frame = titleLabelFrame;
    
    [cartSumView addSubview:cartSumLabel];
    [cartSumView bringSubviewToFront:cartSumLabel];
    
    [cartSumView setFrame:frame];
    
    
    UIColor *backgroundOrageColor = [UIColor colorWithRed:255/255.0f
                                        green:153.0f/255.0f
                                         blue:0.0f/255.0f
                                        alpha:1.0f];
    
    [cartSumView setBackgroundColor:backgroundOrageColor];
    cartSumView.layer.cornerRadius = 2.0;
    //cartSumView.layer.borderColor = [UIColor orangeColor].CGColor;
    //cartSumView.layer.borderWidth = 0.8f;
    
    self.discountInfoTap = [[UITapGestureRecognizer alloc] initWithTarget:self action:@selector(tappedCartSum)];
    [cartSumView setUserInteractionEnabled:YES];
    [cartSumView addGestureRecognizer:self.discountInfoTap];
    
    [cartSumView setHidden:YES];
    [self.view addSubview:cartSumView];
    [self.view bringSubviewToFront:cartSumView];
    
}

-(void)tappedCartSum {
    [self setSelectedIndex:2];
}

+ (CGRect)frameForTabInTabBar:(UITabBar*)tabBar withIndex:(NSUInteger)index
{
    NSUInteger currentTabIndex = 0;
    
    for (UIView* subView in tabBar.subviews)
    {
        if ([subView isKindOfClass:NSClassFromString(@"UITabBarButton")])
        {
            if (currentTabIndex == index)
                return subView.frame;
            else
                currentTabIndex++;
        }
    }
    
    NSAssert(NO, @"Index is out of bounds");
    return CGRectNull;
}

@end
