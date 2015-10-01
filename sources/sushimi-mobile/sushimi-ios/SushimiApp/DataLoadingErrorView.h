//
//  DataLoadingErrorView.h
//  SushimiApp
//
//  Created by Artem Demidovich on 5/14/15.
//  Copyright (c) 2015 AphionSoftware. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface DataLoadingErrorView : UIView

+(DataLoadingErrorView *)showDataLoadingErrorView:(UIViewController *)viewController withRefreshSelector:(SEL) refreshSelector;

+(void)hideDataLoadingErrorView:(DataLoadingErrorView *) view;

@end
