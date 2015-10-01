//
//  AboutCompanyTableViewCell.h
//  SushimiApp
//
//  Created by Artem Demidovich on 2/21/15.
//  Copyright (c) 2015 AphionSoftware. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface AboutCompanyTableViewCell : UITableViewCell

@property (weak, nonatomic) IBOutlet UIImageView *companyImage;

@property (strong, nonatomic) IBOutlet UILabel *companyContent;
@end
