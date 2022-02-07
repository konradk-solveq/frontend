/**
 * @format
 */

import 'react-native-gesture-handler';
import 'react-native-get-random-values';
import {AppRegistry, LogBox} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {initSentry} from '@sentryLogger/initSentry';

LogBox.ignoreLogs(['new NativeEventEmitter']);

if (!__DEV__ && !process.env.JEST_WORKER_ID) {
    initSentry();
}

AppRegistry.registerComponent(appName, () => App);
