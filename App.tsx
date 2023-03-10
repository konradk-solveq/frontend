import React, {Suspense} from 'react';
import type {Node} from 'react';
import {StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistStore} from 'redux-persist';

import storage from '@storage/storage';
import StaticLocationProvider from '@providers/staticLocationProvider/staticLocationProvider';
import ToastProvider from '@src/providers/ToastProvider/ToastProvider';

import {initAppSize} from '@helpers/layoutFoo';
import {initConfig} from '@theme/appLayoutConfig';

import NavContainer from '@navigation/NavContainer';
import NetworkStatus from '@sharedComponents/networkStatus/networkStatus';
import useRouteDebug from '@hooks/useRouteDebug';

import {setUserAgentHeader} from '@api';
import {setLanguageHeader} from '@api/api';

const App: () => Node = () => {
    const persistor = persistStore(storage);

    initAppSize();
    initConfig();

    useRouteDebug();

    setUserAgentHeader();
    setLanguageHeader('pl');

    return (
        <>
            <StatusBar
                backgroundColor="transparent"
                barStyle="dark-content"
                translucent={false}
            />
            <Provider store={storage}>
                <PersistGate persistor={persistor}>
                    <NetworkStatus />
                    {/* TODO: refactor or rename this component (StaticLocationProvider) */}
                    <StaticLocationProvider />
                    <ToastProvider>
                        <Suspense fallback={null}>
                            <NavContainer />
                        </Suspense>
                    </ToastProvider>
                </PersistGate>
            </Provider>
        </>
    );
};

export default App;
