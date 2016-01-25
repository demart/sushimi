//
//  OrderDetailTableViewController.h
//  SushimiCourierApp
//
//  Created by Artem Demidovich on 10/13/15.
//  Copyright © 2015 Aphion Software. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "OrderModel.h"

@interface OrderDetailTableViewController : UITableViewController

- (IBAction)callToClientAction:(UIBarButtonItem *)sender;

// Получает на вход объект заказа, для того чтобы его отобразить
-(void) setSelectedOrderModel:(OrderModel*) orderModel;

@end
