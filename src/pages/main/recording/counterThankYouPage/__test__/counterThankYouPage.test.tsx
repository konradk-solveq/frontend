import 'react-native';
import React from 'react';
import renderComponent from '@jestUtils/render';
import asyncEvent from '@jestUtils/asyncEvent';
import {initAppSize} from '@helpers/layoutFoo';

import CounterThankYouPage from '@pages/main/recording/counterThankYouPage/counterThankYouPage';
import {fireEvent, waitFor} from '@testing-library/react-native';
import {RegularStackRoute} from '@navigation/route';
import {postApiCallMock} from '@utils/testUtils/apiCalls';

const submitNavigationData = {
    name: RegularStackRoute.EDIT_DETAILS_SCREEN,
    params: {redirectTo: RegularStackRoute.KROSS_WORLD_SCREEN},
};

const cancelNavigationData = RegularStackRoute.HOME_SCREEN;

const TEST_TIME = 1800000; // 30 min
const TEST_PAUSE = 300000; // 5 min
const TEST_DISTANCE = '10,00';
const TEST_NAME = 'Test';
const TEST_PARSED_TIME = '0:25';
const TEST_PARSED_PAUSE = '0:05';

const mockedNavigate = jest.fn();
const mockedCanGoBack = jest.fn();
const mockedAddListener = jest.fn();
const mockedRemoveListener = jest.fn();

const navigationProp = {
    canGoBack: mockedCanGoBack,
    navigate: mockedNavigate,
    addListener: mockedAddListener,
    removeListener: mockedRemoveListener,
};
const navigation = () => navigationProp;
const useNavigation = () => ({
    canGoBack: mockedCanGoBack,
    navigate: mockedNavigate,
    addListener: mockedAddListener,
    removeListener: mockedRemoveListener,
});

const useRoute = () => ({
    params: {
        pause: TEST_PAUSE,
        distance: TEST_DISTANCE,
        time: TEST_TIME,
    },
});

const useFocusEffect = () => {};

jest.mock('@react-navigation/core', () => {
    const actualNav = jest.requireActual('@react-navigation/core');
    return {
        ...actualNav,
        navigation: navigation,
        useNavigation: useNavigation,
        useRoute: useRoute,
        useFocusEffect: useFocusEffect,
    };
});

const initStore = {
    routes: {
        loading: false,
        currentRoute: {
            id: 1,
            isActive: false,
        },
        routes: [
            {
                route: [
                    {
                        coords: {
                            latitude: 54.5188898,
                            longitude: 18.5305409,
                            altitude: 10,
                            speed: 20,
                        },
                        timestamp: 1641788803,
                        odometer: 1000,
                    },
                    {
                        coords: {
                            latitude: 54.5178898,
                            longitude: 18.5305409,
                            altitude: 10,
                            speed: 20,
                        },
                        timestamp: 1641789100,
                        odometer: 1000,
                    },
                    {
                        coords: {
                            latitude: 54.5168898,
                            longitude: 18.5305409,
                            altitude: 10,
                            speed: 20,
                        },
                        timestamp: 1641789400,
                        odometer: 1000,
                    },
                ],
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

const COUNTER_DISTANCE_ID = 'counter-distance';
const COUNTER_TIME_ID = 'counter-time';
const COUNTER_PAUSE_ID = 'counter-pause';
const SUBMIT_BTN_ID = 'counter-submit-btn';
const CANCEL_BTN_ID = 'counter-cancel-btn';

describe('Profile Screen', () => {
    const mockedGetName = jest.fn();

    beforeAll(() => {
        initAppSize();
    });

    beforeEach(async () => {
        await postApiCallMock({data: {id: 1}, status: 200});
    });

    describe('Rendering', () => {
        it('Should match snapshot', async () => {
            const component = await asyncEvent(
                renderComponent(
                    <CounterThankYouPage
                        getName={mockedGetName}
                        name={TEST_NAME}
                    />,
                    undefined,
                    initStore,
                ),
            );

            expect(component).toMatchSnapshot();
        });

        it('Should render passed route data', async () => {
            const component = await asyncEvent(
                renderComponent(
                    <CounterThankYouPage
                        getName={mockedGetName}
                        name={TEST_NAME}
                    />,
                    undefined,
                    initStore,
                ),
            );

            // getting the values by text doesn't work, but they are rendered and present in the snapshot
            const time = component.getByTestId(COUNTER_TIME_ID);
            const pause = component.getByTestId(COUNTER_PAUSE_ID);
            const distance = component.getByTestId(COUNTER_DISTANCE_ID);

            expect(time.children[0]).toBe(TEST_PARSED_TIME);
            expect(pause.children[0]).toBe(TEST_PARSED_PAUSE);
            expect(distance.children[0]).toBe(TEST_DISTANCE);

            expect(component).toMatchSnapshot();
        });

        it('Should navigate after pressing the submit button', async () => {
            const component = await asyncEvent(
                renderComponent(
                    <CounterThankYouPage
                        getName={mockedGetName}
                        name={TEST_NAME}
                    />,
                    undefined,
                    initStore,
                ),
            );

            expect(component).toMatchSnapshot();

            const submitButtonComponent = component.queryByTestId(
                SUBMIT_BTN_ID,
            );
            expect(submitButtonComponent).not.toBeNull();

            if (submitButtonComponent) {
                fireEvent.press(submitButtonComponent);
                await waitFor(() =>
                    expect(mockedNavigate).toBeCalledWith(submitNavigationData),
                );
            }
        });

        it('Should navigate after pressing the cancel buttons', async () => {
            const component = await asyncEvent(
                renderComponent(
                    <CounterThankYouPage
                        getName={mockedGetName}
                        name={TEST_NAME}
                    />,
                    undefined,
                    initStore,
                ),
            );

            expect(component).toMatchSnapshot();

            const cancelButtonComponent = component.queryByTestId(
                CANCEL_BTN_ID,
            );
            expect(cancelButtonComponent).not.toBeNull();

            if (cancelButtonComponent) {
                fireEvent.press(cancelButtonComponent);
                await waitFor(() =>
                    expect(mockedNavigate).toBeCalledWith(cancelNavigationData),
                );
            }
        });

        afterEach(() => {
            jest.restoreAllMocks();
        });
    });
});
