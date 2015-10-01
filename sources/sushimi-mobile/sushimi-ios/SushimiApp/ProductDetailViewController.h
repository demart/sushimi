//
//  ProductDetailViewController.h
//  SushimiApp
//
//  Created by Artem Demidovich on 2/13/15.
//  Copyright (c) 2015 AphionSoftware. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "Product.h"
#import "ProductTableViewCell.h"

@interface ProductDetailViewController : UIViewController

@property (weak, nonatomic) IBOutlet UIImageView *image;
@property (weak, nonatomic) IBOutlet UILabel *price;
@property (weak, nonatomic) IBOutlet UILabel *productTitle;
@property (weak, nonatomic) IBOutlet UILabel *productDescription;

-(void)setProduct:(Product *)selectedProduct fromCell:(ProductTableViewCell*)cell;

@property NSOperationQueue *loadImageOperationQueue;
@property NSMutableDictionary *loadImageOperations;

- (IBAction)addProductToCart:(UIButton *)sender;
@property (weak, nonatomic) IBOutlet UIButton *addProductToCartButton;

@property (weak, nonatomic) IBOutlet UIView *plusMinusView;
- (IBAction)minusOne:(UIButton *)sender;
- (IBAction)plusOne:(UIButton *)sender;
@property (weak, nonatomic) IBOutlet UIView *productAmountView;
@property (weak, nonatomic) IBOutlet UILabel *productAmount;



@end
