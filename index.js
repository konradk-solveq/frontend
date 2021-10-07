/**
 * @format
 */

import 'react-native-gesture-handler';
import 'react-native-get-random-values';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {initSentry} from '@sentryLogger/initSentry';

if (!__DEV__ && !process.env.JEST_WORKER_ID) {
    initSentry();
}

AppRegistry.registerComponent(appName, () => App);
