import React from 'react';
import {Store} from 'redux';
import {Provider} from 'react-redux';
import {persistStore} from 'redux-persist';
import {PersistGate} from 'redux-persist/integration/react';
import {render, RenderOptions} from '@testing-library/react-native';

import storage from '@storage/storage';
import StaticLocationProvider from '@providers/staticLocationProvider/staticLocationProvider';
import TopNotificationProvider from '@providers/topNotificationProvider/TopNotificationProvider';

const persistor = persistStore(storage);

export const renderComponent = async (component: any) => {
    const wrappedComponent = await render(
        <Provider store={storage}>
            <PersistGate persistor={persistor}>
                <TopNotificationProvider>
                    <StaticLocationProvider>{component}</StaticLocationProvider>
                </TopNotificationProvider>
            </PersistGate>
        </Provider>,
    );

    return {
        ...wrappedComponent,
        storage,
    };
};

interface HookWrapperProps {
    children: React.ReactNode;
    initState?: Store<any, any>;
}
export const hookWrapper = ({children, initState}: HookWrapperProps) => (
    <Provider store={initState || storage}>
        <PersistGate persistor={persistor}>{children}</PersistGate>
    </Provider>
);

export const staticLocationProviderWrapper = async (
    component: any,
    renderOptions?: RenderOptions | undefined,
) => {
    const wrappedComponent = await render(
        <Provider store={storage}>
            <PersistGate persistor={persistor}>{component}</PersistGate>
        </Provider>,
        renderOptions,
    );

    return {
        ...wrappedComponent,
        storage,
    };
};

export default renderComponent;
