import {enableScreens} from 'react-native-screens';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

enableScreens(false);

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export {Stack, Tab};
