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

const RootStack = createStackNavigator();

const App: () => Node = () => {
	I18n_init();

	const Stack = createStackNavigator();


	return (
		<Provider store={store}>
			{/* <SafeAreaView> */}
				<NavigationContainer >
					<Stack.Navigator>

						 {/* <Stack.Screen name="Onboarding" component={Onboarding}
							options={{ headerShown: false }} />

						<Stack.Screen name="GetToKnowEachOther" component={GetToKnowEachOther}
							options={{
								// title: 'My home',
								// headerStyle: {
								// 	backgroundColor: '#f4511e',
								// },
								// headerTintColor: '#fff',
								// headerTitleStyle: {
								// 	fontWeight: 'bold',
								// },
								headerShown: false
							}} /> 

					<Stack.Screen name="TurtorialNFC" component={TurtorialNFC}
						options={{ headerShown: false }} /> */}

					<Stack.Screen name="WrongScan" component={WrongScan}
						options={{ headerShown: false }} />

					</Stack.Navigator>
				</NavigationContainer>
			{/* </SafeAreaView> */}
		</Provider >
	);
};

export default App;

