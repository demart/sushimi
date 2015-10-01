//
//  CartConactViewController.m
//  SushimiApp
//
//  Created by Artem Demidovich on 4/17/15.
//  Copyright (c) 2015 AphionSoftware. All rights reserved.
//

#import "CartContactViewController.h"

#import "CartManager.h"
#import "CartModel.h"

#import "ContactLoadSettingsCell.h"
#import "ContactSegmentedCell.h"
#import "ContactTextFieldCell.h"
#import "ContactTurnOnOffCell.h"
#import "ContactDeliveryTimeCell.h"
#import "CartContactTableViewHeaderCell.h"

#import "OrderManager.h"
#import "OrderModel.h"

#import "MainTabBarController.h"

#import "TDSemiModal.h"
#import "TDDatePickerController.h"

#import "CompletedOrderTableViewController.h"
#import "DejalActivityView.h"

@interface CartContactViewController ()

@property CartModel *cartModel;
@property NSMutableArray *dataArray;

@property UIActivityIndicatorView *indicator;

// Доставка или самовывоз
@property BOOL isDelivery;
// В течении 1,5 или ко времени
@property BOOL isOnTime;
// Загружены ли данные из настроек
@property BOOL isDataLoadedFromSettings;

@property UIGestureRecognizer *tapper;
@property UITapGestureRecognizer *discountInfoTap;

@end

@implementation CartContactViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    [self.contactTableView setDelegate:self];
    [self.contactTableView setDataSource:self];
    
    self.discountField.layer.cornerRadius = 2.0f;
    [self.contactTableView setBackgroundColor:[UIColor whiteColor]];
    
    self.isDataLoadedFromSettings = NO;
    self.isDelivery = ![[[OrderManager sharedInstance] getRegisterOrderModel].delivery isEqualToString:@"SELF_SERVICE"];
    self.isOnTime = ![[[OrderManager sharedInstance] getRegisterOrderModel].delivery isEqualToString:@"DELIVERY"];
    
    // TO AUTO HIDE KEYBOARD
    self.tapper = [[UITapGestureRecognizer alloc]
              initWithTarget:self action:@selector(hideKeyboardTap:)];
    self.tapper.cancelsTouchesInView = NO;
    [self.view addGestureRecognizer:self.tapper];
    
    self.discountInfoTap = [[UITapGestureRecognizer alloc] initWithTarget:self action:@selector(tappedDiscountInfoIcon)];
    [self.discountField setUserInteractionEnabled:YES];
    [self.discountField addGestureRecognizer:self.discountInfoTap];
    
}

-(void)tappedDiscountInfoIcon {
    CartInfoModel *model = [CartManager sharedInstance].getCartInfo;
    if (model != nil && model.mobileDiscount > 0) {
        if (model.mobileDiscountDescription != nil && ![model.mobileDiscountDescription isEqualToString:@""]) {
            [[[UIAlertView alloc] initWithTitle:@"Скидка" message:model.mobileDiscountDescription delegate:nil cancelButtonTitle:@"OK" otherButtonTitles: nil] show];
        } else {
            [[[UIAlertView alloc] initWithTitle:@"Скидка" message:@"При заказе с мобильного телефона вы получаете дополнительную скидку." delegate:nil cancelButtonTitle:@"OK" otherButtonTitles: nil] show];
        }
    }
}


#pragma mark -

- (void)hideKeyboardTap:(UITapGestureRecognizer *) sender {
    [self.view endEditing:YES];
}


-(void)viewWillAppear:(BOOL)animated {
    [super viewWillAppear:YES];
    [self.contactTableView reloadData];
    [self updateCartView];
}

-(void)updateCartView{
    NSInteger discount = [[CartManager sharedInstance] getCartInfo].mobileDiscount;
    if (discount > 0) {
        [self.discountField setText: [[NSString alloc] initWithFormat:@"Скидка %@%%?", [@(discount) stringValue]]];
    } else {
        [self.discountField setText: nil];
    }
    
    NSInteger orderSum = [[CartManager sharedInstance] getCartTotalSum] * (1 - discount * 0.01);
    [self.totalOrderSum setText: [[NSString alloc] initWithFormat:@"%@ тнг.", [@(orderSum) stringValue]]];
}


