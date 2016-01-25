//
//  BackgroundTaskManager.h
//  SushimiCourierApp
//
//  Created by Artem Demidovich on 10/16/15.
//  Copyright © 2015 Aphion Software. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h> 

@interface BackgroundTaskManager : NSObject


+(instancetype)sharedBackgroundTaskManager;

-(UIBackgroundTaskIdentifier) beginNewBackgroundTask;
-(void) endAllBackgroundTasks;


@end
