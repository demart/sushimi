//
//  DeliveryTableViewCell.h
//  SushimiApp
//
//  Created by Artem Demidovich on 2/20/15.
//  Copyright (c) 2015 AphionSoftware. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface DeliveryTableViewCell : UITableViewCell

@property (weak, nonatomic) IBOutlet UILabel *deliveryTitle;

@property (weak, nonatomic) IBOutlet UILabel *deliveryWorkhours;

@property (weak, nonatomic) IBOutlet UILabel *deliveryMinOrderSum;

@property (weak, nonatomic) IBOutlet UILabel *deliveryArea;

@property (weak, nonatomic) IBOutlet UILabel *deliveryRemarks;

@property (weak, nonatomic) IBOutlet UIImageView *deliveryAreaImage;
@end
