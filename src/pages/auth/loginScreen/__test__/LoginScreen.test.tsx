import React from 'react';
import {initAppSize} from '@helpers/layoutFoo';
import {fireEvent} from '@testing-library/react-native';
import LoginScreen from '@pages/auth/loginScreen/LoginScreen';
import asyncEvent from '@jestUtils/asyncEvent';
import renderComponent from '@jestUtils/render';
import {postApiCallMock} from '@utils/testUtils/apiCalls';
import {act} from 'react-test-renderer';
import {UserAuthErrorT, UserAuthResponseT} from '@type/auth';

const REGISTER_TEST_ID = 'RegisterLink';
const FORGOT_PASSWORD_TEST_ID = 'ForgotPassLink';
// const GOOGLE_TEST_ID = 'GoogleBtn';
// const FB_TEST_ID = 'FBBtn';
const LOGIN_TEST_ID = 'LoginBtn';
const EMAIL_ERR_MESSAGE_ID = 'InputEmailErrMessage';
const PASSWORD_ERR_MESSAGE_ID = 'InputPasswordErrMessage';
const EMAIL_INPUT_ID = 'InputEmail';
const PASSWORD_INPUT_ID = 'InputPassword';
const LOGIN_ERROR_MODAL_ID = 'LoginErrorModal';

const mockedNavigate = jest.fn();
const mockedCanGoBack = jest.fn();
jest.mock('@react-navigation/core', () => {
    const actualNav = jest.requireActual('@react-navigation/core');
    return {
        ...actualNav,
        useNavigation: () => ({
            canGoBack: mockedCanGoBack,
            navigate: mockedNavigate,
        }),
    };
});

jest.mock('../../../../utils/translations/useMergedTranslation', () => ({
    useMergedTranslation: (val: string) => {
        return {
            t: (str: string) => `${val}.${str}`,
        };
    },
}));

const initStore = {
    auth: {userAuthState: 'loggedout'},
    app: {
        showedLocationInfo: false,
        internetConnectionInfo: {goodConnectionQuality: true},
    },
    user: {onboardingFinished: true, userName: ''},
    routes: {currentRoute: {isActive: false}},
};

const mockedLogin = 'test@example.com';
const mockedPassword = '12345678';

type MockedLoginResponseT = UserAuthErrorT | UserAuthResponseT;

const mockedResponseSuccess = {
    data: {
        access_token: 'access_token',
        refresh_token: 'refresh_token',
        expiration_date: '2021-12-22T13:02:23.502Z',
        expires_in: 0,
        user: {
            id: 'user_id',
            email: 'test@example.com',
            role: 'user',
        },
    },
    status: 200,
};

const errorMsg = 'Test error message.';

const mockedResponseError = {
    data: {error: errorMsg},
    status: 403,
};

