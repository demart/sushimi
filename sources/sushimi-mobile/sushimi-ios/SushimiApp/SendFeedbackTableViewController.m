//
//  SendFeedbackTableViewController.m
//  SushimiApp
//
//  Created by Artem Demidovich on 7/24/15.
//  Copyright (c) 2015 AphionSoftware. All rights reserved.
//

#import "SendFeedbackTableViewController.h"

#import "FeedbackTextFieldTableViewCell.h"
#import "FeedbackComboboxFieldTableViewCell.h"
#import "FeedbackSendButtonTableViewCell.h"
#import "FeedbackTextViewTableViewCell.h"

#import "FeedbackDataManager.h"
#import "FeedbackRegistrationModel.h"
#import "FeedbackMetaInformationModel.h"
#import "FeedbackCityModel.h"
#import "FeedbackRestaurantModel.h"
#import "FeedbackTypeModel.h"

#import "ResponseWrapper.h"

#import "DataLoadingErrorView.h"
#import "DejalActivityView.h"
#import "SettingsManager.h"

@interface SendFeedbackTableViewController ()

@property FeedbackRegistrationModel *model;

@property DataLoadingErrorView *dataLoadingErrorView;

@end

@implementation SendFeedbackTableViewController

static UIColor* greenColor = nil;
static UIColor* orageColor = nil;
static FeedbackMetaInformationModel* feedbackMetaInformation = nil;


- (void)viewDidLoad {
    [super viewDidLoad];
    greenColor = [UIColor colorWithRed:102/255.0f green:204.0f/255.0f blue:102.0f/255.0f alpha:1.0f];
    orageColor = [UIColor colorWithRed:255/255.0f green:153.0f/255.0f blue:0.0f/255.0f alpha:1.0f];
    self.tableView.tableFooterView = [[UIView alloc] initWithFrame:CGRectZero];
    
    [self loadMetaInformation];
}

-(void) viewWillAppear:(BOOL)animated {
    [super viewWillAppear:animated];

    self.model = [[FeedbackRegistrationModel alloc] init];
    self.model.type = @"FEEDBACK";
    self.model.phone = @"+7";
    
    // Load local settings
    Settings* settings = [[SettingsManager sharedInstance] getSettings];
    self.model.name = settings.fullname;
    if (settings.phone != nil && settings.phone.length > 3)
        self.model.phone = settings.phone;
    
    [self.tableView reloadData];
}

-(void) successfullyLoadedInformation:(FeedbackMetaInformationModel*) meta {
    NSLog(@"Loaded Meta, %@", meta);
    feedbackMetaInformation = meta;
    [DejalBezelActivityView removeViewAnimated:YES];
    if (meta == nil) {
        self.dataLoadingErrorView = [DataLoadingErrorView showDataLoadingErrorView:self withRefreshSelector:@selector(loadMetaInformation)];
        return;
    }
    
    if (meta.cities != nil && meta.cities.count > 0)
        self.model.cityId = ((FeedbackCityModel*)meta.cities[0]).value;
    
    if (meta.types != nil && meta.types.count > 0)
        self.model.type = ((FeedbackTypeModel*)meta.types[0]).value;
    
    [self.tableView reloadData];
}

-(void) failurlyLoadedInformation:(NSError*) error {
    NSLog(@"Error Meta, %@", error.description);
    self.dataLoadingErrorView = [DataLoadingErrorView showDataLoadingErrorView:self withRefreshSelector:@selector(loadMetaInformation)];

}

-(void) loadMetaInformation {
    [DataLoadingErrorView hideDataLoadingErrorView:self.dataLoadingErrorView];
    [DejalBezelActivityView activityViewForView:self.view withLabel:@"Подождите\nИдет загрузка..."];
    [FeedbackDataManager loadMetaInformation:self successSelector:@selector(successfullyLoadedInformation:) failureSelector:@selector(failurlyLoadedInformation:)];
}


-(void) reloadTableView {
    [self.tableView reloadData];
}


-(void)doSendFeedback {
    // Validate
    if ([self validateFeedbackModel] == NO)
        return;
    
    // Send
    [DataLoadingErrorView hideDataLoadingErrorView:self.dataLoadingErrorView];
    [DejalBezelActivityView activityViewForView:self.view withLabel:@"Подождите\nИдет загрузка..."];
    [FeedbackDataManager registerNewFeedback:self
                             successSelector:@selector(successfullySentFeedback:)
        failureSelector:@selector(failureSendingFeedback:)
        withFeedbackModel:self.model];
}

