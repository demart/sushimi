//
//  OrderItemTableViewCell.h
//  SushimiApp
//
//  Created by Artem Demidovich on 4/15/15.
//  Copyright (c) 2015 AphionSoftware. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "CartProductModel.h"
#import "CartItem.h"

@interface CartItemTableViewCell : UITableViewCell

@property CartItem *cartItem;
@property SEL addProductToCart;
@property SEL removeProductFromCart;
@property UIViewController *viewController;

-(void)initCell:(CartItem*)cartItem withController:(UIViewController*)controller;

@property (weak, nonatomic) IBOutlet UILabel *productName;
@property (weak, nonatomic) IBOutlet UILabel *productCost;
@property (weak, nonatomic) IBOutlet UILabel *productAmount;
@property (weak, nonatomic) IBOutlet UILabel *productTotalCost;
@property (weak, nonatomic) IBOutlet UIButton *minusButton;
@property (weak, nonatomic) IBOutlet UIButton *plusButton;

- (IBAction)minusProductCount:(UIButton *)sender;
- (IBAction)plusProductCount:(UIButton *)sender;
@end
