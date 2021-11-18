import {enableScreens} from 'react-native-screens';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {RootStackType} from '@type/rootStack';
import {isAndroid} from '@src/utils/platform';

/**
 * For further investigation. Crash on Android when set to true
 * https://github.com/software-mansion/react-native-screens/issues/17
 */
enableScreens(!isAndroid);

const Stack = createStackNavigator<RootStackType>();
const Tab = createBottomTabNavigator();

export {Stack, Tab};
