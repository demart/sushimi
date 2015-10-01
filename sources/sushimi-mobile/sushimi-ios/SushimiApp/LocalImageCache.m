//
//  LocalImageCache.m
//  SushimiApp
//
//  Created by Artem Demidovich on 3/16/15.
//  Copyright (c) 2015 AphionSoftware. All rights reserved.
//

#import "LocalImageCache.h"

@implementation LocalImageCache


+(void)saveImageToLocalCache:(NSString *)imageName withData:(UIImage*)uiImage {
//    NSLog(@"saveImageToLocalCache with %@", imageName);
    NSString* documentsPath = [NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES) objectAtIndex:0];
    NSString* path = [[NSString alloc] initWithFormat: @"%@/Images/%@", documentsPath, imageName];
    NSError *error = nil;
    if (![[NSFileManager defaultManager] fileExistsAtPath:path]) {
        [[NSFileManager defaultManager] createDirectoryAtPath:[path stringByDeletingLastPathComponent] withIntermediateDirectories:YES attributes:nil error:&error];
    } else {
        [[NSFileManager defaultManager] removeItemAtPath:path error:&error];
    }
    if (error) {
        NSLog(@"Error directory for images: %@", path);
        NSLog(@"Error : %@", error);
    }
    
    NSData *imageData = UIImageJPEGRepresentation(uiImage, 1.0);
    BOOL ok = [[NSFileManager defaultManager] createFileAtPath:path
                                                      contents:imageData attributes:nil];
    if (!ok) {
        NSLog(@"Error creating file %@", path);
    }
}

+(UIImage *)loadImageFromLocalCache:(NSString *)imageName {
//    NSLog(@"loadImageFromLocalCache with %@", imageName);
    NSString* documentsPath = [NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES) objectAtIndex:0];
    NSString* path = [[NSString alloc] initWithFormat: @"%@/Images/%@", documentsPath, imageName];
    
    //return nil;
    BOOL fileExists = [[NSFileManager defaultManager] fileExistsAtPath:path];
    if (fileExists) {
        NSFileHandle* myFileHandle = [NSFileHandle fileHandleForReadingAtPath:path];
        UIImage* loadedImage = [UIImage imageWithData:[myFileHandle readDataToEndOfFile]];
//        NSLog(@"File exist in cache: %@", path);
//        NSLog(@"File exist in cache: %@", loadedImage);
        return loadedImage;
    } else {
        NSLog(@"File doesn't exist: %@", path);
    }
    return nil;
}


@end
