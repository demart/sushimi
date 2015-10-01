//
//  OrderDetailInfoCell.h
//  SushimiApp
//
//  Created by Artem Demidovich on 5/8/15.
//  Copyright (c) 2015 AphionSoftware. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface OrderDetailInfoCell : UITableViewCell
@property (weak, nonatomic) IBOutlet UILabel *cellLabelField;
@property (weak, nonatomic) IBOutlet UILabel *cellValueField;

@end
