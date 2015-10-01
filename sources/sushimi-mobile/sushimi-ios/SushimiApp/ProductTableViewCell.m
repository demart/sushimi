//
//  ProductTableViewCell.m
//  SushimiApp
//
//  Created by Artem Demidovich on 2/28/15.
//  Copyright (c) 2015 AphionSoftware. All rights reserved.
//

#import "ProductTableViewCell.h"
#import "CartManager.h"

@implementation ProductTableViewCell

static UIColor *green;
static UIColor *orageColor;
static UIColor *addedToCartColor;

- (void)awakeFromNib {
    green = [UIColor colorWithRed:102/255.0f green:204.0f/255.0f blue:102.0f/255.0f alpha:1.0f];
    orageColor = [UIColor colorWithRed:255/255.0f green:153.0f/255.0f blue:0.0f/255.0f alpha:1.0f];
    addedToCartColor = orageColor;
    
    self.currentAmountInBasketView.layer.cornerRadius = 2.0f;
    self.currentAmountInBasket.layer.cornerRadius = 2.0f;
    self.priceView.layer.cornerRadius = 2.0f;
    self.closeProductButton.layer.cornerRadius = 2.0f;
}

- (void)setSelected:(BOOL)selected animated:(BOOL)animated {
    [super setSelected:selected animated:animated];
}


-(void)initProductCell:(Product *)product {
    self.product = product;
    self.title.text = product.name;
    self.price.text = [[NSString alloc] initWithFormat:@"%@ ₸", [@(product.cost) stringValue]];
    
    NSInteger amount = [[CartManager sharedInstance] getProductCountInCart:self.product];
    if (amount > 0) {
        [self.currentAmountInBasket setTitle:[@(amount) stringValue] forState:UIControlStateNormal];
        [self.currentAmountInBasket setBackgroundColor:addedToCartColor];
        
        [self.amountOfProducts setText:[@(amount) stringValue]];
    } else {
        [self.currentAmountInBasket setTitle:@"+" forState:UIControlStateNormal];
        [self.currentAmountInBasket setBackgroundColor:green];
        
        [self.amountOfProducts setText:@"1"];
    }
    
}

- (IBAction)showProductOrderView:(UIButton *)sender {
    self.productOrderView.alpha = .0;
    self.productOrderView.backgroundColor=[green colorWithAlphaComponent:.0];
    [self.productOrderView setHidden:NO];
    
    [UIView animateWithDuration:0.2
        delay:0.0
        options:UIViewAnimationOptionBeginFromCurrentState
        animations:^{
            self.productOrderView.backgroundColor=[green colorWithAlphaComponent:.6];
            self.productOrderView.alpha = 1;
        }
        completion:^(BOOL fin) {
            if (fin) {
                NSInteger amount = [[CartManager sharedInstance] getProductCountInCart:self.product];
                if (amount < 1)
                    [self plusOneProduct:sender];
            }
        }];
}

- (IBAction)closeProductOrderView:(UIButton *)sender {
    self.productOrderView.alpha = 1;
    self.productOrderView.backgroundColor=[green colorWithAlphaComponent:.6];
    [UIView animateWithDuration:0.2
        delay:0.0
        options:UIViewAnimationOptionBeginFromCurrentState
        animations:^{
            self.productOrderView.backgroundColor=[green colorWithAlphaComponent:.0];
            self.productOrderView.alpha = 0.0;
        }
        completion:^(BOOL fin) {
            if (fin)
                [self.productOrderView setHidden:YES];
        }];
}

- (IBAction)minusOneProduct:(UIButton *)sender {
    NSInteger amount = [[CartManager sharedInstance] removeProductFromCart:self.product];
    if (amount == 0) {
        [self.currentAmountInBasket setTitle:@"+" forState:UIControlStateNormal];
        [self.currentAmountInBasket setBackgroundColor:green];
        
        [self closeProductOrderView:nil];
    } else {
        [self.amountOfProducts setText:[@(amount) stringValue]];
        [self.currentAmountInBasket setTitle:[@(amount) stringValue] forState:UIControlStateNormal];
        [self.currentAmountInBasket setBackgroundColor:addedToCartColor];
        
    }
    
}

- (IBAction)plusOneProduct:(UIButton *)sender {
    NSInteger amount = [[CartManager sharedInstance] addProductToCart:self.product];
    [self.currentAmountInBasket setTitle:[@(amount) stringValue] forState:UIControlStateNormal];
    [self.currentAmountInBasket setBackgroundColor:addedToCartColor];
    
    [self.amountOfProducts setText:[@(amount) stringValue]];
}

-(void)buildGradient:(CGRect) bounds {
    UIColor *white = [UIColor colorWithRed:0/255.0f green:0.0f/255.0f blue:0.0f/255.0f alpha:0.0f];
    
    UIView* view = self.gradientView;
    for (CALayer *layer in view.layer.sublayers)
        [layer removeFromSuperlayer];
    
    CAGradientLayer *gradient = [CAGradientLayer layer];
    gradient.frame = bounds;
    gradient.colors = [NSArray arrayWithObjects:(id)[green CGColor], (id)[white CGColor],nil];
    gradient.locations = [NSArray arrayWithObjects:
                          [NSNumber numberWithFloat:0],
                          [NSNumber numberWithFloat:0.4f],
                          nil];
    gradient.opacity = 0.8f;
    
    [view.layer insertSublayer:gradient atIndex:0];
}

@end
