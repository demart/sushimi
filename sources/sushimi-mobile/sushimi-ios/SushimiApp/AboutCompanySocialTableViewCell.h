//
//  AboutCompanySocialTableViewCell.h
//  SushimiApp
//
//  Created by Artem Demidovich on 2/21/15.
//  Copyright (c) 2015 AphionSoftware. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "AboutCompany.h"

@interface AboutCompanySocialTableViewCell : UITableViewCell
@property (weak, nonatomic) IBOutlet UIImageView *istagramLogoImage;

@property (weak, nonatomic) IBOutlet UIImageView *vkLogoImage;

@property AboutCompany *aboutCompany;

-(void) initCell:(AboutCompany*) company;


@end
