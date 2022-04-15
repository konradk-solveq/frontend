import 'react-native';
import React from 'react';
import renderComponent from '@jestUtils/render';
import asyncEvent from '@jestUtils/asyncEvent';
import {initAppSize} from '@helpers/layoutFoo';

import {fireEvent} from '@testing-library/react-native';
import {postApiCallMock} from '@utils/testUtils/apiCalls';
import {mockedRouteData} from '@pages/main/recording/counterThankYouPage/__test__/mocks/mockedRouteData';
import ThankYouPageContainer from '../ThankYouPageContainer';

const routeDataMock = {distance: '30,00', time: 872651, pause: 445566};
const savingsDataMock = {fuel: '10', resource: '99'};

const TEST_NAME = 'Test';

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
jest.mock('@react-navigation/core', () => {
    const actualNav = jest.requireActual('@react-navigation/core');
    return {
        ...actualNav,
        useNavigation: () => ({
            navigate: mockedNavigate,
        }),
        useRoute: () => ({
            name: 'HomeTab',
        }),
    };
});

const initStore = {
    routes: {
        loading: false,
        currentRoute: {
            id: 1,
            isActive: false,
        },
        routesToSync: [],
        routes: [
            {
                route: mockedRouteData,
                id: 1,
            },
        ],
        error: '',
        statusCode: 200,
    },
    user: {
        userName: TEST_NAME,
    },
    auth: {
        userAuthState: 'authenticated',
        onboardingFinished: true,
        userName: '',
    },
    app: {
        showedLocationInfo: false,
        internetConnectionInfo: {goodConnectionQuality: true},
    },
};

const THANK_YOU_PAGE_CONTAINER = 'thank-you-page-container';
const THANK_YOU_PAGE_SAVE_BUTTON = `${THANK_YOU_PAGE_CONTAINER}-save-button`;
const THANK_YOU_PAGE_PUBLISH_BUTTON = `${THANK_YOU_PAGE_CONTAINER}-publish-button`;

describe('ThankYouPageContainer', () => {
    const onPressFn = jest.fn();

    beforeAll(() => {
        initAppSize();
    });

    beforeEach(async () => {
        await postApiCallMock({data: {id: 1}, status: 200});
        await postApiCallMock(
            {
                data: mockedRouteData,
                status: 200,
            },
            'patch',
        );
    });

    describe('Rendering', () => {
        it('Should match snapshot', async () => {
            const component = await asyncEvent(
                renderComponent(
                    <ThankYouPageContainer
                        userName={'Andrew'}
                        routeParams={routeDataMock}
                        savingsValues={savingsDataMock}
                        onPublishAction={onPressFn}
                        onSaveAction={onPressFn}
                    />,
                    undefined,
                    initStore,
                ),
            );

            expect(component).toMatchSnapshot();
        });

        it('Should access save button', async () => {
            const {getByTestId} = await asyncEvent(
                renderComponent(
                    <ThankYouPageContainer
                        userName={'Andrew'}
                        routeParams={routeDataMock}
                        savingsValues={savingsDataMock}
                        onPublishAction={onPressFn}
                        onSaveAction={onPressFn}
                    />,
                    undefined,
                    initStore,
                ),
            );

            const saveButton = getByTestId(THANK_YOU_PAGE_SAVE_BUTTON);
            fireEvent.press(saveButton);
        });

        it('Should access publish button', async () => {
            const {getByTestId} = await asyncEvent(
                renderComponent(
                    <ThankYouPageContainer
                        userName={'Andrew'}
                        routeParams={routeDataMock}
                        savingsValues={savingsDataMock}
                        onPublishAction={onPressFn}
                        onSaveAction={onPressFn}
                    />,
                    undefined,
                    initStore,
                ),
            );

            const publishButton = getByTestId(THANK_YOU_PAGE_PUBLISH_BUTTON);
            fireEvent.press(publishButton);
        });

        it('Should navigate after pressing publish button', async () => {
            const component = await asyncEvent(
                renderComponent(
                    <ThankYouPageContainer
                        userName={'Andrew'}
                        routeParams={routeDataMock}
                        savingsValues={savingsDataMock}
                        onPublishAction={mockedNavigate}
                        onSaveAction={mockedNavigate}
                    />,
                    undefined,
                    initStore,
                ),
            );

            expect(component).toMatchSnapshot();

            const publishButton = component.queryByTestId(
                THANK_YOU_PAGE_PUBLISH_BUTTON,
            );
            expect(publishButton).not.toBeNull();

            if (publishButton) {
                await asyncEvent(fireEvent.press(publishButton));
                expect(mockedNavigate).toBeCalledTimes(1);
            }
        });

        it('Should navigate after pressing save button', async () => {
            const component = await asyncEvent(
                renderComponent(
                    <ThankYouPageContainer
                        userName={'Andrew'}
                        routeParams={routeDataMock}
                        savingsValues={savingsDataMock}
                        onPublishAction={mockedNavigate}
                        onSaveAction={mockedNavigate}
                    />,
                    undefined,
                    initStore,
                ),
            );

            expect(component).toMatchSnapshot();

            const saveButton = component.queryByTestId(
                THANK_YOU_PAGE_SAVE_BUTTON,
            );
            expect(saveButton).not.toBeNull();

            if (saveButton) {
                await asyncEvent(fireEvent.press(saveButton));
                expect(mockedNavigate).toBeCalledTimes(1);
            }
        });

        afterEach(() => {
            jest.restoreAllMocks();
        });

        afterEach(() => {
            jest.clearAllMocks();
        });
    });
});
