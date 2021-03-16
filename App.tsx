import React from 'react';
import type { Node } from 'react';
import {	SafeAreaView} from 'react-native';

import SplashScreen from './src/pages/onboarding/splashScreen/splashScreen';
import Onboarding from './src/pages/onboarding/onboarding';

const App: () => Node = () => {

	return (
		<SafeAreaView>

			<Onboarding></Onboarding>

		</SafeAreaView>
	);
};

export default App;