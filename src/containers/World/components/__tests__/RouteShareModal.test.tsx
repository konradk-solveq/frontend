import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';

import asyncEvent from '@jestUtils/asyncEvent';
import {postApiCallMock} from '@utils/testUtils/apiCalls';

import RouteShareModal from '@src/containers/World/components/RouteShareModal';
import {apiResponseWithFailure, mockMapId} from '../__mocks__/apiResponse';

const ROUTE_SHARE_MODAL_ERROR = 'share-route-modal-error';

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
                ROUTE_SHARE_MODAL_ERROR,
            );

            expect(errorResponseModal).not.toBeNull();
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
                `${ROUTE_SHARE_MODAL_ERROR}-close-button`,
            );

            fireEvent.press(errorResponseModalButton);

            expect(onCloseFn).toBeCalled();
        });

        afterEach(() => {
            jest.restoreAllMocks();
        });
    });
});
