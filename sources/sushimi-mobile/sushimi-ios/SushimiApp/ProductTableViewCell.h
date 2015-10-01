//
//  ProductTableViewCell.h
//  SushimiApp
//
//  Created by Artem Demidovich on 2/28/15.
//  Copyright (c) 2015 AphionSoftware. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "Product.h"

@interface ProductTableViewCell : UITableViewCell

-(void)initProductCell:(Product*)product;

@property Product *product;
@property (weak, atomic) IBOutlet UIImageView *image;
@property (weak, nonatomic) IBOutlet UILabel *title;
@property (weak, nonatomic) IBOutlet UILabel *price;
@property (weak, nonatomic) IBOutlet UIView *gradientView;
- (IBAction)showProductOrderView:(UIButton *)sender;
@property (weak, nonatomic) IBOutlet UIView *currentAmountInBasketView;
@property (weak, nonatomic) IBOutlet UIButton *currentAmountInBasket;
@property (weak, nonatomic) IBOutlet UIButton *closeProductButton;
@property (weak, nonatomic) IBOutlet UIView *priceView;


-(void)buildGradient:(CGRect) bounds;

@property (weak, nonatomic) IBOutlet UIView *productOrderView;
@property (weak, nonatomic) IBOutlet UILabel *amountOfProducts;

- (IBAction)closeProductOrderView:(UIButton *)sender;
- (IBAction)minusOneProduct:(UIButton *)sender;
- (IBAction)plusOneProduct:(UIButton *)sender;


@end
