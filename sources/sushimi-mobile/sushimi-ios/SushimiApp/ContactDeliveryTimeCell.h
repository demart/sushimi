//
//  ContactDeliveryTimeCellTableViewCell.h
//  SushimiApp
//
//  Created by Artem Demidovich on 5/6/15.
//  Copyright (c) 2015 AphionSoftware. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "RegisterOrderModel.h"
#import "TDDatePickerController.h"

@interface ContactDeliveryTimeCell : UITableViewCell<TDDatePickerControllerDelegate>
@property (weak, nonatomic) IBOutlet UILabel *deliveryTimeLabel;

@property (weak, nonatomic) IBOutlet UILabel *deliveryTime;

-(void)initCell: (RegisterOrderModel *) registerOrderModel withParentView:(UIView *) parentView withLabel:(NSString *) label;

@property RegisterOrderModel* registerOrderModel;
@property TDDatePickerController* datePickerView;

@end
