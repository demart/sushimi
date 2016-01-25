//
//  LoginViewController.m
//  SushimiCourierApp
//
//  Created by Artem Demidovich on 10/11/15.
//  Copyright © 2015 Aphion Software. All rights reserved.
//

#import "LoginViewController.h"
#import "DejalActivityView.h"

#import "UserService.h"

@implementation LoginViewController

- (IBAction)login:(UIButton *)sender {
    [[self loginField] resignFirstResponder]; // Hide keyboard
    [DejalBezelActivityView activityViewForView:self.view withLabel:@"Подождите\nИдет загрузка..."];
    [UserService userLoginWithLogin:self.loginField.text andWithCallback:@selector(completeLoginWithData:orError:) onController:self];
}


-(void) completeLoginWithData:(NSObject*) data orError:(NSError*) error {
    NSLog(@"Вызываем callback");
    [DejalBezelActivityView removeViewAnimated:YES];
    if (error) {
        // TODO
        return;
    }
    
    if (data != nil) {
        
        // authenticate
        [UserService saveUserLogin:self.loginField.text];
        [UserService authenticate:(LoginResponseModel*)data];
        
        // start update locations
        
        
        [self performSegueWithIdentifier:@"LoginScreenToMainTabScreen" sender:self];
    }
    
}

-(void) viewWillAppear:(BOOL)animated {
    [super viewWillAppear:animated];
    
    NSString *userLogin = [UserService getUserLogin];
    if (userLogin != nil)
        [self.loginField setText:userLogin];
    
    [self registerForKeyboardNotifications];
}


- (void)registerForKeyboardNotifications
{
    [[NSNotificationCenter defaultCenter] addObserver:self
                                             selector:@selector(keyboardWasShown:)
                                                 name:UIKeyboardDidShowNotification object:nil];
    
    [[NSNotificationCenter defaultCenter] addObserver:self
                                             selector:@selector(keyboardWillBeHidden:)
                                                 name:UIKeyboardWillHideNotification object:nil];
}


// Called when the UIKeyboardDidShowNotification is sent.
- (void)keyboardWasShown:(NSNotification*)aNotification {
    NSLog(@"Keyboard shown");
    NSDictionary* info = [aNotification userInfo];
    CGSize kbSize = [[info objectForKey:UIKeyboardFrameBeginUserInfoKey] CGRectValue].size;
    CGRect bkgndRect = [self loginButton].superview.frame;
    bkgndRect.size.height += kbSize.height;
    [[self loginButton].superview setFrame:bkgndRect];
    [[self scrollView] setContentOffset:CGPointMake(0.0, [self loginButton].frame.origin.y-kbSize.height) animated:YES];
}

// Called when the UIKeyboardWillHideNotification is sent
- (void)keyboardWillBeHidden:(NSNotification*)aNotification {
    NSLog(@"Keyboard hidden");
    UIEdgeInsets contentInsets = UIEdgeInsetsZero;
    [self scrollView].contentInset = contentInsets;
    [self scrollView].scrollIndicatorInsets = contentInsets;
}

@end
