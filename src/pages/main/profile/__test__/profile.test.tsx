import 'react-native';
import React from 'react';
import {fireEvent} from '@testing-library/react-native';
import renderComponent from '@jestUtils/render';
import asyncEvent from '@jestUtils/asyncEvent';
import {initAppSize} from '@helpers/layoutFoo';

import {postApiCallMock} from '@utils/testUtils/apiCalls';
import Profile from '../profile';

jest.mock('@react-navigation/native', () => ({
    useNavigation: () => ({
        canGoBack: jest.fn().mockReturnValue(true),
    }),
}));

const initStore = {
    auth: {userAuthState: 'authenticated'},
    app: {
        showedLocationInfo: false,
        internetConnectionInfo: {goodConnectionQuality: true},
    },
    user: {onboardingFinished: true, userName: ''},
    routes: {currentRoute: {isActive: false}},
};

const LOGOUT_BUTTON_ID = 'logout-btn';
const LOGOUT_ERROR_MESSAGE_ID = 'logout-error-message';

describe('Profile Screen', () => {
    const mockedRoute = jest.fn();
    const mockedNavigation = {
        navigate: jest.fn(),
    };

    beforeAll(() => {
        initAppSize();
    });

    beforeEach(async () => {
        await postApiCallMock();
    });

    describe('Logging out', () => {
        it('Should render screen with logoutButton', async () => {
            const component = await asyncEvent(
                renderComponent(
                    <Profile
                        navigation={mockedNavigation}
                        route={mockedRoute}
                    />,
                    undefined,
                    initStore,
                ),
            );

            const logoutBtn = component.queryByTestId(LOGOUT_BUTTON_ID);
            expect(logoutBtn).not.toBeNull();

            expect(component).toMatchSnapshot();
        });

        it('Should loggout successfully when press on logoutButton', async () => {
            const component = await asyncEvent(
                renderComponent(
                    <Profile
                        navigation={mockedNavigation}
                        route={mockedRoute}
                    />,
                    undefined,
                    initStore,
                ),
            );

            const logoutBtn = component.queryByTestId(LOGOUT_BUTTON_ID);
            expect(logoutBtn).not.toBeNull();

            /**
             * Fires logout action
             */
            await asyncEvent(fireEvent.press(logoutBtn));

            /**
             * After logout react-navigation moves to auth screen stack
             */
            const logoutBtnAfterRedirect = component.queryByTestId(
                LOGOUT_BUTTON_ID,
            );
            expect(logoutBtnAfterRedirect).toBeNull();

            /**
             * Error modal is not visible
             */
            const authErrorMessageModal = component.queryByTestId(
                LOGOUT_ERROR_MESSAGE_ID,
            );
            expect(authErrorMessageModal).not.toBeNull();
            expect(authErrorMessageModal.props.visible).toBe(false);

            expect(component).toMatchSnapshot();
        });

        it('Should show error message when press on logoutButton and api responsed with error', async () => {
            await postApiCallMock({
                data: {
                    data: null,
                    status: 403,
                    error: 'Test error',
                },
                status: 403,
            });
            const component = await asyncEvent(
                renderComponent(
                    <Profile
                        navigation={mockedNavigation}
                        route={mockedRoute}
                    />,
                    undefined,
                    initStore,
                ),
            );

            const logoutBtn = component.queryByTestId(LOGOUT_BUTTON_ID);
            expect(logoutBtn).not.toBeNull();

            /**
             * Fires logout action
             */
            await asyncEvent(fireEvent.press(logoutBtn));

            /**
             * Show error message on API call error
             */
            const authErrorMessageModal = component.queryByTestId(
                LOGOUT_ERROR_MESSAGE_ID,
            );
            expect(authErrorMessageModal).not.toBeNull();
            expect(authErrorMessageModal.props.visible).toBe(true);

            expect(component).toMatchSnapshot();
        });

        afterEach(() => {
            jest.restoreAllMocks();
        });
    });
});
