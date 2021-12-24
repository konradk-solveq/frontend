import React from 'react';
import {Store} from 'redux';
import {Provider} from 'react-redux';
import {persistStore} from 'redux-persist';
import {PersistGate} from 'redux-persist/integration/react';
import {render, RenderOptions} from '@testing-library/react-native';

import storage, {buildStore, RootState} from '@storage/storage';
import StaticLocationProvider from '@providers/staticLocationProvider/staticLocationProvider';
import TopNotificationProvider from '@providers/topNotificationProvider/TopNotificationProvider';

const persistor = persistStore(storage);

export const renderComponent = async (
    component: any,
    renderOptions?: RenderOptions | undefined,
    initState?: Partial<RootState>,
) => {
    const mockedStore = initState && buildStore(initState);
    const mockerdPersistor = mockedStore && persistStore(mockedStore);

    const wrappedComponent = await render(
        <Provider store={mockedStore || storage}>
            <PersistGate persistor={mockerdPersistor || persistor}>
                <TopNotificationProvider>
                    <StaticLocationProvider>{component}</StaticLocationProvider>
                </TopNotificationProvider>
            </PersistGate>
        </Provider>,
        renderOptions,
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

export const rerenderComponent = async (component: any, children: any) => {
    await component.rerender(
        <Provider store={storage}>
            <PersistGate persistor={persistor}>
                <TopNotificationProvider>
                    <StaticLocationProvider>{children}</StaticLocationProvider>
                </TopNotificationProvider>
            </PersistGate>
        </Provider>,
    );
    return;
};

export default renderComponent;
