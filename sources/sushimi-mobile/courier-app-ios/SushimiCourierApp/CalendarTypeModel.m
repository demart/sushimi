//
//  CalendarTypeModel.m
//  SushimiCourierApp
//
//  Created by Artem Demidovich on 10/12/15.
//  Copyright © 2015 Aphion Software. All rights reserved.
//

#import "CalendarTypeModel.h"

@implementation CalendarTypeModel

-(NSDate*) date {
    NSDate *date = [NSDate date];
    NSCalendar *gregorian = [[NSCalendar alloc] initWithCalendarIdentifier: NSCalendarIdentifierGregorian];
    NSDateComponents *components = [gregorian components: NSUIntegerMax fromDate: date];
    [components setHour: self.hourOfDay];
    [components setMinute: self.minute];
    [components setSecond: self.second];
    [components setYear:self.year];
    [components setMonth:self.month+1];
    [components setDay:self.dayOfMonth];
    
    NSDate *newDate = [gregorian dateFromComponents: components];
    return newDate;
}

@end
