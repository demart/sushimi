//
//  FeedbackModel.h
//  SushimiApp
//
//  Created by Artem Demidovich on 7/25/15.
//  Copyright (c) 2015 AphionSoftware. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface FeedbackModel : NSObject

@property NSInteger id;
@property NSNumber* created;
@property NSString* email;
@property NSString* feedbackType;
@property NSString* name;
@property NSString* phone;
@property NSString* text;

/*
 * "Uid": 1000000000000002,
 "Created": "/Date(1359903636957)/",
 "Email": null,
 "FeedbackType": null,
 "feedbacktype_id": 2,
 "Fio": "Власов Игорь",
 "Id": 2,
 "Phone": "+7965***7252",
 "Text": "В этом году я встретил любимую Викусю, женился и обрел прекрасного сынулю!",
 "Visible": true
 */

@end
