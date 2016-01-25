//
//  ResponseWrapperModel.h
//  SushimiCourierApp
//
//  Created by Artem Demidovich on 10/11/15.
//  Copyright © 2015 Aphion Software. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface ResponseWrapperModel : NSObject

@property NSObject *data;
@property NSString *status;
@property NSString *errorCode;
@property NSString *errorMessage;


// ===========
//   STATUS
// ===========


/**
 * Операция успешно выполнена
 */
//SUCCESS,

/**
 * Данные не найдены
 */
//NO_CONTENT,

/**
 * Ошибки в запросе (валидация)
 */
//BAD_REQUEST,

/**
 * Ошибка сервера
 */
//SERVER_ERROR


@end
