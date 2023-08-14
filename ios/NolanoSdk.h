#ifdef __cplusplus
#import "react-native-nolano-sdk.h"
#endif

#ifdef RCT_NEW_ARCH_ENABLED
#import "RNNolanoSdkSpec.h"

@interface NolanoSdk : NSObject <NativeNolanoSdkSpec>
#else
#import <React/RCTBridgeModule.h>

@interface NolanoSdk : NSObject <RCTBridgeModule>
#endif

@end
