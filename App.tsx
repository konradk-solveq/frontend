import React from 'react';
import type {Node} from 'react';
import {StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistStore} from 'redux-persist';

import {initSentry} from '@sentryLogger/initSentry';
import storage from '@storage/storage';
import {I18n_init} from '@translations/I18n';
import StaticLocationProvider from '@providers/staticLocationProvider/staticLocationProvider';
import TopNotificationProvider from '@providers/topNotificationProvider/TopNotificationProvider';

import {initAppSize} from '@helpers/layoutFoo';

import NavContainer from '@navigation/NavContainer';
import NetworkStatus from '@sharedComponents/networkStatus/networkStatus';

initSentry();

const App: () => Node = () => {
    I18n_init();
    const persistor = persistStore(storage);

    initAppSize();

    return (
        <>
            <StatusBar backgroundColor="transparent" barStyle="dark-content" />
            <Provider store={storage}>
                <PersistGate persistor={persistor}>
                    <NetworkStatus />
                    <TopNotificationProvider>
                        <StaticLocationProvider>
                            <NavContainer />
                        </StaticLocationProvider>
                    </TopNotificationProvider>
                </PersistGate>
            </Provider>
        </>
    );
};

export default App;
