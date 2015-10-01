//
//  OrderModel.m
//  SushimiApp
//
//  Created by Artem Demidovich on 5/4/15.
//  Copyright (c) 2015 AphionSoftware. All rights reserved.
//

#import "OrderModel.h"

@implementation OrderModel

- (void)encodeWithCoder:(NSCoder *)encoder {
    [encoder encodeObject:[@(self.id) stringValue] forKey:@"id"];
    [encoder encodeObject:self.key forKey:@"key"];
    [encoder encodeObject:self.orderNumber forKey:@"orderNumber"];
    [encoder encodeObject:[@(self.orderSum) stringValue] forKey:@"orderSum"];
    [encoder encodeObject:[@(self.orderTime.longLongValue) stringValue] forKey:@"orderTime"];
    [encoder encodeObject:self.orderStatus forKey:@"orderStatus"];
    
    [encoder encodeObject:self.deliveryType forKey:@"deliveryType"];
    [encoder encodeObject:[@(self.deliveryTime.longLongValue) stringValue]  forKey:@"deliveryTime"];
    [encoder encodeObject:self.payMethod forKey:@"payMethod"];
    
    [encoder encodeObject:self.personName forKey:@"personName"];
    [encoder encodeObject:self.personPhone forKey:@"personPhone"];
    [encoder encodeObject:self.personEmail forKey:@"personEmail"];
    [encoder encodeObject:[@(self.personCount) stringValue] forKey:@"personCount"];
    [encoder encodeObject:self.personComments forKey:@"personComments"];
    [encoder encodeObject:[@(self.personCash) stringValue] forKey:@"personCash"];
    
    [encoder encodeObject:self.addressBuilding forKey:@"addressBuilding"];
    [encoder encodeObject:self.addressCityName forKey:@"addressCityName"];
    [encoder encodeObject:self.addressCorpus forKey:@"addressCorpus"];
    [encoder encodeObject:self.addressDoorCode forKey:@"addressDoorCode"];
    [encoder encodeObject:self.addressFlat forKey:@"addressFlat"];
    [encoder encodeObject:self.addressFloor forKey:@"addressFloor"];
    [encoder encodeObject:self.addressHouse forKey:@"addressHouse"];
    [encoder encodeObject:self.addressOffice forKey:@"addressOffice"];
    [encoder encodeObject:self.addressPorch forKey:@"addressPorch"];
    [encoder encodeObject:self.addressRoom forKey:@"addressRoom"];
    [encoder encodeObject:self.addressStreetName forKey:@"addressStreetName"];
    [encoder encodeObject:self.geoLatitude forKey:@"geoLatitude"];
    [encoder encodeObject:self.geoLongitude forKey:@"geoLongitude"];
}

- (id)initWithCoder:(NSCoder *)decoder {
    if((self = [super init])) {
        //decode properties, other class vars
        self.id = [[decoder decodeObjectForKey:@"id"] integerValue];
        self.key = [decoder decodeObjectForKey:@"key"];
        self.orderNumber = [decoder decodeObjectForKey:@"orderNumber"];
        self.orderSum = [[decoder decodeObjectForKey:@"orderSum"] integerValue];
        self.orderTime = [NSNumber numberWithUnsignedLong:[[decoder decodeObjectForKey:@"orderTime"] integerValue]];
        self.orderStatus = [decoder decodeObjectForKey:@"orderStatus"];
        
        self.deliveryType = [decoder decodeObjectForKey:@"deliveryType"];
        self.deliveryTime = [NSNumber numberWithUnsignedLong:[[decoder decodeObjectForKey:@"deliveryTime"] integerValue]];
        self.payMethod = [decoder decodeObjectForKey:@"payMethod"];

        self.personName = [decoder decodeObjectForKey:@"personName"];
        self.personPhone = [decoder decodeObjectForKey:@"personPhone"];
        self.personEmail = [decoder decodeObjectForKey:@"personEmail"];
        self.personCount = [[decoder decodeObjectForKey:@"personCount"] integerValue];
        self.personComments = [decoder decodeObjectForKey:@"personComments"];
        self.personCash = [[decoder decodeObjectForKey:@"personCash"] integerValue];
        
        self.addressBuilding = [decoder decodeObjectForKey:@"addressBuilding"];
        self.addressCityName = [decoder decodeObjectForKey:@"addressCityName"];
        self.addressCorpus = [decoder decodeObjectForKey:@"addressCorpus"];
        self.addressDoorCode = [decoder decodeObjectForKey:@"addressDoorCode"];
        self.addressFlat = [decoder decodeObjectForKey:@"addressFlat"];
        self.addressFloor = [decoder decodeObjectForKey:@"addressFloor"];
        self.addressHouse = [decoder decodeObjectForKey:@"addressHouse"];
        self.addressOffice = [decoder decodeObjectForKey:@"addressOffice"];
        self.addressPorch = [decoder decodeObjectForKey:@"addressPorch"];
        self.addressRoom = [decoder decodeObjectForKey:@"addressRoom"];
        self.addressStreetName = [decoder decodeObjectForKey:@"addressStreetName"];
        self.geoLatitude = [decoder decodeObjectForKey:@"geoLatitude"];
        self.geoLongitude = [decoder decodeObjectForKey:@"geoLongitude"];
        
    }
    return self;
}

@end