-(void) successfullySentFeedback:(NSString*) status {
    NSLog(@"Sent feedback status: %@", status);
    
    [DejalBezelActivityView removeViewAnimated:YES];
    [self performSegueWithIdentifier:@"NewFeedbackToSentFeedback" sender:self];
}

-(void) failureSendingFeedback:(NSError*) error {
    NSLog(@"Error Meta, %@", error.description);
    
    [DejalBezelActivityView removeViewAnimated:YES];
    
    [[[UIAlertView alloc] initWithTitle:@"Внимание" message:@"Ошибка при попытке зарегистрировать отзыв, пожалуйста попробуйте позднее." delegate:nil cancelButtonTitle:@"OK" otherButtonTitles: nil] show];
}


-(BOOL) validateFeedbackModel {
    if (self.model.name == nil || self.model.name.length < 1) {
        [[[UIAlertView alloc] initWithTitle:@"Внимание" message:@"Необходимо заполнить поле: Ваше имя*" delegate:nil cancelButtonTitle:@"OK" otherButtonTitles: nil] show];
        return false;
    }
    
    
    if (self.model.phone != nil) {
        // remove unneeded characters like + ( ) and space
        NSString* tempPhone = self.model.phone;
        NSCharacterSet *nonNumberSet = [[NSCharacterSet decimalDigitCharacterSet] invertedSet];
        tempPhone = [[tempPhone componentsSeparatedByCharactersInSet:nonNumberSet] componentsJoinedByString:@""];
        tempPhone = [tempPhone substringFromIndex:1];
        if (tempPhone.length != 10) {
            [[[UIAlertView alloc] initWithTitle:@"Внимание" message:@"Необходимо заполнить поле: Ваше телефон*" delegate:nil cancelButtonTitle:@"OK" otherButtonTitles: nil] show];
            return false;
        }
    } else {
        [[[UIAlertView alloc] initWithTitle:@"Внимание" message:@"Необходимо заполнить поле: Ваше телефон*" delegate:nil cancelButtonTitle:@"OK" otherButtonTitles: nil] show];
        return false;
    }
    
    
    if (self.model.cityId == nil || self.model.cityId < 1) {
        [[[UIAlertView alloc] initWithTitle:@"Внимание" message:@"Необходимо заполнить поле: Ваш город*" delegate:nil cancelButtonTitle:@"OK" otherButtonTitles: nil] show];
        return false;
    }
    
    if (self.model.type == nil || self.model.type.length < 1) {
        [[[UIAlertView alloc] initWithTitle:@"Внимание" message:@"Необходимо заполнить поле: Тема*" delegate:nil cancelButtonTitle:@"OK" otherButtonTitles: nil] show];
        return false;
    }
    
    if ([self.model.type isEqual:@"RESTAURANT"]) {
        if (self.model.placeId == nil || self.model.cityId < 1) {
            [[[UIAlertView alloc] initWithTitle:@"Внимание" message:@"Необходимо заполнить поле: Выберите заведение*" delegate:nil cancelButtonTitle:@"OK" otherButtonTitles: nil] show];
            return false;
        }
    }
    
    if (self.model.text == nil || self.model.text.length < 3) {
        [[[UIAlertView alloc] initWithTitle:@"Внимание" message:@"Необходимо заполнить поле: Текст*" delegate:nil cancelButtonTitle:@"OK" otherButtonTitles: nil] show];
        return false;
    }
    
    return true;
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
}


#pragma mark - Table view data source

- (NSInteger)numberOfSectionsInTableView:(UITableView *)tableView {
    return 1;
}

- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section {
    if ([self.model.type isEqualToString:@"FEEDBACK"])
        return 6;
    if ([self.model.type isEqualToString:@"DELIVERY"])
        return 7;
    if ([self.model.type isEqualToString:@"RESTAURANT"])
        return 7;
    if ([self.model.type isEqualToString:@"MOBILE"])
        return 6;
    if ([self.model.type isEqualToString:@"WEB"])
        return 6;
    return 0;
}



- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath {
    if (indexPath.row == 0) {
        FeedbackTextFieldTableViewCell *cell = [self getTextFieldCell:tableView];
        [cell initCell:self.model withFieldType:@"NAME" withTextLabel:@"Ваше имя" withKeyboardType:(UIKeyboardType) UIKeyboardTypeDefault];
        return cell;
    }
    if (indexPath.row == 1) {
        FeedbackTextFieldTableViewCell *cell = [self getTextFieldCell:tableView];
        [cell initCell:self.model withFieldType:@"PHONE" withTextLabel:@"Ваш телефон" withKeyboardType:(UIKeyboardType) UIKeyboardTypeNumberPad];
        return cell;
    }
    if (indexPath.row == 2) {
        // Cities
        FeedbackComboboxFieldTableViewCell *cell = [self getComboboxFieldCell:tableView];
        [cell initCell:self.model withFieldType:@"CITY" withTextLabel:@"Ваш город" withButtonLabel:@"Выберите город" withButtonColor:greenColor withParentView:self.view withMetaInformation:feedbackMetaInformation withParentController:self];
        return cell;
        
    }
    if (indexPath.row == 3) {
        // Type
        FeedbackComboboxFieldTableViewCell *cell = [self getComboboxFieldCell:tableView];
        [cell initCell:self.model withFieldType:@"TYPE" withTextLabel:@"Тема" withButtonLabel:@"Выберите тему" withButtonColor:orageColor withParentView:self.view withMetaInformation:feedbackMetaInformation  withParentController:self];
        return cell;
    }
    
    if (indexPath.row == 4) {
        if ([self.model.type isEqualToString:@"FEEDBACK"] ||
            [self.model.type isEqualToString:@"MOBILE"] ||
            [self.model.type isEqualToString:@"WEB"]) {
            // user text
            FeedbackTextViewTableViewCell *cell = [self getTextViewCell:tableView];
            [cell initCell:self.model withFieldType:@"TEXT" withTextLabel:@"Текст" withKeyboardType:(UIKeyboardType) UIKeyboardTypeDefault];
            return cell;
        }
        if ([self.model.type isEqualToString:@"DELIVERY"]) {
            // Order number
            FeedbackTextFieldTableViewCell *cell = [self getTextFieldCell:tableView];
            [cell initCell:self.model withFieldType:@"ORDER_NUMBER" withTextLabel:@"Номер заказа" withKeyboardType:(UIKeyboardType) UIKeyboardTypeNumberPad];
            return cell;
        }
        if ([self.model.type isEqualToString:@"RESTAURANT"]) {
            // Combo with restaurants
            FeedbackComboboxFieldTableViewCell *cell = [self getComboboxFieldCell:tableView];
            [cell initCell:self.model withFieldType:@"RESTAURANT" withTextLabel:@"Заведение" withButtonLabel:@"Выберите заведение"  withButtonColor:greenColor withParentView:self.view withMetaInformation:feedbackMetaInformation withParentController:self];
            return cell;
        }
        
    }
    if (indexPath.row == 5) {
        if ([self.model.type isEqualToString:@"FEEDBACK"] ||
            [self.model.type isEqualToString:@"MOBILE"] ||
            [self.model.type isEqualToString:@"WEB"]) {
            // button send
            FeedbackSendButtonTableViewCell *cell = [self getSendFeedbackButtonCell:tableView];
            [cell initCell:self];
            return cell;
            
        }
        if ([self.model.type isEqualToString:@"DELIVERY"] ||
            [self.model.type isEqualToString:@"RESTAURANT"]) {
            // user text
            FeedbackTextViewTableViewCell *cell = [self getTextViewCell:tableView];
            [cell initCell:self.model withFieldType:@"TEXT" withTextLabel:@"Текст" withKeyboardType:(UIKeyboardType) UIKeyboardTypeDefault];
            return cell;
        }
    }
    
    if (indexPath.row == 6) {
        if ([self.model.type isEqualToString:@"DELIVERY"] ||
            [self.model.type isEqualToString:@"RESTAURANT"]) {
            // button send
            FeedbackSendButtonTableViewCell *cell = [self getSendFeedbackButtonCell:tableView];
            [cell initCell:self];
            return cell;
        }
    }
    
    return nil;
}


-(FeedbackTextFieldTableViewCell*) getTextFieldCell:(UITableView*) tableView {
    FeedbackTextFieldTableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:@"FeedbackTextFieldCell"];
    if (cell == nil) {
        [tableView registerNib:[UINib nibWithNibName:@"FeedbackTextFieldTableViewCell" bundle:nil]forCellReuseIdentifier:@"FeedbackTextFieldCell"];
        cell = [tableView dequeueReusableCellWithIdentifier:@"FeedbackTextFieldCell"];
    }
    return cell;
}

