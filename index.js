import { AppRegistry } from 'react-native';

import { name as appName } from './app.json';
import App from './src/App';

import 'react-native-url-polyfill/auto';

AppRegistry.registerComponent(appName, () => App);
