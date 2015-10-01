//
//  OrderDetailTableViewController.m
//  SushimiApp
//
//  Created by Artem Demidovich on 5/6/15.
//  Copyright (c) 2015 AphionSoftware. All rights reserved.
//

#import "OrderDetailsTableViewController.h"
#import "OrderDetailInfoCell.h"
#import "OrderDetailProductCell.h"

#import "OrderModel.h"
#import "OrderItemModel.h"
#import "OrderManager.h"

#import "PhoneNumberFormatter.h"

#import "DejalActivityView.h"
#import "OrderDetailTableViewHeaderCell.h"
#import "SettingsManager.h"

@interface OrderDetailsTableViewController ()

@property UIActivityIndicatorView *indicator;
@property NSString* orderNumber;
@property OrderModel* orderModel;
@property BOOL hideBackButton;
@property PhoneNumberFormatter* phoneNumberFormatter;

@end

@implementation OrderDetailsTableViewController



- (void)viewDidLoad {
    [super viewDidLoad];
    
    [self.tableView setBackgroundColor:[UIColor whiteColor]];
    self.phoneNumberFormatter = [[PhoneNumberFormatter alloc] init];
    
    self.orderModel = [[OrderManager sharedInstance] loadLocalOrderByOrderKey:self.orderNumber];
    [self.tableView reloadData];
}

-(void) startLoading:(BOOL)animated {
    [DejalBezelActivityView activityViewForView:self.view withLabel:@"Подождите\nИдет загрузка..."];
}

-(void) stopLoading:(BOOL)animated withError:(NSString *)errorMessage {
    [DejalBezelActivityView removeViewAnimated:YES];
    
    if (errorMessage != nil){
        
        //[[[UIAlertView alloc] initWithTitle:@"Ошибка" message:errorMessage delegate:nil cancelButtonTitle:@"OK" otherButtonTitles: nil] show];
        return;
    }
    
    self.orderModel = (OrderModel *)self.item;
    [[SettingsManager sharedInstance] addOrderModel:self.orderModel];
    
    [self.tableView reloadData];
}

-(void)viewWillAppear:(BOOL)animated {
    if (self.hideBackButton) {
        
        UIBarButtonItem* backToRootView =
        [[UIBarButtonItem alloc] initWithTitle:@"Назад в корзину"
                                         style:UIBarButtonItemStyleDone target:self action:@selector(goBackToRootView:)];
        self.navigationItem.leftBarButtonItem = backToRootView;
    }
    
    UIBarButtonItem *refreshIconButton = [[UIBarButtonItem alloc] initWithBarButtonSystemItem:UIBarButtonSystemItemRefresh target:self action:@selector(refreshOrderDetails:)];
    UIBarButtonItem *refreshTextButton = [[UIBarButtonItem alloc] initWithTitle:@"Обновить" style:UIBarButtonItemStylePlain target:self action:@selector(refreshOrderDetails:)];
    self.navigationItem.rightBarButtonItems =
    [NSArray arrayWithObjects:refreshTextButton, refreshIconButton, nil];
    
    [[OrderManager sharedInstance] loadOrderFromServer:self withOrderKey:self.orderNumber];
}


-(void)refreshOrderDetails:(UIBarButtonItem*)sender {
    [[OrderManager sharedInstance] loadOrderFromServer:self withOrderKey:self.orderNumber];
}


-(void)goBackToRootView:(UIBarButtonItem*)sender {
    [self.navigationController popToRootViewControllerAnimated:YES];
}


-(void) setOrderKey:(NSString *) number hideBackButton:(BOOL)hideButton {
    self.orderNumber = number;
    self.hideBackButton = hideButton;
    NSLog(@"OrderDetails got orderNumber: %@", self.orderNumber);
}


#pragma mark - Table view data source

- (NSInteger)numberOfSectionsInTableView:(UITableView *)tableView {
    return 3;
}

- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section {
    if (self.orderModel != nil)
        if (section == 0)
            if ([self.orderModel.deliveryType isEqualToString:@"DELIVERY"]) {
                return 4;
            } else {
                return 5;
            }
    if (self.orderModel != nil)
        if (section == 1)
            return 5;
    
    if (self.orderModel != nil)
        if (section == 2 && self.orderModel.orderItems != nil)
            return self.orderModel.orderItems.count + 1;
    return 0;
}


- (NSString *)tableView:(UITableView *)tableView titleForHeaderInSection:(NSInteger)section {
    if (section == 0)
        return @"ИНФОРМАЦИЯ О ЗАКАЗЕ";
    if (section == 1)
        return @"ИНФОРМАЦИЯ О КЛИЕНТЕ";
    return @"СОСТАВ ЗАКАЗА";
}


-(UIView *)tableView:(UITableView *)tableView viewForHeaderInSection:(NSInteger)section {
    OrderDetailTableViewHeaderCell*  headerCell = (OrderDetailTableViewHeaderCell*)[self.tableView dequeueReusableCellWithIdentifier:@"HeaderCell"];
    if (headerCell == nil) {
        [tableView registerNib:[UINib nibWithNibName:@"OrderDetailTableViewHeaderCell" bundle:nil]forCellReuseIdentifier:@"HeaderCell"];
        headerCell = [tableView dequeueReusableCellWithIdentifier:@"HeaderCell"];
    }
    
    if(section == 0)
        headerCell.HeaderTitle.text = @"ИНФОРМАЦИЯ О ЗАКАЗЕ";
    if(section == 1)
        headerCell.HeaderTitle.text = @"ИНФОРМАЦИЯ О КЛИЕНТЕ";
    if(section > 1)
        headerCell.HeaderTitle.text = @"СОСТАВ ЗАКАЗА";
    
    return headerCell;
}

-(CGFloat)tableView:(UITableView *)tableView heightForFooterInSection:(NSInteger)section {
    return 0;
}

- (CGFloat)tableView:(UITableView *)tableView heightForHeaderInSection:(NSInteger)section {
    return 40;
}


- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath {
    OrderDetailInfoCell *cell = [tableView dequeueReusableCellWithIdentifier:@"OrderDetailInfoCell"];
    if (cell == nil) {
        [tableView registerNib:[UINib nibWithNibName:@"OrderDetailInfoCell" bundle:nil]forCellReuseIdentifier:@"OrderDetailInfoCell"];
        cell = [tableView dequeueReusableCellWithIdentifier:@"OrderDetailInfoCell"];
    }

    if (indexPath.section == 0) {
        if (indexPath.row == 0) {
            cell.cellLabelField.text = @"Номер заказа";
            cell.cellValueField.text = self.orderModel.orderNumber;
        }
        if (indexPath.row == 1) {
            cell.cellLabelField.text = @"Время заказа";
            NSDate* date = [NSDate dateWithTimeIntervalSince1970:(self.orderModel.orderTime.longLongValue / 1000)];
            NSDateFormatter *_formatter=[[NSDateFormatter alloc]init];
            [_formatter setDateFormat:@"dd.MM.yyyy HH:mm:ss"];
            cell.cellValueField.text = [_formatter stringFromDate:date];

        }
        if (indexPath.row == 2) {
            cell.cellLabelField.text = @"Форма заказа";
            if ([self.orderModel.deliveryType isEqualToString:@"DELIVERY"])
                cell.cellValueField.text = @"Доставка";
                else
                    if ([self.orderModel.deliveryType isEqualToString:@"DELIVERY_IN_TIME"])
                        cell.cellValueField.text = @"Доставка ко времени";
                        else
                            if ([self.orderModel.deliveryType isEqualToString:@"SELF_SERVICE"])
                                cell.cellValueField.text = @"Самовывоз";
                                else
                                    cell.cellValueField.text = @"Не удалось определить";
            
        }
        if (indexPath.row == 3) {
            if (![self.orderModel.deliveryType isEqualToString:@"DELIVERY"]) {
                cell.cellLabelField.text = @"Ко времени";
                NSDate* date = [NSDate dateWithTimeIntervalSince1970:(self.orderModel.deliveryTime.longLongValue / 1000)];
                NSDateFormatter *_formatter=[[NSDateFormatter alloc]init];
                [_formatter setDateFormat:@"dd.MM.yyyy HH:mm:ss"];
                cell.cellValueField.text = [_formatter stringFromDate:date];
            } else {
                cell.cellLabelField.text = @"Статус заказа";
                cell.cellValueField.text = [self buildStatusString];
            }
        }
        
        if (indexPath.row == 4) {
            cell.cellLabelField.text = @"Статус заказа";
            cell.cellValueField.text = [self buildStatusString];
        }
        
        return cell;
    }
    if (indexPath.section == 1) {
        if (indexPath.row == 0) {
            cell.cellLabelField.text = @"ФИО";
            cell.cellValueField.text = self.orderModel.personName;
        }
        if (indexPath.row == 1) {
            cell.cellLabelField.text = @"Телефон";
            cell.cellValueField.text = [[NSString alloc] initWithFormat:@"+7%@", self.orderModel.personPhone];
            if (cell.cellValueField.text.length > 18)
                cell.cellValueField.text = [cell.cellValueField.text substringToIndex:18];
            cell.cellValueField.text = [self.phoneNumberFormatter format:cell.cellValueField.text withLocale:@"kz"];
        }
        if (indexPath.row == 2) {
            cell.cellLabelField.text = @"Адрес";
            cell.cellValueField.text = [self buildAddressString];
        }
        if (indexPath.row == 3) {
            cell.cellLabelField.text = @"Cдачу с";
            NSString *cash = [[NSString alloc] initWithFormat:@"%li ₸", self.orderModel.personCash];
            if (cash.length > 5) {
                [cash substringToIndex:cash.length - 5];
                cash = [[NSString alloc] initWithFormat:@"%@ %@", [cash substringToIndex:cash.length - 5]  ,[cash substringFromIndex:cash.length - 5]];
            }
            cell.cellValueField.text = cash;
        }
        if (indexPath.row == 4) {
            cell.cellLabelField.text = @"Комментарии";
            cell.cellValueField.text = self.orderModel.personComments;
        }
        return cell;
    }
    
    if (indexPath.section == 2) {
        if (indexPath.row < self.orderModel.orderItems.count) {
            OrderDetailProductCell *cell = [tableView dequeueReusableCellWithIdentifier:@"OrderDetailProductCell"];
            if (cell == nil) {
                [tableView registerNib:[UINib nibWithNibName:@"OrderDetailProductCell" bundle:nil]forCellReuseIdentifier:@"OrderDetailProductCell"];
                cell = [tableView dequeueReusableCellWithIdentifier:@"OrderDetailProductCell"];
            }
        
            OrderItemModel *oim = [self.orderModel.orderItems objectAtIndex:indexPath.row];
            
            if (indexPath.row < 9) {
                cell.productNumber.text = [[NSString alloc] initWithFormat:@" %li.", (long)indexPath.row + 1];
            } else {
                cell.productNumber.text = [[NSString alloc] initWithFormat:@"%li.", (long)indexPath.row + 1];
            }
            cell.productName.text = oim.product.name;
            if (oim.count < 10) {
                cell.productCount.text = [[NSString alloc] initWithFormat:@" %li шт.", (long)oim.count];
            } else {
                cell.productCount.text = [[NSString alloc] initWithFormat:@"%li шт.", (long)oim.count];
            }
            return cell;
        } else {
            OrderDetailInfoCell *cell = [tableView dequeueReusableCellWithIdentifier:@"OrderDetailInfoCell"];
            if (cell == nil) {
                [tableView registerNib:[UINib nibWithNibName:@"OrderDetailInfoCell" bundle:nil]forCellReuseIdentifier:@"OrderDetailInfoCell"];
                cell = [tableView dequeueReusableCellWithIdentifier:@"OrderDetailInfoCell"];
            }
            cell.cellLabelField.text = @"Сумма заказа";
            NSString *orderSum = [[NSString alloc] initWithFormat:@"%li ₸", self.orderModel.orderSum];
            if (orderSum.length > 5) {
                [orderSum substringToIndex:orderSum.length - 5];
                orderSum = [[NSString alloc] initWithFormat:@"%@ %@", [orderSum substringToIndex:orderSum.length - 5]  ,[orderSum substringFromIndex:orderSum.length - 5]];
            }
            cell.cellValueField.text = orderSum;

            return cell;
        }
    }
    
    return nil;
}


