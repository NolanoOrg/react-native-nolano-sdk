#ifdef __cplusplus
#import "llama.h"
#import "react-native-nolano-sdk.hpp"
#endif


@interface NolanoSdkContext : NSObject {
    bool is_model_loaded;
    bool is_predicting;
    bool is_interrupted;

    nolanosdk::llama_rn_context * llama;
}

+ (instancetype)initWithParams:(NSDictionary *)params;
- (bool)isModelLoaded;
- (bool)isPredicting;
- (NSDictionary *)completion:(NSDictionary *)params onToken:(void (^)(NSDictionary *tokenResult))onToken;
- (void)stopCompletion;

- (void)invalidate;

@end
