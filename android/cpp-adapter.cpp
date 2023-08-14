#include <jni.h>
#include "react-native-nolano-sdk.h"

extern "C"
JNIEXPORT jdouble JNICALL
Java_com_nolanosdk_NolanoSdkModule_nativeMultiply(JNIEnv *env, jclass type, jdouble a, jdouble b) {
    return nolanosdk::multiply(a, b);
}
