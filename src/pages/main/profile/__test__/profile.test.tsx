import React from 'react';
import 'react-native';
import {initAppSize} from '@helpers/layoutFoo';

import Profile from '../profile';
import asyncEvent from '@jestUtils/asyncEvent';
import renderComponent from '@jestUtils/render';

jest.mock('@react-navigation/native', () => ({
    useNavigation: () => ({
        canGoBack: jest.fn().mockReturnValue(true),
    }),
}));
const mockedNavigate = jest.fn();
jest.mock('@react-navigation/core', () => {
    const actualNav = jest.requireActual('@react-navigation/core');
    return {
        ...actualNav,
        useNavigation: () => ({
            navigate: mockedNavigate,
        }),
        useRoute: () => ({
            name: 'Profile',
            params: {frameNumber: ''},
        }),
    };
});

describe('Profile Screen', () => {
    beforeAll(() => {
        initAppSize();
    });

    it('Should match snapshot', async () => {
        const component = await asyncEvent(renderComponent(<Profile />));

        expect(component).toMatchSnapshot();
    });
});
