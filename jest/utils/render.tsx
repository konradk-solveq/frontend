import React from 'react';
import {Provider} from 'react-redux';
import {persistStore} from 'redux-persist';
import {PersistGate} from 'redux-persist/integration/react';
import {render} from '@testing-library/react-native';

import storage from '../../src/storage/storage';

export const renderComponent = async (component: any) => {
    const persistor = persistStore(storage);
    const wrappedComponent = await render(
        <Provider store={storage}>
            <PersistGate persistor={persistor}>{component}</PersistGate>
        </Provider>,
    );

    return {
        ...wrappedComponent,
        storage,
    };
};

interface HookWrapperProps {
    children: React.ReactNode;
}
const persistor = persistStore(storage);
export const hookWrapper = ({children}: HookWrapperProps) => (
    <Provider store={storage}>
        <PersistGate persistor={persistor}>{children}</PersistGate>
    </Provider>
);

export default renderComponent;