-(NSString*) buildStatusString {
    if ([self.orderModel.orderStatus isEqualToString:@"NOT_PROCESSED"] ||
        [self.orderModel.orderStatus isEqualToString:@"NOT_PROCESSED_MOBI"])
        return @"Заказ зарегистрирован";
    if ([self.orderModel.orderStatus isEqualToString:@"PROCESSED"] ||
        [self.orderModel.orderStatus isEqualToString:@"PROCESSED_MOBI"])
        return @"Заказ обработан";
    if ([self.orderModel.orderStatus isEqualToString:@"REGISTERED"])
        return @"Заказ принят";
    if ([self.orderModel.orderStatus isEqualToString:@"WAITING_FOR_PRODUCING"])
        return @"Заказ в очереди";
    if ([self.orderModel.orderStatus isEqualToString:@"ON_PRODUCING"])
        return @"Заказ готовиться";
    if ([self.orderModel.orderStatus isEqualToString:@"WAITING_FOR_DELIVERY"])
        return @"Заказ ожидает доставки";
    if ([self.orderModel.orderStatus isEqualToString:@"ON_DELIVERY"])
        return @"Заказ на доставке";
    if ([self.orderModel.orderStatus isEqualToString:@"DELIVERED"])
        return @"Заказ доставлен";
    if ([self.orderModel.orderStatus isEqualToString:@"CANCELED"])
        return @"Заказ отменен";
    if ([self.orderModel.orderStatus isEqualToString:@"RETURNED"])
        return @"Заказ отозван";
    return nil;
}



-(NSString*) buildAddressString {
    if ([self.orderModel.deliveryType isEqualToString:@"SELF_SERVICE"]) {
        return @"Не указано";
    }
    
    NSString* address = [[NSString alloc] init];
    if (self.orderModel.addressStreetName != nil && ![self.orderModel.addressStreetName isEqualToString:@""]) {
        address = [[NSString alloc] initWithFormat:@"%@", self.orderModel.addressStreetName];
    }
    
    if (self.orderModel.addressHouse != nil && ![self.orderModel.addressHouse isEqualToString:@""]) {
        address = [[NSString alloc] initWithFormat:@"%@, д. %@", address, self.orderModel.addressHouse];
    }
    
    if (self.orderModel.addressCorpus != nil && ![self.orderModel.addressCorpus isEqualToString:@""]) {
        address = [[NSString alloc] initWithFormat:@"%@/%@", address, self.orderModel.addressCorpus];
    }
    
    if (self.orderModel.addressPorch != nil && ![self.orderModel.addressPorch isEqualToString:@""]) {
        address = [[NSString alloc] initWithFormat:@"%@, п. %@", address, self.orderModel.addressPorch];
    }
    
    if (self.orderModel.addressFloor != nil && ![self.orderModel.addressFloor isEqualToString:@""]) {
        address = [[NSString alloc] initWithFormat:@"%@, эт. %@", address, self.orderModel.addressFloor];
    }
    
    if (self.orderModel.addressFlat != nil && ![self.orderModel.addressFlat isEqualToString:@""]) {
        address = [[NSString alloc] initWithFormat:@"%@, кв. %@", address, self.orderModel.addressFlat];
    }
    return address;
}


- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
}

@end
