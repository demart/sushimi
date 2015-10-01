//
//  DeliveryMapViewController.m
//  SushimiApp
//
//  Created by Artem Demidovich on 2/20/15.
//  Copyright (c) 2015 AphionSoftware. All rights reserved.
//

#import "MapViewController.h"

@interface MapViewController ()

@property NSString *_latitude;
@property NSString *_longitude;

@end

@implementation MapViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    self.mapView.mapType = MKMapTypeStandard;
    double lat = [self._latitude doubleValue];
    double lon = [self._longitude doubleValue];
    CLLocationCoordinate2D coord = {
        .latitude = lat,
        .longitude =  lon};
    MKCoordinateSpan span = {.latitudeDelta =  0.2, .longitudeDelta =  0.2};
    MKCoordinateRegion region = {coord, span};
    [self.mapView setRegion:region];
    
    MKPointAnnotation *point = [[MKPointAnnotation alloc] init];
    point.coordinate = coord;
    [self.mapView addAnnotation:point];
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    
}

-(void)setGeoPoints:(NSArray *)geoPoints {
    self._latitude = geoPoints[0];
    self._longitude = geoPoints[1];
}

@end
