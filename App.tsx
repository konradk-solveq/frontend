import React from 'react';
import type { Node } from 'react';
import { SafeAreaView } from 'react-native';
import { Provider } from "react-redux";
import store from './src/store/store';
import { I18n_init } from './I18n/I18n'

import Onboarding from './src/pages/onboarding/onboarding';
import GetToKnowEachOther from './src/pages/onboarding/getToKnowEachOther/getToKnowEachOther';


const App: () => Node = () => {
	I18n_init();

	return (
		<Provider store={store}>
			<SafeAreaView>

				{/* <Onboarding></Onboarding> */}
				<GetToKnowEachOther></GetToKnowEachOther>

			</SafeAreaView>
		</Provider >
	);
};

export default App;

