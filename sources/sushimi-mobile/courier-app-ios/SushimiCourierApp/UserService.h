//
//  UserService.h
//  SushimiCourierApp
//
//  Created by Artem Demidovich on 10/11/15.
//  Copyright © 2015 Aphion Software. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "BaseViewController.h"
#import "LoginResponseModel.h"
#import <CoreLocation/CoreLocation.h>

@interface UserService : NSObject

// Сохраняет логин для того чтобы повторного его не вводить каждый раз
+(NSString*) getUserLogin;
+(void) saveUserLogin:(NSString*) login;

// Получить сохраненный (в памяти) токен
+(NSString*) getAuthToken;
// Сохраняет данные авторизации полученные с сервера
+(void) authenticate:(LoginResponseModel*) loginResponseModel;

// Асинхронный метод авторизации пользователя
+(void) userLoginWithLogin:(NSString*) loginValue andWithCallback:(SEL)callback onController:(BaseViewController*) controller;

// Асинхронный метод для сохранения deviceToken в последующем для отправки уведомлений
//+(void) registerDeviceToken:(NSString*) deviceToken;

// Отправляет на сервер последнюю зафиксированную точну курьера
+(void) updateGeolocationCoordinate:(CLLocationCoordinate2D) lastLocation;

@end