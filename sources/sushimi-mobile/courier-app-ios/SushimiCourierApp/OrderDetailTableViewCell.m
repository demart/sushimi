//
//  OrderDetailTableViewCell.m
//  SushimiCourierApp
//
//  Created by Artem Demidovich on 10/13/15.
//  Copyright © 2015 Aphion Software. All rights reserved.
//

#import "OrderDetailTableViewCell.h"

@implementation OrderDetailTableViewCell

- (void)awakeFromNib {
    [self setAccessoryType:UITableViewCellAccessoryNone];
    [self setSelectionStyle:UITableViewCellSelectionStyleNone];
}

- (void)setSelected:(BOOL)selected animated:(BOOL)animated {
    [super setSelected:selected animated:animated];
}

// Инициализирует ячейку для отображения данных
-(void) initCell:(NSString*) key withValue:(NSString*) value {
    [self.fieldKey setText:key];
    [self.fieldValue setText:value];
}


@end
