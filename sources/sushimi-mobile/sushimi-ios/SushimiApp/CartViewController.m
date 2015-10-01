//
//  OrderViewController.m
//  SushimiApp
//
//  Created by Artem Demidovich on 4/15/15.
//  Copyright (c) 2015 AphionSoftware. All rights reserved.
//

#import "CartViewController.h"
#import "CartItemTableViewCell.h"
#import "CartManager.h"

#import "CartModel.h"
#import "CartItem.h"
#import "CartProductModel.h"
#import "CartContactViewController.h"

#import "ProductDetailViewController.h"
#import "DataManager.h"

#import "DejalActivityView.h"
#import "DataLoadingErrorView.h"

@interface CartViewController ()

@property UIActivityIndicatorView *indicator;
@property UITapGestureRecognizer *discountInfoTap;
@property DataLoadingErrorView *dataLoadingErrorView;

@end

@implementation CartViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    
    [self.cartTableView setDelegate:self];
    [self.cartTableView setDataSource:self];

    self.discountField.layer.cornerRadius = 2.0f;
    self.cartTableView.tableFooterView = [[UIView alloc] initWithFrame:CGRectZero];
    
    self.discountInfoTap = [[UITapGestureRecognizer alloc] initWithTarget:self action:@selector(tappedDiscountInfoIcon)];
    [self.discountField setUserInteractionEnabled:YES];
    [self.discountField addGestureRecognizer:self.discountInfoTap];
    
    [self showEmptyCartView];
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


-(void)viewWillAppear:(BOOL)animated {
    [super viewWillAppear:animated];
    [[CartManager sharedInstance] prepareCart:self];
}

-(void)addProductToCartSelector:(CartItem*)cartItem {
    [[CartManager sharedInstance] addProductToCart:self cartItem:cartItem];
}

-(void)removeProductFromCartSelector:(CartItem*)cartItem {
    [[CartManager sharedInstance] removeProductFromCart:self cartItem:cartItem];
}


#pragma mark - Navigation

- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
    
    if ([segue.destinationViewController isKindOfClass:[CartContactViewController class]]) {
    }
    if ([segue.destinationViewController isKindOfClass:[ProductDetailViewController class]]) {
        NSIndexPath *path = [self.cartTableView indexPathForSelectedRow];
        CartItemTableViewCell* cell = (CartItemTableViewCell*)[self.cartTableView cellForRowAtIndexPath:path];
        if (cell != nil) {
            [(ProductDetailViewController *)segue.destinationViewController setProduct:cell.cartItem.product fromCell:nil];
        }
    }
}

-(void) tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath {
    [self performSegueWithIdentifier:@"CartToProductDetail" sender:self];
}

- (IBAction)continueOrder:(UIButton *)sender {
    [self performSegueWithIdentifier:@"CartToContact" sender:self];
}


- (IBAction)showOrderHistory:(UIBarButtonItem *)sender {
    [self performSegueWithIdentifier:@"CartToOrders" sender:self];
}


-(void) startLoading:(BOOL)animated {
    [DataLoadingErrorView hideDataLoadingErrorView:self.dataLoadingErrorView];
    [self hideEmptyCartView];
    [DejalBezelActivityView activityViewForView:self.view withLabel:@"Подождите\nИдет загрузка..."];
}

-(void) stopLoading:(BOOL)animated withError:(NSString *)errorMessage {
    [DejalBezelActivityView removeViewAnimated:YES];
    
    if (errorMessage != nil){
        self.dataLoadingErrorView = [DataLoadingErrorView showDataLoadingErrorView:self withRefreshSelector:@selector(reloadData:)];
        return;
    }
    
    [self updateCartView];
    [self.cartTableView reloadData];
}

-(void)reloadData:(NSObject *) sender {
    [[CartManager sharedInstance] prepareCart:self];
}

-(void)updateCartView{
    if (self.items != nil) {
        if (self.items.count == 0) {
            [self showEmptyCartView];
            return;
        } else {
            [self hideEmptyCartView];
        }
        
        // Add discount
        NSInteger discount = [[CartManager sharedInstance] getCartInfo].mobileDiscount;
        if (discount > 0) {
            [self.discountField setText: [[NSString alloc] initWithFormat:@"Скидка %@%%?", [@(discount) stringValue]]];
            [self.discountField setHidden:NO];
        } else {
            [self.discountField setText: nil];
            [self.discountField setHidden:YES];
        }
        
        NSInteger orderSum = [[CartManager sharedInstance] getCartTotalSum] * (1 - discount * 0.01);
        [self.totalOrderSum setText: [[NSString alloc] initWithFormat:@"%@ тнг.", [@(orderSum) stringValue]]];
        
        /*
        if (self.cartModel.sum >= self.cartModel.minSum) {
            [self.continueOrderButton setEnabled:YES];
        } else {
            [self.continueOrderButton setEnabled:NO];
        }
         */
        
    } else {
        [self.totalOrderSum setText: @"0 тнг"];
        [self.continueOrderButton setEnabled:NO];
        [self showEmptyCartView];
    }
    
    
}

#pragma mark - Please add something to your cart View

UIView *emptyCartView;
UIView *emptyCartBorderView;

