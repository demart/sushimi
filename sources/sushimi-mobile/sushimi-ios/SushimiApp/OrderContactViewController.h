//
//  OrderContactViewController.h
//  SushimiApp
//
//  Created by Artem Demidovich on 4/24/15.
//  Copyright (c) 2015 AphionSoftware. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface OrderContactViewController : UIViewController<UITableViewDelegate, UITableViewDataSource>

@property (weak, nonatomic) IBOutlet UITableView *contactTableView;

@end
