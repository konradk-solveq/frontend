import React from 'react';
import {initAppSize} from '@helpers/layoutFoo';
import {fireEvent} from '@testing-library/react-native';
import Consents from '@pages/main/profile/consents/consents';
import asyncEvent from '@jestUtils/asyncEvent';
import renderComponent from '@jestUtils/render';
import {getApiCallMock, putApiCallMock} from '@utils/testUtils/apiCalls';
import {UserConsentsErrorT, UserConsentsResponseT} from '@type/consents';

const SAVE_CONSENTS_BTN_ID = 'ConsentsPostBtn';
const CONSENTS_ERROR_MODAL_ID = 'ConsentsErrorModal';

jest.mock('@react-navigation/native', () => ({
    useNavigation: () => ({
        canGoBack: jest.fn().mockReturnValue(true),
    }),
}));

jest.mock('../../../../../utils/translations/useMergedTranslation', () => ({
    useMergedTranslation: (val: string) => {
        return {
            t: (str: string) => `${val}.${str}`,
        };
    },
}));

const initStore = {
    auth: {userconsentsState: 'consentsenticated'},
    app: {
        showedLocationInfo: false,
        internetConnectionInfo: {goodConnectionQuality: true},
    },
    consents: {
        consents: [
            {
                base_hash: 'abcd1234',
                checked: false,
                content: '<p>OK</p>',
                disabled: false,
                display_type: 1,
                functionality: ['opinion'],
                id: 390,
                name: 'testowa zgoda',
                short_content: '<p>OK</p>',
            },
        ],
    },
    user: {onboardingFinished: true, userName: ''},
    routes: {currentRoute: {isActive: false}},
};

type MockedConsentsResponseT = UserConsentsErrorT | UserConsentsResponseT;

const mockedResponseSuccess = {
    data: [
        {
            base_hash: 'abcd1234',
            checked: false,
            content: '<p>OK</p>',
            disabled: false,
            display_type: 1,
            functionality: ['opinion'],
            id: 390,
            name: 'testowa zgoda',
            short_content: '<p>OK</p>',
        },
    ],
    status: 200,
};

const errorMsg = 'Test error message.';

const mockedResponseError = {
    data: {error: errorMsg},
    status: 403,
};

describe('<Consents />', () => {
    describe('Rendering', () => {
        beforeAll(() => {
            initAppSize();
        });

        it('Should match snapshot', async () => {
            const component = await asyncEvent(renderComponent(<Consents />));

            expect(component).toMatchSnapshot();
        });

        it('Should save consents successfully on save button press', async () => {
            await getApiCallMock<MockedConsentsResponseT>(
                mockedResponseSuccess,
            );
            await putApiCallMock<MockedConsentsResponseT>(
                mockedResponseSuccess,
            );

            const component = await asyncEvent(
                renderComponent(<Consents />, undefined, initStore),
            );

            const consentsBtn = component.queryByTestId(SAVE_CONSENTS_BTN_ID);
            expect(consentsBtn).not.toBeNull();

            await asyncEvent(fireEvent.press(consentsBtn));

            /**
             * Error modal is not visible
             */

            const consentsErrorMessageModal = component.queryByTestId(
                CONSENTS_ERROR_MODAL_ID,
            );

            expect(consentsErrorMessageModal).not.toBeNull();
            expect(consentsErrorMessageModal.props.visible).toBe(false);

            const consentsErrorMessage = component.queryByText(errorMsg);

            expect(consentsErrorMessage).toBeNull();

            expect(component).toMatchSnapshot();
        });

        it('Should show error message if api responded with an error after a save button press', async () => {
            await putApiCallMock<MockedConsentsResponseT>(mockedResponseError);
            await getApiCallMock<MockedConsentsResponseT>(
                mockedResponseSuccess,
            );
            let component = await asyncEvent(
                renderComponent(<Consents />, undefined, initStore),
            );

            const consentsBtn = component.queryByTestId(SAVE_CONSENTS_BTN_ID);
            expect(consentsBtn).not.toBeNull();

            await asyncEvent(fireEvent.press(consentsBtn));

            /**
             * Error modal is visible
             */

            const consentsErrorMessageModal = component.queryByTestId(
                CONSENTS_ERROR_MODAL_ID,
            );

            expect(consentsErrorMessageModal).not.toBeNull();
            expect(consentsErrorMessageModal.props.visible).toBe(true);

            const consentsErrorMessage = component.queryByText(errorMsg);

            expect(consentsErrorMessage).not.toBeNull();

            expect(component).toMatchSnapshot();
        });

        afterEach(() => {
            jest.clearAllMocks();
        });
    });
});