- (IBAction)continueOrder:(UIButton *)sender {
    if ([self validateFields] == NO)
        return;
    
    // Send request
    NSLog(@"Sending request");
    [[OrderManager sharedInstance] sendRequestFromController:self];
}


-(BOOL)validateFields {
    RegisterOrderModel *model = [[OrderManager sharedInstance] getRegisterOrderModel];
    if (model.fullname == nil || model.fullname.length < 2) {
        [[[UIAlertView alloc] initWithTitle:@"Внимание" message:@"Необходимо заполнить поле: ФИО*" delegate:nil cancelButtonTitle:@"OK" otherButtonTitles: nil] show];
        return false;
    }
        
    if (model.phone == nil || model.phone.length < 3) {
        [[[UIAlertView alloc] initWithTitle:@"Внимание" message:@"Необходимо заполнить поле: Телефон*" delegate:nil cancelButtonTitle:@"OK" otherButtonTitles: nil] show];
        return false;
    }
    
    if ([model.delivery isEqualToString:@"DELIVERY_IN_TIME"] || [model.delivery isEqualToString:@"SELF_SERVICE"]) {
        if ([model.deliveryTime longLongValue] < 1) {
            if ([model.delivery isEqualToString:@"SELF_SERVICE"]) {
                [[[UIAlertView alloc] initWithTitle:@"Внимание" message:@"Необходимо заполнить поле: Время самовывоза*" delegate:nil cancelButtonTitle:@"OK" otherButtonTitles: nil] show];
            } else {
                [[[UIAlertView alloc] initWithTitle:@"Внимание" message:@"Необходимо заполнить поле: Время доставки*" delegate:nil cancelButtonTitle:@"OK" otherButtonTitles: nil] show];
            }
            return false;
        }
    }
    
    if ([model.delivery isEqualToString:@"DELIVERY"] || [model.delivery isEqualToString:@"DELIVERY_IN_TIME"]) {
        
        if (model.address.streetName == nil || model.address.streetName.length < 2) {
            [[[UIAlertView alloc] initWithTitle:@"Внимание" message:@"Необходимо заполнить поле: Улица*" delegate:nil cancelButtonTitle:@"OK" otherButtonTitles: nil] show];
            return false;
        }
        
        if (model.address.house == nil || model.address.house.length < 1) {
            [[[UIAlertView alloc] initWithTitle:@"Внимание" message:@"Необходимо заполнить поле: Дом*" delegate:nil cancelButtonTitle:@"OK" otherButtonTitles: nil] show];
            return false;
        }
    }
        
    if (model.cash < 1) {
        [[[UIAlertView alloc] initWithTitle:@"Внимание" message:@"Необходимо заполнить поле: Нужна сдача с*" delegate:nil cancelButtonTitle:@"OK" otherButtonTitles: nil] show];
        return false;
    }
    
    return true;
}

-(void) startLoading:(BOOL)animated {
   [DejalBezelActivityView activityViewForView:self.view withLabel:@"Подождите\nОтправляем данные..."];
}

-(void) stopLoading:(BOOL)animated withError:(NSString *)errorMessage {
    [DejalBezelActivityView removeViewAnimated:YES];
    if (errorMessage != nil){
        [[[UIAlertView alloc] initWithTitle:@"Ошибка" message:errorMessage delegate:nil cancelButtonTitle:@"OK" otherButtonTitles: nil] show];
        return;
    }
    
    // GO TO NEXT SCREEN MEANS SUCC SENT REQUEST
    [MainTabBarController setCartValue:0];
    [self performSegueWithIdentifier:@"ContactToCompletedOrder" sender:self];
}



 #pragma mark - Navigation
 - (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
     if ([segue.destinationViewController isKindOfClass:[CompletedOrderTableViewController class]]) {
         NSString *key = ((OrderModel *)self.item).key;
         [(CompletedOrderTableViewController *)segue.destinationViewController setOrderKey:key];
         NSLog(@"Cart Contact -> Completed Order");
     }
 }


- (NSInteger)numberOfSectionsInTableView:(UITableView *)tableView {
    if (self.isDelivery)
        return 5;
    return 4;
}

