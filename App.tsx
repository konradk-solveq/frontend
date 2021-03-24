import React from 'react';
import type { Node } from 'react';
import { SafeAreaView } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from "react-redux";
import store from './src/store/store';
import { I18n_init } from './I18n/I18n'
import startAplication from './src/pages/startAplication/'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Onboarding from './src/pages/onboarding/onboarding';
import GetToKnowEachOther from './src/pages/onboarding/getToKnowEachOther/getToKnowEachOther';
import TurtorialNFC from './src/pages/onboarding/bikeAdding/turtorialNFC/turtorialNFC';
import WrongScan from './src/pages/onboarding/bikeAdding/wrongScan/wrongScan';
import AddingByNumber from './src/pages/onboarding/bikeAdding/addingByNumber/addingByNumber';
import AddingInfo from './src/pages/onboarding/bikeAdding/info/info';
import Loader from './src/pages/onboarding/bikeAdding/loader/loader';
import PermitsDeclarations from './src/pages/onboarding/permitsDeclarations/permitsDeclarations';

const App: () => Node = () => {
	I18n_init();

	const Stack = createStackNavigator();

	const horizontalAnim = {
		// gestureDirection: 'horizontal',
		cardStyleInterpolator: ({ current, layouts }) => {
			return {
				cardStyle: {
					transform: [
						{
							translateX: current.progress.interpolate({
								inputRange: [0, 1],
								outputRange: [layouts.screen.width, 0],
							}),
						},
					],
				},
			};
		},
	};

	return (
		<Provider store={store}>
			{/* <SafeAreaView> */}
			<NavigationContainer >
				<Stack.Navigator
					headerMode="none"
					// initialRouteName="TurtorialNFC" 
					mode="modal"
					screenOptions={horizontalAnim}
				>

					{/* <Stack.Screen name="Onboarding" component={Onboarding}/>
					<Stack.Screen name="GetToKnowEachOther" component={GetToKnowEachOther} />
					<Stack.Screen name="TurtorialNFC" component={TurtorialNFC}/>
					<Stack.Screen name="AddingByNumber" component={AddingByNumber} />
					<Stack.Screen name="AddingInfo" component={AddingInfo} /> */}

					{/* <Stack.Screen name="Loader" component={Loader} /> */}
					<Stack.Screen name="PermitsDeclarations" component={PermitsDeclarations} />

					{/* <Stack.Screen name="WrongScan" component={WrongScan}/> */}

				</Stack.Navigator>
			</NavigationContainer>
			{/* </SafeAreaView> */}
		</Provider >
	);
};

export default App;