-(void) showEmptyCartView {
    if (emptyCartView == nil) {
        emptyCartView = [[UIView alloc] initWithFrame:CGRectZero];
        emptyCartView.opaque = NO;
        emptyCartView.autoresizingMask = UIViewAutoresizingFlexibleLeftMargin | UIViewAutoresizingFlexibleRightMargin | UIViewAutoresizingFlexibleTopMargin | UIViewAutoresizingFlexibleBottomMargin;
        emptyCartView.backgroundColor = [UIColor whiteColor];
        emptyCartView.frame = self.view.frame;
        
        emptyCartBorderView = [[UIView alloc] initWithFrame:CGRectZero];
        CGRect borderFrame = CGRectZero;
        borderFrame.size.width = 200.0;
        borderFrame.size.height = 100;
        borderFrame.origin.x = floor(0.5 * (emptyCartView.frame.size.width - borderFrame.size.width));
        borderFrame.origin.y = floor(0.5 * (emptyCartView.frame.size.height - borderFrame.size.height - 20.0));
        emptyCartBorderView.frame = borderFrame;
        emptyCartBorderView.autoresizingMask = UIViewAutoresizingFlexibleWidth | UIViewAutoresizingFlexibleHeight;
        emptyCartBorderView.backgroundColor = [UIColor colorWithRed:102/255.0f
                                                        green:204.0f/255.0f
                                                         blue:102.0f/255.0f
                                                        alpha:0.80f];
        
        [emptyCartView addSubview:emptyCartBorderView];
        
        UILabel *title = [[UILabel alloc] initWithFrame:CGRectZero];
        [title setText:@"Ваша корзина пуста"];
        title.textColor = [UIColor whiteColor];
        title.backgroundColor = [UIColor clearColor];
        title.font = [UIFont fontWithName:@"Gill Sans" size:17.0];
        
        [title  setTextAlignment:NSTextAlignmentCenter];
         CGRect titleLabelFrame = CGRectZero;
        titleLabelFrame.size.width = 200.0 - 10.0;
        titleLabelFrame.size.height = 22;
        titleLabelFrame.origin.x = 5;
        titleLabelFrame.origin.y = 10;
        title.frame = titleLabelFrame;
        [emptyCartBorderView addSubview:title];
        
        
        UIButton *button = [[UIButton alloc] initWithFrame:CGRectZero];
        [button setTitle:@"Заказать" forState:UIControlStateNormal];
        [button setTitleColor:[UIColor whiteColor] forState:UIControlStateNormal];
        
        [button setTitle:@"Заказать" forState:UIControlStateSelected];
        
        button.backgroundColor = [UIColor orangeColor];
        button.titleLabel.font = [UIFont fontWithName:@"Gill Sans" size:17.0];
        button.titleLabel.textAlignment = NSTextAlignmentCenter;
        
        [button addTarget:self action:@selector(orderSomethingButtonClicked:) forControlEvents:UIControlEventTouchUpInside];
        
        CGRect buttonLabelFrame = CGRectZero;
        buttonLabelFrame.size.width = 200.0 - 50.0;
        buttonLabelFrame.size.height = 32;
        buttonLabelFrame.origin.x = 25;
        buttonLabelFrame.origin.y = 50;
        button.frame = buttonLabelFrame;
        [emptyCartBorderView addSubview:button];
        
        emptyCartBorderView.layer.cornerRadius = 10.0;
    }
    
    [self.view addSubview:emptyCartView];
    [self.view bringSubviewToFront:emptyCartView];
}

-(void) hideEmptyCartView {
    if (emptyCartView != nil)
        [emptyCartView removeFromSuperview];
    emptyCartView = nil;
}


-(void) orderSomethingButtonClicked:(UIButton*) sender{
    [self.tabBarController setSelectedIndex:0];
}

#pragma mark - Table view data source


- (NSInteger)numberOfSectionsInTableView:(UITableView *)tableView {
    return 1;
}

- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section {
    if (self.items && self.items.count > 0)
        return [self.items count];
    return 0;
}


- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath {
    CartItemTableViewCell *cell = (CartItemTableViewCell *)[tableView dequeueReusableCellWithIdentifier:@"CartItemCell"];
    
    if (!cell) {
        [tableView registerNib:[UINib nibWithNibName:@"CartItemTableViewCell" bundle:nil]forCellReuseIdentifier:@"CartItemCell"];
        cell = [tableView dequeueReusableCellWithIdentifier:@"CartItemCell"];
    }
    
    if (self.items == nil)
        return cell;
    
    CartItem *productModel  = [self.items objectAtIndex:indexPath.row];
    cell.selectionStyle = UITableViewCellSelectionStyleNone;
    [cell initCell:productModel withController:self];
    
    return cell;
}


- (void)tableView:(UITableView *)tableView willDisplayCell:(UITableViewCell *)cell forRowAtIndexPath:(NSIndexPath *)indexPath {
    
    if ([cell respondsToSelector:@selector(setSeparatorInset:)])
        [cell setSeparatorInset:UIEdgeInsetsZero];
    if ([cell respondsToSelector:@selector(setPreservesSuperviewLayoutMargins:)])
        [cell setPreservesSuperviewLayoutMargins:NO];
    if ([cell respondsToSelector:@selector(setLayoutMargins:)])
        [cell setLayoutMargins:UIEdgeInsetsZero];
    
}


- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
}

@end
