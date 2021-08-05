import React from 'react';
import {Provider} from 'react-redux';
import {persistStore} from 'redux-persist';
import {PersistGate} from 'redux-persist/integration/react';
import {render, RenderOptions} from '@testing-library/react-native';

import storage from '@storage/storage';
import StaticLocationProvider from '@providers/staticLocationProvider/staticLocationProvider';
import {Store} from 'redux';

const persistor = persistStore(storage);

export const renderComponent = async (component: any) => {
    const wrappedComponent = await render(
        <Provider store={storage}>
            <PersistGate persistor={persistor}>
                <StaticLocationProvider>{component}</StaticLocationProvider>
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
