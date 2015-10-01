//
//  OrderItemTableViewCell.m
//  SushimiApp
//
//  Created by Artem Demidovich on 4/15/15.
//  Copyright (c) 2015 AphionSoftware. All rights reserved.
//

#import "CartItemTableViewCell.h"
#import "CartItem.h"
#import "CartProductModel.h"
#import "LocalImageCache.h"
#import "Product.h"
#import "CartManager.h"
#import "DataManager.h"

@implementation CartItemTableViewCell

- (void)awakeFromNib {
    self.minusButton.layer.cornerRadius = 3.0;
    self.plusButton.layer.cornerRadius = 3.0;
    self.productAmount.layer.masksToBounds = YES;
    self.productAmount.layer.cornerRadius = 10.0;
}

- (void)setSelected:(BOOL)selected animated:(BOOL)animated {
    [super setSelected:selected animated:animated];
}


-(void)initCell:(CartItem*)cartItem
    withController:(UIViewController*)controller {
    self.cartItem = cartItem;
    [self.productName setText:cartItem.product.name];
    [self.productAmount setText:[@([cartItem getTotalAmount]) stringValue]];
    [self.productCost setText:[[NSString alloc] initWithFormat:@"%@ ₸", [@(cartItem.product.cost) stringValue]]];
    if (self.productCost.text.length > 5) {
        [self.productCost.text substringToIndex:self.productCost.text.length - 5];
        self.productCost.text = [[NSString alloc] initWithFormat:@"%@ %@", [self.productCost.text substringToIndex:self.productCost.text.length - 5]  ,[self.productCost.text substringFromIndex:self.productCost.text.length - 5]];
    }
    [self.productTotalCost setText:[[NSString alloc] initWithFormat:@"%@ ₸", [@([cartItem getTotalCost]) stringValue]]];
    if (self.productTotalCost.text.length > 5) {
        [self.productTotalCost.text substringToIndex:self.productTotalCost.text.length - 5];
        self.productTotalCost.text = [[NSString alloc] initWithFormat:@"%@ %@", [self.productTotalCost.text substringToIndex:self.productTotalCost.text.length - 5]  ,[self.productTotalCost.text substringFromIndex:self.productTotalCost.text.length - 5]];
    }
    
    self.viewController = controller;
}

- (IBAction)minusProductCount:(UIButton *)sender {
    [self.viewController performSelector:@selector(removeProductFromCartSelector:) withObject:(id)self.cartItem];
}

- (IBAction)plusProductCount:(UIButton *)sender {
    [self.viewController performSelector:@selector(addProductToCartSelector:) withObject:(id)self.cartItem];
}
@end
