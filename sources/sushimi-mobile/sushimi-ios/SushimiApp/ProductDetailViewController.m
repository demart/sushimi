//
//  ProductDetailViewController.m
//  SushimiApp
//
//  Created by Artem Demidovich on 2/13/15.
//  Copyright (c) 2015 AphionSoftware. All rights reserved.
//

#import "ProductDetailViewController.h"
#import "ProductTableViewCell.h"
#import "LocalImageCache.h"
#import "CartManager.h"

@interface ProductDetailViewController ()

@property Product *_product;
@property ProductTableViewCell *_parentViewCell;

@property UIImage *loadingImage;

@end

@implementation ProductDetailViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    
    _loadingImage = [UIImage imageNamed:@"loadingImage.png"];
    
    self.navigationItem.title =self._product.name;
    self.navigationItem.backBarButtonItem.title = @"Назад";
    
    self.price.layer.cornerRadius = 2.0f;
    self.addProductToCartButton.layer.cornerRadius = 2.0f;
    self.productAmount.layer.cornerRadius = 2.0f;
    
    _loadImageOperationQueue = [[NSOperationQueue alloc] init];
    [_loadImageOperationQueue setMaxConcurrentOperationCount:5];
    
    self.price.text = [[NSString alloc] initWithFormat:@"%li ₸", (long)self._product.cost];
    self.productTitle.text = self._product.name;
    self.productDescription.text = self._product._description;
    
    NSInteger amountInCart = [[CartManager sharedInstance] getProductCountInCart:self._product];
    if (amountInCart > 0) {
        [self.addProductToCartButton setHidden:YES];
        [self.plusMinusView setHidden:NO];
        [self.productAmount setText:[@(amountInCart) stringValue]];
    } else {
        [self.addProductToCartButton setHidden:NO];
        [self.plusMinusView setHidden:YES];
    }
    
    UIImage *loadedImage =(UIImage *)[LocalImageCache  loadImageFromLocalCache:self._product.imageLink];
    if (loadedImage != nil) {
        self.image.image = loadedImage;
    } else {
        self.image.image = _loadingImage;
    
        NSBlockOperation *loadImageOperation = [[NSBlockOperation alloc] init];
        __weak NSBlockOperation *weakOperation = loadImageOperation;
        [loadImageOperation addExecutionBlock:^(void){
            UIImage *image = [UIImage imageWithData:[NSData dataWithContentsOfURL:[NSURL URLWithString:[NSString stringWithFormat:@"http://sushimi.kz/public/images/menu/items/%@", self._product.imageLink]]] ];
        
            [[NSOperationQueue mainQueue] addOperationWithBlock:^(void) {
                if (! weakOperation.isCancelled) {
                    self.image.image = image;
                    [LocalImageCache  saveImageToLocalCache:self._product.imageLink withData:image];
                    [self.loadImageOperations removeObjectForKey:@"photo"];
                }
            }];
        }];
    
        [_loadImageOperations setObject: loadImageOperation forKey:@"photo"];
        if (loadImageOperation)
            [_loadImageOperationQueue addOperation:loadImageOperation];
    }
}

-(void) viewWillAppear:(BOOL)animated {
    NSInteger amountInCart = [[CartManager sharedInstance] getProductCountInCart:self._product];
    if (amountInCart > 0) {
        [self.addProductToCartButton setHidden:YES];
        [self.plusMinusView setHidden:NO];
        [self.productAmount setText:[@(amountInCart) stringValue]];
    } else {
        [self.addProductToCartButton setHidden:NO];
        [self.plusMinusView setHidden:YES];
    }
}

-(void)setProduct:(Product *)selectedProduct fromCell:(ProductTableViewCell *)cell {
    self._product = selectedProduct;
    self._parentViewCell = cell;
}


-(void) viewWillDisappear:(BOOL)animated {
    [super viewWillDisappear:animated];
    
    [_loadImageOperationQueue cancelAllOperations];
    [_loadImageOperations removeAllObjects];
}

- (IBAction)addProductToCart:(UIButton *)sender {
    [self plusOne:sender];
    [self.addProductToCartButton setHidden:YES];
    [self.plusMinusView setHidden:NO];
    
    [UIView animateWithDuration:0.5 delay:0.0 options:UIViewAnimationOptionCurveEaseIn
        animations:^{}
        completion:^(BOOL fin) {}
     ];
}

- (IBAction)minusOne:(UIButton *)sender {
    NSInteger amount = [[CartManager sharedInstance] removeProductFromCart:self._product];
    if (amount > 0) {
        [self.productAmount setText:[@(amount) stringValue]];
        
        if (self._parentViewCell != nil)
            [self._parentViewCell.currentAmountInBasket setTitle:[@(amount) stringValue] forState:UIControlStateNormal];
    } else {
        [self.addProductToCartButton setHidden:NO];
        [self.plusMinusView setHidden:YES];
        
        if (self._parentViewCell != nil)
            [self._parentViewCell.currentAmountInBasket setTitle:@"+" forState:UIControlStateNormal];
    }
}

- (IBAction)plusOne:(UIButton *)sender {
    NSInteger amount = [[CartManager sharedInstance] addProductToCart:self._product];
    [self.productAmount setText:[@(amount) stringValue]];
    
    if (self._parentViewCell != nil)
        [self._parentViewCell.currentAmountInBasket setTitle:[@(amount) stringValue] forState:UIControlStateNormal];
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
}

@end
