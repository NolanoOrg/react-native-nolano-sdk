#ifdef __cplusplus
#import "react-native-nolano-sdk.hpp"
#endif


// TODO: Remove this when we have a new arch
// #ifdef RCT_NEW_ARCH_ENABLED
// #import "RNNolanoSdkSpec.h"

// @interface NolanoSdk : NSObject <NativeNolanoSdkSpec>
// #else
// #import <React/RCTBridgeModule.h>

// @interface NolanoSdk : NSObject <RCTBridgeModule>
// #endif

#import <React/RCTEventEmitter.h>
#import <React/RCTBridgeModule.h>

@interface NolanoSdk : RCTEventEmitter <RCTBridgeModule>

@end
