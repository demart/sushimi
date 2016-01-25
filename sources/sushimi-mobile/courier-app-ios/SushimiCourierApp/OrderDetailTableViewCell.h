//
//  OrderDetailTableViewCell.h
//  SushimiCourierApp
//
//  Created by Artem Demidovich on 10/13/15.
//  Copyright © 2015 Aphion Software. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface OrderDetailTableViewCell : UITableViewCell
@property (weak, nonatomic) IBOutlet UILabel *fieldKey;
@property (weak, nonatomic) IBOutlet UILabel *fieldValue;

// Инициализирует ячейку для отображения данных
-(void) initCell:(NSString*) key withValue:(NSString*) value;

@end
