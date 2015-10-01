//
//  AboutCompanySocialTableViewCell.m
//  SushimiApp
//
//  Created by Artem Demidovich on 2/21/15.
//  Copyright (c) 2015 AphionSoftware. All rights reserved.
//

#import "AboutCompanySocialTableViewCell.h"

@implementation AboutCompanySocialTableViewCell

UITapGestureRecognizer *instagramLogoTap;
UITapGestureRecognizer *vkLogoTap;

- (void)awakeFromNib {
    instagramLogoTap = [[UITapGestureRecognizer alloc] initWithTarget:self action:@selector(tappedInstagramIcon)];
    [self.istagramLogoImage setUserInteractionEnabled:YES];
    [self.istagramLogoImage addGestureRecognizer:instagramLogoTap];
    
    vkLogoTap = [[UITapGestureRecognizer alloc] initWithTarget:self action:@selector(tappedVkIcon)];
    [self.vkLogoImage setUserInteractionEnabled:YES];
    [self.vkLogoImage addGestureRecognizer:vkLogoTap];
}

-(void)tappedInstagramIcon {
    NSURL *url = [NSURL URLWithString:self.aboutCompany.instagramUrl];
    [[UIApplication sharedApplication] openURL:url];
}

-(void)tappedVkIcon {
    NSURL *url = [NSURL URLWithString:self.aboutCompany.vkUrl];
    [[UIApplication sharedApplication] openURL:url];
}

- (void)setSelected:(BOOL)selected animated:(BOOL)animated {
    [super setSelected:selected animated:animated];
}

-(void) initCell:(AboutCompany*) company {
    self.aboutCompany = company;
}


@end
