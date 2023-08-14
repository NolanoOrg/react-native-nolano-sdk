// import { NativeModules, Platform } from 'react-native';

// const LINKING_ERROR =
//   `The package 'react-native-nolano-sdk' doesn't seem to be linked. Make sure: \n\n` +
//   Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
//   '- You rebuilt the app after installing the package\n' +
//   '- You are not using Expo Go\n';

// const NolanoSdk = NativeModules.NolanoSdk
//   ? NativeModules.NolanoSdk
//   : new Proxy(
//       {},
//       {
//         get() {
//           throw new Error(LINKING_ERROR);
//         },
//       }
//     );

// export function multiply(a: number, b: number): Promise<number> {
//   return NolanoSdk.multiply(a, b);
// }


import { NativeEventEmitter } from 'react-native'
import type { DeviceEventEmitterStatic } from 'react-native'
import NolanoSdk from './NativeNolanoSdk'
import type { NativeContextParams, NativeCompletionParams, NativeCompletionTokenProb } from './NativeNolanoSdk'

const EVENT_ON_TOKEN = '@NolanoSdk_onToken'

const EventEmitter: NativeEventEmitter | DeviceEventEmitterStatic =
  // @ts-ignore
  new NativeEventEmitter(NolanoSdk)

export type TokenData = {
  token: string
  completion_probabilities?: Array<NativeCompletionTokenProb>
}

type TokenNativeEvent = {
  contextId: number
  tokenResult: TokenData
}

export type ContextParams = NativeContextParams

export type CompletionParams = NativeCompletionParams

export class LlamaContext {
  id: number

  constructor(id: number) {
    this.id = id
  }

  async completion(params: CompletionParams, callback: (data: TokenData) => void) {
    let tokenListener: any = EventEmitter.addListener(
      EVENT_ON_TOKEN,
      (evt: TokenNativeEvent) => {
        const { contextId, tokenResult } = evt
        if (contextId !== this.id) return
        callback(tokenResult)
      },
    )
    const promise = NolanoSdk.completion(this.id, params)
    return promise.then((completionResult) => {
      tokenListener.remove()
      tokenListener = null
      return completionResult
    }).catch((err: any) => {
      tokenListener.remove()
      tokenListener = null
      throw err
    })
  }

  stopCompletion(): Promise<void> {
    return NolanoSdk.stopCompletion(this.id)
  }

  async release(): Promise<void> {
    return NolanoSdk.releaseContext(this.id)
  }
}

export async function setContextLimit(limit: number): Promise<void> {
  return NolanoSdk.setContextLimit(limit)
}

export async function initLlama({
  model,
  is_model_asset: isModelAsset,
  ...rest
}: ContextParams): Promise<LlamaContext> {
  let path = model
  if (path.startsWith('file://')) path = path.slice(7)
  const id = await NolanoSdk.initContext({
    model: path,
    is_model_asset: !!isModelAsset,
    ...rest,
  })
  return new LlamaContext(id)
}

export async function releaseAllLlama(): Promise<void> {
  return NolanoSdk.releaseAllContexts()
}