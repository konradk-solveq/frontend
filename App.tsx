import React from 'react';
import type { Node } from 'react';
import { StyleSheet, TextInput, Text, View } from 'react-native';
// import { SafeAreaView } from 'react-native';
// import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import storage from './src/storage/storage';
import { I18n_init } from './I18n/I18n'

import { initAppSize } from './src/helpers/layoutFoo';

import NavContainer from './src/navigation/NavContainer';

const App: () => Node = () => {
    I18n_init();

    const persistor = persistStore(storage);

    initAppSize();

    const styles = StyleSheet.create({
        varsion: {
            fontFamily: 'DIN2014Narrow-Light',
            fontSize: 14,
            textAlign: 'left',
            color: '#555555',
            position: 'absolute',
            top: 3,
            left: 10,
        },
    });

    return (
        <Provider store={storage}>
            <PersistGate persistor={persistor}>
                <NavContainer />

                <Text style={styles.varsion}>z dnia: 19.04.2021</Text>
            </PersistGate>
        </Provider>
    );
};

export default App;
