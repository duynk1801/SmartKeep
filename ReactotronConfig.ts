import Reactotron from 'reactotron-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Reactotron Configuration
 *
 * - Only connects in __DEV__ mode
 * - Uses AsyncStorage for monitoring stored data
 * - Provides `console.tpimp` shortcut for quick logging
 *
 * Download Reactotron Desktop: https://github.com/infinitered/reactotron/releases
 */

if (__DEV__) {
  Reactotron.setAsyncStorageHandler!(AsyncStorage)
    .configure({
      name: 'SmartKeep',
    })
    .useReactNative({
      asyncStorage: { ignore: ['secret'] }, // monitor AsyncStorage
      networking: {
        ignoreUrls: /symbolicate/,
      },
      editor: false,
      errors: { veto: () => false },
      overlay: false,
    })
    .connect();

  // Shortcut: use `console.tpimp("message")` anywhere in dev
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (console as any).tpimp = Reactotron.log;

  // Clear Reactotron on each app reload for cleaner logs
  Reactotron.clear?.();
}

export default Reactotron;
