//
//  DeliveryMapViewController.h
//  SushimiApp
//
//  Created by Artem Demidovich on 2/20/15.
//  Copyright (c) 2015 AphionSoftware. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <MapKit/MapKit.h>
#import "DeliveryInfo.h"

@interface MapViewController : UIViewController

@property (strong, nonatomic) IBOutlet MKMapView *mapView;

-(void)setGeoPoints:(NSArray *)geoPoints;

@end