-(UIView *)tableView:(UITableView *)tableView viewForHeaderInSection:(NSInteger)section {
    CartContactTableViewHeaderCell*  headerCell = (CartContactTableViewHeaderCell*)[self.contactTableView dequeueReusableCellWithIdentifier:@"HeaderCell"];
    if (headerCell == nil) {
        [tableView registerNib:[UINib nibWithNibName:@"CartContactTableViewHeaderCell" bundle:nil]forCellReuseIdentifier:@"HeaderCell"];
        headerCell = [tableView dequeueReusableCellWithIdentifier:@"HeaderCell"];
    }

    if(section == 0)
        headerCell.HeaderTitle.text = @"ВАШИ КОНТАКТНЫЕ ДАННЫЕ";
    if(section == 1)
        headerCell.HeaderTitle.text = @"СПОСОБ ДОСТАВКИ";
    if(section == 2) {
        if (self.isDelivery)
            headerCell.HeaderTitle.text = @"АДРЕС ДОСТАВКИ";
        else
            headerCell.HeaderTitle.text = @"ОПЛАТА";
    }
    if(section == 3) {
        if (self.isDelivery)
            headerCell.HeaderTitle.text = @"ОПЛАТА";
        else
            headerCell.HeaderTitle.text = @"ДОПОЛНИТЕЛЬНО";
    }
    
    if(section == 4)
        headerCell.HeaderTitle.text = @"ДОПОЛНИТЕЛЬНО";
    
    return headerCell;
}

-(CGFloat)tableView:(UITableView *)tableView heightForFooterInSection:(NSInteger)section {
    return 0;
}

- (CGFloat)tableView:(UITableView *)tableView heightForHeaderInSection:(NSInteger)section {
    return 40;
}

-(UIView*) tableView:(UITableView *)tableView viewForFooterInSection:(NSInteger)section{
    CartContactTableViewHeaderCell*  headerCell = (CartContactTableViewHeaderCell*)[self.contactTableView dequeueReusableCellWithIdentifier:@"HeaderCell"];
    if (headerCell == nil) {
        [tableView registerNib:[UINib nibWithNibName:@"CartContactTableViewHeaderCell" bundle:nil]forCellReuseIdentifier:@"HeaderCell"];
        headerCell = [tableView dequeueReusableCellWithIdentifier:@"HeaderCell"];
    }
    headerCell.HeaderTitle.text = nil;
    return headerCell;
}


- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section {
    if (section == 0) {
        if (self.isDataLoadedFromSettings)
            return 2;
        return 3;
    }
    
    if (section == 1) {
        if (!self.isDelivery)
            return 2;
        if (self.isOnTime)
            return 3;
        return 2;
    }
    
    if (section == 2) {
        if (self.isDelivery)
            return 5;
        return 1;
    }
    
    if (section == 3) {
        if (self.isDelivery)
            return 1;
        return 2;
    }
    
    if (section == 4)
        return 2;
    
    return 0;
}

- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath {

    static NSString *ContactTextFieldIdentifier = @"ContactTextFieldCell";
    static NSString *ContactSegmentedFieldIdentifier = @"ContactSegmentedCell";
    static NSString *ContactTurnOnOffIdentifier = @"ContactTurnOnOffCell";
    static NSString *ContactDeliveryTimeCellIdentifier = @"ContactDeliveryTimeCell";
    static NSString *ContactLoadSettingsCellIdentifier = @"ContactLoadSettingsCell";

    //Contact Info
    if (indexPath.section == 0) {
        if (self.isDataLoadedFromSettings == NO) {
            if (indexPath.row == 0) {
                ContactLoadSettingsCell *cell = [tableView dequeueReusableCellWithIdentifier:ContactLoadSettingsCellIdentifier];
                if (cell == nil) {
                    [tableView registerNib:[UINib nibWithNibName:@"ContactLoadSettingsCell" bundle:nil]forCellReuseIdentifier:ContactLoadSettingsCellIdentifier];
                    cell = [tableView dequeueReusableCellWithIdentifier:ContactLoadSettingsCellIdentifier];
                }

                [cell.loadSettings addTarget:self
                                   action:@selector(loadSettingsTouchedUp:)
                                   forControlEvents:UIControlEventTouchUpInside];
                return cell;
            }
        
            ContactTextFieldCell *cell = [tableView dequeueReusableCellWithIdentifier:ContactTextFieldIdentifier];
            if (cell == nil) {
                [tableView registerNib:[UINib nibWithNibName:@"ContactTextFieldCell" bundle:nil]forCellReuseIdentifier:ContactTextFieldIdentifier];
                cell = [tableView dequeueReusableCellWithIdentifier:ContactTextFieldIdentifier];
            }
            
            if (indexPath.row == 1) {
                [cell initCell:[[OrderManager sharedInstance] getRegisterOrderModel] withField:@"fullname" withLabelText:@"ФИО*" withKeyboardType:UIKeyboardTypeDefault];
                return cell;
            }
            if (indexPath.row == 2) {
                [cell initCell:[[OrderManager sharedInstance] getRegisterOrderModel] withField:@"phone" withLabelText:@"Телефон*" withKeyboardType:UIKeyboardTypeNumberPad];
                return cell;
            }
        } else {
            ContactTextFieldCell *cell = [tableView dequeueReusableCellWithIdentifier:ContactTextFieldIdentifier];
            if (cell == nil) {
                [tableView registerNib:[UINib nibWithNibName:@"ContactTextFieldCell" bundle:nil]forCellReuseIdentifier:ContactTextFieldIdentifier];
                cell = [tableView dequeueReusableCellWithIdentifier:ContactTextFieldIdentifier];
            }
            
            if (indexPath.row == 0) {
                [cell initCell:[[OrderManager sharedInstance] getRegisterOrderModel] withField:@"fullname" withLabelText:@"ФИО*" withKeyboardType:UIKeyboardTypeDefault];
                return cell;
            }
            if (indexPath.row == 1) {
                [cell initCell:[[OrderManager sharedInstance] getRegisterOrderModel] withField:@"phone" withLabelText:@"Телефон*" withKeyboardType:UIKeyboardTypeNumberPad];
                return cell;
            }
        }
    }
    
    // Delivery Type
    if (indexPath.section == 1) {
        if (indexPath.row == 0) {
            ContactSegmentedCell *cell = [tableView dequeueReusableCellWithIdentifier:ContactSegmentedFieldIdentifier];
            if (cell == nil) {
                [tableView registerNib:[UINib nibWithNibName:@"ContactSegmentedCell" bundle:nil]forCellReuseIdentifier:ContactSegmentedFieldIdentifier];
                cell = [tableView dequeueReusableCellWithIdentifier:ContactSegmentedFieldIdentifier];
            }
            
            [cell.cellSegmentField removeAllSegments];
            [cell.cellSegmentField removeTarget:self action:@selector(deliveryTypeSelected:) forControlEvents:UIControlEventValueChanged];
            [cell.cellSegmentField removeTarget:self action:@selector(deliveryTimeSelected:) forControlEvents:UIControlEventValueChanged];
            
            [cell.cellSegmentField insertSegmentWithTitle:@"Доставка" atIndex:0 animated:NO];
            [cell.cellSegmentField insertSegmentWithTitle:@"Самовывоз" atIndex:1 animated:NO];
            if (self.isDelivery) {
                cell.cellSegmentField.selectedSegmentIndex = 0;
                [[OrderManager sharedInstance] getRegisterOrderModel].delivery = @"DELIVERY";
            } else {
                cell.cellSegmentField.selectedSegmentIndex = 1;
                [[OrderManager sharedInstance] getRegisterOrderModel].delivery = @"SELF_SERVICE";
            }
            [cell.cellSegmentField addTarget:self
                                      action:@selector(deliveryTypeSelected:)
                       forControlEvents:UIControlEventValueChanged];
            
            return cell;
        }
        
        if (indexPath.row == 1) {
            if (self.isDelivery) {
                ContactTurnOnOffCell *cell = [tableView dequeueReusableCellWithIdentifier:ContactTurnOnOffIdentifier];
                if (cell == nil) {
                    [tableView registerNib:[UINib nibWithNibName:@"ContactTurnOnOffCell" bundle:nil]forCellReuseIdentifier:ContactTurnOnOffIdentifier];
                    cell = [tableView dequeueReusableCellWithIdentifier:ContactTurnOnOffIdentifier];
                }
            
                if (!self.isOnTime) {
                    cell.deliveryOnTimeSegment.selectedSegmentIndex = 0;
                } else {
                    cell.deliveryOnTimeSegment.selectedSegmentIndex = 1;
                    if (self.isDelivery)
                        [[OrderManager sharedInstance] getRegisterOrderModel].delivery = @"DELIVERY_IN_TIME";
                }
            
                [cell.deliveryOnTimeSegment addTarget:self
                                      action:@selector(deliveryTimeSelected:)
                            forControlEvents:UIControlEventValueChanged];
                return cell;
            } else {
                ContactDeliveryTimeCell *cell = [tableView dequeueReusableCellWithIdentifier:ContactDeliveryTimeCellIdentifier];
                if (cell == nil) {
                    [tableView registerNib:[UINib nibWithNibName:@"ContactDeliveryTimeCell" bundle:nil]forCellReuseIdentifier:ContactDeliveryTimeCellIdentifier];
                    cell = [tableView dequeueReusableCellWithIdentifier:ContactDeliveryTimeCellIdentifier];
                }
                [cell initCell:[[OrderManager sharedInstance] getRegisterOrderModel] withParentView:self.view withLabel:@"Время самовывоза*"];
                return cell;
            }
        }
        
        if (indexPath.row == 2) {
            ContactDeliveryTimeCell *cell = [tableView dequeueReusableCellWithIdentifier:ContactDeliveryTimeCellIdentifier];
            if (cell == nil) {
                [tableView registerNib:[UINib nibWithNibName:@"ContactDeliveryTimeCell" bundle:nil]forCellReuseIdentifier:ContactDeliveryTimeCellIdentifier];
                cell = [tableView dequeueReusableCellWithIdentifier:ContactDeliveryTimeCellIdentifier];
            }
            [cell initCell:[[OrderManager sharedInstance] getRegisterOrderModel] withParentView:self.view withLabel:@"Время доставки*"];
            return cell;
        }
        
    }
    
    // Address
    if (indexPath.section == 2) {
        ContactTextFieldCell *cell = [tableView dequeueReusableCellWithIdentifier:ContactTextFieldIdentifier];
        if (cell == nil) {
            [tableView registerNib:[UINib nibWithNibName:@"ContactTextFieldCell" bundle:nil]forCellReuseIdentifier:ContactTextFieldIdentifier];
            cell = [tableView dequeueReusableCellWithIdentifier:ContactTextFieldIdentifier];
        }
        
        if (self.isDelivery) {
         // Address
            if (indexPath.row == 0)
               [cell initCell:[[OrderManager sharedInstance] getRegisterOrderModel] withField:@"addressStreetName" withLabelText:@"Улица*" withKeyboardType:UIKeyboardTypeDefault];
            if (indexPath.row == 1)
                [cell initCell:[[OrderManager sharedInstance] getRegisterOrderModel] withField:@"addressHouse" withLabelText:@"Дом*" withKeyboardType:UIKeyboardTypeDefault];
            if (indexPath.row == 2)
                [cell initCell:[[OrderManager sharedInstance] getRegisterOrderModel] withField:@"addressFlat" withLabelText:@"Квартира" withKeyboardType:UIKeyboardTypeDefault];
            if (indexPath.row == 3)
                [cell initCell:[[OrderManager sharedInstance] getRegisterOrderModel] withField:@"addressPorch" withLabelText:@"Подъезд" withKeyboardType:UIKeyboardTypeDefault];
            if (indexPath.row == 4)
                [cell initCell:[[OrderManager sharedInstance] getRegisterOrderModel] withField:@"addressFloor" withLabelText:@"Этаж" withKeyboardType:UIKeyboardTypeDefault];
        } else {
            // Cash
            [cell initCell:[[OrderManager sharedInstance] getRegisterOrderModel] withField:@"cash" withLabelText:@"Нужна сдача с*" withKeyboardType:UIKeyboardTypeNumberPad];
        }
        return cell;
    }
    
    // Payment
    if (indexPath.section == 3) {
        ContactTextFieldCell *cell = [tableView dequeueReusableCellWithIdentifier:ContactTextFieldIdentifier];
        if (cell == nil) {
            [tableView registerNib:[UINib nibWithNibName:@"ContactTextFieldCell" bundle:nil]forCellReuseIdentifier:ContactTextFieldIdentifier];
            cell = [tableView dequeueReusableCellWithIdentifier:ContactTextFieldIdentifier];
        }
        
        if (self.isDelivery) {
            // CASH
            [cell initCell:[[OrderManager sharedInstance] getRegisterOrderModel] withField:@"cash" withLabelText:@"Нужна сдача с*" withKeyboardType:UIKeyboardTypeNumberPad];
            
        } else {
            // ADDITIONALS
            if (indexPath.row == 0)
                [cell initCell:[[OrderManager sharedInstance] getRegisterOrderModel] withField:@"personCount" withLabelText:@"Кол-во персон" withKeyboardType:UIKeyboardTypeNumberPad];
            
            if (indexPath.row == 1)
                [cell initCell:[[OrderManager sharedInstance] getRegisterOrderModel] withField:@"comment" withLabelText:@"Комментарий" withKeyboardType:UIKeyboardTypeDefault];
        }
        return cell;
    }
    
    // Additionals
    if (indexPath.section == 4) {
        ContactTextFieldCell *cell = [tableView dequeueReusableCellWithIdentifier:ContactTextFieldIdentifier];
        if (cell == nil) {
            [tableView registerNib:[UINib nibWithNibName:@"ContactTextFieldCell" bundle:nil]forCellReuseIdentifier:ContactTextFieldIdentifier];
            cell = [tableView dequeueReusableCellWithIdentifier:ContactTextFieldIdentifier];
        }

        if (indexPath.row == 0)
            [cell initCell:[[OrderManager sharedInstance] getRegisterOrderModel] withField:@"personCount" withLabelText:@"Кол-во персон" withKeyboardType:UIKeyboardTypeNumberPad];

        if (indexPath.row == 1)
            [cell initCell:[[OrderManager sharedInstance] getRegisterOrderModel] withField:@"comment" withLabelText:@"Комментарий" withKeyboardType:UIKeyboardTypeDefault];
        return cell;
    }
    
    return nil;
}