describe('<LoginScreen />', () => {
    describe('Rendering', () => {
        beforeAll(() => {
            initAppSize();
        });

        it('Should match snapshot', async () => {
            const component = await asyncEvent(
                renderComponent(<LoginScreen />),
            );

            expect(component).toMatchSnapshot();
        });

        it('Should navigate after press on register link', async () => {
            const component = await asyncEvent(
                renderComponent(<LoginScreen />),
            );

            expect(component).toMatchSnapshot();

            const registerLinkComponent = component.queryByTestId(
                REGISTER_TEST_ID,
            );
            expect(registerLinkComponent).not.toBeNull();

            if (registerLinkComponent) {
                fireEvent.press(registerLinkComponent);
                expect(mockedNavigate).toBeCalledTimes(1);
            }
        });

        it('Should navigate after press on forgot password link', async () => {
            const component = await asyncEvent(
                renderComponent(<LoginScreen />),
            );

            expect(component).toMatchSnapshot();

            const forgotPasswordLinkComponent = component.queryByTestId(
                FORGOT_PASSWORD_TEST_ID,
            );
            expect(forgotPasswordLinkComponent).not.toBeNull();

            if (forgotPasswordLinkComponent) {
                fireEvent.press(forgotPasswordLinkComponent);
                expect(mockedNavigate).toBeCalledTimes(1);
            }
        });

        it('Should validate input data on loginButton press', async () => {
            const component = await asyncEvent(
                renderComponent(<LoginScreen />),
            );

            const loginBtn = component.queryByTestId(LOGIN_TEST_ID);
            expect(loginBtn).not.toBeNull();

            await asyncEvent(fireEvent.press(loginBtn));

            /**
             * Validation error messages are visible
             */
            const emailValidationErrorMessage = component.queryByTestId(
                EMAIL_ERR_MESSAGE_ID,
            );
            const passwordValidationErrorMessage = component.queryByTestId(
                PASSWORD_ERR_MESSAGE_ID,
            );
            expect(emailValidationErrorMessage.children).not.toEqual('');
            expect(passwordValidationErrorMessage.children).not.toEqual('');

            expect(component).toMatchSnapshot();
        });

        it('Should login successfully on loginButton press', async () => {
            await postApiCallMock<MockedLoginResponseT>(mockedResponseSuccess);

            const component = await asyncEvent(
                renderComponent(<LoginScreen />, undefined, initStore),
            );

            const loginBtn = component.queryByTestId(LOGIN_TEST_ID);
            expect(loginBtn).not.toBeNull();

            const emailInput = component.queryByTestId(EMAIL_INPUT_ID);
            const passwordInput = component.queryByTestId(PASSWORD_INPUT_ID);

            fireEvent(emailInput, 'change', mockedLogin);
            fireEvent(passwordInput, 'change', mockedPassword);

            await asyncEvent(fireEvent.press(loginBtn));

            /**
             * Validation error messages are not visible
             */
            const emailValidationErrorMessage = component.queryByTestId(
                EMAIL_ERR_MESSAGE_ID,
            );
            const passwordValidationErrorMessage = component.queryByTestId(
                PASSWORD_ERR_MESSAGE_ID,
            );
            expect(emailValidationErrorMessage.children).toEqual(['']);
            expect(passwordValidationErrorMessage.children).toEqual(['']);

            /**
             * Error modal is not visible
             */

            const authErrorMessageModal = component.queryByTestId(
                LOGIN_ERROR_MODAL_ID,
            );

            expect(authErrorMessageModal).not.toBeNull();
            expect(authErrorMessageModal.props.visible).toBe(false);

            const authErrorMessage = component.queryByText(errorMsg);

            expect(authErrorMessage).toBeNull();

            expect(component).toMatchSnapshot();
        });

        it('Should show error message if api responded with an error after a loginButtonPress', async () => {
            await postApiCallMock<MockedLoginResponseT>(mockedResponseError);
            let component = await asyncEvent(
                renderComponent(<LoginScreen />, undefined, initStore),
            );

            const loginBtn = component.queryByTestId(LOGIN_TEST_ID);
            expect(loginBtn).not.toBeNull();

            const emailInput = component.queryByTestId(EMAIL_INPUT_ID);
            const passwordInput = component.queryByTestId(PASSWORD_INPUT_ID);

            fireEvent(emailInput, 'change', mockedLogin);
            fireEvent(passwordInput, 'change', mockedPassword);
            await act(() => fireEvent.press(loginBtn));
            /**
             * Validation error messages are not visible
             */
            const emailValidationErrorMessage = component.queryByTestId(
                EMAIL_ERR_MESSAGE_ID,
            );
            const passwordValidationErrorMessage = component.queryByTestId(
                PASSWORD_ERR_MESSAGE_ID,
            );
            expect(emailValidationErrorMessage.children).toEqual(['']);
            expect(passwordValidationErrorMessage.children).toEqual(['']);

            /**
             * Error modal is visible
             */

            const authErrorMessageModal = component.queryByTestId(
                LOGIN_ERROR_MODAL_ID,
            );

            expect(authErrorMessageModal).not.toBeNull();
            expect(authErrorMessageModal.props.visible).toBe(true);

            const authErrorMessage = component.queryByText(errorMsg);

            expect(authErrorMessage).not.toBeNull();

            expect(component).toMatchSnapshot();
        });

        afterEach(() => {
            jest.clearAllMocks();
        });
    });
});
