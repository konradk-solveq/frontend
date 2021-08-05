/**
 * @format
 */

import 'react-native';
import 'jest';
import React from 'react';
import App from '../App';
import {render} from '@testing-library/react-native';
import {renderHook} from '@testing-library/react-hooks';

import {hookWrapper} from '@jestUtils/render';

import useFineWhenInUseLocationPermission from '@hooks/useFineWhenInUseLocationPermission';

it('renders correctly', async () => {
    const {waitForNextUpdate} = renderHook(
        () => useFineWhenInUseLocationPermission(),
        {wrapper: hookWrapper},
    );

    await waitForNextUpdate();

    await render(<App />);
});
