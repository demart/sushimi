//
//  OrderDetailTableViewController.m
//  SushimiCourierApp
//
//  Created by Artem Demidovich on 10/13/15.
//  Copyright © 2015 Aphion Software. All rights reserved.
//

#import "OrderDetailTableViewController.h"
#import "OrderDetailTableViewCell.h"
#import "OrderActionTableViewCell.h"

#import "PhoneNumberFormatter.h"
#import "OrderService.h"

@interface OrderDetailTableViewController ()

@property OrderModel *orderModel;

@end

@implementation OrderDetailTableViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    self.tableView.tableFooterView = [[UIView alloc] initWithFrame:CGRectZero];
}

// Получает на вход объект заказа, для того чтобы его отобразить
-(void) setSelectedOrderModel:(OrderModel*) orderModel {
    self.orderModel = orderModel;
}


- (IBAction)callToClientAction:(UIBarButtonItem *)sender {
    UIDevice *device = [UIDevice currentDevice];
    if ([[device model] isEqualToString:@"iPhone"] ) {
        NSURL *urlToCall = [NSURL URLWithString:[[NSString alloc] initWithFormat:@"tel:%@", [self.orderModel getFormattedPhoneNumberForCall]]];
        if ([[UIApplication sharedApplication] canOpenURL:urlToCall]) {
            [[UIApplication sharedApplication] openURL:urlToCall];
        } else {
            UIAlertController *alertController = [UIAlertController
                                                  alertControllerWithTitle:@"Внимание"
                                                  message:@"Ваше устройство не поддерживает звонки"
                                                  preferredStyle:UIAlertControllerStyleAlert];
            UIAlertAction *okAction = [UIAlertAction
                                       actionWithTitle:@"ОК"
                                       style:UIAlertActionStyleDefault
                                       handler:^(UIAlertAction *action) {
                                       }];
            [alertController addAction:okAction];
            [self presentViewController:alertController animated:YES completion:nil];
        }
    } else {
        UIAlertController *alertController = [UIAlertController
                                              alertControllerWithTitle:@"Внимание"
                                              message:@"Ваше устройство не поддерживает звонки"
                                              preferredStyle:UIAlertControllerStyleAlert];
        UIAlertAction *okAction = [UIAlertAction
                                   actionWithTitle:@"ОК"
                                   style:UIAlertActionStyleDefault
                                   handler:^(UIAlertAction *action) {
                                   }];
        [alertController addAction:okAction];
        [self presentViewController:alertController animated:YES completion:nil];
    }
}


#pragma mark - Table view data source

- (NSInteger)numberOfSectionsInTableView:(UITableView *)tableView {
    if (self.orderModel != nil)
        return 1;
    return 0;
}

- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section {
    if ([self.orderModel.orderState isEqualToString:@"ON_DELIVERY"]) {
        return 11;
    }
    return 10;
}

- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath {
   
    // BUTTON CELL
    if (indexPath.row == 10) {
        OrderActionTableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:@"OrderActionTableViewCell"];

        if (cell == nil) {
            [tableView registerNib:[UINib nibWithNibName:@"OrderActionTableViewCell" bundle:nil]forCellReuseIdentifier:@"OrderActionTableViewCell"];
            cell = [tableView dequeueReusableCellWithIdentifier:@"OrderActionTableViewCell"];
        }
        
        [cell initCellWithOrderModel:self.orderModel deliveredSelection:@selector(doDeliveryOrder:) returnSelection:@selector(doReturnOrder:) onParentController:self];
        
        return cell;
    }
    
    
    // TEXT CELLs
    OrderDetailTableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:@"OrderDetailTableViewCell"];
    
    if (cell == nil) {
        [tableView registerNib:[UINib nibWithNibName:@"OrderDetailTableViewCell" bundle:nil]forCellReuseIdentifier:@"OrderDetailTableViewCell"];
        cell = [tableView dequeueReusableCellWithIdentifier:@"OrderDetailTableViewCell"];
    }
    
    // FIRST SECTION
    if (indexPath.row == 0) {
        [cell initCell:@"Номер заказа:" withValue:[self.orderModel getOrderNumber]];
    }
    
    if (indexPath.row == 1) {
        [cell initCell:@"Время заказа:" withValue:[self.orderModel getOrderTime]];
    }
    
    if (indexPath.row == 2) {
        [cell initCell:@"Способ:" withValue:[self.orderModel getDeliveryTypeName]];
    }
    
    if (indexPath.row == 3) {
        [cell initCell:@"Доставка к:" withValue:[self.orderModel getDeliveryTime]];
    }
    
    
    
    // SECOND SECTION
    if (indexPath.row == 4) {
        [cell initCell:@"Клиент:" withValue:self.orderModel.clientName];
    }

    if (indexPath.row == 5) {
        [cell initCell:@"Телефон:" withValue:[self.orderModel getFormattedPhoneNumber]];
    }

    if (indexPath.row == 6) {
        [cell initCell:@"Адрес:" withValue:self.orderModel.address];
    }
    
    if (indexPath.row == 7) {
        [cell initCell:@"Комментарий:" withValue:self.orderModel.clientComment];
    }
    
    // THIRD SECTION
    /*
    if (indexPath.row == 8) {
        [cell initCell:@"Источник:" withValue:[self.orderModel getSourceName]];
    }

    if (indexPath.row == 9) {
        [cell initCell:@"Статус:" withValue:[self.orderModel getStatusName]];
    }
    
    if (indexPath.row == 10) {
        [cell initCell:@"Способ оплаты:" withValue:[self.orderModel getPayMethodName]];
    }
    */
    if (indexPath.row == 8) {
        [cell initCell:@"Сумма заказа:" withValue:[self.orderModel getOrderSum]];
    }
    if (indexPath.row == 9) {
        if (self.orderModel.clientCash != nil && self.orderModel.clientCash > 0) {
            long cashBack = self.orderModel.clientCash.longValue - self.orderModel.orderSum.longValue;
            NSString *cash = [[NSString alloc] initWithFormat:@"%li тнг. (С %@ тнг.)", cashBack, self.orderModel.clientCash ];
           [cell initCell:@"Сдача:" withValue:cash];
        } else
           [cell initCell:@"Сдача:" withValue:@"Не указано."];
    }
    
    return cell;
}

-(void) tableView:(UITableView *)tableView willDisplayCell:(UITableViewCell *)cell forRowAtIndexPath:(NSIndexPath *)indexPath {
}


- (CGFloat)tableView:(UITableView *)tableView heightForRowAtIndexPath:(NSIndexPath *)indexPath {
    if (indexPath.row == 9)
        return 53;
    return 40;
}

-(void) doDeliveryOrder:(OrderModel*) orderModel {
    [OrderService completeOrder:orderModel withController:self success:@selector(successfullyUpdatedOrder) failure:@selector(failureUpdatedOrder:)];
}

-(void) doReturnOrder:(OrderModel*) orderModel {
    [OrderService returnOrder:orderModel withController:self success:@selector(successfullyUpdatedOrder) failure:@selector(failureUpdatedOrder:)];
}

-(void) successfullyUpdatedOrder {
    [self.navigationController popViewControllerAnimated:YES];
}

-(void) failureUpdatedOrder:(NSError*) error {
    UIAlertController *alertController = [UIAlertController
                                          alertControllerWithTitle:@"Ошибка"
                                          message:@"Ошибка при выполнении операции. Попробуйте еще раз."
                                          preferredStyle:UIAlertControllerStyleAlert];
    UIAlertAction *okAction = [UIAlertAction
                               actionWithTitle:@"ОК"
                               style:UIAlertActionStyleDefault
                               handler:^(UIAlertAction *action) {
                               }];
    [alertController addAction:okAction];
    [self presentViewController:alertController animated:YES completion:nil];
}

/*
#pragma mark - Navigation

// In a storyboard-based application, you will often want to do a little preparation before navigation
- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
    // Get the new view controller using [segue destinationViewController].
    // Pass the selected object to the new view controller.
}
*/
@end
