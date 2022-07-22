import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';

import asyncEvent from '@jestUtils/asyncEvent';
import {postApiCallMock} from '@utils/testUtils/apiCalls';

import RouteShareModal from '@src/containers/World/components/RouteShareModal';
import {
    apiResponseWithFailure,
    apiResponseWithSuccess,
    mockMapId,
} from '../__mocks__/apiResponse';

jest.useFakeTimers();

jest.mock('@react-navigation/core', () => ({
    useFocusEffect: () => {},
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

describe('<RouteShareModal />', () => {
    const onCloseFn = jest.fn();

    describe('Rendering', () => {
        it('Should render error modal when API returned error', async () => {
            await postApiCallMock(apiResponseWithFailure);
            const component = await asyncEvent(
                render(
                    <RouteShareModal
                        showModal={true}
                        onClose={onCloseFn}
                        mapId={mockMapId}
                    />,
                ),
            );

            const errorResponseModal = component.getByTestId(
                'share-route-modal-error',
            );
            expect(errorResponseModal).not.toBeNull();
            expect(errorResponseModal.props.visible).toBe(true);
        });

        it('Should not render error modal when API returned success', async () => {
            await postApiCallMock(apiResponseWithSuccess, 'post');
            const component = await asyncEvent(
                render(
                    <RouteShareModal
                        showModal={true}
                        onClose={onCloseFn}
                        mapId={''}
                    />,
                ),
            );

            const errorResponseModal = component.getByTestId(
                'share-route-modal-error',
            );
            expect(errorResponseModal.props.visible).toBe(false);
        });

        it('Should close error modal when API returned error and user clicked on button', async () => {
            await postApiCallMock(apiResponseWithFailure, 'post');
            const component = await asyncEvent(
                render(
                    <RouteShareModal
                        showModal={true}
                        onClose={onCloseFn}
                        mapId={''}
                    />,
                ),
            );

            const errorResponseModalButton = component.getByTestId(
                'big-red-btn',
            );

            fireEvent.press(errorResponseModalButton);

            const errorResponseModal = component.getByTestId(
                'share-route-modal-error',
            );
            expect(errorResponseModal.props.visible).toBe(false);
        });

        afterEach(() => {
            jest.restoreAllMocks();
        });
    });
});
