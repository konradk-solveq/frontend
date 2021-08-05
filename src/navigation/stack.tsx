import {enableScreens} from 'react-native-screens';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {RootStackType} from '@type/rootStack';

enableScreens(false);

const Stack = createStackNavigator<RootStackType>();
const Tab = createBottomTabNavigator();

export {Stack, Tab};