-(FeedbackSendButtonTableViewCell*) getSendFeedbackButtonCell:(UITableView*) tableView {
    FeedbackSendButtonTableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:@"FeedbackSendButtonCell"];
    if (cell == nil) {
        [tableView registerNib:[UINib nibWithNibName:@"FeedbackSendButtonTableViewCell" bundle:nil]forCellReuseIdentifier:@"FeedbackSendButtonCell"];
        cell = [tableView dequeueReusableCellWithIdentifier:@"FeedbackSendButtonCell"];
    }
    return cell;
}


-(FeedbackComboboxFieldTableViewCell*) getComboboxFieldCell:(UITableView*) tableView {
    FeedbackComboboxFieldTableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:@"FeedbackComboboxFieldCell"];
    if (cell == nil) {
        [tableView registerNib:[UINib nibWithNibName:@"FeedbackComboboxFieldTableViewCell" bundle:nil]forCellReuseIdentifier:@"FeedbackComboboxFieldCell"];
        cell = [tableView dequeueReusableCellWithIdentifier:@"FeedbackComboboxFieldCell"];
    }
    return cell;
}

-(FeedbackTextViewTableViewCell*) getTextViewCell:(UITableView*) tableView {
    FeedbackTextViewTableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:@"FeedbackTextViewCell"];
    if (cell == nil) {
        [tableView registerNib:[UINib nibWithNibName:@"FeedbackTextViewTableViewCell" bundle:nil]forCellReuseIdentifier:@"FeedbackTextViewCell"];
        cell = [tableView dequeueReusableCellWithIdentifier:@"FeedbackTextViewCell"];
    }
    return cell;
}


- (CGFloat)tableView:(UITableView *)tableView heightForRowAtIndexPath:(NSIndexPath *)indexPath {
    
    if (indexPath.row == 0)
        return 44;
    if (indexPath.row == 1)
        return 44;
    if (indexPath.row == 2)
        // Type
        return 44;
    if (indexPath.row == 3)
        // Cities
        return 44;
    if (indexPath.row == 4) {
        if ([self.model.type isEqualToString:@"FEEDBACK"] ||
            [self.model.type isEqualToString:@"MOBILE"] ||
            [self.model.type isEqualToString:@"WEB"]) {
            // user text
            return 80;
        }
        if ([self.model.type isEqualToString:@"DELIVERY"]) {
            // Order number
            return 44;
        }
        if ([self.model.type isEqualToString:@"RESTAURANT"]) {
            return 44;
        }
        
    }
    if (indexPath.row == 5) {
        if ([self.model.type isEqualToString:@"FEEDBACK"] ||
            [self.model.type isEqualToString:@"MOBILE"] ||
            [self.model.type isEqualToString:@"WEB"]) {
            // button send
            return 60;
            
        }
        if ([self.model.type isEqualToString:@"DELIVERY"] ||
            [self.model.type isEqualToString:@"RESTAURANT"]) {
            // user text
            return 80;
        }
        
    }
    if (indexPath.row == 6) {
        if ([self.model.type isEqualToString:@"DELIVERY"] ||
            [self.model.type isEqualToString:@"RESTAURANT"]) {
            // button send
            return 60;
        }
        
    }
    return 44;
}


/*
// Override to support conditional editing of the table view.
- (BOOL)tableView:(UITableView *)tableView canEditRowAtIndexPath:(NSIndexPath *)indexPath {
    // Return NO if you do not want the specified item to be editable.
    return YES;
}
*/

/*
// Override to support editing the table view.
- (void)tableView:(UITableView *)tableView commitEditingStyle:(UITableViewCellEditingStyle)editingStyle forRowAtIndexPath:(NSIndexPath *)indexPath {
    if (editingStyle == UITableViewCellEditingStyleDelete) {
        // Delete the row from the data source
        [tableView deleteRowsAtIndexPaths:@[indexPath] withRowAnimation:UITableViewRowAnimationFade];
    } else if (editingStyle == UITableViewCellEditingStyleInsert) {
        // Create a new instance of the appropriate class, insert it into the array, and add a new row to the table view
    }   
}
*/

/*
// Override to support rearranging the table view.
- (void)tableView:(UITableView *)tableView moveRowAtIndexPath:(NSIndexPath *)fromIndexPath toIndexPath:(NSIndexPath *)toIndexPath {
}
*/

/*
// Override to support conditional rearranging of the table view.
- (BOOL)tableView:(UITableView *)tableView canMoveRowAtIndexPath:(NSIndexPath *)indexPath {
    // Return NO if you do not want the item to be re-orderable.
    return YES;
}
*/
@end
