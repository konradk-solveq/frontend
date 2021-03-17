import React from 'react';
import type { Node } from 'react';
import {	SafeAreaView} from 'react-native';

import SplashScreen from './src/pages/onboarding/splashScreen/splashScreen';
import Onboarding from './src/pages/onboarding/onboarding';
import GetToKnowEachOther from './src/pages/onboarding/getToKnowEachOther/getToKnowEachOther';


import I18n from 'react-native-i18n';

I18n.fallbacks = true;
I18n.locale = 'pl';


let languageCode = I18n.locale.substr(0, 2);

I18n.translations = {
    pl: require('./I18n/pl.json')
}

switch (languageCode) {
    case 'en':
        I18n.translations.af = require('./I18n/pl.json');
        break;
}


const App: () => Node = () => {

	return (
		<SafeAreaView>

			{/* <Onboarding></Onboarding> */}
			<GetToKnowEachOther></GetToKnowEachOther>

		</SafeAreaView>
	);
};

export default App;

