//
//  DeliveryPhoneTableViewCell.h
//  SushimiApp
//
//  Created by Artem Demidovich on 2/20/15.
//  Copyright (c) 2015 AphionSoftware. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface PhoneTableViewCell : UITableViewCell
@property (weak, nonatomic) IBOutlet UILabel *phone;
@property (weak, nonatomic) IBOutlet UIImageView *image;

-(void)setPhoneNumber:(NSString*)phoneNumber;
-(NSString*)getPhoneNumber;

@end
