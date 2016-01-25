//
//  LoginViewController.h
//  SushimiCourierApp
//
//  Created by Artem Demidovich on 10/11/15.
//  Copyright © 2015 Aphion Software. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "BaseViewController.h"

@interface LoginViewController : BaseViewController

@property (weak, nonatomic) IBOutlet UITextField *loginField;

@property (weak, nonatomic) IBOutlet UIButton *loginButton;

- (IBAction)login:(UIButton *)sender;
@property (weak, nonatomic) IBOutlet UIScrollView *scrollView;

@end
