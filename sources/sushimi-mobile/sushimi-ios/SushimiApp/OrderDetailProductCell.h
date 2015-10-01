//
//  OrderDetailProductCell.h
//  SushimiApp
//
//  Created by Artem Demidovich on 5/8/15.
//  Copyright (c) 2015 AphionSoftware. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface OrderDetailProductCell : UITableViewCell
@property (weak, nonatomic) IBOutlet UILabel *productNumber;
@property (weak, nonatomic) IBOutlet UILabel *productName;
@property (weak, nonatomic) IBOutlet UILabel *productCount;

@end
