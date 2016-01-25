//
//  CalendarTypeModel.h
//  SushimiCourierApp
//
//  Created by Artem Demidovich on 10/12/15.
//  Copyright © 2015 Aphion Software. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface CalendarTypeModel : NSObject

@property NSInteger dayOfMonth;
@property NSInteger hourOfDay;
@property NSInteger minute;
@property NSInteger month;
@property NSInteger second;
@property NSInteger year;

/*
 {
    dayOfMonth = 14;
    hourOfDay = 15;
    minute = 24;
    month = 8;
    second = 41;
    year = 2015;
 }
 */

-(NSDate*) date;

@end
