//
//  FeedbacksWrapperModel.h
//  SushimiApp
//
//  Created by Artem Demidovich on 7/25/15.
//  Copyright (c) 2015 AphionSoftware. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface FeedbacksWrapperModel : NSObject

@property NSArray* feedbacks;
@property NSInteger page;
@property NSInteger pageSize;
@property NSInteger pageCount;

@end
