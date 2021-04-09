import React from 'react';
import type { Node } from 'react';
// import { SafeAreaView } from 'react-native';
// import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from "react-redux";
import {PersistGate} from 'redux-persist/integration/react';
import {persistStore} from 'redux-persist';
import storage from './src/storage/storage';
import { I18n_init } from './I18n/I18n'

import {initAppSize} from './src/helpers/layoutFoo';

import NavContainer from './src/navigation/NavContainer';

const App: () => Node = () => {
    I18n_init();

    const persistor = persistStore(storage);

    initAppSize();

    return (
        <Provider store={storage}>
            <PersistGate persistor={persistor}>
                <NavContainer />
            </PersistGate>
        </Provider>
    );
};

export default App;
