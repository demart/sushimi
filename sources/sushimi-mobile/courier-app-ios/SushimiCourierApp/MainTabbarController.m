//
//  MainTabbarController.m
//  SushimiCourierApp
//
//  Created by Artem Demidovich on 10/13/15.
//  Copyright © 2015 Aphion Software. All rights reserved.
//

#import "MainTabbarController.h"
#import "Constants.h"

@interface MainTabbarController ()

@end

@implementation MainTabbarController

- (void)viewDidLoad {
    [super viewDidLoad];

    /*
    UIColor *bg_color = [UIColor colorWithRed:102/255.0f
                                        green:204.0f/255.0f
                                         blue:102.0f/255.0f
                                        alpha:1.0f];
    
    UIColor *backgroundOrageColor = [UIColor colorWithRed:255/255.0f
                                                    green:153.0f/255.0f
                                                     blue:0.0f/255.0f
                                                    alpha:1.0f];
    */
    
    UIColor *bg_color = [Constants getSystemGreenColor];
    UIColor *backgroundOrageColor = [Constants getSystemOrangeColor];
    
    [UITabBar appearance].barTintColor = bg_color;
    self.tabBar.tintColor = [UIColor   whiteColor];
    [[UITabBarItem appearance] setTitleTextAttributes:@{ NSForegroundColorAttributeName : [UIColor whiteColor], [UIFont fontWithName:@"Gill Sans" size:8.0]: NSFontAttributeName }
                                             forState:UIControlStateNormal];
    [[UITabBarItem appearance] setTitleTextAttributes:@{ NSForegroundColorAttributeName : [UIColor whiteColor], [UIFont fontWithName:@"Gill Sans" size:8.0]: NSFontAttributeName }
                                             forState:UIControlStateSelected];
    
    
    CGRect frame = [MainTabbarController frameForTabInTabBar:self.tabBar withIndex:0];
    CGRect rect = CGRectMake(0.0f, 0.0f, frame.size.width, self.tabBar.frame.size.height);
    UIGraphicsBeginImageContext(rect.size);
    CGContextRef context = UIGraphicsGetCurrentContext();
    CGContextSetFillColorWithColor(context, [backgroundOrageColor CGColor]);
    CGContextFillRect(context, rect);
    UIImage *image = UIGraphicsGetImageFromCurrentImageContext();
    UIGraphicsEndImageContext();
    [[UITabBar appearance] setSelectionIndicatorImage: image];
    
    UIImage *menuIcon = [UIImage imageNamed:@"onDeliveryIcon"];
    ((UITabBarItem *)[self.tabBar.items objectAtIndex:0]).image = [menuIcon imageWithRenderingMode:UIImageRenderingModeAlwaysOriginal];
    
    UIImage *restaurantIcon = [UIImage imageNamed:@"inProgressIcon"];
    ((UITabBarItem *)[self.tabBar.items objectAtIndex:1]).image = [restaurantIcon  imageWithRenderingMode:UIImageRenderingModeAlwaysOriginal];
    
    UIImage *ordersIcon = [UIImage imageNamed:@"deliveredIcon"];
    ((UITabBarItem *)[self.tabBar.items objectAtIndex:2]).image = [ordersIcon  imageWithRenderingMode:UIImageRenderingModeAlwaysOriginal];
    
    
    [[UINavigationBar appearance] setBarTintColor:bg_color];
    [UINavigationBar appearance].tintColor = [UIColor   whiteColor];
    
    [UIButton appearance].layer.cornerRadius = 2.0f;
    
    [[UINavigationBar appearance] setTitleTextAttributes:
     [NSDictionary dictionaryWithObjectsAndKeys:
      [UIColor whiteColor], NSForegroundColorAttributeName,
      [UIFont fontWithName:@"Gill Sans" size:17.0], NSFontAttributeName,
      nil]];
    
    [[UIBarButtonItem appearanceWhenContainedIn:[UINavigationBar class], nil] setTitleTextAttributes:
     @{NSForegroundColorAttributeName:[UIColor whiteColor],
       NSFontAttributeName: [UIFont fontWithName:@"Gill Sans" size:17.0]
       } forState:UIControlStateNormal];
    
    [UISegmentedControl appearance].tintColor = backgroundOrageColor;
    [[UISegmentedControl appearance] setTitleTextAttributes:@{NSForegroundColorAttributeName:[UIColor whiteColor]} forState:UIControlStateNormal];
    [[UISegmentedControl appearance] setTitleTextAttributes:@{NSForegroundColorAttributeName:[UIColor whiteColor]} forState:UIControlStateSelected];

}


+ (CGRect)frameForTabInTabBar:(UITabBar*)tabBar withIndex:(NSUInteger)index {
    NSUInteger currentTabIndex = 0;
    
    for (UIView* subView in tabBar.subviews) {
        if ([subView isKindOfClass:NSClassFromString(@"UITabBarButton")]) {
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
