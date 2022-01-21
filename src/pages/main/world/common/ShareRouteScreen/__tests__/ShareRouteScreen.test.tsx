import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';

import asyncEvent from '@jestUtils/asyncEvent';
import {postApiCallMock} from '@utils/testUtils/apiCalls';
import {initAppSize} from '@helpers/layoutFoo';

import ShareRouteScreen from '../ShareRouteScreen';
import {
    apiResponseWithFailure,
    apiResponseWithSuccess,
} from '../__mocks__/apiResponse';

const mockedNavigate = jest.fn();
const mockedGoBack = jest.fn();
jest.mock('@react-navigation/core', () => ({
    useNavigation: () => ({
        navigate: mockedNavigate,
        canGoBack: jest.fn().mockReturnValue(true),
        goBack: mockedGoBack,
    }),
}));
jest.mock('@react-navigation/native', () => ({
    useRoute: () => ({
        params: {mapID: 'test-mapId'},
    }),
    useNavigation: () => ({
        navigate: mockedNavigate,
        canGoBack: jest.fn().mockReturnValue(true),
        goBack: mockedGoBack,
    }),
}));
/**
 * Not work when defined inside __mocks__ directory.
 */
jest.mock('react-native-share', () => ({
    open: jest.fn().mockReturnValue({
        success: true,
        dismissedAction: undefined,
    }),
}));

describe('<ShareRouteScreen />', () => {
    beforeAll(() => {
        initAppSize();
    });

    describe('Rendering', () => {
        it('Should render ShareRouteScreen with image', async () => {
            await postApiCallMock(apiResponseWithSuccess, 'post');

            const component = await asyncEvent(render(<ShareRouteScreen />));

            expect(component).not.toBeNull();
        });

        it('Should render error modal when API returned error', async () => {
            await postApiCallMock(apiResponseWithFailure, 'post');
            const component = await asyncEvent(render(<ShareRouteScreen />));

            const errorResponseModal = component.getByTestId(
                'ShareRouteScreen-modal',
            );
            expect(errorResponseModal).not.toBeNull();
            expect(errorResponseModal.props.visible).toBe(true);
        });

        it('Should not render error modal when API returned success', async () => {
            await postApiCallMock(apiResponseWithSuccess, 'post');
            const component = await asyncEvent(render(<ShareRouteScreen />));

            const errorResponseModal = component.getByTestId(
                'ShareRouteScreen-modal',
            );
            expect(errorResponseModal.props.visible).toBe(false);
        });

        it('Should close error modal when API returned error and user clicked on button', async () => {
            await postApiCallMock(apiResponseWithFailure, 'post');
            const component = await asyncEvent(render(<ShareRouteScreen />));

            const errorResponseModalButton = component.getByTestId(
                'ShareRouteScreen-modal-button',
            );

            fireEvent.press(errorResponseModalButton);

            const errorResponseModal = component.getByTestId(
                'ShareRouteScreen-modal',
            );
            expect(errorResponseModal.props.visible).toBe(false);
        });

        afterEach(() => {
            jest.resetModules();
        });
    });
});
