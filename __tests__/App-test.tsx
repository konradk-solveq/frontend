/**
 * @format
 */

import 'react-native';
import 'jest';
import React from 'react';
import App from '../App';
import {render} from '@testing-library/react-native';

it('renders correctly', async () => {
    await render(<App />);
});