- (void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath {
    [self.contactTableView deselectRowAtIndexPath:indexPath animated:YES];
}


- (void)tableView:(UITableView *)tableView willDisplayCell:(UITableViewCell *)cell forRowAtIndexPath:(NSIndexPath *)indexPath {
    cell.selectionStyle = UITableViewCellSelectionStyleNone;
    if ([cell respondsToSelector:@selector(setSeparatorInset:)])
        [cell setSeparatorInset:UIEdgeInsetsZero];
    if ([cell respondsToSelector:@selector(setPreservesSuperviewLayoutMargins:)])
        [cell setPreservesSuperviewLayoutMargins:NO];
    if ([cell respondsToSelector:@selector(setLayoutMargins:)])
        [cell setLayoutMargins:UIEdgeInsetsZero];
    
}

    
-(void)loadSettingsTouchedUp:(UIButton *) button {
    self.isDataLoadedFromSettings = YES;
    [[OrderManager sharedInstance] loadContactDataFromSettings];
    [self.contactTableView reloadData];
}

-(void)deliveryTypeSelected:(UISegmentedControl *)segment {
    if(segment.selectedSegmentIndex==0) {
        self.isDelivery = YES;
        [[OrderManager sharedInstance] getRegisterOrderModel].delivery = @"DELIVERY";
    } else {
        self.isDelivery = NO;
        [[OrderManager sharedInstance] getRegisterOrderModel].delivery = @"SELF_SERVICE";
    }
    [self.contactTableView reloadData];
}

-(void)deliveryTimeSelected:(UISegmentedControl *)segment {
    if(segment.selectedSegmentIndex==0) {
        self.isOnTime = NO;
    } else {
        self.isOnTime = YES;
        if (self.isDelivery)
            [[OrderManager sharedInstance] getRegisterOrderModel].delivery = @"DELIVERY_IN_TIME";
    }
    [self.contactTableView reloadData];
}



- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
}


@end
